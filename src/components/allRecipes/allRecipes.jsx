import { useState, useEffect } from 'react'
import { Modal, Space, Button, App } from 'antd';
import './allRecipes.css'
import { NewRecipe } from '../newRecipe/newRecipe';

export function AllRecipes(props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false)
  let recipes = [...props.recipes]

  const handlerFavorite = (recipe, index) => {
    let tempRecipe = recipe
    tempRecipe.favorite = !recipe.favorite
    recipes[index] = tempRecipe
    props.setRecipes(recipes)
    const body = {
      "id": recipe.id,
      "favorite": recipe.favorite
    }
    fetch(
      "http://127.0.0.1:5000/favorite",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      })
    console.log(recipe, index);
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleSave = () => {
    setIsModalOpen(true)
    setIsModalOpenEdit(false)

  }

  const handleEdit = () => {
    setIsModalOpenEdit(true)
    setIsModalOpen(false)

  }
  const handleCancelEdit = () => {
    setIsModalOpen(true)
    setIsModalOpenEdit(false)

  }
  return (
    <>
      <h2>Todos los menús</h2>
      {
        props.recipes.map((recipe, index) => {
          return (
            <div>
              <div key={index} className="recipe-card">
                <p onClick={showModal} >{recipe.recipe_name}</p>
                <span className='favorite' onClick={() => handlerFavorite(recipe, index)}>{recipe.favorite ? "★" : "✩"}</span>
              </div>
              <Modal okText={"Cerrar"} cancelText={"Editar"} closable={false} open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => handleEdit(true)}>
                <h2>{recipe.recipe_name}</h2>
                <div>
                <h3>Ingredientes:</h3>
                  {
                    recipe.ingredients.map(ingredient => {
                      return(
                        <p>- {ingredient}</p>
                      )
                    })
                  }
                </div>
              </Modal>
              <Modal okText={"Guardar"} open={isModalOpenEdit} onOk={handleSave} onCancel={handleCancelEdit}>
                {/* <div className='title-new-recipe'>
                    <span onClick={() => setFavorite(!favorite)}>{favorite ? "★" : "✩"}</span>
                    <h2>{nameRecipe === "" ? "Nueva receta" : nameRecipe}</h2>
                </div>
                <input className='input-text-standard name-receta' type="text" placeholder='Nombre de la receta' onChange={(event) => setNameRecipe(event.target.value)} />
                <br></br>
                <label>Ingredientes:</label>
                {
                    ingredients.map((ingredient, index) => {
                        return (
                            <div key={index} >
                                <button className='btn-x-radius' onClick={() => removeIngredient(index)}>x</button>
                                <input placeholder='Nuevo ingrediente' className='input-text-standard' type="text" value={ingredients[index].ingredient} onChange={(event) => onChangeIngredients(event.target.value, index)}></input>
                            </div>
                        )
                    })
                }
                <button className='btn-agregar-ingrediente' onClick={() => addIngredient()}>+ Agregar ingrediente</button>
                {errorIngredients &&
                    <div className="error-create-recipe">
                        <button onClick={() => setErrorIngredients(false)}>X</button>
                        <p>{errorIngredients}</p>
                    </div>
                } */}
            </Modal>
            </div>
          )
        })
      }
    </>
  )
}