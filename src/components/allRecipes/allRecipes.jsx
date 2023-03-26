export function AllRecipes(props) {
    const deleteRecipe = (id) => {
        let tmpRecipes = props.recipes.filter((recipe) => recipe.id !== id)
        props.setRecipes(tmpRecipes)
        fetch(
          "http://127.0.0.1:5000/reseta",
          {
            method: 'DELETE',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "id": id
            })
          })
      }
    return (
        <>
            <h2>Todos los menús</h2>
            {
                props.recipes.map((recipe, index) => {
                    return (
                        <div key={index}>
                            <button onClick={() => deleteRecipe(recipe.id)}>x</button>
                            <div>{recipe.recipe_name}</div>
                        </div>
                    )
                })
            }
        </>
    )
}