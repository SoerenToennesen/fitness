package fitness.data.common.nutrition;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
public class Nutrition {
    private UUID id;
    private String description;
    private int calories;
    //private Macro macros;
    //private Micro micros;
    private LocalDateTime injestionTime;
    private NutritionType nutritionType;
    
    public enum NutritionType {
        BREAKFAST,
        LUNCH,
        DINNER,
        SNACK,
    }

    //TODO: Make this into a Macro class
    private int carbohydrates;
    private int fats;
    private int proteins;

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