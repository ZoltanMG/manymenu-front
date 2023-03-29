import { RecipeList } from "../recipeList/recipeList";

export function Home() {
    return(
        <>
            <p>Agregar receta +</p>
            <p>Lista de recetas:</p>
            <RecipeList />
        </>
    )
}