package fitness.data.events.exercises;

import fitness.data.common.exercise.Exercise;
import fitness.messaging.BaseEvent;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;
import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
public class ExercisesReplied extends BaseEvent {

    private static final String baseTopic = "EXERCISES_REPLY";

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class AllExercisesReplied extends BaseEvent {
        public static String topic = baseTopic + "." + "GET_ALL";
        private List<Exercise> exercises;
        public AllExercisesReplied(UUID correlationId, boolean success, String responseMessage, List<Exercise> exercises) {
            super(correlationId, success, responseMessage);
            this.exercises = exercises;
        }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class CreateExerciseReplied extends BaseEvent {
        public static String topic = baseTopic + "." + "CREATE";
        private UUID exerciseId;
        public CreateExerciseReplied(UUID correlationId, boolean success, String responseMessage, UUID exerciseId) {
            super(correlationId, success, responseMessage);
            this.exerciseId = exerciseId;
        }
    }

    public static class UpdateExerciseReplied extends BaseEvent {
        public static String topic = baseTopic + "." + "UPDATE";
        public UpdateExerciseReplied(UUID correlationId, boolean success, String responseMessage) {
            super(correlationId, success, responseMessage);
        }
    }

    public static class DeleteExerciseReplied extends BaseEvent {
        public static String topic = baseTopic + "." + "DELETE";
        public DeleteExerciseReplied(UUID correlationId, boolean success, String responseMessage) {
            super(correlationId, success, responseMessage);
        }
    }

}
