import { useEffect, useState } from "react";
import { NewRecipe } from "./components/newRecipe/newRecioe";

function App() {
  const url = "http://127.0.0.1:5000";
  const getRecipes = () => fetch(
    url,
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => res.json());
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getRecipes().then((data) => setRecipes(data));
  }, []);

  const deleteRecipe = (id) => {
    let tmpRecipes = recipes.filter((recipe) => recipe.id !== id)
    setRecipes(tmpRecipes)
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
    <div className="App">
      <div>
        <NewRecipe recipes={recipes} setRecipes={setRecipes}></NewRecipe>
      </div>
      {
        recipes.map((recipe, index) => {
          return (
            <div key={index}>
              <button onClick={() => deleteRecipe(recipe.id)}>x</button>
              <div>{recipe.recipe_name}</div>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
