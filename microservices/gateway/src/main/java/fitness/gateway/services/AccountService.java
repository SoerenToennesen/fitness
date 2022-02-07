package fitness.gateway.services;

import fitness.data.common.Account;
import fitness.data.events.accounts.AccountsReplied;
import fitness.data.events.accounts.AccountsRequested;
import fitness.messaging.Event;
import fitness.messaging.MessageQueue;
import fitness.messaging.ReplyListener;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AccountService {

    private final MessageQueue messageQueue = new MessageQueue();
    private final ReplyListener replyListener = new ReplyListener(messageQueue,
            AccountsReplied.AllAccountsReplied.topic,
            AccountsReplied.CreateAccountReplied.topic,
            AccountsReplied.UpdateAccountReplied.topic
    );

    public AccountService() {}

    public AccountsReplied.AllAccountsReplied getAccounts() {
        final UUID correlationId = UUID.randomUUID();
        replyListener.registerWaiterForCorrelation(correlationId);
        messageQueue.publish(
                new Event(
                        AccountsRequested.AllAccountsRequested.topic,
                        new Object[]{
                                new AccountsRequested.AllAccountsRequested(
                                        correlationId,
                                        false,
                                        "Request initialized"
                                )
                        }
                )
        );
        var event = replyListener.synchronouslyWaitForReply(correlationId);
        return event.getArgument(0, AccountsReplied.AllAccountsReplied.class);
    }

    public AccountsReplied.CreateAccountReplied createAccount(Account account) {
        final UUID correlationId = UUID.randomUUID();
        replyListener.registerWaiterForCorrelation(correlationId);
        messageQueue.publish(
                new Event(
                        AccountsRequested.CreateAccountRequested.topic,
                        new Object[]{
                                new AccountsRequested.CreateAccountRequested(
                                        correlationId,
                                        false,
                                        "Request initialized",
                                        account
                                )
                        }
                )
        );
        var event = replyListener.synchronouslyWaitForReply(correlationId);
        return event.getArgument(0, AccountsReplied.CreateAccountReplied.class);
    }

    public AccountsReplied.UpdateAccountReplied updateAccount(Account account) {
        final UUID correlationId = UUID.randomUUID();
        replyListener.registerWaiterForCorrelation(correlationId);
        messageQueue.publish(
                new Event(
                        AccountsRequested.UpdateAccountRequested.topic,
                        new Object[]{
                                new AccountsRequested.UpdateAccountRequested(
                                        correlationId,
                                        false,
                                        "Request initialized",
                                        account
                                )
                        }
                )
        );
        var event = replyListener.synchronouslyWaitForReply(correlationId);
        return event.getArgument(0, AccountsReplied.UpdateAccountReplied.class);
    }
}