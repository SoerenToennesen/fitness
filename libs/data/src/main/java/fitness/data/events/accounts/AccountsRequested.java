package fitness.data.events.accounts;

import fitness.data.common.account.Account;
import fitness.messaging.BaseEvent;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
public class AccountsRequested extends BaseEvent {

    private static final String baseTopic = "ACCOUNTS_REQUEST";

    public static class AllAccountsRequested extends BaseEvent {
        public static String topic = baseTopic + "." + "GET_ALL";
        public AllAccountsRequested(UUID correlationId, boolean success, String responseMessage) {
            super(correlationId, success, responseMessage);
        }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class CreateAccountRequested extends BaseEvent {
        public static String topic = baseTopic + "." + "CREATE";
        private Account account;
        public CreateAccountRequested(UUID correlationId, boolean success, String responseMessage, Account account) {
            super(correlationId, success, responseMessage);
            this.account = account;
        }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class UpdateAccountRequested extends BaseEvent {
        public static String topic = baseTopic + "." + "UPDATE";
        private Account account;
        public UpdateAccountRequested(UUID correlationId, boolean success, String responseMessage, Account account) {
            super(correlationId, success, responseMessage);
            this.account = account;
        }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class DeleteAccountRequested extends BaseEvent {
        public static String topic = baseTopic + "." + "DELETE";
        private UUID accountId;
        public DeleteAccountRequested(UUID correlationId, boolean success, String responseMessage, UUID accountId) {
            super(correlationId, success, responseMessage);
            this.accountId = accountId;
        }
    }

}
