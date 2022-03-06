package fitness.nutritions;

import fitness.data.common.nutrition.Nutrition;
import fitness.nutritions.db.NutritionsDB;
import fitness.data.common.Nutrition;
import fitness.data.events.nutritions.NutritionsReplied;
import fitness.data.events.nutritions.NutritionsRequested;
import fitness.messaging.Event;
import fitness.messaging.MessageQueue;
import fitness.messaging.ReplyListener;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;
import java.util.UUID;

@SpringBootApplication
public class NutritionsApplication {

	private final MessageQueue messageQueue = new MessageQueue();
	private final ReplyListener replyListener = new ReplyListener(messageQueue);
	private NutritionsDB nutritionsDB = new NutritionsDB();

	public NutritionsApplication() {}

	public static void main(String[] args) {
		System.out.println("Nutrition service running...");
		SpringApplication.run(NutritionsApplication.class, args);
		NutritionsApplication nutritionsApplication = new NutritionsApplication();
		nutritionsApplication.handleQueuedMessages();
	}

	public void handleQueuedMessages() {
		messageQueue.addHandler(NutritionsRequested.AllNutritionsRequested.topic, this::handleAllNutritionsRequest);
		messageQueue.addHandler(NutritionsRequested.CreateNutritionRequested.topic, this::handleCreateNutritionRequest);
		messageQueue.addHandler(NutritionsRequested.UpdateNutritionRequested.topic, this::handleUpdateNutritionRequest);
		messageQueue.addHandler(NutritionsRequested.DeleteNutritionRequested.topic, this::handleDeleteNutritionRequest);
	}

	public void handleAllNutritionsRequest(Event event) {
		final var allNutritionsRequest = event.getArgument(0, NutritionsRequested.AllNutritionsRequested.class);
		List<Nutrition> nutritions = nutritionsDB.getNutritions();
		messageQueue.publish(new Event(
				NutritionsReplied.AllNutritionsReplied.topic,
				new Object[]{
					new NutritionsReplied.AllNutritionsReplied(
						allNutritionsRequest.getCorrelationId(),
						true,
						"All nutritions retrieved successfully",
						nutritions
					)
				}
		));
	}

	public void handleCreateNutritionRequest(Event event) {
		final var createNutritionRequested = event.getArgument(0, NutritionsRequested.CreateNutritionRequested.class);
		UUID generatedNutritionId = nutritionsDB.createNutrition(createNutritionRequested.getNutrition());
		messageQueue.publish(new Event(
				NutritionsReplied.CreateNutritionReplied.topic,
				new Object[]{
						new NutritionsReplied.CreateNutritionReplied(
								createNutritionRequested.getCorrelationId(),
								true,
								"Nutrition created successfully",
								generatedNutritionId
						)
				}
		));
	}

	public void handleUpdateNutritionRequest(Event event) {
		final var updateNutritionRequested = event.getArgument(0, NutritionsRequested.UpdateNutritionRequested.class);
		nutritionsDB.updateNutrition(updateNutritionRequested.getNutrition());
		messageQueue.publish(new Event(
				NutritionsReplied.UpdateNutritionReplied.topic,
				new Object[]{
						new NutritionsReplied.UpdateNutritionReplied(
								updateNutritionRequested.getCorrelationId(),
								true,
								"Nutrition updated successfully"
						)
				}
		));
	}

	public void handleDeleteNutritionRequest(Event event) {
		final var deleteNutritionRequested = event.getArgument(0, NutritionsRequested.DeleteNutritionRequested.class);
		nutritionsDB.deleteNutrition(deleteNutritionRequested.getNutritionId());
		messageQueue.publish(new Event(
				NutritionsReplied.DeleteNutritionReplied.topic,
				new Object[]{
						new NutritionsReplied.DeleteNutritionReplied(
								deleteNutritionRequested.getCorrelationId(),
								true,
								"Nutrition deleted successfully"
						)
				}
		));
	}

}
