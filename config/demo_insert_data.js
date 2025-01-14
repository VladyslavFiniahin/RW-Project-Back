import Recipe from '../src/models/Recipe.js';
import Category from '../src/models/Category.js';
import Cuisine from '../src/models/Cuisine.js';

const seedDatabase = async () => {
  try {
    // Example data to seed the Recipes table
    const recipes = [
      // Breakfast
      {
        title: 'Bruschetta',
        image_url: '/img/recipes/Bruschetta.jpg',
        cuisine_id: 1, // Breakfast
        category_id: 1, // Italian
      },
      {
        title: 'Focaccia',
        image_url: '/img/recipes/Focaccia.jpg',
        cuisine_id: 1, // Breakfast
        category_id: 1, // Italian
      },
      {
        title: 'Granola with Yogurt',
        image_url: '/img/recipes/Granola-with-Yogurt.jpg',
        cuisine_id: 1, // Breakfast
        category_id: 1, // Italian
      },
      {
        title: 'Cornetto',
        image_url: '/img/recipes/Cornetto.jpg',
        cuisine_id: 1, // Breakfast
        category_id: 1, // Italian
      },
      {
        title: 'Crostino',
        image_url: '/img/recipes/Crostino.jpg',
        cuisine_id: 1, // Breakfast
        category_id: 1, // Italian
      },
      {
        title: 'Fetta Bruschetta',
        image_url: '/img/recipes/Fetta-Bruschetta.jpg',
        cuisine_id: 1, // Breakfast
        category_id: 1, // Italian
      },

      // Main Dishes
      {
        title: 'Cannelloni',
        image_url: '/img/recipes/Cannelloni.jpg',
        cuisine_id: 2, // Main Courses
        category_id: 1, // Italian
      },
      {
        title: 'Pasta with Pesto',
        image_url: '/img/recipes/Pasta-with-Pesto.jpg',
        cuisine_id: 2, // Main Courses
        category_id: 1, // Italian
      },
      {
        title: 'Osso Buco',
        image_url: '/img/recipes/Osso-buco.jpg',
        cuisine_id: 2, // Main Courses
        category_id: 1, // Italian
      },
      {
        title: 'Lasagna',
        image_url: '/img/recipes/Lasagna-Bolognese.jpg',
        cuisine_id: 2, // Main Courses
        category_id: 1, // Italian
      },
      {
        title: 'Pasta Carbonara',
        image_url: '/img/recipes/Pasta-Carbonara.jpg',
        cuisine_id: 2, // Main Courses
        category_id: 1, // Italian
      },
      {
        title: 'Margherita Pizza',
        image_url: '/img/recipes/Margherita-Pizza.jpg',
        cuisine_id: 2, // Main Courses
        category_id: 1, // Italian
      },
      {
        title: 'Minestrone.jpg',
        image_url: '/img/recipes/Minestrone.jpg',
        cuisine_id: 2, // Main Courses
        category_id: 1, // Italian
      },

      // Starter
      {
        title: 'Arancini',
        image_url: '/img/recipes/Arancini.webp',
        cuisine_id: 3, // Snacks
        category_id: 1, // Italian
      },

      // Desserts
      {
        title: 'Cherry mousse dessert',
        image_url: '/img/recipes/Cherry-mousse-dessert.jpg',
        cuisine_id: 4, // Desserts
        category_id: 1, // Italian
      },
      {
        title: 'Gelato',
        image_url: '/img/recipes/Gelato.jpg',
        cuisine_id: 4, // Desserts
        category_id: 1, // Italian
      },
      {
        title: 'Tiramisu',
        image_url: '/img/recipes/Tiramisu.jpg',
        cuisine_id: 4, // Desserts
        category_id: 1, // Italian
      },
      {
        title: 'Panettone',
        image_url: '/img/recipes/Panettone.jpg',
        cuisine_id: 4, // Desserts
        category_id: 1, // Italian
      },
      {
        title: 'Yogurt Cake',
        image_url: '/img/recipes/Yogurt-Cake.jpg',
        cuisine_id: 4, // Desserts
        category_id: 1, // Italian
      },
      {
        title: 'Fruit Salad',
        image_url: '/img/recipes/Fruit-Salad.jpg',
        cuisine_id: 4, // Desserts
        category_id: 1, // Italian
      },

      // Salads
      {
        title: 'Caprese Salad',
        image_url: '/img/recipes/Caprese-Salad.jpg',
        cuisine_id: 5, // Salads
        category_id: 1, // Italian
      },

      // Vegan
      {
        title: 'Polenta',
        image_url: '/img/recipes/Polenta.jpg',
        cuisine_id: 2, // Vegan Dishes
        category_id: 1, // Italian
      },
      {
        title: 'Mushroom Risotto',
        image_url: '/img/recipes/Mushroom-risotto.jpg',
        cuisine_id: 6, // Vegan Dishes
        category_id: 1, // Italian
      },

      // Drinks
      {
        title: 'Cappuccino with Brioche',
        image_url: '/img/recipes/Cappuccino-with-Brioche.jpg',
        cuisine_id: 7, // Drinks
        category_id: 1, // Italian
      },
    ];

    // Loop through the recipes and insert them into the database
    for (const recipe of recipes) {
      await Recipe.create(recipe);
    }

    console.log('Database seeded successfully with recipes!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
};

// Execute the seeding function
seedDatabase();
