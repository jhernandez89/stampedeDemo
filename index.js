/* global $ window */

const flyingGif = ['/flying1.gif', '/flying2.gif',
  '/flying3.gif', '/flying4.gif',
  '/flying5.gif', '/flying6.gif',
  '/flying7.gif', '/flying8.gif',
  '/flying9.gif', '/flying10.gif',
  '/flying11.gif'];

const width = 200;
const screenWidth = $(window).width();
let margin;
let duration;
let imgNum;

function generateRandomMargin() {
  const num = Math.floor(Math.random() * 580);
  return num;
}

function generateRandomDuration() {
  const num = (Math.floor(Math.random() * 20000)) + 15000;
  return num;
}

function chooseRandomGif() {
  const num = (Math.floor(Math.random() * 11));
  return num;
}

function setImgDivAttributes(imgDiv) {
  imgDiv.attr('src', `images/${flyingGif[imgNum]}`);
  imgDiv.attr('height', '40px');
  imgDiv.attr('left', '-100px');
  imgDiv.appendTo('.flyYouFools');
}

function defineRandomVariables() {
  margin = generateRandomMargin();
  duration = generateRandomDuration();
  imgNum = chooseRandomGif();
}

function putImagesIn(i) {
  return () => {
    defineRandomVariables();
    const imgDiv = $(`<img id=flyingAnimal class=dinosaur${i}>`);
    setImgDivAttributes(imgDiv);
    $(`.dinosaur${i}`).css({
      'margin-top': `${margin}px`,
    });
    imgDiv.css('right', (-width)).animate({
      left: screenWidth + 2000,
      bottom: '+=70',
    }, duration);
  };
}

function loopThroughImages() {
  for (let i = 0; i < 75; i += 1) {
    setTimeout(putImagesIn(i), Math.floor(Math.random() * 70) * i * 3);
  }
}

$('.stampede').click(() => {
  loopThroughImages();
  $('.flyYouFools').empty();
});
