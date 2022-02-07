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
        public static String topic = baseTopic + "." + "GET_ALL";
        private List<Account> accounts;
        public AllAccountsReplied(UUID correlationId, boolean success, String responseMessage, List<Account> accounts) {
            super(correlationId, success, responseMessage);
            this.accounts = accounts;
        }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class CreateAccountReplied extends BaseEvent {
        public static String topic = baseTopic + "." + "CREATE";
        private UUID accountId;
        public CreateAccountReplied(UUID correlationId, boolean success, String responseMessage, UUID accountId) {
            super(correlationId, success, responseMessage);
            this.accountId = accountId;
        }
    }

    public static class UpdateAccountReplied extends BaseEvent {
        public static String topic = baseTopic + "." + "UPDATE";
        public UpdateAccountReplied(UUID correlationId, boolean success, String responseMessage) {
            super(correlationId, success, responseMessage);
        }
    }

}
