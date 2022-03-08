package fitness.gateway.controllers;

import fitness.data.common.exercise.Exercise;
import fitness.data.events.exercises.ExercisesReplied;
import fitness.gateway.services.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(path = "exercise")
public class ExerciseController {

    private ExerciseService exerciseService;

    @Autowired
    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ExercisesReplied.CreateExerciseReplied createExercise(@RequestBody Exercise exercise) {
        return exerciseService.createExercise(exercise);
    }

    @GetMapping(produces = "application/json")
    public ExercisesReplied.AllExercisesReplied getExercises() {
        return exerciseService.getExercises();
    }

    @PutMapping(consumes = "application/json", produces = "application/json")
    public ExercisesReplied.UpdateExerciseReplied updateExercise(@RequestBody Exercise exercise) {
        return exerciseService.updateExercise(exercise);
    }

    @DeleteMapping(consumes = "application/json", produces = "application/json")
    public ExercisesReplied.DeleteExerciseReplied deleteExercise(@RequestBody String exerciseId) {
        return exerciseService.deleteExercise(UUID.fromString(exerciseId));
    }

}


