package fitness.messaging;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseEvent {
    private UUID correlationId;
    private boolean success;
    private String responseMessage;
}
