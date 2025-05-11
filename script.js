const track = document.querySelector('.slider-track');
const images = document.querySelectorAll('.slider-track img');
const sliderWindow = document.querySelector('.slider-window');

let index = 0;
let isScrolling = false;
let scrollCooldown = 800; // 휠 한 번에 0.8초 제한

function updateSlider() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

function goNext() {
  if (index < images.length - 1) {
    index++;
    updateSlider();
  }
}

function goPrev() {
  if (index > 0) {
    index--;
    updateSlider();
  }
}


// 자동 넘김 (10초 간격)
//setInterval(() => {
//  goNext();
//}, 10000);

sliderWindow.addEventListener('wheel', (event) => {
  // 가로 스크롤이 아닌 경우는 무시
  if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

  event.preventDefault(); // 기본 동작 방지 (가로 스크롤)
  if (isScrolling) return;

  isScrolling = true;

  if (event.deltaX > 0) {
    goNext();   // 오른쪽 스와이프 → 다음 슬라이드
  } else {
    goPrev();   // 왼쪽 스와이프 → 이전 슬라이드
  }

  setTimeout(() => {
    isScrolling = false;
  }, scrollCooldown);
});
