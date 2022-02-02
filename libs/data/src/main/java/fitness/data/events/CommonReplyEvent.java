package fitness.data.events;

import fitness.messaging.BaseEvent;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
public abstract class CommonReplyEvent extends BaseEvent {

    public CommonReplyEvent(UUID correlationId, Boolean success, String responseMessage) {
        super(correlationId, success, responseMessage);
    }

}
