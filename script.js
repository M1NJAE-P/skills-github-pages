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

// 터치 기반 스와이프 (모바일 대응)
let startX = 0;

sliderWindow.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

sliderWindow.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const diffX = endX - startX;

  
  // 스와이프 거리 기준 설정 (예: 50px 이상)
  if (Math.abs(diffX) > 50) {
    if (diffX < 0) {
      goNext();  // 왼쪽 → 다음 슬라이드
    } else {
      goPrev();  // 오른쪽 → 이전 슬라이드
    }
  }
});

// 화살표 버튼 클릭 시 슬라이드 이동
document.getElementById('prev').addEventListener('click', goPrev);
document.getElementById('next').addEventListener('click', goNext);
