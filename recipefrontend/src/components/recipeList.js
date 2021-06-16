import "../styles/recipeList.scss";
import _ from "lodash";

function RecipeList(props) {
  const sortedRecipeList = _.orderBy(props.recipeList, ["dateAdded"], ["desc"]);

  return (
    <ul className="recipeList">
      {sortedRecipeList.map((recipe, index) => {
        return (
          <li key={index} className="recipeList--item">
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
              className="recipeList--item-updateButton"
              onClick={(event) => props.getUpdatedRecipeList(event, recipe.id)}
            >
              Update Title
            </button>
            <p>{recipe.description}</p>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="recipeList--item-image"
            ></img>
            <a
              href={recipe.url}
              target="_blank"
              rel="noreferrer"
              className="recipeList--item-link"
            >
              Link to recipe
            </a>
            <p>Date added: {new Date(recipe.dateAdded).toDateString()}</p>
            <button
              onClick={() => props.deleteRecipe(recipe.id)}
              className="recipeList--item-deleteButton"
            >
              Delete Recipe
            </button>
          </li>
        );
      })}
      {!sortedRecipeList.length && props.searchValue && (
        <p>No results for {props.searchValue}</p>
      )}
      {!sortedRecipeList.length && <p>How about adding some recipes...</p>}
    </ul>
  );
}

export default RecipeList;
