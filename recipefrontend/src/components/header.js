import createReactClass from "create-react-class";
import Confetti from "react-confetti";
import "../styles/header.scss";

const Header = createReactClass({
  getInitialState() {
    return {
      isConfettiShowing: false,
    };
  },

  toggleConfetti() {
    this.setState({
      isConfettiShowing: !this.state.isConfettiShowing,
    });
  },

  render() {
    const width = document.documentElement.scrollWidth;
    const height = document.documentElement.scrollHeight;
    console.log(width, height);
    return (
      <div className="header">
        <button onClick={this.toggleConfetti}>Click me!</button>
        <h1>Recipe App</h1>
        {this.state.isConfettiShowing && (
          <Confetti
            width={width}
            height={height}
            colors={[
              "#f44336",
              "#e91e63",
              "#9c27b0",
              "#673ab7",
              "#3f51b5",
              "#2196f3",
              "#03a9f4",
            ]}
            recycle={false}
          />
        )}
      </div>
    );
  },
});
export default Header;
