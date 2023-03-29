import { RecipeCard } from "../recipeCard/recipeCard";
import { fetchToApi } from "../../assets/fetchs";
import { useEffect, useState } from "react";

export function RecipeList() {
    const [recipes, setRecipes] = useState()

    useEffect(() => {
        const request = {
            method: "GET",
            endpoint: "/",
        }
        fetchToApi(request).then(
            response => setRecipes(response)).catch(
                error => console.log('Error:', error));
    }, [])

    return (
        <section>
            {
                recipes !== undefined ?
                    recipes.map((recipe, index) => {
                        return (
                            <RecipeCard key={index} recipe={recipe} setRecipes={setRecipes} />
                        )
                    }) :
                    <span>Cargando...</span>
            }
        </section>
    )
}