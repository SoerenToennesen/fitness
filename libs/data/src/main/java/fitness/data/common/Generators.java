package fitness.data.common;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Random;

public class Generators {

    public static LocalDate getRandomDate(Random random) {
        int randomYear = 2010 + random.nextInt(2021 - 2010 + 1);
        int randomMonth = 1 + random.nextInt(12 - 1 + 1);
        int randomDay = 1 + random.nextInt(randomMonth == 2 ? 28 : 30 - 1 + 1);
        return LocalDate.of(randomYear, randomMonth, randomDay);
    }

    public static LocalTime getRandomTime(Random random) {
        int randomHour = 0 + random.nextInt(23 - 0 + 1);
        int randomMinute = 0 + random.nextInt(59 - 0 + 1);
        return LocalTime.of(randomHour, randomMinute, 0, 0);
    }

    public static LocalDateTime getRandomLocalDateTime(Random random) {
        return LocalDateTime.of(getRandomDate(random), getRandomTime(random));
    }

    public static String getRandomDescription(Random random, String characters, int length) {
        char[] text = new char[length];
        for (int i = 0; i < length; i++) {
            text[i] = characters.charAt(random.nextInt(characters.length()));
        }
        return new String(text);
    }

    public static <T extends Enum<?>> T getRandomEnum(Class<T> clazz, Random random) {
        int x = random.nextInt(clazz.getEnumConstants().length);
        return clazz.getEnumConstants()[x];
    }

}
