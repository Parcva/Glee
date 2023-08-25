$(function () {

  $(".star").rateYo({
    starWidth: "14px",
    ratedFill: "#ffcc00",
    normalFill: "#d7d7d7",
    readOnly: true
  });

  $(".shop-item__star").rateYo({
    starWidth: "18px",
    ratedFill: "#ffcc00",
    normalFill: "#d7d7d7",
    readOnly: true
  });

  $(".filter-price__input").ionRangeSlider({
    type: "double",
    onStart: function (data) {
      $('.filter-price__from').text(data.from);
      $('.filter-price__to').text(data.to);
    },
    onChange: function (data) {
      $('.filter-price__from').text(data.from);
      $('.filter-price__to').text(data.to);
    },
  });

  $('.top-slider__wrapper').slick({
    dots: true,
    arrows: false
  });

  var containerEl1 = document.querySelector('[data-ref="container-1"]');
  var containerEl2 = document.querySelector('[data-ref="container-2"]');

  var config = {
    controls: {
      scope: 'local'
    }
  };

  var mixer1 = mixitup(containerEl1, config);
  var mixer2 = mixitup(containerEl2, config);




});