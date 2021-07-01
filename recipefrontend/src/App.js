import React from "react";
import "./App.scss";
import createReactClass from "create-react-class";
import axios from "axios";
import NewRecipe from "./components/newRecipe";
import RecipeList from "./components/recipeList";
import SearchRecipe from "./components/searchRecipe";
import Header from "./components/header";

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

  //if searchValue is equal to an empty string
  //then update recipeList with the full data to display all recipes, so p tag doesn't show
  showRecipeListOnEmptySearchValue() {
    if (this.state.searchValue === "") {
      this.setState({
        isRecipeListLoading: true,
      });
      this.getRecipeListData();
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

  //add new recipe
  newRecipeOnSubmit(event) {
    event.preventDefault();

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
        let { recipeList } = this.state;
        recipeList.push(updatedRecipeWithNewId);

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

  //search for recipe on enter key
  onEnterSearchRecipe(event) {
    if (event.key === "Enter") {
      this.searchRecipe();
    }
  },

  render() {
    return (
      <div className="App">
        <Header />
        <SearchRecipe
          searchValue={this.state.searchValue}
          updateSearchValueInput={this.updateSearchValueInput}
          onEnterSearchRecipe={this.onEnterSearchRecipe}
          searchBarRef={this.searchBarRef}
          searchRecipe={this.searchRecipe}
          showRecipeListOnEmptySearchValue={
            this.showRecipeListOnEmptySearchValue
          }
        />
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
          searchValue={this.state.searchValue}
          isRecipeListLoading={this.state.isRecipeListLoading}
        />
      </div>
    );
  },
});

export default App;
