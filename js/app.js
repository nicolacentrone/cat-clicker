$(function() {
  let Cat = function(url, name) {
    this.imageUrl = url;
    this.name = name;
    this.clicks = 0;
  };

  let model = {
    cats: [],

    increaseClicks: function(cats, i) {
      cats[i].clicks +=1;
      return cats;
    },

  };

  let octopus = {

    getCats: function() {
      return model.cats;
    },

    init: function() {
      this.createCatObjects();
      this.setPictureUrl();
      this.giveCatsName();
      view.renderSelectBar();
      this.addListenersToNames();
    },

    createCatObjects: function() {
      for (let i = 0; i < 5; i++) {
        let cat = new Cat();
        model.cats.push(cat);
      }
    },

    setPictureUrl: function() {
      let i = 1;
      model.cats.forEach((el) => {
        const url = 'img/cat-pic';
        el.imageUrl = url + i + '.jpg';
        i++;
      }, false);
    },

    giveCatsName: function() {
      const catNames = ['Shomi', 'Shobi', 'Bim', 'Bum', 'Bam'];
      let i = 0;
      model.cats.forEach((el) => {
        el.name = catNames[i];
        i++;
      }, false);
    },

    addListenersToNames: function() {
      let clear = true;
      let init = true;
      $('ul').each(function(index) {
        $(this).on('click', function(e) {
          let target = event.target;

          if (clear === false) {
            view.clear();
          }
          if (init === true) {
            view.renderInit();
            view.clicker();
          }
          init = false;
          view.render(target);
          clear = false;
        });
      });
    },
  };

  let view = {

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

    renderInit: function() {
      let clicksArea = $('.clicks-area');
      clicksArea.append('<h3 class=cats-name></h3>');
      clicksArea.append('<img class="cat-pic"></img>');
      clicksArea.append('<h3 class="clicks"></h3>');
    },

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

    clicker: function() {
      $('.cat-pic').on('click', function(e) {
        let target = event.target;
        let i = 1;
        let cats = octopus.getCats();
        cats.forEach((el) => {
          if (target.className === 'cat-pic cat' + i) {
            model.increaseClicks(cats, i-1);  // view non può chiamare model
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

  debugger;
  octopus.init();
}());
