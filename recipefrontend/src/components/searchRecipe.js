import "../styles/searchRecipe.scss";

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

export default SearchRecipe;
