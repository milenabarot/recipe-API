import "../styles/newRecipe.scss";
import Modal from "react-modal";
import createReactClass from "create-react-class";
import { motion, AnimatePresence } from "framer-motion";
import { CirclePlusFill } from "akar-icons";
import PropTypes from "prop-types";

Modal.setAppElement("#root");

const NewRecipe = createReactClass({
  getInitialState() {
    return {
      isModalOpen: false,
    };
  },

  openModal() {
    this.setState({
      isModalOpen: true,
    });
  },

  closeModal() {
    this.setState({
      isModalOpen: false,
    });
  },

  onSubmitRecipe(event) {
    this.props.newRecipeOnSubmit(event);
    this.setState({
      isModalOpen: false,
    });
  },

  render() {
    const { props, openModal, closeModal, onSubmitRecipe } = this;
    const { isModalOpen } = this.state;

    return (
      <div className="newRecipe">
        <button className="newRecipe-addButton" onClick={openModal}>
          <p>New Recipe</p>
          <CirclePlusFill size={25} style={{ display: "inline" }} />
        </button>
        <AnimatePresence>
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              shouldCloseOnOverlayClick={true}
              className="newRecipe-modal"
              overlayClassName="newRecipe-overlay"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button
                  className="newRecipe-modalCloseButton"
                  onClick={closeModal}
                >
                  X
                </button>
                <form className="newRecipe-form" onSubmit={onSubmitRecipe}>
                  <label htmlFor="title"></label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={props.newRecipe.title}
                    placeholder="Recipe Title"
                    required
                    onChange={props.newRecipeInputChange}
                  />
                  <label htmlFor="description"></label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={props.newRecipe.description}
                    placeholder="Description"
                    required
                    onChange={props.newRecipeInputChange}
                  />
                  <label htmlFor="image"></label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={props.newRecipe.image}
                    placeholder="Image url"
                    onChange={props.newRecipeInputChange}
                  />
                  <label htmlFor="link"></label>
                  <input
                    type="text"
                    id="newrecipeurl"
                    name="url"
                    value={props.newRecipe.url}
                    placeholder="Link url"
                    required
                    onChange={props.newRecipeInputChange}
                  />
                  <button className="newRecipe-formButton" type="submit">
                    Add
                  </button>
                </form>
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    );
  },
});

NewRecipe.propTypes = {
  newRecipe: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
  }),
};

NewRecipe.defaultProps = {
  newRecipe: {
    title: "",
    description: "",
    image: "",
    url: "",
  },
  onSubmitRecipe: () => {},
  newRecipeInputChange: () => {},
};

export default NewRecipe;
