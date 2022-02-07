package fitness.gateway.controllers;

import fitness.data.common.Account;
import fitness.data.events.accounts.AccountsReplied;
import fitness.gateway.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "account")
public class AccountController {

    private AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PutMapping(consumes = "application/json", produces = "application/json")
    public AccountsReplied.UpdateAccountReplied updateAccount(@RequestBody Account account) {
        return accountService.updateAccount(account);
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public AccountsReplied.CreateAccountReplied createAccount(@RequestBody Account account) {
        return accountService.createAccount(account);
    }

    @GetMapping(produces = "application/json")
    public AccountsReplied.AllAccountsReplied getAccounts() {
        return accountService.getAccounts();
    }

}


