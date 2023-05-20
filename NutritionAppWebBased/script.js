document.addEventListener("DOMContentLoaded", function() {
    var calculateButton = document.getElementById("calculate");
    calculateButton.addEventListener("click", calculateCalories);
  });
  
  function calculateCalories() {
    var heightInput = document.getElementById("height");
    var weightInput = document.getElementById("weight");
    var ageInput = document.getElementById("age");
    var sexInput = document.getElementById("sex");
    var activityLevelInput = document.getElementById("activity-level");
    var goalInput = document.getElementById("goal");
  
    var height = parseFloat(heightInput.value);
    var weight = parseFloat(weightInput.value);
    var age = parseInt(ageInput.value);
    var sex = sexInput.value;
    var activityLevel = activityLevelInput.value;
    var goal = goalInput.value;
  
    if (isNaN(height) || isNaN(weight) || isNaN(age)) {
      alert("Please enter valid numeric values for height, weight, and age.");
      return;
    }
  
    var maintenanceCalories = calculateMaintenanceCalories(height, weight, age, sex, activityLevel);
    var goalCalories = maintenanceCalories;
  
    if (goal === "lose-weight") {
      goalCalories = maintenanceCalories - 500;
    } else if (goal === "gain-weight") {
      goalCalories = maintenanceCalories + 500;
    }
  
    var maintenanceCaloriesElement = document.getElementById("maintenance-calories");
    maintenanceCaloriesElement.textContent = "Maintenance Calories: " + maintenanceCalories;
  
    var goalCaloriesElement = document.getElementById("goal-calories");
    goalCaloriesElement.textContent = goal.charAt(0).toUpperCase() + goal.slice(1) + " Calories: " + goalCalories;
  }
  
  function calculateMaintenanceCalories(height, weight, age, sex, activityLevel) {
    var bmr;
    // Revised Harris-Benedict BMR Equation
    if (sex === "male") {
      bmr = (88.4 + (13.4 * weight)) + (4.8 * height) - (5.68 * age);
    } else {
      bmr = (447.6 + 9.25 * weight) + (3.10 * height) - (4.33 * age);
    }
  
    var activityMultiplier;
  
    if (activityLevel === "sedentary") {
      activityMultiplier = 1.2;
    } else if (activityLevel === "lightly-active") {
      activityMultiplier = 1.375;
    } else if (activityLevel === "moderately-active") {
      activityMultiplier = 1.55;
    } else if (activityLevel === "very-active") {
      activityMultiplier = 1.725;
    } else if (activityLevel === "extremely-active") {
      activityMultiplier = 1.9;
    }
  
    var maintenanceCalories = bmr * activityMultiplier;
    return maintenanceCalories;
  }
  