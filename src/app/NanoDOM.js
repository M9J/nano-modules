export default class NanoDOM {
  tag = "div";
  id = null;
  classList = [];
  innerHTML = "";
  
  constructor(tag) {
    this.tag = tag;
  }
  
  setId(id) {
    if(id) {
      this.id = id;
    }
  }
  
  setInnerHTML(innerHTML) {
    if (innerHTML) {
      this.innerHTML = innerHTML;
    }
  }
  
  addClass(className) {
    if (!this.classList.includes(className)) {
      this.classList.push(className);
    }
  }
  
  removeClass(className) {
    if(this.classList.includes(className)) {
      this.classList = this.classList.filter(c => c !== className);
    }
  }
  
  
}
