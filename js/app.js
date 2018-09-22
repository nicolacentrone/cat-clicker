function click () {
  let count = 0;

  return function () {
    let catPic = document.querySelector(".cat-pic");
    let catPic2 = document.querySelector(".cat-pic2");

    catPic.addEventListener('click', () => {
      let counter = document.querySelector("span");
      counter.remove();
      let newCounter = document.createElement("span");
      count++;
      newCounter.innerHTML = count;
      document.querySelector(".number-area").appendChild(newCounter);
    }, false);
    
    catPic2.addEventListener('click', () => {
      let counter = document.querySelector("span");
      counter.remove();
      let newCounter = document.createElement("span");
      count++;
      newCounter.innerHTML = count;
      document.querySelector(".number-area").appendChild(newCounter);
    }, false);
  };

}

let myVar = click();
myVar();
