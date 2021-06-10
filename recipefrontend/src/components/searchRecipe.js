function SearchRecipe(props) {
  return (
    <div>
      <input
        type="text"
        className="searchValue"
        value={props.searchValue}
        onInput={props.updateSearchValueInput}
        onKeyDown={props.onEnterSearchRecipe}
        ref={props.searchBarRef}
      />
      <button className="searchValue--Button" onClick={props.searchRecipe}>
        Search
      </button>
    </div>
  );
}

export default SearchRecipe;
