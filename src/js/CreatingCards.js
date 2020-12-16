/* eslint-disable class-methods-use-this */
export default class CreatingCards {
  constructor() {
    this.container = null;
    this.ulColl = null;
    this.itemsColl = null;
  }

  init() {
    this.listenerAddCard();
    this.container.addEventListener('click', this.itemRemove);
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
    this.ulColl = this.container.querySelectorAll('ul');
    this.itemsColl = this.container.querySelectorAll('.item');
  }

  itemRemove(e) {
    if (e.target.classList.contains('cross') && e.target.closest('li')) {
      e.target.closest('li').remove();
    }
  }

  listenerAddCard() {
    const addCard = this.container.querySelectorAll('.add-card');

    addCard.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        const div = this.createTextarea();
        e.target.replaceWith(div);

        div.addEventListener('click', (event) => {
          if (event.target.classList.contains('cross')) {
            div.replaceWith(elem);
          }

          if (event.target.classList.contains('add') && div.querySelector('.textarea').value !== '') {
            const li = this.addNewCard(div.querySelector('.textarea').value);
            const ul = event.target.closest('.column').querySelector('ul');
            ul.append(li);
            div.replaceWith(elem);
            this.itemsColl = this.container.querySelectorAll('.item');
          }
        });
      });
    });
  }

  showLoad(loader) {
    this.ulColl.forEach((e) => {
      e.innerHTML = '';
    });

    Object.entries(loader).forEach(([key, value]) => {
      value.forEach((text) => {
        this.container.querySelector(`[data-category="${key}"]`).insertAdjacentElement('beforeend', this.addNewCard(text));
      });
    });
  }

  createObj() {
    const obj = { todo: [], inprogress: [], done: [] };
    this.ulColl.forEach((e) => {
      e.querySelectorAll('li span').forEach((el, i) => {
        obj[e.getAttribute('data-category')][i] = el.textContent;
      });
    });

    return obj;
  }

  createTextarea() {
    const div = document.createElement('div');
    div.classList.add('textarea__container');
    div.innerHTML = `
        <textarea class="textarea" placeholder="Enter a title for this card..."></textarea>
        <button class="add btn">Add Card</button>
        <button class="cross btn">&#215</button>
      `;
    return div;
  }

  addNewCard(text) {
    const li = document.createElement('li');
    li.classList.add('item');
    li.insertAdjacentHTML('beforeend', `<span>${text}</span><button class="cross btn">&#215</button>`);

    return li;
  }
}
