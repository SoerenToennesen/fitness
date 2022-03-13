package fitness.exercises.db;

import fitness.data.common.exercise.Exercise;

import java.util.*;
import java.util.stream.Collectors;

import static fitness.data.common.DataGenerators.*;

public class ExercisesDB {

    private Map<UUID, Exercise> exercises = new HashMap<>();

    public ExercisesDB() {
        // Generate some random data
        Random random = new Random();
        for (int i = 0; i < 100; i++) {
            UUID uuid = UUID.randomUUID();
            exercises.put(
                    uuid,
                    new Exercise(
                            uuid,
                            getRandomDescription(random, "abcdefg ", random.nextInt(20 - 8 + 1) + 20),
                            getRandomLocalDateTime(random),
                            15 + random.nextInt(180 - 15 + 1),
                            50 + random.nextInt(1000 - 50 + 1),
                            getRandomEnum(Exercise.ExerciseType.class, random)
                    )
            );
        }
    }

    public List<Exercise> getExercises() {
        return exercises.values().stream().collect(Collectors.toList());
    }

    public UUID createExercise(Exercise exercise) {
        UUID uuid = UUID.randomUUID();
        exercise.setId(uuid);
        exercises.put(uuid, exercise);
        return uuid;
    }

    public void updateExercise(Exercise exercise) {
        exercises.put(exercise.getId(), exercise);
    }

    public void deleteExercise(UUID exerciseId) {
        exercises.remove(exerciseId);
    }

}
