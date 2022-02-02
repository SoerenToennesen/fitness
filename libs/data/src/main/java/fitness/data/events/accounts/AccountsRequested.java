package fitness.data.events.accounts;

import fitness.messaging.BaseEvent;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
public class AccountsRequested extends BaseEvent {

    private static final String baseTopic = "ACCOUNTS_REQUEST";

    public static class AllAccountsRequested extends BaseEvent {
        public static String topic = baseTopic + "." + "ALL_ACCOUNTS";
        public AllAccountsRequested(UUID correlationId, boolean success, String responseMessage) {
            super(correlationId, success, responseMessage);
        }
    }

}
