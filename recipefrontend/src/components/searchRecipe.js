import "../styles/searchRecipe.scss";
import PropTypes from "prop-types";

function SearchRecipe(props) {
  return (
    <div className="searchRecipe">
      <div className="searchRecipe--inputWrap">
        <input
          type="text"
          className="searchRecipe--input"
          value={props.searchValue}
          onInput={props.updateSearchValueInput}
          onKeyUp={props.onKeyUpSearchRecipeInput}
          ref={props.searchBarRef}
          placeholder="Find a Recipe..."
        />
        <button
          type="search"
          className="searchRecipe--button"
          onClick={props.searchRecipe}
        >
          Search
        </button>
      </div>
    </div>
  );
}

SearchRecipe.propTypes = {
  searchValue: PropTypes.string,
  updateSearchValueInput: PropTypes.func,
  onKeyUpSearchRecipeInput: PropTypes.func,
  searchBarRef: PropTypes.object,
  searchRecipe: PropTypes.func,
};

SearchRecipe.defaultProps = {
  searchValue: "",
  updateSearchValueInput: () => {},
  onKeyUpSearchRecipeInput: () => {},
  searchBarRef: {},
  searchRecipe: () => {},
};

export default SearchRecipe;
