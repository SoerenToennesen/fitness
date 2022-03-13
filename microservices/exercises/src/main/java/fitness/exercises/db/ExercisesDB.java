package fitness.exercises.db;

import fitness.data.common.exercise.Exercise;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.util.*;
import java.util.stream.Collectors;

public class ExercisesDB {

    private LocalDate getRandomDate(Random random) {
        int randomYear = 2010 + random.nextInt(2021 - 2010 + 1);
        int randomMonth = 1 + random.nextInt(12 - 1 + 1);
        int randomDay = 1 + random.nextInt(randomMonth == 2 ? 28 : 30 - 1 + 1);
        return LocalDate.of(randomYear, randomMonth, randomDay);
    }

    private LocalTime getRandomTime(Random random) {
        int randomHour = 0 + random.nextInt(23 - 0 + 1);
        int randomMinute = 0 + random.nextInt(59 - 0 + 1);
        return LocalTime.of(randomHour, randomMinute, 0, 0);
    }

    private LocalDateTime getRandomLocalDateTime(Random random) {
        return LocalDateTime.of(getRandomDate(random), getRandomTime(random));
    }

    public static String generateString(Random random, String characters, int length) {
        char[] text = new char[length];
        for (int i = 0; i < length; i++) {
            text[i] = characters.charAt(random.nextInt(characters.length()));
        }
        return new String(text);
    }

    private <T extends Enum<?>> T randomExerciseType(Class<T> clazz, Random random) {
        int x = random.nextInt(clazz.getEnumConstants().length);
        return clazz.getEnumConstants()[x];
    }

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
                            generateString(random, "abcdefg ", random.nextInt(20 - 8 + 1) + 20),
                            getRandomLocalDateTime(random),
                            15 + random.nextInt(180 - 15 + 1),
                            50 + random.nextInt(1000 - 50 + 1),
                            randomExerciseType(Exercise.ExerciseType.class, random)
                    )
            );
        }
        int x = 0;
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
