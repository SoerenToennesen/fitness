package fitness.data.events.accounts;

import fitness.data.common.Account;
import fitness.messaging.BaseEvent;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;
import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
public class AccountsReplied extends BaseEvent {

    private static final String baseTopic = "ACCOUNTS_REPLY";

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class AllAccountsReplied extends BaseEvent {
        public static String topic = baseTopic + "." + "ALL_ACCOUNTS";
        private List<Account> accounts;
        public AllAccountsReplied(UUID correlationId, boolean success, String responseMessage) {
            super(correlationId, success, responseMessage);
        }
    }

}
