package fitness.data.events.nutritions;

import fitness.data.common.nutrition.Nutrition;
import fitness.messaging.BaseEvent;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
public class NutritionsRequested extends BaseEvent {

    private static final String baseTopic = "NUTRITIONS_REQUEST";

    public static class AllNutritionsRequested extends BaseEvent {
        public static String topic = baseTopic + "." + "GET_ALL";
        public AllNutritionsRequested(UUID correlationId, boolean success, String responseMessage) {
            super(correlationId, success, responseMessage);
        }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class CreateNutritionRequested extends BaseEvent {
        public static String topic = baseTopic + "." + "CREATE";
        private Nutrition nutrition;
        public CreateNutritionRequested(UUID correlationId, boolean success, String responseMessage, Nutrition nutrition) {
            super(correlationId, success, responseMessage);
            this.nutrition = nutrition;
        }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class UpdateNutritionRequested extends BaseEvent {
        public static String topic = baseTopic + "." + "UPDATE";
        private Nutrition nutrition;
        public UpdateNutritionRequested(UUID correlationId, boolean success, String responseMessage, Nutrition nutrition) {
            super(correlationId, success, responseMessage);
            this.nutrition = nutrition;
        }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class DeleteNutritionRequested extends BaseEvent {
        public static String topic = baseTopic + "." + "DELETE";
        private UUID nutritionId;
        public DeleteNutritionRequested(UUID correlationId, boolean success, String responseMessage, UUID nutritionId) {
            super(correlationId, success, responseMessage);
            this.nutritionId = nutritionId;
        }
    }

}
