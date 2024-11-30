import { sequelize } from './dbConfig.js'; // Adjust the path as necessary
import bcrypt from "bcrypt";
import User from '../src/models/User.js';
import Ingredient from '../src/models/Ingredient.js';
import Recipe from '../src/models/Recipe.js';
import RecipeIngredient from '../src/models/RecipeIngredient.js';
import RecipeStep from '../src/models/RecipeStep.js';
import UserSavedRecipe from '../src/models/UserSavedRecipe.js';
import Preference from '../src/models/Preference.js';
import Review from '../src/models/Review.js';
import ActivityHistory from '../src/models/ActivityHistory.js';
import Tag from '../src/models/Tag.js';
import Category from '../src/models/Category.js';

let testingPassword = bcrypt("veryStrongPassword", 10);

const seedDatabase = async () => {
  try {
    await sequelize.sync(); // This will drop the tables if they exist and create new ones

    // Insert Categories and fetch IDs dynamically
    const categories = await Category.bulkCreate([
      { name: 'Main Course' },
      { name: 'Salad' },
      { name: 'Dessert' },
      { name: 'Side Dish' },
      { name: 'Beverage' },
      { name: 'Snack' },
      { name: 'Appetizer' },
      { name: 'Breakfast' },
      { name: 'Lunch' },
      { name: 'Dinner' },
      { name: 'Healthy' },
    ]);

    // Create a map of category names to their respective IDs
    const categoryIds = categories.reduce((acc, category) => {
      acc[category.name] = category.category_id; // Adjust if your category ID field is different
      return acc;
    }, {});

    // Insert Ingredients
    const ingredients = await Ingredient.bulkCreate([
      { name: 'Chicken Breast', category: 'Meat', nutritional_value: 165 },
      { name: 'Broccoli', category: 'Vegetable', nutritional_value: 55 },
      { name: 'Olive Oil', category: 'Fat', nutritional_value: 884 },
      { name: 'Rice', category: 'Grain', nutritional_value: 130 },
      { name: 'Garlic', category: 'Herb', nutritional_value: 149 },
    ]);

    // Insert Recipes using dynamically fetched category IDs
    const recipes = await Recipe.bulkCreate([
      { title: 'Grilled Chicken', description: 'Delicious grilled chicken with herbs.', cuisine_type: 'American', category_id: categoryIds['Main Course'], preparation_time: 15, cooking_time: 30, total_time: 45, difficulty: 'Easy', servings: 4 },
      { title: 'Broccoli Salad', description: 'Fresh broccoli salad with olive oil dressing.', cuisine_type: 'Mediterranean', category_id: categoryIds['Salad'], preparation_time: 10, cooking_time: 5, total_time: 15, difficulty: 'Easy', servings: 2 },
      { title: 'Garlic Rice', description: 'Fluffy rice infused with garlic flavor.', cuisine_type: 'Asian', category_id: categoryIds['Side Dish'], preparation_time: 5, cooking_time: 15, total_time: 20, difficulty: 'Easy', servings: 4 },
    ]);

    // Insert Recipe Ingredients
    await RecipeIngredient.bulkCreate([
      { recipe_id: recipes[0].recipe_id, ingredient_id: ingredients[0].ingredient_id, quantity: 2, unit: 'pieces' },  // Grilled Chicken
      { recipe_id: recipes[0].recipe_id, ingredient_id: ingredients[3].ingredient_id, quantity: 1, unit: 'cup' },      // Rice
      { recipe_id: recipes[1].recipe_id, ingredient_id: ingredients[1].ingredient_id, quantity: 1, unit: 'head' },     // Broccoli Salad
      { recipe_id: recipes[1].recipe_id, ingredient_id: ingredients[2].ingredient_id, quantity: 2, unit: 'tablespoons' }, // Olive Oil
      { recipe_id: recipes[2].recipe_id, ingredient_id: ingredients[3].ingredient_id, quantity: 1, unit: 'cup' },      // Garlic Rice
      { recipe_id: recipes[2].recipe_id, ingredient_id: ingredients[4].ingredient_id, quantity: 3, unit: 'cloves' },    // Garlic
    ]);

    // Insert Recipe Steps
    await RecipeStep.bulkCreate([
      { recipe_id: recipes[0].recipe_id, step_number: 1, description: 'Marinate chicken with herbs and spices.' },
      { recipe_id: recipes[0].recipe_id, step_number: 2, description: 'Grill the chicken on medium heat until cooked through.' },
      { recipe_id: recipes[1].recipe_id, step_number: 1, description: 'Chop broccoli and mix with olive oil.' },
      { recipe_id: recipes[1].recipe_id, step_number: 2, description: 'Serve chilled.' },
      { recipe_id: recipes[2].recipe_id, step_number: 1, description: 'Cook rice according to package instructions.' },
      { recipe_id: recipes[2].recipe_id, step_number: 2, description: 'Saute garlic in olive oil and mix with rice.' },
    ]);

    // Insert Users
    const users = await User.bulkCreate([
      { username: 'john_doe', email: 'john@example.com', password: testingPassword, avatar: 'avatar1.png', bio: 'Food lover and home cook.' },
      { username: 'jane_smith', email: 'jane@example.com', password: testingPassword, avatar: 'avatar2.png', bio: 'Professional chef.' },
      { username: 'alice_jones', email: 'alice@example.com', password: testingPassword, avatar: 'avatar3.png', bio: 'Culinary student.' },
    ]);

    // Insert User Saved Recipes
    await UserSavedRecipe.bulkCreate([
      { user_id: users[0].user_id, recipe_id: recipes[0].recipe_id }, // John saved Grilled Chicken
      { user_id: users[0].user_id, recipe_id: recipes[2].recipe_id }, // John saved Garlic Rice
      { user_id: users[1].user_id, recipe_id: recipes[1].recipe_id }, // Jane saved Broccoli Salad
      { user_id: users[2].user_id, recipe_id: recipes[0].recipe_id }, // Alice saved Grilled Chicken
    ]);

    // Insert Preferences
    await Preference.bulkCreate([
      { user_id: users[0].user_id, favorite_category: 'Main Course', favorite_ingredient: 'Chicken', disliked_ingredient: 'Fish' },
      { user_id: users[1].user_id, favorite_category: 'Salad', favorite_ingredient: 'Broccoli', disliked_ingredient: 'Onion' },
      { user_id: users[2].user_id, favorite_category: 'Dessert', favorite_ingredient: 'Chocolate', disliked_ingredient: 'Spicy Foods' },
    ]);

    // Insert Reviews
    await Review.bulkCreate([
      { recipe_id: recipes[0].recipe_id, user_id: users[0].user_id, rating: 5, comment: 'Absolutely delicious! Will make again.', review_date: new Date() },
      { recipe_id: recipes[1].recipe_id, user_id: users[1].user_id, rating: 4, comment: 'Tasty and refreshing salad.', review_date: new Date() },
      { recipe_id: recipes[2].recipe_id, user_id: users[2].user_id, rating: 3, comment: 'Rice was good but a bit bland.', review_date: new Date() },
    ]);

    // Insert Activity History
    await ActivityHistory.bulkCreate([
      { user_id: users[0].user_id, recipe_id: recipes[0].recipe_id, search_query: 'chicken recipes' },
      { user_id: users[0].user_id, recipe_id: recipes[1].recipe_id, search_query: 'salad recipes' },
      { user_id: users[1].user_id, recipe_id: recipes[2].recipe_id, search_query: 'quick recipes' },
      { user_id: users[2].user_id, search_query: 'healthy recipes' }, // User 3 searched without a specific recipe
    ]);

    // Insert Tags
    await Tag.bulkCreate([
      { recipe_id: recipes[0].recipe_id, tag: 'Grilled' },
      { recipe_id: recipes[0].recipe_id, tag: 'Chicken' },
      { recipe_id: recipes[1].recipe_id, tag: 'Vegetarian' },
      { recipe_id: recipes[1].recipe_id, tag: 'Salad' },
      { recipe_id: recipes[2].recipe_id, tag: 'Easy' },
      { recipe_id: recipes[2].recipe_id, tag: 'Rice' },
    ]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close(); // Close the connection when done
  }
};


seedDatabase();
