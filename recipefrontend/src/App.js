import React from "react";
import "./App.scss";
import createReactClass from "create-react-class";
import axios from "axios";
import NewRecipe from "./components/newRecipe";
import RecipeList from "./components/recipeList";
import SearchRecipe from "./components/searchRecipe";
import Header from "./components/header";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes/themes";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.body};
`;

const App = createReactClass({
  getInitialState() {
    this.searchBarRef = React.createRef();
    return {
      searchValue: "",
      recipeList: [],
      isRecipeListLoading: true,
      theme: "light",
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
      .get("/api/recipes")
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

  //add new recipe
  //make a copy of recipeList first to then push newRecipe onto
  newRecipeOnSubmit(event) {
    event.preventDefault();
    let recipeListWithANewRecipe = [...this.state.recipeList];

    axios
      .post("/api/recipes", this.state.newRecipe)
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
        this.getRecipeListData();
      })
      .catch((error) => {
        console.error(error);
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
        .get("/api/recipes/search", { params })
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

  // theme toggler

  themeToggler() {
    if (this.state.theme === "light") {
      this.setState({
        theme: "dark",
      });
    } else {
      this.setState({
        theme: "light",
      });
    }
  },

  render() {
    return (
      <ThemeProvider
        theme={this.state.theme === "light" ? lightTheme : darkTheme}
      >
        <StyledApp className="App">
          <Header themeToggler={this.themeToggler} theme={this.state.theme} />
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
            getRecipeListData={this.getRecipeListData}
          />
        </StyledApp>
      </ThemeProvider>
    );
  },
});

export default App;
