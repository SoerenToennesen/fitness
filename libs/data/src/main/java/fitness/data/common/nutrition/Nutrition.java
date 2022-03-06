package fitness.data.common.nutrition;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
public class Nutrition {
    private UUID id;
    private String description;
    private int calories;
    //private Macro macros;
    //private Micro micros;
    private LocalDate injestionTime;
    private NutritionType accountType;

    public enum NutritionType {
        BREAKFAST,
        LUNCH,
        DINNER,
        SNACK,
    }

    //TODO: Make this into a Macro class
    private int carbohydrates;
    private int fats;
    private int protein;

    //TODO: Make this into a Micro class
    private int calcium;
    private int folate;
    private int iron;
    private int vitaminB6;
    private int vitaminB12;
    private int vitaminC;
    private int vitaminD;
    private int zinc;

}