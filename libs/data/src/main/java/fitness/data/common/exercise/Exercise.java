package fitness.data.common.exercise;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class Exercise {
    private UUID id;
    private String description;
    //TODO: Figure out how to change below to LocalDate and deserialize it with RabbitMQ
    private String exerciseTime;
    private String exerciseLength;
    private ExerciseType exerciseType;

    // Make this a class each, that have information about how much each exercise burns, etc.
    public enum ExerciseType {
        RUNNING,
        BIKING,
        SWIMMING,
        POWERLIFTING,
        CROSSFIT
    }

}