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

    increaseClicks: function(i) {
      this.cats[i].clicks +=1;
    },

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

    /* returns the increaseClicks function, because the view can't access it
    directly */
    getIncreasedClicks: function(i) {
      return model.increaseClicks(i);
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
  };

  /* behaves like a DOM updater, it can't access the model directly */
  let view = {

    /* takes every ul in the DOM and sticks a click event listener to it */
    addListenersToNames: function() {
      let clear = true;
      let init = true;
      $('ul').each(function(index) {
        $(this).on('click', function(e) {
          let target = event.target;

          /* we don't want to clear the screen if it's the first time we render
          it */
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
          view.render(target);
          clear = false;
        });
      });
    },

    /* prints the list of cat names (ul) and adds the class names */
    renderSelectBar: function() {
      let bar = $('.select-bar');
      let i = 1;
      let cats = octopus.getCats();
      cats.forEach((el) => {
        let link = document.createElement('ul');
        link.style.cursor = 'pointer';
        link.innerHTML = el.name;
        link.className = 'name' + ' ' + 'cat' + i;
        bar.append(link);
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
    render: function(target) {
      let nameSpace = $('.cats-name');
      let catPic = $('.cat-pic');
      let i = 1;
      let cats = octopus.getCats();
      cats.forEach((el) => {
        if (target.className === 'name cat' + i) {
          $('.clicks').text(cats[i-1].clicks);
          nameSpace.text(cats[i-1].name);
          catPic.attr('class', 'cat-pic cat' + i);
          catPic.attr('src', cats[i-1].imageUrl);
        }
        i++;
      });
    },

    /* increases the clicks of the target cat */
    clicker: function() {
      $('.cat-pic').on('click', function(e) {
        let target = event.target;
        let i = 1;
        let cats = octopus.getCats();
        cats.forEach((el) => {
          if (target.className === 'cat-pic cat' + i) {
            octopus.getIncreasedClicks(i-1);
            let clicks = $('.clicks');
            clicks.text('');
            let newNum = cats[i-1].clicks;
            clicks.text(newNum);
          }
          i++;
        });
      });
    },
  };

  octopus.init();
}());
