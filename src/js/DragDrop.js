export default class DragDrop {
  constructor() {
    this.dragItem = null;
    this.dropItem = null; // переносимый элемент
    this.shiftX = null;
    this.shiftY = null;
    this.elemBellow = null;
    this.container = null;
    this.emptyLi = null;
  }

  init() {
    this.container = document.querySelector('.container');
    this.container.addEventListener('mousedown', this.dragDown);
    this.container.addEventListener('mousemove', this.dragMove);
    this.container.addEventListener('mouseup', this.dragUp);
    this.container.addEventListener('mouseleave', this.dragLeave);
  }

  dragDown(e) {
    if (!e.target.closest('.item') || e.target.classList.contains('cross')) {
      return;
    }

    e.preventDefault();
    this.dragItem = e.target.closest('.item');
    this.dropItem = this.dragItem.cloneNode(true);

    this.shiftX = e.clientX - this.dragItem.getBoundingClientRect().left;
    this.shiftY = e.clientY - this.dragItem.getBoundingClientRect().top;

    this.dropItem.style.width = `${this.dragItem.offsetWidth}px`;
    this.dropItem.classList.add('dragged');
    document.querySelector('.container').appendChild(this.dropItem);
    this.dropItem.style.left = `${e.pageX - this.shiftX}px`;
    this.dropItem.style.top = `${e.pageY - this.shiftY}px`;
    this.dragItem.style.opacity = 0;

    this.emptyLi = document.createElement('li');
    this.emptyLi.classList.add('empty');
    this.emptyLi.style.height = `${this.dragItem.offsetHeight}px`;
  }

  dragMove(e) {
    e.preventDefault();
    if (!this.dragItem) {
      return;
    }

    this.dropItem.classList.add('hidden');
    this.elemBellow = document.elementFromPoint(e.clientX, e.clientY);
    this.dropItem.classList.remove('hidden');

    this.dropItem.style.left = `${e.pageX - this.shiftX}px`;
    this.dropItem.style.top = `${e.pageY - this.shiftY}px`;

    if (this.elemBellow.closest('.column')) {
      const parentEl = this.elemBellow.closest('.column').querySelector('ul');

      if (!parentEl.hasChildNodes()) {
        parentEl.append(this.emptyLi);
      } else if (this.elemBellow.closest('.add-card')) {
        parentEl.append(this.emptyLi);
      } else if (this.elemBellow.closest('h1')) {
        parentEl.prepend(this.emptyLi);
      } else if (this.elemBellow.closest('.item')) {
        parentEl.insertBefore(this.emptyLi, this.elemBellow.closest('.item'));
      }
    }
  }

  dragUp(e) {
    e.preventDefault();
    if (!this.dragItem) {
      return;
    }

    if (!this.elemBellow.closest('.column')) {
      document.querySelector('.container').removeChild(this.dropItem);
      document.querySelector('.empty').remove();
      this.dragItem.style.opacity = 100;
      this.dropItem = null;
      this.dragItem = null;
      return;
    }

    const parentUl = this.elemBellow.closest('.column').querySelector('ul');

    if (this.elemBellow.closest('h1')) {
      parentUl.prepend(this.dropItem);
    } else if (this.elemBellow.closest('.add-card')) {
      parentUl.append(this.dropItem);
    } else {
      parentUl.insertBefore(this.dropItem, this.elemBellow.closest('li'));
    }

    if (document.querySelector('.empty')) {
      document.querySelector('.empty').remove();
    }

    this.dropItem.classList.remove('dragged');
    this.dropItem.style = '100%';
    this.dragItem.remove();
    this.dragItem = null;
    this.dropItem = null;
  }

  dragLeave() {
    if (!this.dragItem) {
      return;
    }

    document.querySelector('.container').removeChild(this.dropItem);
    document.querySelector('.empty').remove();
    this.dragItem.style.opacity = 100;
    this.dropItem = null;
    this.dragItem = null;
  }
}
