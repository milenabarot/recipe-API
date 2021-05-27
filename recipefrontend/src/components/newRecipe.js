import "../styles/newRecipe.scss";

function NewRecipe(props) {
  return (
    <div>
      <form className="addNewRecipe" onSubmit={props.newRecipeOnSubmit}>
        <label htmlFor="title"></label>
        <input
          type="text"
          id="title"
          name="title"
          value={props.newRecipe.title}
          placeholder="Recipe Title"
          required
          onChange={props.newRecipeInputChange}
        />
        <label htmlFor="description"></label>
        <input
          type="text"
          id="description"
          name="description"
          value={props.newRecipe.description}
          placeholder="Description"
          required
          onChange={props.newRecipeInputChange}
        />
        <label htmlFor="image"></label>
        <input
          type="text"
          id="image"
          name="image"
          value={props.newRecipe.image}
          placeholder="Image url"
          required
          onChange={props.newRecipeInputChange}
        />
        <label htmlFor="link"></label>
        <input
          type="text"
          id="newrecipeurl"
          name="url"
          value={props.newRecipe.url}
          placeholder="Link url"
          required
          onChange={props.newRecipeInputChange}
        />
        <button type="submit">Add a recipe</button>
      </form>
    </div>
  );
}
export default NewRecipe;
