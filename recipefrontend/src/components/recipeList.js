import "../styles/recipeList.scss";
import _ from "lodash";
import RecipeItem from "../containers/recipeItem";

function RecipeList(props) {
  const sortedRecipeList = _.orderBy(props.recipeList, ["dateAdded"], ["desc"]);

  return (
    <ul className="recipeList">
      {sortedRecipeList.map((recipe, index) => {
        return (
          <RecipeItem
            recipe={recipe}
            key={recipe.id}
            index={index}
            getRecipeListData={props.getRecipeListData}
          />
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
