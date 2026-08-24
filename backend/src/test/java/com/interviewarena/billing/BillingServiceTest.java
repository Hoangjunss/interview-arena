package com.interviewarena.billing;

import com.interviewarena.subscription.Plan;
import com.interviewarena.subscription.Subscription;
import com.interviewarena.subscription.SubscriptionRepository;
import com.interviewarena.user.User;
import com.interviewarena.user.UserRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.SubscriptionUpdateParams;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BillingServiceTest {

    @Mock private SubscriptionRepository subscriptionRepository;
    @Mock private UserRepository userRepository;
    @Mock private StripeClientWrapper stripeClient;

    private BillingService billingService;

    @BeforeEach
    void setUp() {
        billingService = new BillingService(
            subscriptionRepository,
            userRepository,
            stripeClient,
            "price_123",
            "whsec_123",
            "http://success",
            "http://cancel"
        );
    }

    @Test
    void createCheckoutSession_createsCustomerAndSession() throws StripeException {
        UUID userId = UUID.randomUUID();
        User user = new User();
        user.setEmail("user@example.com");

        Subscription sub = new Subscription();
        sub.setUserId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(subscriptionRepository.findByUserId(userId)).thenReturn(Optional.of(sub));

        Customer mockCustomer = mock(Customer.class);
        when(mockCustomer.getId()).thenReturn("cus_123");
        when(stripeClient.createCustomer(any(CustomerCreateParams.class))).thenReturn(mockCustomer);

        Session mockSession = mock(Session.class);
        when(mockSession.getUrl()).thenReturn("https://stripe.checkout.url");
        when(stripeClient.createCheckoutSession(any(SessionCreateParams.class))).thenReturn(mockSession);

        String url = billingService.createCheckoutSession(userId);

        assertThat(url).isEqualTo("https://stripe.checkout.url");
        verify(stripeClient).createCustomer(any(CustomerCreateParams.class));
        verify(stripeClient).createCheckoutSession(any(SessionCreateParams.class));
        assertThat(sub.getStripeCustomerId()).isEqualTo("cus_123");
    }

    @Test
    void handleWebhook_checkoutSessionCompleted_activatesPro() throws StripeException {
        Event event = mock(Event.class);
        when(event.getType()).thenReturn("checkout.session.completed");
        when(stripeClient.constructEvent(anyString(), anyString(), anyString())).thenReturn(event);

        Session session = mock(Session.class);
        when(session.getCustomer()).thenReturn("cus_123");
        when(session.getSubscription()).thenReturn("sub_999");

        EventDataObjectDeserializer deserializer = mock(EventDataObjectDeserializer.class);
        when(event.getDataObjectDeserializer()).thenReturn(deserializer);
        when(deserializer.getObject()).thenReturn(Optional.of(session));

        com.stripe.model.Subscription stripeSub = mock(com.stripe.model.Subscription.class);
        when(stripeSub.getCurrentPeriodEnd()).thenReturn(1800000000L); // timestamp
        when(stripeClient.retrieveSubscription("sub_999")).thenReturn(stripeSub);

        Subscription dbSub = new Subscription();
        dbSub.setStripeCustomerId("cus_123");
        when(subscriptionRepository.findByStripeCustomerId("cus_123")).thenReturn(Optional.of(dbSub));

        billingService.handleWebhook("payload", "sig");

        assertThat(dbSub.getPlan()).isEqualTo(Plan.PRO);
        assertThat(dbSub.getStripeSubscriptionId()).isEqualTo("sub_999");
        assertThat(dbSub.getCurrentPeriodEnd()).isEqualTo(Instant.ofEpochSecond(1800000000L));
        verify(subscriptionRepository).save(dbSub);
    }

    @Test
    void handleWebhook_subscriptionUpdated_syncsCancellation() throws StripeException {
        Event event = mock(Event.class);
        when(event.getType()).thenReturn("customer.subscription.updated");
        when(stripeClient.constructEvent(anyString(), anyString(), anyString())).thenReturn(event);

        com.stripe.model.Subscription stripeSub = mock(com.stripe.model.Subscription.class);
        when(stripeSub.getId()).thenReturn("sub_999");
        when(stripeSub.getCurrentPeriodEnd()).thenReturn(1800000000L);
        when(stripeSub.getCancelAtPeriodEnd()).thenReturn(true);
        when(stripeSub.getStatus()).thenReturn("active");

        EventDataObjectDeserializer deserializer = mock(EventDataObjectDeserializer.class);
        when(event.getDataObjectDeserializer()).thenReturn(deserializer);
        when(deserializer.getObject()).thenReturn(Optional.of(stripeSub));

        Subscription dbSub = new Subscription();
        dbSub.setStripeSubscriptionId("sub_999");
        when(subscriptionRepository.findByStripeSubscriptionId("sub_999")).thenReturn(Optional.of(dbSub));

        billingService.handleWebhook("payload", "sig");

        assertThat(dbSub.isCancelAtPeriodEnd()).isTrue();
        assertThat(dbSub.getPlan()).isEqualTo(Plan.PRO);
        verify(subscriptionRepository).save(dbSub);
    }

    @Test
    void handleWebhook_subscriptionDeleted_demotesToFree() throws StripeException {
        Event event = mock(Event.class);
        when(event.getType()).thenReturn("customer.subscription.deleted");
        when(stripeClient.constructEvent(anyString(), anyString(), anyString())).thenReturn(event);

        com.stripe.model.Subscription stripeSub = mock(com.stripe.model.Subscription.class);
        when(stripeSub.getId()).thenReturn("sub_999");

        EventDataObjectDeserializer deserializer = mock(EventDataObjectDeserializer.class);
        when(event.getDataObjectDeserializer()).thenReturn(deserializer);
        when(deserializer.getObject()).thenReturn(Optional.of(stripeSub));

        Subscription dbSub = new Subscription();
        dbSub.setPlan(Plan.PRO);
        dbSub.setStripeSubscriptionId("sub_999");
        when(subscriptionRepository.findByStripeSubscriptionId("sub_999")).thenReturn(Optional.of(dbSub));

        billingService.handleWebhook("payload", "sig");

        assertThat(dbSub.getPlan()).isEqualTo(Plan.FREE);
        assertThat(dbSub.getStripeSubscriptionId()).isNull();
        assertThat(dbSub.getCurrentPeriodEnd()).isNull();
        verify(subscriptionRepository).save(dbSub);
    }

    @Test
    void cancelSubscription_sendsStripeRequest() throws StripeException {
        UUID userId = UUID.randomUUID();
        Subscription sub = new Subscription();
        sub.setUserId(userId);
        sub.setStripeSubscriptionId("sub_999");

        when(subscriptionRepository.findByUserId(userId)).thenReturn(Optional.of(sub));

        billingService.cancelSubscription(userId);

        ArgumentCaptor<SubscriptionUpdateParams> captor = ArgumentCaptor.forClass(SubscriptionUpdateParams.class);
        verify(stripeClient).updateSubscription(eq("sub_999"), captor.capture());
        assertThat(captor.getValue().getCancelAtPeriodEnd()).isTrue();
    }
}
