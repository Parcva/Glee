$(function () {

  $('.filter__btn').on('click', function () {
    $('.filter__wrapper').toggleClass('filter__wrapper--active');
  });

  $('.menu__btn').on('click', function () {
    $('.menu').toggleClass('menu--active');
  });

  $('.product-tabs__top-item').on('click', function (e) {
    e.preventDefault();
    $('.product-tabs__top-item').removeClass('product-tabs__top-item--active');
    $(this).addClass('product-tabs__top-item--active');

    $('.product-tabs__content-item').removeClass('product-tabs__content-item--active');
    $($(this).attr('href')).addClass('product-tabs__content-item--active');
  });

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

  $('.product-slider__thumb').slick({
    slidesToShow: 3,
    vertical: true,
    arrows: false,
    focusOnSelect: true,
    asNavFor: '.product-slider__big'
  });
  $('.product-slider__big').slick({
    asNavFor: '.product-slider__thumb',
    arrows: false,
    fade: true

  });

  $('.related__slider').slick({
    slidesToShow: 4,
    prevArrow: '<button class="related__prev" type="button"><img src="../img/product-one/left-arrow.svg" alt="prev"></button> ',
    nextArrow: '<button class="related__next" type="button"><img src="../img/product-one/left-arrow.svg" alt="prev"></button> '
  });

  $('.product-one__num').styler();




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