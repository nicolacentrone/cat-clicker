let Cat = function(url, name) {
  this.imageUrl = url;
  this.name = name;
  this.clicks = 0;
};

Cat.prototype.setPictureUrl = function(n) {
  const url = 'img/cat-pic';
  this.imageUrl = url+(n+1) + '.jpg';
};

Cat.prototype.increaseClick = function() {
  this.clicks += 1;
};

/**
* @description Instantiates 5 cat objects and push them into an array
* @return {array} An array of objects containing 5 cats objects
**/
function setCatsUrl() {
  let catArray = [];
  for (let i = 0; i < 5; i++) {
    let cat = new Cat();
    catArray.push(cat);
    cat.setPictureUrl(i);
  }
  return catArray;
}

/**
* @description Creates a link in the DOM for every object in the allCats array
* @param {array} allCats The array of cat objects
**/
function setNames(allCats) {
  nameTheCats(allCats);
  let bar = document.querySelector('.select-bar');
  let i = 1;
  allCats.forEach((el) => {
    let link = document.createElement('a');
    link.style.cursor = 'pointer';
    link.innerHTML = el.name;
    link.className = 'thumb' + ' ' + 'cat' + i;
    bar.appendChild(link);
    i++;
  });
}

/**
* @description Let the user select the cat
* @param {array} allCats The array of cat objects
**/
function select(allCats) {
  let links = document.querySelectorAll('a');
  let clear = true;
  links.forEach((el) => {
    el.addEventListener('click', () => {
      let target = event.target;

      if (clear === false) {
        document.querySelector('.clicks-area h3').remove();
        document.querySelector('.clicks-area img').remove();
        document.querySelector('.clicks-area h3').remove();
        clear = true;
      }

      let newH3 = document.createElement('h3');
      let clicksArea = document.querySelector('.clicks-area');
      clicksArea.appendChild(newH3);

      let newImg = document.createElement('img');
      newImg.className = 'cat-pic';
      clicksArea.appendChild(newImg);

      newH3 = document.createElement('h3');
      newH3.setAttribute('class', 'clicks');
      document.querySelector('.clicks-area').appendChild(newH3);

      showClicks(allCats, newH3, target);

      clear = false;

      let nameSpace = document.querySelector('h3');

      if (target.className === 'thumb cat1') {
        nameSpace.innerHTML = allCats[0].name;
        newImg.className = 'cat-pic cat1';
        newImg.src = allCats[0].imageUrl;
      } else if (target.className === 'thumb cat2') {
        nameSpace.innerHTML = allCats[1].name;
        newImg.className = 'cat-pic cat2';
        newImg.src = allCats[1].imageUrl;
      } else if (target.className === 'thumb cat3') {
        nameSpace.innerHTML = allCats[2].name;
        newImg.className = 'cat-pic cat3';
        newImg.src = allCats[2].imageUrl;
      } else if (target.className === 'thumb cat4') {
        nameSpace.innerHTML = allCats[3].name;
        newImg.className = 'cat-pic cat4';
        newImg.src = allCats[3].imageUrl;
      } else if (target.className === 'thumb cat5') {
        nameSpace.innerHTML = allCats[4].name;
        newImg.className = 'cat-pic cat5';
        newImg.src = allCats[4].imageUrl;
      }
      clicker(allCats);
    }, false);
  });
}

/**
* @description Creates the number of clicks
* @param {array} allCats The array of cat objects
* @param {document} clicksNum DOM element H3
* @param {document} target The element that has been clicked
**/
function showClicks(allCats, clicksNum, target) {
  let className = target.className;
  for (let i = 0; i < 5; i++) {
    if (className === 'thumb' + ' ' + 'cat' + (i+1)) {
      clicksNum.innerHTML = allCats[i].clicks;
    }
  }
}

/**
* @description Gives the attribute name to all the cats objects
* @param {array} allCats The array of cat objects
**/
function nameTheCats(allCats) {
  const catName = ['Shomi', 'Shobi', 'Bim', 'Bum', 'Bam'];
  let i = 0;
  allCats.forEach((el) => {
    el.name = catName[i];
    i++;
  }, false);
}

/**
* @description Increases the number of clicks when the selected cat is clicked
* @param {array} allCats The array of cat objects
**/
function clicker(allCats) {
  let img = document.querySelector('img.cat-pic');
  img.addEventListener('click', () => {
    let target = event.target;
    for (let n = 1; n < 6; n++) {
      if (target.className === 'cat-pic cat' + n) {
        allCats[n-1].increaseClick();
        /* Updating the number of clicks on the screen */
        let clicks = document.querySelector('.clicks');
        clicks.remove();
        let newNumber = allCats[n-1].clicks;
        clicks = document.createElement('h3');
        clicks.setAttribute('class', 'clicks');
        clicks.innerHTML = newNumber;
        let clicksArea = document.querySelector('.clicks-area');
        clicksArea.appendChild(clicks);
      }
    }
  });
}

let allCats = setCatsUrl();
setNames(allCats);
select(allCats);
