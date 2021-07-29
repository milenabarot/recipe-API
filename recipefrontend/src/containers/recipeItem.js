import "../styles/recipeList.scss";
import { Check, TrashCan } from "akar-icons";
import createReactClass from "create-react-class";
import _ from "lodash";
import axios from "axios";

const RecipeItem = createReactClass({
  getInitialState() {
    return {
      //   ...this.props.recipe,
      title: this.props.recipe.title,
      description: this.props.recipe.description,
      image: this.props.recipe.image,
      url: this.props.recipe.url,
      id: this.props.recipe.id,
      dateAdded: this.props.recipe.dateAdded,
      isPatchRequestCompleted: false,
    };
  },

  // now pass through a single recipe instead of the whole recipeList
  // before I went through the recipeList to find the index, but now
  // as recipe is in its own container & the single recipe is mapped over in recipeList
  // and passed through as a prop just refer to it as this.state....

  changeOfRecipe(event) {
    // let updatedRecipeList = [...this.props.recipeList];

    // const index = updatedRecipeList.findIndex((recipe) => {
    //   return recipe.id === event.target.id;
    // });
    // updatedRecipeList[index] = {
    //   ...updatedRecipeList[index],
    //   [event.target.name]: event.target.value,
    // };

    this.setState({
      [event.target.name]: event.target.value,
    });

    this.getUpdatedRecipeList(event.target.id);
  },

  getUpdatedRecipeList: _.debounce(function (id) {
    // const { recipeList } = this.props;
    // const index = recipeList.findIndex((recipe) => {
    //   return recipe.id === id;
    // });
    const updatedTitle = this.state.title;
    const updatedDescription = this.state.description;

    axios
      .patch("http://localhost:3000/recipes/" + id, {
        title: updatedTitle,
        description: updatedDescription,
      })
      .then(() => {
        this.setState({
          isPatchRequestCompleted: true,
        });

        setTimeout(() => {
          this.setState({
            isPatchRequestCompleted: false,
          });
        }, 5000);
        this.props.getRecipeListData();
      })
      .catch((error) => {
        console.error(error);
      });
  }, 600),

  render() {
    const { props } = this;
    return (
      <li className="recipeList--item">
        <div className="recipeList--item-titleWrap">
          <label htmlFor="recipeTitle"></label>
          <input
            type="text"
            id={this.state.id}
            name="title"
            value={this.state.title}
            required
            onInput={this.changeOfRecipe}
          ></input>
          {this.state.isPatchRequestCompleted && (
            <button
              id={this.state.id}
              className="recipeList--item-updateTextButton"
            >
              <Check size={20} />
            </button>
          )}
        </div>
        <div className="recipeList--item-descriptionWrap">
          <input
            type="text"
            id={this.state.id}
            name="description"
            value={this.state.description}
            required
            onInput={this.changeOfRecipe}
          ></input>
          {this.state.isPatchRequestCompleted && (
            <button
              id={this.state.id}
              className="recipeList--item-updateTextButton"
            >
              <Check size={20} />
            </button>
          )}
        </div>

        <img
          src={this.state.image}
          alt={this.state.title}
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
          onClick={() => props.deleteRecipe(this.state.id)}
          className="recipeList--item-deleteButton"
        >
          <TrashCan size={20} />
        </button>
      </li>
    );
  },
});

export default RecipeItem;
