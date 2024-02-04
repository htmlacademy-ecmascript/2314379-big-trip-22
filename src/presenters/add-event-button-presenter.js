import AddTripButton from '../view/add-trip-button.js';
import { render } from '../framework/render.js';

export default class AddTripButtonPresenter {
  #container = null;
  #buttonComponent = null;
  #onButtonClick = null;

  constructor(container) {
    this.#container = container;
  }

  init({ onButtonClick }) {
    this.#onButtonClick = onButtonClick;
    this.#buttonComponent = new AddTripButton({
      onButtonClick: this.#handleButtonClick,
    });
    render(this.#buttonComponent, this.#container);
  }

  #handleButtonClick = () => {
    this.#onButtonClick();
  };
  
  disableButton() {
    this.#buttonComponent.setDisabled(true);
  }
  
  enableButton() {
    this.#buttonComponent.setDisabled(false);
  }
}