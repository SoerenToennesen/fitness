package fitness.data.events.nutritions;

import fitness.data.common.nutrition.Nutrition;
import fitness.messaging.BaseEvent;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;
import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
public class NutritionsReplied extends BaseEvent {

    private static final String baseTopic = "NUTRITIONS_REPLY";

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class AllNutritionsReplied extends BaseEvent {
        public static String topic = baseTopic + "." + "GET_ALL";
        private List<Nutrition> nutritions;
        public AllNutritionsReplied(UUID correlationId, boolean success, String responseMessage, List<Nutrition> nutritions) {
            super(correlationId, success, responseMessage);
            this.nutritions = nutritions;
        }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class CreateNutritionReplied extends BaseEvent {
        public static String topic = baseTopic + "." + "CREATE";
        private UUID nutritionId;
        public CreateNutritionReplied(UUID correlationId, boolean success, String responseMessage, UUID nutritionId) {
            super(correlationId, success, responseMessage);
            this.nutritionId = nutritionId;
        }
    }

    public static class UpdateNutritionReplied extends BaseEvent {
        public static String topic = baseTopic + "." + "UPDATE";
        public UpdateNutritionReplied(UUID correlationId, boolean success, String responseMessage) {
            super(correlationId, success, responseMessage);
        }
    }

    public static class DeleteNutritionReplied extends BaseEvent {
        public static String topic = baseTopic + "." + "DELETE";
        public DeleteNutritionReplied(UUID correlationId, boolean success, String responseMessage) {
            super(correlationId, success, responseMessage);
        }
    }

}
