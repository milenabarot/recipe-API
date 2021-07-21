import "../styles/recipeList.scss";
import _ from "lodash";
import { ChevronRight, TrashCan } from "akar-icons";

function RecipeList(props) {
  const sortedRecipeList = _.orderBy(props.recipeList, ["dateAdded"], ["desc"]);

  return (
    <ul className="recipeList">
      {sortedRecipeList.map((recipe, index) => {
        return (
          <li key={index} className="recipeList--item">
            <div className="recipeList--item-titleWrap">
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
                className="recipeList--item-updateTextButton"
                onClick={() => props.getUpdatedRecipeList(recipe.id)}
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="recipeList--item-descriptionWrap">
              <input
                type="text"
                id={recipe.id}
                name="recipeDescription"
                value={recipe.description}
                required
                onInput={props.changeOfRecipeDescription}
              ></input>
              <button
                id={recipe.id}
                className="recipeList--item-updateTextButton"
                onClick={() => {
                  props.getUpdatedRecipeListWithNewDescription(recipe.id);
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>

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
              Link
            </a>
            <p>Added on: {new Date(recipe.dateAdded).toDateString()}</p>
            <button
              onClick={() => props.deleteRecipe(recipe.id)}
              className="recipeList--item-deleteButton"
            >
              <TrashCan size={20} />
            </button>
          </li>
        );
      })}
      {!sortedRecipeList.length && props.searchValue && (
        <p>No results for {props.searchValue}</p>
      )}
      {!sortedRecipeList.length &&
        !props.isRecipeListLoading &&
        !props.searchValue && <p>How about adding some recipes...</p>}
    </ul>
  );
}

export default RecipeList;
