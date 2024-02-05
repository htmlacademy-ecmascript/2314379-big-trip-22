import AbstractView from '../framework/view/abstract-view.js';

const createAddEventButtonTemplate = () => '<button class="point-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class AddEventButton extends AbstractView {
  #onButtonClick = null;

  constructor({ onButtonClick }) {
    super();
    this.#onButtonClick = onButtonClick;
    this.element.addEventListener('click', this.#buttonClickHandler);
  }

  get template() {
    return createAddEventButtonTemplate();
  }

  #buttonClickHandler = (event) => {
    event.preventDefault();
    this.#onButtonClick();
  };

  setDisabled(isDisabled) {
    this.element.disabled = isDisabled;
  }
}
