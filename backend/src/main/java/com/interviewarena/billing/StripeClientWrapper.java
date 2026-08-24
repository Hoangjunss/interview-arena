package com.interviewarena.billing;

import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.Subscription;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.SubscriptionUpdateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.stripe.model.Customer;
import com.stripe.param.CustomerCreateParams;

@Component
public class StripeClientWrapper {

    public StripeClientWrapper(@Value("${app.stripe.secret-key:}") String secretKey) {
        if (secretKey != null && !secretKey.trim().isEmpty()) {
            com.stripe.Stripe.apiKey = secretKey;
        }
    }

    public Customer createCustomer(CustomerCreateParams params) throws StripeException {
        return Customer.create(params);
    }

    public Session createCheckoutSession(SessionCreateParams params) throws StripeException {
        return Session.create(params);
    }

    public Subscription retrieveSubscription(String subscriptionId) throws StripeException {
        return Subscription.retrieve(subscriptionId);
    }

    public Subscription updateSubscription(String subscriptionId, SubscriptionUpdateParams params) throws StripeException {
        Subscription subscription = Subscription.retrieve(subscriptionId);
        return subscription.update(params);
    }

    public Event constructEvent(String payload, String sigHeader, String webhookSecret) throws SignatureVerificationException {
        return Webhook.constructEvent(payload, sigHeader, webhookSecret);
    }
}
