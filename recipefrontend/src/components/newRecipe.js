import "../styles/newRecipe.scss";
import Modal from "react-modal";
import createReactClass from "create-react-class";
import { motion, AnimatePresence } from "framer-motion";

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

  render() {
    const { props, openModal, closeModal } = this;
    const { isModalOpen } = this.state;
    return (
      <div className="newRecipe">
        <button className="newRecipe-addButton" onClick={openModal}>
          Add a new Recipe
        </button>
        <AnimatePresence>
          {isModalOpen && (
            <motion.modal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              shouldCloseOnOverlayClick={true}
              className="newRecipe-modal"
              overlayClassName="newRecipe-overlay"
            >
              <button
                className="newRecipe-modalCloseButton"
                onClick={closeModal}
              >
                X
              </button>
              <form
                className="newRecipe-form"
                onSubmit={props.newRecipeOnSubmit}
              >
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
                  required
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
            </motion.modal>
          )}
        </AnimatePresence>
      </div>
    );
  },
});

export default NewRecipe;
