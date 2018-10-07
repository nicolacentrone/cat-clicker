var Cat = function (url, name) {
    this.imageUrl = url;
    this.name = name;
    this.clicks = 0;
};

Cat.prototype.setPictureUrl = function (n) {
  const url = "img/cat-pic";
  this.imageUrl = url+(n+1);
}

Cat.prototype.increaseClick = function () {
this.clicks += 1;
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
  let i = 1;
  allCats.forEach((el) => {
    let img = document.createElement('img');
    img.src = el.imageUrl + '.jpg';
    img.className = 'thumb' + ' ' + 'cat' + i;
    bar.appendChild(img);
    i++;
  });
}

function select () {
  let images = document.querySelectorAll('img');
  let clear = true;
  images.forEach((el) => {
    el.addEventListener('click', () => {
      if (clear === false) {
        document.querySelector('.clicks-area img').remove();
        document.querySelector('.clicks-area h3').remove();
        clear = true;
      }
        let src = el.src;
        nameTheCats(allCats);
        let newImg = document.createElement('img');
        newImg.className = 'cat-pic';
        newImg.src = src;
        document.querySelector('.clicks-area').appendChild(newImg);
        showClicks(allCats);
        clear = false;
        let target = event.target;
        let nameSpace = document.querySelector('h3');
        if (target.className === 'thumb cat1') {
          nameSpace.innerHTML = allCats[0].name;
        } else if (target.className === 'thumb cat2') {
          nameSpace.innerHTML = allCats[1].name;
        } else if (target.className === 'thumb cat3') {
          nameSpace.innerHTML = allCats[2].name;
        } else if (target.className === 'thumb cat4') {
          nameSpace.innerHTML = allCats[3].name;
        } else if (target.className === 'thumb cat5') {
          nameSpace.innerHTML = allCats[4].name;
        }
    }, false);
  });
}

function showClicks (allCats) {
  let clicksNum = document.createElement('h3');
  document.querySelector('.clicks-area').appendChild(clicksNum);
  allCats.forEach((el) => {
    clicksNum.innerHTML = el.clicks;
  }, false);
}

function nameTheCats (allCats) {
  const catName = ['Shomi', 'Shobi', 'Bim', 'Bum', 'Bam'];
  let i = 0;
  let imgs = document.querySelectorAll('img');
  allCats.forEach((el) => {
      el.name = catName[i];
      i++;
  }, false);

}

let allCats = setCatsUrl();
setImages(allCats);
select();


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


// let myVar = click();
// myVar();
