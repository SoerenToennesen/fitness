package fitness.data.common.exercise;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
public class Exercise {
    private UUID id;
    private int exerciseLength; // in minutes
    private int caloriesBurned;
    private String description;
    private ExerciseType exerciseType;
    private LocalDateTime exerciseTime;

    // TODO: Make this a class each, that have information about how much each exercise burns, etc.
    // Definitely don't have this an enum, as the applicatoin needs to allowed adding customized types
    public enum ExerciseType {
        RUNNING,
        BIKING,
        SWIMMING,
        POWERLIFTING,
        CROSSFIT
    }

}