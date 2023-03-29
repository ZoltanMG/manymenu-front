
export function RecipeCard(props) {
    const recipe = props.recipe;
    return (
        <article>
            <p>{recipe.recipe_name}</p>
            <span
                className='favorite'
                onClick={() => console.log("Click favorite")}
            >
                {recipe.favorite ? "★" : "✩"}
            </span>
        </article>
    )
}