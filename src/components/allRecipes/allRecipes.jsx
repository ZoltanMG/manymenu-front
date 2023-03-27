import { useState, useEffect } from 'react'
import './allRecipes.css'

export function AllRecipes(props) {
  let recipes = [...props.recipes]

  // const deleteRecipe = (id) => {
  //   let tmpRecipes = props.recipes.filter((recipe) => recipe.id !== id)
  //   props.setRecipes(tmpRecipes)
  //   fetch(
  //     "http://127.0.0.1:5000/reseta",
  //     {
  //       method: 'DELETE',
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         "id": id
  //       })
  //     })
  // }

  const handlerFavorite = (recipe, index) => {
    let tempRecipe = recipe
    tempRecipe.favorite = !recipe.favorite
    recipes[index] = tempRecipe
    props.setRecipes(recipes)
    console.log(recipe, index);
  }

  
  return (
    <>
      <h2>Todos los menús</h2>
      {
        props.recipes.map((recipe, index) => {
          return (
            <div key={index} className="recipe-card">
              <p>{recipe.recipe_name}</p>
              <span onClick={() => handlerFavorite(recipe, index) }>{recipe.favorite ? "★" : "✩"}</span>
            </div>
          )
        })
      }
    </>
  )
}