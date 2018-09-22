debugger;

function click () {
  let count = 0;

  return function () {
    let catPic = document.querySelector(".cat-pic");

    catPic.addEventListener('click', () => {
      let counter = document.querySelector("span");
      counter.remove();
      let newCounter = document.createElement("span");
      count++;
      newCounter.innerHTML = count;
      document.querySelector(".clicks-area").appendChild(newCounter);
    }, false);
  };

}

let myVar = click();
myVar();
