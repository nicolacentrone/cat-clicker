debugger;
let clickArea = document.querySelector(".click-area");
clickArea.addEventListener('click', () => {
  let counter = document.querySelector("span");
  counter.remove();
  let newCounter = document.createElement("span");
  newCounter.innerHTML = '1';
  document.querySelector(".click-area").appendChild(newCounter);
}, false);
