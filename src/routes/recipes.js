import { Router } from 'express';

import {findRecipe} from "../services/recipes.js";
const router = Router();

router.post('/recipes/search', async function(req, res) {
  try {
    const { category, search_text } = req.body;
    if(category == undefined && search_text == undefined) {
      res.status(400).json({ message: "Search options should nt be empty" });
    }

    res.status(200).json(await findRecipe(category, search_text));
    
    
  } catch (err) {
    if(err.status) {
      res.status(err.status).json({ message: err.message })
    } else {
      res.status(400).json({message: "Error performing recipe search: " + err.message });
    }
  }
})

export default router;