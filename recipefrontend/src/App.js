import React from "react";
import "./App.scss";
import createReactClass from "create-react-class";
import axios from "axios";
import NewRecipe from "./components/newRecipe";
import RecipeList from "./components/recipeList";
import SearchRecipe from "./components/searchRecipe";
import Header from "./components/header";
import _ from "lodash";

const App = createReactClass({
  getInitialState() {
    this.searchBarRef = React.createRef();
    return {
      searchValue: "",
      recipeList: [],
      isRecipeListLoading: true,
      newRecipe: {
        title: "",
        description: "",
        image: "",
        url: "",
      },
    };
  },

  componentDidMount() {
    this.getRecipeListData();
    this.searchBarRef.current.focus();
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

  //updates value of search input field
  updateSearchValueInput(event) {
    this.setState({
      searchValue: event.target.value,
    });
  },

  //show recipe list on empty search value -if searchValue is equal to an empty string
  //then update recipeList with the full data to display all recipes, so p tag doesn't show
  //also checks to see if Enter key has been pressed to search recipes
  onKeyUpSearchRecipeInput(event) {
    if (this.state.searchValue === "") {
      this.setState({
        isRecipeListLoading: true,
      });
      this.getRecipeListData();
    } else if (event.key === "Enter") {
      this.searchRecipe();
    }
  },

  // get recipes data
  getRecipeListData() {
    axios
      .get("http://localhost:3000/recipes")
      .then((response) => {
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
          isRecipeListLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  },

  //function to update recipe TITLE &/OR DESCRIPTION, and update state

  changeOfRecipe(event) {
    let updatedRecipeList = [...this.state.recipeList];

    const index = updatedRecipeList.findIndex((recipe) => {
      return recipe.id === event.target.id;
    });
    updatedRecipeList[index] = {
      ...updatedRecipeList[index],
      [event.target.name]: event.target.value,
    };

    this.setState({
      recipeList: updatedRecipeList,
    });

    this.getUpdatedRecipeList(event.target.id);
  },

  //once recipe title or description has been updated
  //patch request will be made to update database
  // using lodash debounce method to call patch request after typing
  // this funciton is now called in the above changeOfRecipe
  //so doesn't need to be passed down as a prop separately

  getUpdatedRecipeList: _.debounce(function (id) {
    const { recipeList } = this.state;
    const index = recipeList.findIndex((recipe) => {
      return recipe.id === id;
    });
    const updatedTitle = recipeList[index].title;
    const updatedDescription = recipeList[index].description;

    axios
      .patch("http://localhost:3000/recipes/" + id, {
        title: updatedTitle,
        description: updatedDescription,
      })
      .then(() => {
        this.getRecipeListData();
      })
      .catch((error) => {
        console.error(error);
      });
  }, 600),

  //no longer need this function as lodash debounce handles update
  // onEnterGetUpdatedRecipeList(event, id) {
  //   if (event.key === "Enter") {
  //     this.getUpdatedRecipeList(id);
  //   }
  // },

  //add new recipe
  //make a copy of recipeList first to then push newRecipe onto
  newRecipeOnSubmit(event) {
    event.preventDefault();
    let recipeListWithANewRecipe = [...this.state.recipeList];

    axios
      .post("http://localhost:3000/recipes", this.state.newRecipe)
      .then((response) => {
        const updatedRecipeWithNewId = {
          title: response.data.title,
          description: response.data.description,
          image: response.data.image,
          url: response.data.url,
          dateAdded: response.data.dateAdded,
          id: response.data._id,
        };
        recipeListWithANewRecipe.push(updatedRecipeWithNewId);

        this.setState({
          recipeList: recipeListWithANewRecipe,
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

  //delete recipe
  deleteRecipe(id) {
    axios.delete("http://localhost:3000/recipes/" + id).then(() => {
      this.getRecipeListData();
    });
  },

  //search for recipe
  //using query params with axios for the search query
  // instead of passing through the state

  searchRecipe() {
    const searchValue = this.state.searchValue;
    const params = {
      searchValue: searchValue,
    };
    if (searchValue !== "") {
      axios
        .get("http://localhost:3000/recipes/search", { params })
        .then((response) => {
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
        <Header />
        <SearchRecipe
          searchValue={this.state.searchValue}
          updateSearchValueInput={this.updateSearchValueInput}
          searchBarRef={this.searchBarRef}
          searchRecipe={this.searchRecipe}
          onKeyUpSearchRecipeInput={this.onKeyUpSearchRecipeInput}
        />
        <NewRecipe
          newRecipeOnSubmit={this.newRecipeOnSubmit}
          newRecipe={this.state.newRecipe}
          newRecipeInputChange={this.newRecipeInputChange}
        />
        <RecipeList
          recipeList={this.state.recipeList}
          deleteRecipe={this.deleteRecipe}
          changeOfRecipe={this.changeOfRecipe}
          searchValue={this.state.searchValue}
          isRecipeListLoading={this.state.isRecipeListLoading}
        />
      </div>
    );
  },
});

export default App;
