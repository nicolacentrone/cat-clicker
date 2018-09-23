var Cat = function (url, name) {
    this.imageUrl = url;
    this.name = name;
    this.clicks = 0;
};

Cat.prototype.setPictureUrl = function (n) {
  const url = "img/cat-pic";
  this.imageUrl = url+(n+1);
}

/* Functions */

function setCatsUrl () {
  let catArray = [];
  for (let i = 0; i < 5 ; i++) {
    let cat = new Cat();
    catArray.push(cat);
    cat.setPictureUrl(i);
  }
  return catArray;
}

function setImages (allCats) {
  let bar = document.querySelector('.select-bar');
  allCats.forEach((el) => {
    let img = document.createElement('img');
    img.src = el.imageUrl + ".jpg";
    img.className = "thumb";
    bar.appendChild(img);
  });
}

let allCats = setCatsUrl();
debugger;
setImages(allCats);
// function click () {
//   let count = 0;
//
//   return () => {
//     let catPic = document.querySelector(".cat-pic");
//     let catPic2 = document.querySelector(".cat-pic2");
//
//     catPic.addEventListener('click', () => {
//       let counter = document.querySelector("span");
//       counter.remove();
//       let newCounter = document.createElement("span");
//       count++;
//       newCounter.innerHTML = count;
//       document.querySelector(".number-area").appendChild(newCounter);
//     }, false);
//
//     catPic2.addEventListener('click', () => {
//       let counter = document.querySelector("span");
//       counter.remove();
//       let newCounter = document.createElement("span");
//       count++;
//       newCounter.innerHTML = count;
//       document.querySelector(".number-area").appendChild(newCounter);
//     }, false);
//   };
//
// }
//
// function catsName () {
//   const catName1 = 'Shimi';
//   const catName2 = 'Shomi';
//   const catName2 = 'Shobi';
//   const catName2 = 'Shaggy';
//   const catName2 = 'Shinobi';
//
//   let titles = document.querySelectorAll('h3');
//   for (var i = 0; i < titles.length; i++) {
//     titles[i].innerHTML = catName[i+1];
//   }
// }
//
// let myVar = click();
// myVar();
// catsName();
