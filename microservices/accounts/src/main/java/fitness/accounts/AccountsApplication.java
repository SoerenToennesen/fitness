package fitness.accounts;

import fitness.accounts.db.AccountsDB;
import fitness.data.common.account.Account;
import fitness.data.events.accounts.AccountsReplied;
import fitness.data.events.accounts.AccountsRequested;
import fitness.messaging.Event;
import fitness.messaging.MessageQueue;
import fitness.messaging.ReplyListener;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;
import java.util.UUID;

@SpringBootApplication
public class AccountsApplication {

	private final MessageQueue messageQueue = new MessageQueue();
	private final ReplyListener replyListener = new ReplyListener(messageQueue);
	private AccountsDB accountsDB = new AccountsDB();

	public AccountsApplication() {}

	public static void main(String[] args) {
		System.out.println("Account service running...");
		SpringApplication.run(AccountsApplication.class, args);
		AccountsApplication accountsApplication = new AccountsApplication();
		accountsApplication.handleQueuedMessages();
	}

	public void handleQueuedMessages() {
		messageQueue.addHandler(AccountsRequested.AllAccountsRequested.topic, this::handleAllAccountsRequest);
		messageQueue.addHandler(AccountsRequested.CreateAccountRequested.topic, this::handleCreateAccountRequest);
		messageQueue.addHandler(AccountsRequested.UpdateAccountRequested.topic, this::handleUpdateAccountRequest);
		messageQueue.addHandler(AccountsRequested.DeleteAccountRequested.topic, this::handleDeleteAccountRequest);
	}

	public void handleAllAccountsRequest(Event event) {
		final var allAccountsRequest = event.getArgument(0, AccountsRequested.AllAccountsRequested.class);
		List<Account> accounts = accountsDB.getAccounts();
		messageQueue.publish(new Event(
				AccountsReplied.AllAccountsReplied.topic,
				new Object[]{
					new AccountsReplied.AllAccountsReplied(
						allAccountsRequest.getCorrelationId(),
						true,
						"All accounts retrieved successfully",
						accounts
					)
				}
		));
	}

	public void handleCreateAccountRequest(Event event) {
		final var createAccountRequested = event.getArgument(0, AccountsRequested.CreateAccountRequested.class);
		UUID generatedAccountId = accountsDB.createAccount(createAccountRequested.getAccount());
		messageQueue.publish(new Event(
				AccountsReplied.CreateAccountReplied.topic,
				new Object[]{
						new AccountsReplied.CreateAccountReplied(
								createAccountRequested.getCorrelationId(),
								true,
								"Account created successfully",
								generatedAccountId
						)
				}
		));
	}

	public void handleUpdateAccountRequest(Event event) {
		final var updateAccountRequested = event.getArgument(0, AccountsRequested.UpdateAccountRequested.class);
		accountsDB.updateAccount(updateAccountRequested.getAccount());
		messageQueue.publish(new Event(
				AccountsReplied.UpdateAccountReplied.topic,
				new Object[]{
						new AccountsReplied.UpdateAccountReplied(
								updateAccountRequested.getCorrelationId(),
								true,
								"Account updated successfully"
						)
				}
		));
	}

	public void handleDeleteAccountRequest(Event event) {
		final var deleteAccountRequested = event.getArgument(0, AccountsRequested.DeleteAccountRequested.class);
		accountsDB.deleteAccount(deleteAccountRequested.getAccountId());
		messageQueue.publish(new Event(
				AccountsReplied.DeleteAccountReplied.topic,
				new Object[]{
						new AccountsReplied.DeleteAccountReplied(
								deleteAccountRequested.getCorrelationId(),
								true,
								"Account deleted successfully"
						)
				}
		));
	}

}
