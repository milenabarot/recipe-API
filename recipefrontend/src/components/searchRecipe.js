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
          onKeyDown={props.onEnterSearchRecipe}
          onKeyUp={props.showRecipeListOnEmptySearchValue}
          ref={props.searchBarRef}
          placeholder="Find a Recipe..."
        />
        <button className="searchRecipe--button" onClick={props.searchRecipe}>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchRecipe;
