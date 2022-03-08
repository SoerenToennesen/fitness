package fitness.exercises;

import fitness.data.common.exercise.Exercise;
import fitness.exercises.db.ExercisesDB;
import fitness.data.events.exercises.ExercisesReplied;
import fitness.data.events.exercises.ExercisesRequested;
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
public class ExercisesApplication {

	private final MessageQueue messageQueue = new MessageQueue();
	private final ReplyListener replyListener = new ReplyListener(messageQueue);
	private ExercisesDB exercisesDB = new ExercisesDB();

	public ExercisesApplication() {}

	public static void main(String[] args) {
		System.out.println("Exercise service running...");
		SpringApplication.run(ExercisesApplication.class, args);
		ExercisesApplication exercisesApplication = new ExercisesApplication();
		exercisesApplication.handleQueuedMessages();
	}

	public void handleQueuedMessages() {
		messageQueue.addHandler(ExercisesRequested.AllExercisesRequested.topic, this::handleAllExercisesRequest);
		messageQueue.addHandler(ExercisesRequested.CreateExerciseRequested.topic, this::handleCreateExerciseRequest);
		messageQueue.addHandler(ExercisesRequested.UpdateExerciseRequested.topic, this::handleUpdateExerciseRequest);
		messageQueue.addHandler(ExercisesRequested.DeleteExerciseRequested.topic, this::handleDeleteExerciseRequest);
	}

	public void handleAllExercisesRequest(Event event) {
		final var allExercisesRequest = event.getArgument(0, ExercisesRequested.AllExercisesRequested.class);
		List<Exercise> exercises = exercisesDB.getExercises();
		messageQueue.publish(new Event(
				ExercisesReplied.AllExercisesReplied.topic,
				new Object[]{
					new ExercisesReplied.AllExercisesReplied(
						allExercisesRequest.getCorrelationId(),
						true,
						"All exercises retrieved successfully",
						exercises
					)
				}
		));
	}

	public void handleCreateExerciseRequest(Event event) {
		final var createExerciseRequested = event.getArgument(0, ExercisesRequested.CreateExerciseRequested.class);
		UUID generatedExerciseId = exercisesDB.createExercise(createExerciseRequested.getExercise());
		messageQueue.publish(new Event(
				ExercisesReplied.CreateExerciseReplied.topic,
				new Object[]{
						new ExercisesReplied.CreateExerciseReplied(
								createExerciseRequested.getCorrelationId(),
								true,
								"Exercise created successfully",
								generatedExerciseId
						)
				}
		));
	}

	public void handleUpdateExerciseRequest(Event event) {
		final var updateExerciseRequested = event.getArgument(0, ExercisesRequested.UpdateExerciseRequested.class);
		exercisesDB.updateExercise(updateExerciseRequested.getExercise());
		messageQueue.publish(new Event(
				ExercisesReplied.UpdateExerciseReplied.topic,
				new Object[]{
						new ExercisesReplied.UpdateExerciseReplied(
								updateExerciseRequested.getCorrelationId(),
								true,
								"Exercise updated successfully"
						)
				}
		));
	}

	public void handleDeleteExerciseRequest(Event event) {
		final var deleteExerciseRequested = event.getArgument(0, ExercisesRequested.DeleteExerciseRequested.class);
		exercisesDB.deleteExercise(deleteExerciseRequested.getExerciseId());
		messageQueue.publish(new Event(
				ExercisesReplied.DeleteExerciseReplied.topic,
				new Object[]{
						new ExercisesReplied.DeleteExerciseReplied(
								deleteExerciseRequested.getCorrelationId(),
								true,
								"Exercise deleted successfully"
						)
				}
		));
	}

}
