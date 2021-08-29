import "../styles/recipeList.scss";
import { Check, TrashCan } from "akar-icons";
import createReactClass from "create-react-class";
import _ from "lodash";
import axios from "axios";
import classNames from "classnames";

import styled from "styled-components";

const StyledRecipeListItem = styled.li`
  background-color: ${(props) => props.theme.cardColor};
`;

const RecipeItem = createReactClass({
  getInitialState() {
    return {
      title: {
        value: this.props.recipe.title,
        isTitleUpdated: false,
      },
      description: {
        value: this.props.recipe.description,
        isDescriptionUpdated: false,
      },
      image: this.props.recipe.image,
      url: this.props.recipe.url,
      id: this.props.recipe.id,
      dateAdded: this.props.recipe.dateAdded,
    };
  },

  // now pass through a single recipe instead of the whole recipeList
  // before I went through the recipeList to find the index, but now
  // as recipe is in its own container & the single recipe is mapped over in recipeList
  // and passed through as a prop just refer to it as this.state....

  //function to update recipe TITLE &/OR DESCRIPTION, and update state
  // of just the value key in the object
  changeOfRecipe(event) {
    this.setState({
      [event.target.name]: {
        ...this.state[event.target.name],
        value: event.target.value,
      },
    });

    this.getUpdatedRecipeList(event, event.target.id);
  },

  //once recipe title or description has been updated patch request will be made
  //  to update database, & depending on if title or description has been edited the boolean value in that object
  //  will be set to true and then back agin to false
  // using lodash debounce method to call patch request after typing
  // this funciton is now called in the above changeOfRecipe, doesn't need to be called separately

  getUpdatedRecipeList: _.debounce(function (event, id) {
    const updatedTitle = this.state.title.value;
    const updatedDescription = this.state.description.value;

    axios
      .patch("/api/recipes/" + id, {
        title: updatedTitle,
        description: updatedDescription,
      })
      .then(() => {
        if (event.target.name === "title") {
          this.setState({
            title: {
              ...this.state.title,
              isTitleUpdated: true,
            },
          });
          setTimeout(() => {
            this.setState({
              title: {
                ...this.state.title,
                isTitleUpdated: false,
              },
            });
          }, 5000);
        } else {
          this.setState({
            description: {
              ...this.state.description,
              isDescriptionUpdated: true,
            },
          });
          setTimeout(() => {
            this.setState({
              description: {
                ...this.state.description,
                isDescriptionUpdated: false,
              },
            });
          }, 5000);
        }
        this.props.getRecipeListData();
      })
      .catch((error) => {
        console.error(error);
      });
  }, 600),

  //delete recipe
  deleteRecipe(id) {
    console.log(this.state.id);
    axios.delete("/api/recipes/" + id).then(() => {
      this.props.getRecipeListData();
    });
  },

  render() {
    return (
      <StyledRecipeListItem className="recipeList--item">
        <div className="recipeList--item-titleWrap">
          <label htmlFor="recipeTitle"></label>
          <input
            type="text"
            id={this.state.id}
            name="title"
            value={this.state.title.value}
            required
            onInput={this.changeOfRecipe}
          ></input>
          <button
            id={this.state.id}
            className={classNames("recipeList--item-updateTextButton", {
              "recipeList--item-updateTextButton__is-highlighted":
                this.state.title.isTitleUpdated,
            })}
          >
            <Check size={20} />
          </button>
        </div>
        <div className="recipeList--item-descriptionWrap">
          <input
            type="text"
            id={this.state.id}
            name="description"
            value={this.state.description.value}
            required
            onInput={this.changeOfRecipe}
          ></input>

          <button
            id={this.state.id}
            className={classNames("recipeList--item-updateTextButton", {
              "recipeList--item-updateTextButton__is-highlighted":
                this.state.description.isDescriptionUpdated,
            })}
          >
            <Check size={20} />
          </button>
        </div>
        <img
          src={this.state.image}
          alt={this.state.title.value}
          className="recipeList--item-image"
        ></img>
        <a
          href={this.state.url}
          target="_blank"
          rel="noreferrer"
          className="recipeList--item-link"
        >
          Link
        </a>
        <p>Added on: {new Date(this.state.dateAdded).toDateString()}</p>
        <button
          onClick={() => this.deleteRecipe(this.state.id)}
          className="recipeList--item-deleteButton"
        >
          <TrashCan size={20} />
        </button>
      </StyledRecipeListItem>
    );
  },
});

export default RecipeItem;
