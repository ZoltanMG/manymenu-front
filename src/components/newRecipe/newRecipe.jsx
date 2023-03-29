import { Button, Modal } from 'antd';
import { useState } from "react";
import './newRecipe.css'

export function NewRecipe(props) {
    const [ingredients, setIngredients] = useState([{ "ingredient": "" }]);
    const [errorIngredients, setErrorIngredients] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nameRecipe, setNameRecipe] = useState("");

    const showModal = () => setIsModalOpen(true)
    const handleOk = () => {
        let ingredientToSend = ingredients.filter(ingredient => ingredient.ingredient !== "")
        ingredientToSend = ingredientToSend.map(ingredient => {
            return (ingredient.ingredient)
        })
        if (nameRecipe === "") {
            setErrorIngredients("Indique el nombre de la reseta.")
        } else {
            const body = {
                "recipe_name": nameRecipe,
                "ingredients": ingredientToSend,
                "favorite": "false"
            }
            fetch(
                "http://127.0.0.1:5000/reseta",
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                })
            let tempRecipes = [...props.recipes]
            tempRecipes.push(body)
            props.setRecipes(tempRecipes)
            setIsModalOpen(false);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const addIngredient = () => {
        if (ingredients[ingredients.length - 1].ingredient === "") {
            setErrorIngredients("Escribe un ingrediente antes de agragar un nuevo campo.")
        } else {
            let temp = [...ingredients]
            temp.push({ "ingredient": "" })
            setIngredients(temp)
        }
    }

    const removeIngredient = (index) => {
        let temp = ingredients
        temp = temp.filter((ingredient) => ingredient.ingredient !== temp[index].ingredient)
        setIngredients(temp)
    }

    const onChangeIngredients = (value, index) => {
        let temp = [...ingredients]
        temp[index].ingredient = value
        setIngredients(temp)
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
               Agregar receta +
            </Button>
            <Modal title="Nueva receta" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <input className='input-text-standard name-receta' type="text" placeholder='Nombre de la receta' onChange={(event) => setNameRecipe(event.target.value)} />
                <br></br>
                <label>Ingredientes:</label>
                {
                    ingredients.map((ingredient, index) => {
                        return (
                            <div key={index} >
                                <button  className='btn-x-radius' onClick={() => removeIngredient(index)}>x</button>
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
                }
            </Modal>
        </>
    )
}