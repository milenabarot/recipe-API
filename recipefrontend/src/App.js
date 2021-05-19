import "./App.css";
import createReactClass from "create-react-class";
import axios from "axios";

const App = createReactClass({
  getInitialState() {
    return {
      searchValue: "",
      recipeList: [],
    };
  },

  componentDidMount() {
    axios
      .get("http://localhost:3000/posts")
      // .then((response) => response.json())
      .then((response) => {
        console.log(response);

        const recipes = response.data.map((recipeData) => {
          const title = recipeData.title;
          const description = recipeData.description;
          const image = recipeData.image;
          const urlLink = recipeData.url;
          const dateAdded = recipeData.dateAdded;
          return {
            title: title,
            description: description,
            image: image,
            url: urlLink,
            dateAdded: dateAdded,
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

  //   searchOnInputKeyDown(event){
  //     if (event.key === 'Enter') {

  //    }
  //  },

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
      </div>
    );
  },
});

export default App;
