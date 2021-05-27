import React from "react";
import "../src/styles/App.scss";
import createReactClass from "create-react-class";
import axios from "axios";
import NewRecipe from "./components/newRecipe";
import RecipeList from "./components/recipeList";

const App = createReactClass({
  getInitialState() {
    this.searchBarRef = React.createRef();
    return {
      searchValue: "",
      recipeList: [],
      newRecipe: {
        title: "",
        description: "",
        image: "",
        url: "",
      },
    };
  },

  componentDidMount() {
    this.searchBarRef.current.focus();
    this.getRecipeListData();
  },

  //monitors change of all input fields when adding a new recipe
  newRecipeInputChange(event) {
    this.setState({
      newRecipe: {
        ...this.state.newRecipe,
        [event.target.name]: event.target.value,
      },
    });
  },

  // updating recipe title, updating state
  changeOfRecipeTitle(event) {
    const updatedRecipeListRecipeTitle = event.target.value;
    let updatedRecipeList = [...this.state.recipeList];

    const index = updatedRecipeList.findIndex((recipe) => {
      return recipe.id === event.target.id;
    });
    updatedRecipeList[index] = {
      ...updatedRecipeList[index],
      title: updatedRecipeListRecipeTitle,
    };
    console.log(updatedRecipeList[index]);

    this.setState({
      recipeList: updatedRecipeList,
    });
  },

  //once recipeTitle has been updated, and Enter button clicked
  // patch request will be made to update database
  getUpdatedRecipeList(event, id) {
    const { recipeList } = this.state;
    const index = recipeList.findIndex((recipe) => {
      return recipe.id === event.target.id;
    });
    const updatedTitle = recipeList[index].title;

    axios
      .patch("http://localhost:3000/recipes/" + id, { title: updatedTitle })
      .then(() => {
        this.getRecipeListData();
      })
      .catch((error) => {
        console.error(error);
      });
  },

  onEnterGetUpdatedRecipeList(event, id) {
    if (event.key === "Enter") {
      this.getUpdatedRecipeList(event, id);
    }
  },

  // get recipes data
  getRecipeListData() {
    axios
      .get("http://localhost:3000/recipes")
      .then((response) => {
        console.log(response);

        const recipes = response.data.map((recipeData) => {
          const title = recipeData.title;
          const description = recipeData.description;
          const image = recipeData.image;
          const url = recipeData.url;
          const dateAdded = recipeData.dateAdded;
          const id = recipeData._id;

          return {
            title: title,
            description: description,
            image: image,
            url: url,
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
      .post("http://localhost:3000/recipes", this.state.newRecipe)
      .then((response) => {
        console.log(response);
        const updatedRecipeWithNewId = {
          title: response.data.title,
          description: response.data.description,
          image: response.data.image,
          url: response.data.url,
          dateAdded: response.data.dateAdded,
          id: response.data._id,
        };
        let { recipeList } = this.state;
        recipeList.push(updatedRecipeWithNewId);
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
    axios.delete("http://localhost:3000/recipes/" + id).then(() => {
      this.getRecipeListData();
    });
  },

  //search for recipe

  searchRecipe() {
    const searchValue = this.state.searchValue;
    if (searchValue !== "") {
      axios
        .get("http://localhost:3000/recipes/search/" + this.state.searchValue)
        .then((response) => {
          console.log(response.data);

          const searchRecipeListResults = response.data.map(
            (searchRecipeData) => {
              const title = searchRecipeData.title;
              const description = searchRecipeData.description;
              const image = searchRecipeData.image;
              const url = searchRecipeData.url;
              const dateAdded = searchRecipeData.dateAdded;
              const id = searchRecipeData._id;

              return {
                title: title,
                description: description,
                image: image,
                url: url,
                dateAdded: dateAdded,
                id: id,
              };
            }
          );
          this.setState({
            recipeList: searchRecipeListResults,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this.getRecipeListData();
    }
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
          ref={this.searchBarRef}
        />
        <button className="searchButton" onClick={this.searchRecipe}>
          Search
        </button>
        <NewRecipe
          newRecipeOnSubmit={this.newRecipeOnSubmit}
          newRecipe={this.state.newRecipe}
          newRecipeInputChange={this.newRecipeInputChange}
        />
        <RecipeList
          recipeList={this.state.recipeList}
          deleteRecipe={this.deleteRecipe}
          changeOfRecipeTitle={this.changeOfRecipeTitle}
          getUpdatedRecipeList={this.getUpdatedRecipeList}
          onEnterGetUpdatedRecipeList={this.onEnterGetUpdatedRecipeList}
        />
      </div>
    );
  },
});

export default App;
