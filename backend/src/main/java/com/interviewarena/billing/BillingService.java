package com.interviewarena.billing;

import com.interviewarena.subscription.Plan;
import com.interviewarena.subscription.Subscription;
import com.interviewarena.subscription.SubscriptionRepository;
import com.interviewarena.user.User;
import com.interviewarena.user.UserRepository;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.SubscriptionUpdateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class BillingService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final StripeClientWrapper stripeClient;

    private final String priceId;
    private final String webhookSecret;
    private final String successUrl;
    private final String cancelUrl;

    public BillingService(
        SubscriptionRepository subscriptionRepository,
        UserRepository userRepository,
        StripeClientWrapper stripeClient,
        @Value("${app.stripe.price-id:}") String priceId,
        @Value("${app.stripe.webhook-secret:}") String webhookSecret,
        @Value("${app.stripe.success-url:}") String successUrl,
        @Value("${app.stripe.cancel-url:}") String cancelUrl
    ) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.stripeClient = stripeClient;
        this.priceId = priceId;
        this.webhookSecret = webhookSecret;
        this.successUrl = successUrl;
        this.cancelUrl = cancelUrl;
    }

    public String createCheckoutSession(UUID userId) throws StripeException {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));

        Subscription subscription = subscriptionRepository.findByUserId(userId)
            .orElseGet(() -> {
                Subscription sub = new Subscription();
                sub.setUserId(userId);
                sub.setPlan(Plan.FREE);
                return subscriptionRepository.save(sub);
            });

        String customerId = subscription.getStripeCustomerId();
        if (customerId == null || customerId.trim().isEmpty()) {
            CustomerCreateParams customerParams = CustomerCreateParams.builder()
                .setEmail(user.getEmail())
                .putMetadata("userId", userId.toString())
                .build();
            com.stripe.model.Customer customer = stripeClient.createCustomer(customerParams);
            customerId = customer.getId();
            subscription.setStripeCustomerId(customerId);
            subscriptionRepository.save(subscription);
        }

        SessionCreateParams sessionParams = SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
            .setCustomer(customerId)
            .setSuccessUrl(successUrl)
            .setCancelUrl(cancelUrl)
            .addLineItem(
                SessionCreateParams.LineItem.builder()
                    .setPrice(priceId)
                    .setQuantity(1L)
                    .build()
            )
            .putMetadata("userId", userId.toString())
            .build();

        Session session = stripeClient.createCheckoutSession(sessionParams);
        return session.getUrl();
    }

    public void handleWebhook(String payload, String sigHeader) throws SignatureVerificationException, StripeException {
        Event event = stripeClient.constructEvent(payload, sigHeader, webhookSecret);

        if ("checkout.session.completed".equals(event.getType())) {
            Session session = (Session) event.getDataObjectDeserializer().getObject()
                .orElseThrow(() -> new IllegalArgumentException("Invalid webhook event data payload"));

            String customerId = session.getCustomer();
            String subscriptionId = session.getSubscription();

            if (customerId != null && subscriptionId != null) {
                com.stripe.model.Subscription stripeSub = stripeClient.retrieveSubscription(subscriptionId);
                Instant periodEnd = Instant.ofEpochSecond(stripeSub.getCurrentPeriodEnd());

                subscriptionRepository.findByStripeCustomerId(customerId).ifPresent(sub -> {
                    sub.setPlan(Plan.PRO);
                    sub.setStripeSubscriptionId(subscriptionId);
                    sub.setCurrentPeriodEnd(periodEnd);
                    sub.setExpiresAt(periodEnd);
                    sub.setCancelAtPeriodEnd(false);
                    subscriptionRepository.save(sub);
                });
            }
        } else if ("customer.subscription.updated".equals(event.getType())) {
            com.stripe.model.Subscription stripeSub = (com.stripe.model.Subscription) event.getDataObjectDeserializer().getObject()
                .orElseThrow(() -> new IllegalArgumentException("Invalid webhook event data payload"));

            String subscriptionId = stripeSub.getId();
            Instant periodEnd = Instant.ofEpochSecond(stripeSub.getCurrentPeriodEnd());
            boolean cancelAtEnd = stripeSub.getCancelAtPeriodEnd();

            subscriptionRepository.findByStripeSubscriptionId(subscriptionId).ifPresent(sub -> {
                sub.setCancelAtPeriodEnd(cancelAtEnd);
                sub.setCurrentPeriodEnd(periodEnd);
                sub.setExpiresAt(periodEnd);
                if ("active".equals(stripeSub.getStatus()) || "trialing".equals(stripeSub.getStatus())) {
                    sub.setPlan(Plan.PRO);
                } else {
                    sub.setPlan(Plan.FREE);
                }
                subscriptionRepository.save(sub);
            });
        } else if ("customer.subscription.deleted".equals(event.getType())) {
            com.stripe.model.Subscription stripeSub = (com.stripe.model.Subscription) event.getDataObjectDeserializer().getObject()
                .orElseThrow(() -> new IllegalArgumentException("Invalid webhook event data payload"));

            String subscriptionId = stripeSub.getId();
            subscriptionRepository.findByStripeSubscriptionId(subscriptionId).ifPresent(sub -> {
                sub.setPlan(Plan.FREE);
                sub.setStripeSubscriptionId(null);
                sub.setCancelAtPeriodEnd(false);
                sub.setCurrentPeriodEnd(null);
                sub.setExpiresAt(null);
                subscriptionRepository.save(sub);
            });
        }
    }

    public void cancelSubscription(UUID userId) throws StripeException {
        Subscription sub = subscriptionRepository.findByUserId(userId)
            .orElseThrow(() -> new IllegalArgumentException("No subscription found for user: " + userId));

        String subId = sub.getStripeSubscriptionId();
        if (subId == null || subId.trim().isEmpty()) {
            throw new IllegalArgumentException("No active Stripe subscription to cancel for user: " + userId);
        }

        SubscriptionUpdateParams params = SubscriptionUpdateParams.builder()
            .setCancelAtPeriodEnd(true)
            .build();
        stripeClient.updateSubscription(subId, params);
    }

    public void resumeSubscription(UUID userId) throws StripeException {
        Subscription sub = subscriptionRepository.findByUserId(userId)
            .orElseThrow(() -> new IllegalArgumentException("No subscription found for user: " + userId));

        String subId = sub.getStripeSubscriptionId();
        if (subId == null || subId.trim().isEmpty()) {
            throw new IllegalArgumentException("No active Stripe subscription to resume for user: " + userId);
        }

        SubscriptionUpdateParams params = SubscriptionUpdateParams.builder()
            .setCancelAtPeriodEnd(false)
            .build();
        stripeClient.updateSubscription(subId, params);
    }
}
