package fitness.exercises.db;

import fitness.data.common.exercise.Exercise;

import java.time.LocalDate;
import java.time.Month;
import java.util.*;
import java.util.stream.Collectors;

public class ExercisesDB {

    private Map<UUID, Exercise> exercises = new HashMap<UUID, Exercise>() {{
        put(UUID.fromString("df5e9d12-9f1b-11ec-b909-0242ac120002"), new Exercise(
            UUID.fromString("df5e9d12-9f1b-11ec-b909-0242ac120002"),
            "Relaxed evening stroll",
            "LocalDate.of(1885, Month.OCTOBER, 7)",
            "30 minutes",
            Exercise.ExerciseType.RUNNING
        ));
        put(UUID.fromString("e4d286d2-9f1b-11ec-b909-0242ac120002"), new Exercise(
            UUID.fromString("e4d286d2-9f1b-11ec-b909-0242ac120002"),
            "Competition",
            "LocalDate.of(1885, Month.OCTOBER, 7)",
            "10 minutes",
            Exercise.ExerciseType.SWIMMING
        ));
        put(UUID.fromString("ea8ae0b0-9f1b-11ec-b909-0242ac120002"), new Exercise(
            UUID.fromString("ea8ae0b0-9f1b-11ec-b909-0242ac120002"),
            "Solo",
            "LocalDate.of(1885, Month.OCTOBER, 7)",
            "2 hours",
            Exercise.ExerciseType.POWERLIFTING
        ));
        put(UUID.fromString("f0f93bcc-9f1b-11ec-b909-0242ac120002"), new Exercise(
            UUID.fromString("f0f93bcc-9f1b-11ec-b909-0242ac120002"),
            "Crossfit with friends",
            "LocalDate.of(1885, Month.OCTOBER, 7)",
            "1 hour",
            Exercise.ExerciseType.CROSSFIT
        ));

    }};

    public ExercisesDB() {}

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
