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
  * @description Cats is the array container for the cat objects.
  * @prototype
  */
  let model = {
    cats: [],
    currentCat: null,
    adminMode: false,
  };

  /**
  * @description octopus is the MVC controller. Contains all the methods that
  * interface between the model and the view.
  */
  let octopus = {

    /**
    * @description OCTOPUS Interface function for the view to access the
    * model.
    * @return {array} The array of cats.
    */
    getCats: function() {
      return model.cats;
    },

    /**
    * @description OCTOPUS Interface function for the view to access the model.
    * @return {object} The current cat stored in the attribute of the model
    * object
    */
    getCurrentCat: function() {
      return model.currentCat;
    },

    /**
    * @description OCTOPUS Interface function for the view to access the model.
    * Increments the clicks for the cat object in the parameter.
    * @param {obj} cat - The current cat object
    * @return {number} - The updated number of clicks
    */
    getIncreasedClicks: function(cat) {
      return cat.clicks++;
    },

    /**
    * @description OCTOPUS Interface function for the view to access the model.
    * @return {boolean} The attribute adminMode states if the Admin button is
    * displayed.
    */
    getAdminMode: function() {
      return model.adminMode;
    },

    /**
    * @description OCTOPUS Interface function for the view to write in the model
    * Sets the cat object in the parameter into the currentCat attribute.
    * @param {obj} catCopy - The cat it's been clicked in the cat list.
    */
    setCurrentCat: function(catCopy) {
      model.currentCat = catCopy;
    },

    /**
    * @description OCTOPUS Interface function for the view to write in the model
    * Sets the new state of admin boolean variable to the model.adminMode
    * attribute.
    * @param {boolean} mode - A boolean to control the state of the Admin button
    */
    setAdminMode: function(mode) {
      model.adminMode = mode;
    },

    /**
    * @description OCTOPUS Interface function for the view to write in the model
    * set the currentCat's name with the name of the text parameter.
    * @param {string} input - Contains the new name wrote in the input.
    */
    setCatName: function(input) {
      model.currentCat.name = input;
    },

    /**
    * @description OCTOPUS Interface function for the view to write in the model
    * @param {string} input - Contains the new url wrote in the input.
    */
    setCatUrl: function(input) {
      model.currentCat.imageUrl = input;
    },

    /**
    * @description OCTOPUS Interface function for the view to write in the model
    * @param {string} input - Contains the new click counter wrote in the input.
    */
    setCatClicks: function(input) {
      model.currentCat.clicks = input;
    },

    /**
    * @description Kickstarts the code
    */
    init: function() {
      this.createCatObjects();
      this.setPictureUrl();
      this.giveCatsName();
      view.renderSelectBarInit();
      view.addListenersToNames();
    },

    /**
    * @description Creates 5 cat objects and push them into the model.cats array
    */
    createCatObjects: function() {
      for (let i = 0; i < 5; i++) {
        let cat = new Cat();
        model.cats.push(cat);
      }
    },

    /**
    * @description Associates the url for every cat object.
    */
    setPictureUrl: function() {
      let i = 1;
      model.cats.forEach((el) => {
        const url = 'img/cat-pic';
        el.imageUrl = url + i + '.jpg';
        i++;
      }, false);
    },

    /**
    * @description: Sets a name for every cat object
    */
    giveCatsName: function() {
      const catNames = ['Shomi', 'Shobi', 'Bim', 'Bum', 'Bam'];
      let i = 0;
      model.cats.forEach((el) => {
        el.name = catNames[i];
        i++;
      }, false);
    },
  };

  /* behaves like a DOM updater, it can't access the model directly */
  let view = {

    /**
    * @description Takes every ul in the DOM and sticks a click event listener
    * to it.
    */
    addListenersToNames: function() {
      let clear = true;
      let init = true;
      let cats = octopus.getCats();
      let uls = document.querySelectorAll('ul');
      let cat;
      for (let i = 0; i < cats.length; i++) {
        cat = cats[i];
        /* Use of a closure to grab the object of the clicked cat */
        uls[i].addEventListener('click', (function(catCopy) {
          return function() {
            octopus.setCurrentCat(catCopy);
            /* We don't want to clear the screen if it's the first time we
            render it */
            if (clear === false) {
              view.clear();
            }
            /* Starts the first time you run the app. We don't want to create
            the DOM structure every time. Because the structure stays the same
            but only the contents gets cleaned */
            if (init === true) {
              view.renderInit(); // ok, make the structure
              view.clicker(); // add the listeners
            }
            init = false; // the init is complete

            /* Starts to render the right info for the ul clicked */
            view.render();

            /* Is the admin panel open? Let's get its status. */
            let admin = octopus.getAdminMode();
            if (admin === false) {
              view.renderControlsInit();
            } else {
              view.renderControls();
            }
            clear = false;
          };
        })(cat));
      };
    },

    /**
    * @description Renders the column of the left with the names of the cats.
    */
    renderSelectBarInit: function() {
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

    /**
    * @description Prints the list of cat names (ul) and adds the class names
    */
    renderSelectBar: function() {
      let i = 0;
      let cats = octopus.getCats();
      let uls = $('ul');
      cats.forEach((el) => {
        uls[i].innerHTML = el.name;
        i++;
      });
    },

    /**
    * @description Clears the clicks-area's content.
    */
    clear: function() {
      $('.clicks-area h3').text('');
      $('.cat-pic').attr('src', '');
    },

    /**
    * @description We need to create the DOM structure only once.
    * These elements won't be .removed() but the content will be cleared with ''
    */
    renderInit: function() {
      let clicksArea = $('.clicks-area');
      clicksArea.append('<h3 class=cats-name></h3>');
      clicksArea.append('<img class="cat-pic"></img>');
      clicksArea.append('<h3 class="clicks"></h3>');
    },

    /**
    * @description Refresh the page with the correct info of the target cat.
    */
    render: function() {
      let cat = octopus.getCurrentCat();
      let nameSpace = $('.cats-name');
      let catPic = $('.cat-pic');
      let clicks = $('.clicks');

      clicks.text(cat.clicks);
      nameSpace.text(cat.name);
      catPic.attr('src', cat.imageUrl);
      catPic.attr('class', 'cat-pic');
    },

    /**
    * @description Add the event listener for the cat's pic that will
    * increment the counter when it's clicked.
    */
    clicker: function() {
      $('.cat-pic').on('click', function(e) {
        let cat = octopus.getCurrentCat();
        cat.clicks ++;
        let clicksArea = $('.clicks');
        // refresh the text immediately
        clicksArea.text(cat.clicks);
      });
    },

    /**
    * @description Renders the admin controls if they are not displayed.
    * (e.g. the first time you run the app). Then updates the input values and
    * adds the event listeners for the save and cancel buttons.
    */
    renderControlsInit: function() {
      let cat = octopus.getCurrentCat();
      $('.b-controls__button').on('click', function(e) {
        view.renderControls();
        let admin = true;
        octopus.setAdminMode(admin);

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
          let admin = false;
          octopus.setAdminMode(admin);

          let n = name.val();
          octopus.setCatName(n);

          let u = url.val();
          octopus.setCatUrl(u);

          let c = clicks.val();
          octopus.setCatClicks(c);

          view.render();
          view.clearSelectBar();
          view.renderSelectBar();
          view.hideControls();
        });

        cancel.attr('class', 'b-controls__button-cancel');
        cancel.on('click', function() {
          let admin = false;
          octopus.setAdminMode(admin);
          view.hideControls();
        });
      });
    },

    /**
    * @description Updates the input fields with the current cat's values.
    */
    renderControls: function() {
      let cat = octopus.getCurrentCat();
      let name = $('.b-controls__input-name');
      let url = $('.b-controls__input-url');
      let clicks = $('.b-controls__input-clicks');

      clicks.val(cat.clicks);
      name.val(cat.name);
      url.val(cat.imageUrl);
    },

    /**
    * @description Hides the admin control panel.
    */
    hideControls: function() {
      let name = $('.b-controls__input-name');
      let url = $('.b-controls__input-url');
      let clicks = $('.b-controls__input-clicks');
      let save = $('.b-controls__button-save');
      let cancel = $('.b-controls__button-cancel');

      name.attr('class', 'b-controls__input-name--hidden');
      url.attr('class', 'b-controls__input-url--hidden');
      clicks.attr('class', 'b-controls__input-clicks--hidden');
      save.attr('class', 'b-controls__button-save--hidden');
      cancel.attr('class', 'b-controls__button-cancel--hidden');
    },

    /**
    * @description Clear the cats names list.
    */
    clearSelectBar: function() {
      let uls = $('ul');
      uls.text('');
    },
  };
  octopus.init();
}());
