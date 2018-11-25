$(function() {
  let Cat = function(url, name) {
    this.imageUrl = url;
    this.name = name;
    this.clicks = 0;
  };

  let model = {

    imageUrl: '',
    name: '',
    clicks: 0,
    cats: [],
  };

  let octopus = {

    init: function() {
      let catsArray = this.setCatsUrl(model.cats);
      octopus.nameTheCats(catsArray);
    },

    setPictureUrl: function(n, cat) {
      const url = 'img/cat-pic';
      cat.imageUrl = url + (n+1) + '.jpg';
      return cat;
    },

    setCatsUrl: function(catsArray) {
      for (let i = 0; i < 5; i++) {
        let cat = new Cat();
        cat = this.setPictureUrl(i, cat);
        catsArray.push(cat);
      }
      return catsArray;
    },

    nameTheCats: function(catsArray) {
      const catNames = ['Shomi', 'Shobi', 'Bim', 'Bum', 'Bam'];
      let i = 0;
      catsArray.forEach((el) => {
        el.name = catNames[i];
        i++;
      }, false);
      view.renderNames(catsArray);
    },

    addListeners: function(catsArray) {
      let clear = true;
      $('a').each(function(index) {
        $(this).on('click', function(e) {
          let target = event.target;

          if (clear === false) {
            $('.clicks-area h3').remove();
            $('.clicks-area img').remove();
            $('.clicks-area h3').remove();
          }

          $('.clicks-area').append('<h3 class=cats-name></h3>');
          $('.clicks-area').append('<img class="cat-pic"></img>');
          $('.clicks-area').append('<h3 class="clicks"></h3>');

          octopus.setClicks(catsArray, target);

          clear = false;
          view.updateCatInfo(target, catsArray);
          view.clicker(catsArray);
        });
      });
    },

    setClicks: function(catsArray, target) {
      debugger;
      for (let i = 1; i <= catsArray.length; i++) {
        if (target.className === 'thumb' + ' ' + 'cat' + i) {
          $('.clicks').text(catsArray[i].clicks);
        }
      }
    },

    increaseClick: function(catsArray, i) {
      catsArray[i].clicks +=1;
      return catsArray;
    },
  };

  let view = {

    renderNames: function(catsArray) {
      let bar = $('.select-bar');
      let i = 1;
      catsArray.forEach((el) => {
        let link = document.createElement('a');
        link.style.cursor = 'pointer';
        link.innerHTML = el.name;
        link.className = 'thumb' + ' ' + 'cat' + i;
        bar.append(link);
        i++;
      });
      octopus.addListeners(catsArray);
    },

    updateCatInfo: function(target, catsArray) {
      let nameSpace = $('.cats-name');
      for (let i = 1; i <= catsArray.length; i++) {
        if (target.className === 'thumb cat'+[i]) {
          nameSpace.text(catsArray[i-1].name);
          $('.cat-pic').attr('class', 'cat-pic cat'+[i]);
          $('.cat-pic').attr('src', catsArray[i-1].imageUrl);
        }
      }
    },

    clicker: function(catsArray) {
      $('.cat-pic').on('click', function(e) {
        let target = event.target;
        for (let i = 1; i < catsArray.length; i++) {
          if (target.className === 'cat-pic cat'+[i]) {
            octopus.increaseClick(catsArray, i);
            let clicks = $('.clicks');
            clicks.text('');
            let newNum = catsArray[i].clicks;
            clicks.text(newNum);
          }
        }
      });
    },
  };

  octopus.init();
}());
