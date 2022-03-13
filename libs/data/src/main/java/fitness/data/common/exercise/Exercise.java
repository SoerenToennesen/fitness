package fitness.data.common.exercise;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
public class Exercise {
    private UUID id;
    private String description;
    private LocalDateTime exerciseTime;
    private int exerciseLength; // in minutes
    private int caloriesBurned;
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