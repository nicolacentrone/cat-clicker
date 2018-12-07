/**
* @description The constructor for the cat objects
* @constructor
*/
$(function() {
  let Cat = function(url, name) {
    this.imageUrl = url;
    this.name = name;
    this.clicks = 0;
  };

  /**
  * @description cats is the array container for the cat objects. increaseClicks
  * is the prototype method associated to every cat object.
  * @prototype
  */
  let model = {
    cats: [],
    currentCat: null,
  };

  /**
  * @description octopus is the MVC controller. Contains all the methods that
  * interface between the model and the view.
  */
  let octopus = {

    /* returns the array of objects cats, because the view can't access it
    directly */
    getCats: function() {
      return model.cats;
    },

    setCurrentCat: function(catCopy) {
      return model.currentCat = catCopy;
    },

    getCurrentCat: function() {
      return model.currentCat;
    },

    /* returns the increaseClicks function, because the view can't access it
    directly */
    getIncreasedClicks: function(cat) {
      return cat.clicks++;
    },

    /* kickstarts the code */
    init: function() {
      this.createCatObjects();
      this.setPictureUrl();
      this.giveCatsName();
      view.renderSelectBar();
      view.addListenersToNames();
    },

    /* just creates 5 cat objects and push them into the model.cats array */
    createCatObjects: function() {
      for (let i = 0; i < 5; i++) {
        let cat = new Cat();
        model.cats.push(cat);
      }
    },

    /* associates the url for every cat object */
    setPictureUrl: function() {
      let i = 1;
      model.cats.forEach((el) => {
        const url = 'img/cat-pic';
        el.imageUrl = url + i + '.jpg';
        i++;
      }, false);
    },

    /* associates a name for every cat object */
    giveCatsName: function() {
      const catNames = ['Shomi', 'Shobi', 'Bim', 'Bum', 'Bam'];
      let i = 0;
      model.cats.forEach((el) => {
        el.name = catNames[i];
        i++;
      }, false);
    },

    setCatName: function(input) {
      model.currentCat.name = input;
    },

    setCatUrl: function(input) {
      model.currentCat.imageUrl = input;
    },

    setCatClicks: function(input) {
      model.currentCat.clicks = input;
    },
  };

  /* behaves like a DOM updater, it can't access the model directly */
  let view = {

    /* takes every ul in the DOM and sticks a click event listener to it */
    addListenersToNames: function() {
      let clear = true;
      let init = true;
      let cats = octopus.getCats();
      let uls = document.querySelectorAll('ul');
      let cat;
      for (let i = 0; i < cats.length; i++) {
        cat = cats[i];
        uls[i].addEventListener('click', (function(catCopy) {
          return function() {
            octopus.setCurrentCat(catCopy);
            /* we don't want to clear the screen if it's the first time we
            render it */
            if (clear === false) {
              view.clear();
            }
            /* it starts the first time you run the app. We don't want to create
            the DOM structure every time. Because the structure stays the same
            but only the contents gets cleaned */
            if (init === true) {
              view.renderInit(); // ok, make the structure
              view.clicker(); // add the listeners
            }
            init = false;

            // starts to render the right info for the ul you clicked
            view.render();
            view.renderControls();
            clear = false;
          };
        })(cat));
      };
    },

    /* prints the list of cat names (ul) and adds the class names */
    renderSelectBar: function() {
      let bar = $('.select-bar');
      let i = 1;
      let cats = octopus.getCats();
      cats.forEach((el) => {
        let ul = document.createElement('ul');
        ul.style.cursor = 'pointer';
        ul.innerHTML = el.name;
        ul.className = 'name' + ' ' + 'cat' + i;
        bar.append(ul);
        i++;
      });
    },

    clear: function() {
      $('.clicks-area h3').text('');
      $('.cat-pic').attr('src', '');
    },

    /* we need to create the DOM structure only once. These elements won't be
    .removed() but the content will be cleared with '' */
    renderInit: function() {
      let clicksArea = $('.clicks-area');
      clicksArea.append('<h3 class=cats-name></h3>');
      clicksArea.append('<img class="cat-pic"></img>');
      clicksArea.append('<h3 class="clicks"></h3>');
    },

    /* render the right info of the target cat*/
    render: function() {
      let cat = octopus.getCurrentCat();
      let nameSpace = $('.cats-name');
      let catPic = $('.cat-pic');

      $('.clicks').text(cat.clicks);
      nameSpace.text(cat.name);
      catPic.attr('class', 'cat-pic');
      catPic.attr('src', cat.imageUrl);
    },

    /* increases the clicks of the target cat */
    clicker: function() {
      $('.cat-pic').on('click', function(e) {
        let cat = octopus.getCurrentCat();
        let clicks = cat.clicks +=1;
        let clicksArea = $('.clicks');
        clicksArea.text(clicks);
      });
    },

    renderControls: function() {
      let cat = octopus.getCurrentCat();
      $('.b-controls__button').on('click', function(e) {
        let name = $('.b-controls__input-name--hidden');
        let url = $('.b-controls__input-url--hidden');
        let clicks = $('.b-controls__input-clicks--hidden');
        let save = $('.b-controls__button-save--hidden');
        let cancel = $('.b-controls__button-cancel--hidden');

        name.attr('class', 'b-controls__input-name');
        name.val(cat.name);

        url.attr('class', 'b-controls__input-url');
        url.val(cat.imageUrl);

        clicks.attr('class', 'b-controls__input-clicks');
        clicks.val(cat.clicks);

        save.attr('class', 'b-controls__button-save');
        save.on('click', function() {
          let n = name.val();
          octopus.setCatName(n);

          let u = url.val();
          octopus.setCatUrl(u);

          let c = clicks.val();
          octopus.setCatClicks(c);
          view.render();
        });

        cancel.attr('class', 'b-controls__button-cancel');
      });
    },
  };
  octopus.init();
}());
