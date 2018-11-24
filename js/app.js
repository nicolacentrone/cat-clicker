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
          console.log('hit!');
          let target = event.target;

          if (clear === false) {
            $('.clicks-area h3').remove();
            $('.clicks-area img').remove();
            $('.clicks-area h3').remove();
          }

          $('.clicks-area').append('<h3 class=cats-name></h3>');
          $('.clicks-area').append('<img class="cat-pic"></img>');
          $('.clicks-area').append('<h3 class="clicks"></h3>');

          octopus.setClicks(catsArray, model.clicks, target);

          clear = false;

          view.updateCatInfo(target, catsArray);
        });
      });
    },

    setClicks: function(catsArray, clicksNum, target) {
      let className = target.className;
      for (let i = 1; i < 5; i++) {
        if (className === 'thumb' + ' ' + 'cat' + (i)) {
          clicksNum.innerHTML = catsArray[i].clicks;
        }
      }
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

    clear: function() {
      $('.clicks-area h3').html('');
      $('.clicks-area img').html('');
      $('.clicks-area h3').html('');
    },

    updateCatInfo: function(target, catsArray) {
      debugger;
      let nameSpace = $('.cats-name');
      for (let i = 1; i <= catsArray.length; i++) {
        if (target.className === 'thumb cat'+[i]) {
          nameSpace.text(catsArray[i-1].name);
          $('.cat-pic').attr('class', 'cat-pic cat'+[i]);
          $('.cat-pic').attr('src', catsArray[i-1].imageUrl);
          console.log(catsArray[i].clicks);
        }
      }
    },
  };

  octopus.init();
}());
