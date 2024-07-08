export default class NanoDOM {
  createDomElement({ tag, className, id, innerHTML }) {
    if (tag) {
      const elem = document.createElement(tag);
      if (className) elem.classList.add(className);
      if (id) elem.id = id;
      if (innerHTML) elem.innerHTML = innerHTML;
      return elem;
    }
  }
}
