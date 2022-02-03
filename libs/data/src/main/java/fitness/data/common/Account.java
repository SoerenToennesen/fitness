package fitness.data.common;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
public class Account {
    private UUID id;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private String email;
    private AccountType accountType;

    public enum AccountType {
        CLIENT,
        MANAGER,
        ADMIN,
    }
}
