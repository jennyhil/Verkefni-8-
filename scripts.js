const ENTER_KEYCODE = 13;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const items = document.querySelector(".items");

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener("submit", formHandler);
    // TODO láta hluti í _items virka

    for (content of items.querySelectorAll(".item")) {
      const finished = content.querySelector(".item__checkbox");
      finished.addEventListener("click", finish);

      const text = content.querySelector(".item__text");
      text.addEventListener("click", edit);

      const button = content.querySelector(".item__button");
      button.addEventListener("click", deleteItem);
    }
  }
  function formHandler(e) {
    e.preventDefault();

    console.log("halló heimur");

    let input = e.target.querySelector(".form__input");

    if (input.value.trim().length > 0) {
      add(input.value.trim());
    }

    return (input.value = " ");
  }
  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentNode.classList.toggle("item--done");
  }
  // event handler fyrir það að breyta færslu
  function edit(e) {
    const { target } = e;
    const { textContent, parentNode } = target;
    const button = parentNode.querySelector(".item__button");

    parentNode.removeChild(target);
    input = el("input", "item__edit");
    input.setAttribute("type", "text");
    input.addEventListener("keyup", commit);
    input.value = textContent;
    parentNode.insertBefore(input, button);
  }
  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    const { keyCode, target } = e;
    if (keyCode !== ENTER_KEYCODE) {
      return;
    }

    const { value, parentNode } = target;

    target.removeEventListener("keyup", commit);
    parentNode.removeChild(target);

    const text = el("span", "item__text", edit);
    text.appendChild(document.createTextNode(value));

    const button = parentNode.querySelector(".item__button");

    parentNode.insertBefore(text, button);
  }
  // fall sem sér um að bæta við nýju item
  function add(value) {
    const item = el("li", "item");

    const text = el("span", "item__text", edit);
    text.appendChild(document.createTextNode(value));

    const button = el("button", "item__button", deleteItem);
    button.appendChild(document.createTextNode("Eyða"));

    const finished = el("input", "item__checkbox", finish);
    finished.setAttribute("type", "checkbox");

    item.appendChild(finished);
    item.appendChild(text);
    item.appendChild(button);
    items.appendChild(item);
  }
  // event handler til að eyða færslu
  function deleteItem(e) {
    const p = e.target.parentNode;

    const finished = p.querySelector(".item__checkbox");
    finished.removeEventListener("click", finish);

    const text = p.querySelector(".item__text");
    text.removeEventListener("click", edit);

    const button = p.querySelector(".item__button");
    button.removeEventListener("click", deleteItem);
    p.parentNode.removeChild(p);
  }
  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    let el = document.createElement(type);

    if (className) {
      el.classList.add(className);
    }

    if (clickHandler) {
      el.addEventListener("click", clickHandler);
    }

    return el;
  }

  return {
    init: init
  };
})();
