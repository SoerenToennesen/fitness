package fitness.gateway.services;

import fitness.data.common.nutrition.Nutrition;
import fitness.data.events.nutritions.NutritionsReplied;
import fitness.data.events.nutritions.NutritionsRequested;
import fitness.messaging.Event;
import fitness.messaging.MessageQueue;
import fitness.messaging.ReplyListener;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class NutritionService {

    private final MessageQueue messageQueue = new MessageQueue();
    private final ReplyListener replyListener = new ReplyListener(messageQueue,
            NutritionsReplied.AllNutritionsReplied.topic,
            NutritionsReplied.CreateNutritionReplied.topic,
            NutritionsReplied.UpdateNutritionReplied.topic,
            NutritionsReplied.DeleteNutritionReplied.topic
    );

    public NutritionService() {}

    public NutritionsReplied.AllNutritionsReplied getNutritions() {
        final UUID correlationId = UUID.randomUUID();
        replyListener.registerWaiterForCorrelation(correlationId);
        messageQueue.publish(
                new Event(
                        NutritionsRequested.AllNutritionsRequested.topic,
                        new Object[]{
                                new NutritionsRequested.AllNutritionsRequested(
                                        correlationId,
                                        false,
                                        "Request initialized"
                                )
                        }
                )
        );
        var event = replyListener.synchronouslyWaitForReply(correlationId);
        return event.getArgument(0, NutritionsReplied.AllNutritionsReplied.class);
    }

    public NutritionsReplied.CreateNutritionReplied createNutrition(Nutrition nutrition) {
        final UUID correlationId = UUID.randomUUID();
        replyListener.registerWaiterForCorrelation(correlationId);
        messageQueue.publish(
                new Event(
                        NutritionsRequested.CreateNutritionRequested.topic,
                        new Object[]{
                                new NutritionsRequested.CreateNutritionRequested(
                                        correlationId,
                                        false,
                                        "Request initialized",
                                        nutrition
                                )
                        }
                )
        );
        var event = replyListener.synchronouslyWaitForReply(correlationId);
        return event.getArgument(0, NutritionsReplied.CreateNutritionReplied.class);
    }

    public NutritionsReplied.UpdateNutritionReplied updateNutrition(Nutrition nutrition) {
        final UUID correlationId = UUID.randomUUID();
        replyListener.registerWaiterForCorrelation(correlationId);
        messageQueue.publish(
                new Event(
                        NutritionsRequested.UpdateNutritionRequested.topic,
                        new Object[]{
                                new NutritionsRequested.UpdateNutritionRequested(
                                        correlationId,
                                        false,
                                        "Request initialized",
                                        nutrition
                                )
                        }
                )
        );
        var event = replyListener.synchronouslyWaitForReply(correlationId);
        return event.getArgument(0, NutritionsReplied.UpdateNutritionReplied.class);
    }

    public NutritionsReplied.DeleteNutritionReplied deleteNutrition(UUID nutritionId) {
        final UUID correlationId = UUID.randomUUID();
        replyListener.registerWaiterForCorrelation(correlationId);
        messageQueue.publish(
                new Event(
                        NutritionsRequested.DeleteNutritionRequested.topic,
                        new Object[]{
                                new NutritionsRequested.DeleteNutritionRequested(
                                        correlationId,
                                        false,
                                        "Request initialized",
                                        nutritionId
                                )
                        }
                )
        );
        var event = replyListener.synchronouslyWaitForReply(correlationId);
        return event.getArgument(0, NutritionsReplied.DeleteNutritionReplied.class);
    }

}