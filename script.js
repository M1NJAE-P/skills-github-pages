const tabs = document.querySelectorAll('.tab');
const sliders = document.querySelectorAll('.slider');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    sliders.forEach(s => s.classList.remove('active'));

    tab.classList.add('active');
    const slider = document.getElementById(tab.dataset.target);
    slider.classList.add('active');
    resetSlider(slider);
  });
});

function resetSlider(slider) {
  const track = slider.querySelector('.slider-track');
  const images = slider.querySelectorAll('img');
  let index = 0;

  function updateSlider() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  slider.querySelector('.prev').onclick = () => {
    if (index > 0) {
      index--;
      updateSlider();
    }
  };

  slider.querySelector('.next').onclick = () => {
    if (index < images.length - 1) {
      index++;
      updateSlider();
    }
  };

  // 모바일 스와이프
  const windowEl = slider.querySelector('.slider-window');
  let startX = 0;

  windowEl.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  windowEl.addEventListener('touchend', e => {
    const diffX = e.changedTouches[0].clientX - startX;
    if (Math.abs(diffX) > 50) {
      if (diffX < 0 && index < images.length - 1) index++;
      else if (diffX > 0 && index > 0) index--;
      updateSlider();
    }
  });
}

// 첫 탭 초기화
resetSlider(document.querySelector('.slider.active'));
