export default class NanoDOM {
  node = document.createElement("div");

  constructor(tag) {
    if (tag) {
      this.node = document.createElement(tag);
    }
  }

  get node() {
    return this.node;
  }

  toString() {
    return this.node;
  }

  appendChild(child) {
    this.node.appendChild(child);
  }

  setId(id) {
    if (id) {
      this.node.id = id;
    }
  }

  setInnerHTML(innerHTML) {
    if (innerHTML) {
      this.node.innerHTML = innerHTML;
    }
  }

  addClass(className) {
    if (className) {
      this.node.classList.add(className);
    }
  }

  removeClass(className) {
    if (className) {
      this.node.classList.remove(className);
    }
  }
}
