package com.interviewarena.billing;

import com.interviewarena.subscription.Plan;
import com.interviewarena.subscription.Subscription;
import com.interviewarena.subscription.SubscriptionRepository;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/billing")
public class BillingController {

    private final BillingService billingService;
    private final SubscriptionRepository subscriptionRepository;

    public BillingController(BillingService billingService, SubscriptionRepository subscriptionRepository) {
        this.billingService = billingService;
        this.subscriptionRepository = subscriptionRepository;
    }

    @PostMapping("/checkout-session")
    public ResponseEntity<CheckoutResponse> createCheckoutSession() {
        UUID userId = getUserId();
        try {
            String url = billingService.createCheckoutSession(userId);
            return ResponseEntity.ok(new CheckoutResponse(url));
        } catch (StripeException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(
        @RequestBody String payload,
        @RequestHeader("Stripe-Signature") String sigHeader
    ) {
        try {
            billingService.handleWebhook(payload, sigHeader);
            return ResponseEntity.ok("Success");
        } catch (SignatureVerificationException e) {
            return ResponseEntity.badRequest().body("Invalid signature");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error processing webhook: " + e.getMessage());
        }
    }

    @GetMapping("/subscription")
    public ResponseEntity<SubscriptionDto> getSubscription() {
        UUID userId = getUserId();
        Subscription sub = subscriptionRepository.findByUserId(userId)
            .orElseGet(() -> {
                Subscription newSub = new Subscription();
                newSub.setUserId(userId);
                newSub.setPlan(Plan.FREE);
                return subscriptionRepository.save(newSub);
            });

        return ResponseEntity.ok(new SubscriptionDto(
            sub.getPlan(),
            sub.getCurrentPeriodEnd(),
            sub.isCancelAtPeriodEnd()
        ));
    }

    @PostMapping("/cancel")
    public ResponseEntity<Void> cancelSubscription() {
        UUID userId = getUserId();
        try {
            billingService.cancelSubscription(userId);
            return ResponseEntity.ok().build();
        } catch (StripeException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/resume")
    public ResponseEntity<Void> resumeSubscription() {
        UUID userId = getUserId();
        try {
            billingService.resumeSubscription(userId);
            return ResponseEntity.ok().build();
        } catch (StripeException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    private UUID getUserId() {
        return UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
