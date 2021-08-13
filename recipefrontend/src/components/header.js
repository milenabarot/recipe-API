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
    const { isConfettiShowing } = this.state;
    const { toggleConfetti } = this;
    const { props } = this;

    return (
      <div className="header">
        <button className="header-confettiButton" onClick={toggleConfetti}>
          {isConfettiShowing ? <p>Turn me off</p> : <p>Click me!</p>}
        </button>
        <h1>Recipe App</h1>
        <button className="App-darkMode" onClick={() => props.themeToggler()}>
          Change Theme
        </button>
        {isConfettiShowing && (
          <Confetti
            width={width}
            height={height}
            colors={[
              "#00bcd4",
              "#009688",
              "#4CAF50",
              "#8BC34A",
              "#CDDC39",
              "#FFEB3B",
              "#FFC107",
              "#FF9800",
            ]}
          />
        )}
      </div>
    );
  },
});
export default Header;
