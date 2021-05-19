import "./App.css";
import createReactClass from "create-react-class";
import axios from "axios";

const App = createReactClass({
  getInitialState() {
    return {
      searchValue: "",
      recipeList: [],
      newRecipe: {
        title: "",
        description: "",
        image: "",
        url: "",
        dateAdded: new Date(),
      },
    };
  },

  newRecipeInputChange(event) {
    this.setState({
      newRecipe: {
        ...this.state.newRecipe,
        [event.target.name]: event.target.value,
      },
    });
  },

  componentDidMount() {
    axios
      .get("http://localhost:3000/posts")

      .then((response) => {
        console.log(response);

        const recipes = response.data.map((recipeData) => {
          const title = recipeData.title;
          const description = recipeData.description;
          const image = recipeData.image;
          const urlLink = recipeData.url;
          const dateAdded = recipeData.dateAdded;
          const dateAddedFormatted = new Date(dateAdded).toDateString();
          return {
            title: title,
            description: description,
            image: image,
            url: urlLink,
            dateAdded: dateAddedFormatted,
          };
        });
        this.setState({
          recipeList: recipes,
        });
        console.log(this.state.recipeList);
      })
      .catch((error) => {
        console.error(error);
      });
  },

  newRecipeOnSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3000/posts", this.state.newRecipe)
      .then((response) => {
        let { recipeList } = this.state;
        recipeList.push(response.data);
        console.log(response.data);
        this.setState({
          recipeList,
          newRecipe: {
            title: "",
            description: "",
            image: "",
            url: "",
            dateAdded: new Date(),
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  },

  render() {
    return (
      <div className="App">
        <input
          type="text"
          className="searchValue"
          value={this.state.searchValue}
          onInput={(event) => {
            this.setState({ searchValue: event.target.value });
          }}
        />
        <button className="searchButton">Search</button>
        <form className="addNewRecipe" onSubmit={this.newRecipeOnSubmit}>
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            name="title"
            value={this.state.newRecipe.title}
            placeholder="title"
            required
            onChange={this.newRecipeInputChange}
          />
          <label htmlFor="description"></label>
          <input
            type="text"
            id="description"
            name="description"
            value={this.state.newRecipe.description}
            placeholder="description"
            required
            onChange={this.newRecipeInputChange}
          />
          <label htmlFor="image"></label>
          <input
            type="text"
            id="picture"
            name="image"
            value={this.state.newRecipe.image}
            placeholder="picture url"
            required
            onChange={this.newRecipeInputChange}
          />
          <label htmlFor="link"></label>
          <input
            type="text"
            id="newrecipeurl"
            name="url"
            value={this.state.newRecipe.url}
            placeholder="link url"
            required
            onChange={this.newRecipeInputChange}
          />
          <button type="submit">Add a recipe</button>
        </form>

        <ul className="recipeList">
          {this.state.recipeList.map((recipe) => {
            return (
              <li key={recipe.url} className="recipe">
                <p>{recipe.title}</p>
                <p>{recipe.description}</p>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-image"
                ></img>
                <a href={recipe.url} target="_blank" rel="noreferrer">
                  Link to recipe
                </a>
                <p>{recipe.dateAdded}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
});

export default App;

//   searchOnInputKeyDown(event){
//     if (event.key === 'Enter') {

//    }
//  },
