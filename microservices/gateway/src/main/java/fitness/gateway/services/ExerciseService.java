package fitness.gateway.services;

import fitness.data.common.exercise.Exercise;
import fitness.data.events.exercises.ExercisesReplied;
import fitness.data.events.exercises.ExercisesRequested;
import fitness.messaging.Event;
import fitness.messaging.MessageQueue;
import fitness.messaging.ReplyListener;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ExerciseService {

    private final MessageQueue messageQueue = new MessageQueue();
    private final ReplyListener replyListener = new ReplyListener(messageQueue,
            ExercisesReplied.AllExercisesReplied.topic,
            ExercisesReplied.CreateExerciseReplied.topic,
            ExercisesReplied.UpdateExerciseReplied.topic,
            ExercisesReplied.DeleteExerciseReplied.topic
    );

    public ExerciseService() {}

    public ExercisesReplied.AllExercisesReplied getExercises() {
        final UUID correlationId = UUID.randomUUID();
        replyListener.registerWaiterForCorrelation(correlationId);
        messageQueue.publish(
                new Event(
                        ExercisesRequested.AllExercisesRequested.topic,
                        new Object[]{
                                new ExercisesRequested.AllExercisesRequested(
                                        correlationId,
                                        false,
                                        "Request initialized"
                                )
                        }
                )
        );
        var event = replyListener.synchronouslyWaitForReply(correlationId);
        return event.getArgument(0, ExercisesReplied.AllExercisesReplied.class);
    }

    public ExercisesReplied.CreateExerciseReplied createExercise(Exercise exercise) {
        final UUID correlationId = UUID.randomUUID();
        replyListener.registerWaiterForCorrelation(correlationId);
        messageQueue.publish(
                new Event(
                        ExercisesRequested.CreateExerciseRequested.topic,
                        new Object[]{
                                new ExercisesRequested.CreateExerciseRequested(
                                        correlationId,
                                        false,
                                        "Request initialized",
                                        exercise
                                )
                        }
                )
        );
        var event = replyListener.synchronouslyWaitForReply(correlationId);
        return event.getArgument(0, ExercisesReplied.CreateExerciseReplied.class);
    }

    public ExercisesReplied.UpdateExerciseReplied updateExercise(Exercise exercise) {
        final UUID correlationId = UUID.randomUUID();
        replyListener.registerWaiterForCorrelation(correlationId);
        messageQueue.publish(
                new Event(
                        ExercisesRequested.UpdateExerciseRequested.topic,
                        new Object[]{
                                new ExercisesRequested.UpdateExerciseRequested(
                                        correlationId,
                                        false,
                                        "Request initialized",
                                        exercise
                                )
                        }
                )
        );
        var event = replyListener.synchronouslyWaitForReply(correlationId);
        return event.getArgument(0, ExercisesReplied.UpdateExerciseReplied.class);
    }

    public ExercisesReplied.DeleteExerciseReplied deleteExercise(UUID exerciseId) {
        final UUID correlationId = UUID.randomUUID();
        replyListener.registerWaiterForCorrelation(correlationId);
        messageQueue.publish(
                new Event(
                        ExercisesRequested.DeleteExerciseRequested.topic,
                        new Object[]{
                                new ExercisesRequested.DeleteExerciseRequested(
                                        correlationId,
                                        false,
                                        "Request initialized",
                                        exerciseId
                                )
                        }
                )
        );
        var event = replyListener.synchronouslyWaitForReply(correlationId);
        return event.getArgument(0, ExercisesReplied.DeleteExerciseReplied.class);
    }

}