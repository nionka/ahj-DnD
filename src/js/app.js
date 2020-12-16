import State from './State';
import CreatingCards from './CreatingCards';
import DragDrop from './DragDrop';

const state = new State(localStorage);
const creatingCards = new CreatingCards();

creatingCards.bindToDOM(document.querySelector('.container'));
creatingCards.init();

const dragDrop = new DragDrop();
dragDrop.init();

window.addEventListener('unload', () => {
  state.save(creatingCards.createObj());
});

const loader = state.load();
creatingCards.showLoad(loader);
