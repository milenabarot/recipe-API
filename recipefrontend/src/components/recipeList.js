import "../styles/App.css";
import _ from "lodash";

function RecipeList(props) {
  const sortedRecipeList = _.orderBy(props.recipeList, ["dateAdded"], ["desc"]);

  return (
    <ul className="recipeList">
      {sortedRecipeList.map((recipe, index) => {
        return (
          <li key={index} className="recipe">
            <label htmlFor="recipeTitle"></label>
            <input
              type="text"
              id={recipe.id}
              name="recipeTitle"
              value={recipe.title}
              required
              onInput={props.changeOfRecipeTitle}
              onKeyDown={(event, id) =>
                props.onEnterGetUpdatedRecipeList(event, recipe.id)
              }
            ></input>
            <button
              id={recipe.id}
              onClick={(event) => props.getUpdatedRecipeList(event, recipe.id)}
            >
              Update Title
            </button>
            <p>{recipe.description}</p>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="recipe-image"
            ></img>
            <a href={recipe.url} target="_blank" rel="noreferrer">
              Link to recipe
            </a>
            <p>Date added: {new Date(recipe.dateAdded).toDateString()}</p>
            <button onClick={() => props.deleteRecipe(recipe.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default RecipeList;
