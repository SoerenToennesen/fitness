package fitness.accounts.db;

import fitness.data.common.Account;

import java.time.LocalDate;
import java.time.Month;
import java.util.*;
import java.util.stream.Collectors;

public class AccountsDB {

    private Map<UUID, Account> accounts = new HashMap<UUID, Account>() {{
        put(UUID.fromString("cdd3569e-8799-11ec-a8a3-0242ac120002"), new Account(
            UUID.fromString("cdd3569e-8799-11ec-a8a3-0242ac120002"),
            "Samuel",
            "L. Jackson",
            LocalDate.of(1948, Month.DECEMBER, 21),
            "samuel.l.jackson@businessinquries.com",
            Account.AccountType.CLIENT
        ));
        put(UUID.fromString("60f3208a-879a-11ec-a8a3-0242ac120002"), new Account(
            UUID.fromString("60f3208a-879a-11ec-a8a3-0242ac120002"),
            "Niels",
            "Bohr",
            LocalDate.of(1885, Month.OCTOBER, 7),
            "niels.bohr@businessinquries.com",
            Account.AccountType.CLIENT
        ));
        put(UUID.fromString("789d3036-879a-11ec-a8a3-0242ac120002"), new Account(
            UUID.fromString("789d3036-879a-11ec-a8a3-0242ac120002"),
            "Albert",
            "Einstein",
            LocalDate.of(1879, Month.MARCH, 14),
            "albert.einstein@businessinquries.com",
            Account.AccountType.CLIENT
        ));
        put(UUID.fromString("7c77d990-879a-11ec-a8a3-0242ac120002"), new Account(
            UUID.fromString("7c77d990-879a-11ec-a8a3-0242ac120002"),
            "Keanu",
            "Reeves",
            LocalDate.of(1964, Month.SEPTEMBER, 2),
            "keanu.reeves@businessinquries.com",
            Account.AccountType.MANAGER
        ));
        put(UUID.fromString("8078b51e-879a-11ec-a8a3-0242ac120002"), new Account(
            UUID.fromString("8078b51e-879a-11ec-a8a3-0242ac120002"),
            "Lars",
            "Ulrik",
            LocalDate.of(1963, Month.DECEMBER, 26),
            "lars.ulrik@businessinquries.com",
            Account.AccountType.MANAGER
        ));
        put(UUID.fromString("84943290-879a-11ec-a8a3-0242ac120002"), new Account(
            UUID.fromString("84943290-879a-11ec-a8a3-0242ac120002"),
            "Søren",
            "Tønnesen",
            LocalDate.of(1995, Month.DECEMBER, 26),
            "søren.tønnesen@businessinquries.com",
            Account.AccountType.ADMIN
        ));
    }};

    public AccountsDB() {}


    public List<Account> getAccounts() {
        return accounts.values().stream().collect(Collectors.toList());
    }

    public UUID createAccount(Account account) {
        UUID uuid = UUID.randomUUID();
        account.setId(uuid);
        accounts.put(uuid, account);
        return uuid;
    }

    public void updateAccount(Account account) {
        accounts.put(account.getId(), account);
    }

}
