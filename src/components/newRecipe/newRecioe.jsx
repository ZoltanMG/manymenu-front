import { Button, Modal } from 'antd';
import { useState } from "react";


export function NewRecipe(props) {
    const [nameRecipe, setNameRecipe] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ingredients, setIngredients] = useState([{ "ingredient": "" }]);
    const [errorIngredients, setErrorIngredients] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        let ingredientToSend = ingredients.filter(ingredient => ingredient.ingredient !== "")
        ingredientToSend = ingredientToSend.map(ingredient => {
            return (ingredient.ingredient)
        })
        if (nameRecipe === "") {
            setErrorIngredients("Indique el nombre de la reseta")
        } else {
            const body = JSON.stringify({
                "recipe_name": nameRecipe,
                "ingredients": ingredientToSend
            })
            fetch(
                "http://127.0.0.1:5000/reseta",
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: body
                })
            let tempRecipes0 = [props.recipes]
            let tempRecipes = [...tempRecipes0]
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
            setErrorIngredients("Escribe un ingrediente antes de agragar un campo nuevo")
        } else {
            let temp = [...ingredients]
            temp.push({ "ingredient": "" })
            setIngredients(temp)
        }
    }

    const removeIngredient = (index) => {
        let temp = ingredients
        console.log(temp);
        temp = temp.filter((ingredient) => ingredient.ingredient !== temp[index].ingredient)
        console.log(temp);
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
                Agrear receta +
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <label>Nombre de la receta</label>
                <input type="text" onChange={(event) => setNameRecipe(event.target.value)}/>
                <br></br>
                <label>Ingredientes:</label>
                {
                    ingredients.map((ingredient, index) => {
                        return (
                            <div key={index}>
                                <input type="text" value={ingredients[index].ingredient} onChange={(event) => onChangeIngredients(event.target.value, index)}></input>
                                <button onClick={() => removeIngredient(index)}>x</button>
                            </div>
                        )
                    })
                }
                <button onClick={() => addIngredient()}>+ Agregar ingrediente</button>
                {errorIngredients &&
                    <div>
                        <button onClick={() => setErrorIngredients(false)}>x</button>
                        <p>{errorIngredients}</p>
                    </div>
                }
            </Modal>
        </>
    )
}