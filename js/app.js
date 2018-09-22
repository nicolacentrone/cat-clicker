function click () {
  let count = 0;

  return () => {
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

function catsName () {
  const catName1 = 'Shomi';
  const catName2 = 'Shobi';

  let titles = document.querySelectorAll('h3');
  titles[0].innerHTML = catName1;
  titles[1].innerHTML = catName2;

}

let myVar = click();
myVar();
catsName();
