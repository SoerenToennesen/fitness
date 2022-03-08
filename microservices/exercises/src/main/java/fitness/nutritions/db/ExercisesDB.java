package fitness.exercises.db;

import fitness.data.common.exercise.Exercise;

import java.time.LocalDate;
import java.time.Month;
import java.util.*;
import java.util.stream.Collectors;

public class ExercisesDB {

    private Map<UUID, Exercise> exercises = new HashMap<UUID, Exercise>() {{
        put(UUID.fromString("1f3426cc-9c98-11ec-b909-0242ac120002"), new Exercise(
            UUID.fromString("1f3426cc-9c98-11ec-b909-0242ac120002"),
            "Oats with milk",
            300,
            "LocalDate.of(1885, Month.OCTOBER, 7)",
            Exercise.ExerciseType.BREAKFAST,
            150,
            30,
            50,
            10,
            9,
            6,
            3,
            4,
            6,
            2,
            10
        ));
        put(UUID.fromString("3f63bcdc-9c98-11ec-b909-0242ac120002"), new Exercise(
            UUID.fromString("3f63bcdc-9c98-11ec-b909-0242ac120002"),
            "Rugbrød with hummus",
            100,
            "LocalDate.of(1885, Month.OCTOBER, 7)",
            Exercise.ExerciseType.LUNCH,
            120,
            10,
            30,
            40,
            19,
            16,
            13,
            14,
            16,
            12,
            3
        ));
        put(UUID.fromString("1c08fb4c-9e61-11ec-b909-0242ac120002"), new Exercise(
            UUID.fromString("1c08fb4c-9e61-11ec-b909-0242ac120002"),
            "Pizza slice",
            450,
            "LocalDate.of(1885, Month.OCTOBER, 7)",
            Exercise.ExerciseType.LUNCH,
            200,
            50,
            20,
            3,
            4,
            3,
            5,
            2,
            4,
            9,
            3
        ));
        put(UUID.fromString("2507b54e-9e61-11ec-b909-0242ac120002"), new Exercise(
            UUID.fromString("2507b54e-9e61-11ec-b909-0242ac120002"),
            "Wraps",
            1000,
            "LocalDate.of(1885, Month.OCTOBER, 7)",
            Exercise.ExerciseType.DINNER,
            550,
            100,
            120,
            50,
            14,
            59,
            38,
            23,
            45,
            14,
            100
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
