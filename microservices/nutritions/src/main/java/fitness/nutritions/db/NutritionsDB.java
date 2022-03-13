package fitness.nutritions.db;

import fitness.data.common.nutrition.Nutrition;

import java.util.*;
import java.util.stream.Collectors;

import static fitness.data.common.DataGenerators.*;

public class NutritionsDB {

    private Map<UUID, Nutrition> nutritions = new HashMap<>();

    public NutritionsDB() {
        // Generate some random data
        Random random = new Random();
        for (int i = 0; i < 100; i++) {
            UUID uuid = UUID.randomUUID();
            nutritions.put(
                    uuid,
                    new Nutrition(
                            uuid,
                            getRandomDescription(random, "abcdefg ", random.nextInt(20 - 8 + 1) + 20),
                            50 + random.nextInt(1000 - 50 + 1),
                            getRandomLocalDateTime(random),
                            getRandomEnum(Nutrition.NutritionType.class, random),
                            15 + random.nextInt(400 - 15 + 1),
                            10 + random.nextInt(100 - 10 + 1),
                            10 + random.nextInt(100 - 10 + 1),
                            5 + random.nextInt(20 - 5 + 1),
                            5 + random.nextInt(20 - 5 + 1),
                            5 + random.nextInt(20 - 5 + 1),
                            5 + random.nextInt(20 - 5 + 1),
                            5 + random.nextInt(20 - 5 + 1),
                            5 + random.nextInt(20 - 5 + 1),
                            5 + random.nextInt(20 - 5 + 1),
                            5 + random.nextInt(20 - 5 + 1)
                    )
            );
        }
    }

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
