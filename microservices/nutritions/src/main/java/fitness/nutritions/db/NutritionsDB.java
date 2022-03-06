package fitness.nutritions.db;

import fitness.data.common.nutrition.Nutrition;

import java.time.LocalDate;
import java.time.Month;
import java.util.*;
import java.util.stream.Collectors;

public class NutritionsDB {

    private Map<UUID, Nutrition> nutritions = new HashMap<UUID, Nutrition>() {{
        put(UUID.fromString("1f3426cc-9c98-11ec-b909-0242ac120002"), new Nutrition(
            UUID.fromString("1f3426cc-9c98-11ec-b909-0242ac120002"),
            "Oats with milk",
            300,
            LocalDate.of(1885, Month.OCTOBER, 7),
            Nutrition.NutritionType.BREAKFAST,
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
        put(UUID.fromString("3f63bcdc-9c98-11ec-b909-0242ac120002"), new Nutrition(
            UUID.fromString("3f63bcdc-9c98-11ec-b909-0242ac120002"),
            "Rugbrød with hummus",
            100,
            LocalDate.of(1885, Month.OCTOBER, 7),
            Nutrition.NutritionType.LUNCH,
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
        put(UUID.fromString("3f63bcdc-9c98-11ec-b909-0242ac120002"), new Nutrition(
            UUID.fromString("3f63bcdc-9c98-11ec-b909-0242ac120002"),
            "Pizza slice",
            450,
            LocalDate.of(1885, Month.OCTOBER, 7),
            Nutrition.NutritionType.LUNCH,
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
        put(UUID.fromString("3f63bcdc-9c98-11ec-b909-0242ac120002"), new Nutrition(
            UUID.fromString("3f63bcdc-9c98-11ec-b909-0242ac120002"),
            "Wraps",
            1000,
            LocalDate.of(1885, Month.OCTOBER, 7),
            Nutrition.NutritionType.DINNER,
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

    public NutritionsDB() {}

    public List<Nutrition> getNutritions() {
        return nutritions.values().stream().collect(Collectors.toList());
    }

    public UUID createNutrition(Nutrition nutrition) {
        UUID uuid = UUID.randomUUID();
        nutrition.setId(uuid);
        nutritions.put(uuid, nutrition);
        return uuid;
    }

    public void updateNutrition(Nutrition nutrition) {
        nutritions.put(nutrition.getId(), nutrition);
    }

    public void deleteNutrition(UUID nutritionId) {
        nutritions.remove(nutritionId);
    }

}
