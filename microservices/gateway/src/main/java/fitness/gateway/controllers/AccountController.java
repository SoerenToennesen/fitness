package fitness.gateway.controllers;

import fitness.data.common.Account;
import fitness.data.events.accounts.AccountsReplied;
import fitness.gateway.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "account")
public class AccountController {

    private AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public AccountsReplied.AllAccountsReplied getAccounts(Account account) {
        return accountService.getAccounts();
    }

}


