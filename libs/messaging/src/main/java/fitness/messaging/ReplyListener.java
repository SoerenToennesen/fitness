package fitness.messaging;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

// This class is inspired from the project made in the course
// 02267 Software Development of Web Services Jan 22
// at DTU (Technical University of Denmark)
public class ReplyListener {

    private final static Map<UUID, CompletableFuture<Event>> registrationResult = Collections.synchronizedMap(new HashMap<>());
    private final MessageQueue queue;

    public ReplyListener(MessageQueue queue, String... topics) {
        this.queue = queue;
        for (String topic : topics) {
            queue.addHandler(topic, event -> {
                var result = event.getArgument(0, BaseEvent.class);
                System.out.println("Reply waiter: " + registrationResult.get(result.getCorrelationId()));
                registrationResult.get(result.getCorrelationId()).complete(event);
            });
        }
    }

    public void registerWaiterForCorrelation(UUID correlationId) {
        var future = new CompletableFuture<Event>();
        registrationResult.put(correlationId, future);
    }

    public Event synchronouslyWaitForReply(UUID correlationId) {
        return registrationResult.get(correlationId).join();
    }

}
