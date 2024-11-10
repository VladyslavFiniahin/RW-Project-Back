// In models/index.js
import Recipe from './Recipe.js';
import Category from './Category.js';
import Tag from './Tag.js';

// Define associations after imports are complete
export function associateModels() {
  Category.hasMany(Recipe, { foreignKey: 'category_id' });
  Recipe.belongsTo(Category, { foreignKey: 'category_id' });

  Recipe.belongsToMany(Tag, { through: 'RecipeTags' });
  Tag.belongsToMany(Recipe, { through: 'RecipeTags' });
}

// Export models
export { Recipe, Category, Tag };

associateModels();