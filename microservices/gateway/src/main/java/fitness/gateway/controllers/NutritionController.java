package fitness.gateway.controllers;

import fitness.data.common.nutrition.Nutrition;
import fitness.data.events.nutritions.NutritionsReplied;
import fitness.gateway.services.NutritionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping(path = "nutrition")
public class NutritionController {

    private NutritionService nutritionService;

    @Autowired
    public NutritionController(NutritionService nutritionService) {
        this.nutritionService = nutritionService;
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public NutritionsReplied.CreateNutritionReplied createNutrition(@RequestBody Nutrition nutrition) {
        return nutritionService.createNutrition(nutrition);
    }

    @GetMapping(produces = "application/json")
    public NutritionsReplied.AllNutritionsReplied getNutritions() {
        return nutritionService.getNutritions();
    }

    @PutMapping(consumes = "application/json", produces = "application/json")
    public NutritionsReplied.UpdateNutritionReplied updateNutrition(@RequestBody Nutrition nutrition) {
        return nutritionService.updateNutrition(nutrition);
    }

    @DeleteMapping(consumes = "application/json", produces = "application/json")
    public NutritionsReplied.DeleteNutritionReplied deleteNutrition(@RequestBody String nutritionId) {
        return nutritionService.deleteNutrition(UUID.fromString(nutritionId));
    }

}


