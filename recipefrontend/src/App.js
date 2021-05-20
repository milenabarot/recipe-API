import "../src/styles/App.css";
import createReactClass from "create-react-class";
import axios from "axios";
import NewRecipe from "./components/newRecipe";
import RecipeList from "./components/recipeList";

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

  // dateAddedFormatted(recipeList) {
  //   const dateAddedFormatted === new Date(recipeList.dateAdded).toDateString();
  // },

  newRecipeInputChange(event) {
    this.setState({
      newRecipe: {
        ...this.state.newRecipe,
        [event.target.name]: event.target.value,
      },
    });
  },

  componentDidMount() {
    this.getRecipeListData();
  },

  // get recipes data
  getRecipeListData() {
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

          const id = recipeData._id;
          return {
            title: title,
            description: description,
            image: image,
            url: urlLink,
            dateAdded: dateAdded,
            id: id,
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

  //add new recipe
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
        console.log(this.state.recipeList, this.state.newRecipe);
      })
      .catch((error) => {
        console.error(error);
      });
  },

  //delete recipe
  deleteRecipe(id) {
    axios.delete("http://localhost:3000/posts/" + id).then((response) => {
      this.getRecipeListData();
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
        <NewRecipe
          newRecipeOnSubmit={this.newRecipeOnSubmit}
          newRecipe={this.state.newRecipe}
          newRecipeInputChange={this.newRecipeInputChange}
        />
        <RecipeList
          recipeList={this.state.recipeList}
          deleteRecipe={this.deleteRecipe}
        />
      </div>
    );
  },
});

export default App;

//   searchOnInputKeyDown(event){
//     if (event.key === 'Enter') {

//    }
//  },
