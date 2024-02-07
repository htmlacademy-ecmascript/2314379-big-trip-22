import AddPointButton from '../view/add-point-button.js';
import { render } from '../framework/render.js';

export default class AddPointButtonPresenter {
  #container = null;
  #buttonComponent = null;
  #onButtonClick = null;

  constructor(container) {
    this.#container = container;
  }

  init({ onButtonClick }) {
    this.#onButtonClick = onButtonClick;
    this.#buttonComponent = new AddPointButton({
      onButtonClick: this.#buttonClickHandler,
    });
    render(this.#buttonComponent, this.#container);
  }

  #buttonClickHandler = () => {
    this.#onButtonClick();
  };

  disableButton() {
    this.#buttonComponent.setDisabled(true);
  }

  enableButton() {
    this.#buttonComponent.setDisabled(false);
  }
}
