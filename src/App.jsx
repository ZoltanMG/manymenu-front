import { useEffect, useState } from "react";
import { NewRecipe } from "./components/newRecipe/newRecipe";
import { AllRecipes } from "./components/allRecipes/allRecipes";

function App() {
  const url = "http://127.0.0.1:5000";
  const getRecipes = () => fetch(
    url,
    {method: 'GET',headers: { "Content-Type": "application/json" }
    }).then((res) => res.json());
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getRecipes().then((data) => setRecipes(data));
  }, []);

  return (
    <div>
      <NewRecipe recipes={recipes} setRecipes={setRecipes} />
      <AllRecipes recipes={recipes} setRecipes={setRecipes}/>
    </div>
  );
}

export default App;
