$(function() {
  let Cat = function(url, name) {
    this.imageUrl = url;
    this.name = name;
    this.clicks = 0;
  };

  let model = {
    cats: [],

    increaseClicks: function(allCats, i) {
      allCats[i].clicks +=1;
      return allCats;
    },

  };

  let octopus = {

    init: function() {
      let allCats = this.createCatObjects(model.cats);
      allCats = this.setPictureUrl(allCats);
      allCats = this.giveCatsName(allCats);
      view.renderSelectBar(allCats);
      this.addListenersToNames(allCats);
    },

    createCatObjects: function(modelCats) {
      for (let i = 0; i < 5; i++) {
        let cat = new Cat();
        modelCats.push(cat);
      }
      return modelCats;
    },

    setPictureUrl: function(allCats) {
      let i = 1;
      allCats.forEach((el) => {
        const url = 'img/cat-pic';
        el.imageUrl = url + i + '.jpg';
        i++;
      }, false);
      return allCats;
    },

    giveCatsName: function(allCats) {
      const catNames = ['Shomi', 'Shobi', 'Bim', 'Bum', 'Bam'];
      let i = 0;
      allCats.forEach((el) => {
        el.name = catNames[i];
        i++;
      }, false);
      return allCats;
    },

    addListenersToNames: function(allCats) {
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
            view.clicker(allCats);
          }
          init = false;
          view.render(allCats, target);
          clear = false;
        });
      });
    },
  };

  let view = {

    renderSelectBar: function(allCats) {
      let bar = $('.select-bar');
      let i = 1;
      allCats.forEach((el) => {
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

    render: function(allCats, target) {
      let nameSpace = $('.cats-name');
      let catPic = $('.cat-pic');
      let i = 1;
      allCats.forEach((el) => {
        if (target.className === 'name cat' + i) {
          $('.clicks').text(allCats[i-1].clicks);
          nameSpace.text(allCats[i-1].name);
          catPic.attr('class', 'cat-pic cat' + i);
          catPic.attr('src', allCats[i-1].imageUrl);
        }
        i++;
      });
    },

    clicker: function(allCats) {
      $('.cat-pic').on('click', function(e) {
        let target = event.target;
        let i = 1;
        allCats.forEach((el) => {
          if (target.className === 'cat-pic cat' + i) {
            model.increaseClicks(allCats, i-1);
            let clicks = $('.clicks');
            clicks.text('');
            let newNum = allCats[i-1].clicks;
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
