package fitness.data.events.exercises;

import fitness.data.common.exercise.Exercise;
import fitness.messaging.BaseEvent;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
public class ExercisesRequested extends BaseEvent {

    private static final String baseTopic = "EXERCISES_REQUEST";

    public static class AllExercisesRequested extends BaseEvent {
        public static String topic = baseTopic + "." + "GET_ALL";
        public AllExercisesRequested(UUID correlationId, boolean success, String responseMessage) {
            super(correlationId, success, responseMessage);
        }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class CreateExerciseRequested extends BaseEvent {
        public static String topic = baseTopic + "." + "CREATE";
        private Exercise exercise;
        public CreateExerciseRequested(UUID correlationId, boolean success, String responseMessage, Exercise exercise) {
            super(correlationId, success, responseMessage);
            this.exercise = exercise;
        }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class UpdateExerciseRequested extends BaseEvent {
        public static String topic = baseTopic + "." + "UPDATE";
        private Exercise exercise;
        public UpdateExerciseRequested(UUID correlationId, boolean success, String responseMessage, Exercise exercise) {
            super(correlationId, success, responseMessage);
            this.exercise = exercise;
        }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class DeleteExerciseRequested extends BaseEvent {
        public static String topic = baseTopic + "." + "DELETE";
        private UUID exerciseId;
        public DeleteExerciseRequested(UUID correlationId, boolean success, String responseMessage, UUID exerciseId) {
            super(correlationId, success, responseMessage);
            this.exerciseId = exerciseId;
        }
    }

}
