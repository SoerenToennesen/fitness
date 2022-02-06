package fitness.accounts;

import fitness.data.common.Account;
import fitness.data.events.accounts.AccountsReplied;
import fitness.data.events.accounts.AccountsRequested;
import fitness.messaging.Event;
import fitness.messaging.MessageQueue;
import fitness.messaging.ReplyListener;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;
import java.util.UUID;

@SpringBootApplication
public class AccountsApplication {

	private final MessageQueue messageQueue = new MessageQueue();
	private final ReplyListener replyListener = new ReplyListener(messageQueue);

	public AccountsApplication() {}

	public static void main(String[] args) {
		System.out.println("Account service running...");
		SpringApplication.run(AccountsApplication.class, args);
		AccountsApplication accountsApplication = new AccountsApplication();
		accountsApplication.handleQueuedMessages();
	}

	public void handleQueuedMessages() {
		messageQueue.addHandler(AccountsRequested.AllAccountsRequested.topic, this::handleAllAccountsRequest);
	}

	public void handleAllAccountsRequest(Event event) {
		final var allAccountsRequest = event.getArgument(0, AccountsRequested.AllAccountsRequested.class);
		List<Account> accounts = List.of(
				new Account(
						UUID.randomUUID(),
						"Samuel",
						"L. Jackson",
						LocalDate.of(1948, Month.DECEMBER, 21),
						"samuel.l.jackson@businessinquries.com",
						Account.AccountType.CLIENT
				),
				new Account(
						UUID.randomUUID(),
						"Niels",
						"Bohr",
						LocalDate.of(1885, Month.OCTOBER, 7),
						"niels.bohr@businessinquries.com",
						Account.AccountType.CLIENT
				),
				new Account(
						UUID.randomUUID(),
						"Albert",
						"Einstein",
						LocalDate.of(1879, Month.MARCH, 14),
						"albert.einstein@businessinquries.com",
						Account.AccountType.CLIENT
				),
				new Account(
						UUID.randomUUID(),
						"Keanu",
						"Reeves",
						LocalDate.of(1964, Month.SEPTEMBER, 2),
						"keanu.reeves@businessinquries.com",
						Account.AccountType.MANAGER
				),
				new Account(
						UUID.randomUUID(),
						"Lars",
						"Ulrik",
						LocalDate.of(1963, Month.DECEMBER, 26),
						"lars.ulrik@businessinquries.com",
						Account.AccountType.MANAGER
				),
				new Account(
						UUID.randomUUID(),
						"Søren",
						"Tønnesen",
						LocalDate.of(1995, Month.DECEMBER, 26),
						"søren.tønnesen@businessinquries.com",
						Account.AccountType.ADMIN
				)
		);
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

}
