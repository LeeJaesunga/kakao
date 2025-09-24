document.addEventListener('DOMContentLoaded', () => {
    
  const fadeIO = new IntersectionObserver(entries =>
    entries.forEach(e => e.target.classList.toggle('show', e.isIntersecting)),
    { threshold: 0.6 }
  );
  document.querySelectorAll('.fade-in-up').forEach(el => fadeIO.observe(el));

  const introEl = document.querySelector('.area_intro');
  if (introEl) {
    const introIO = new IntersectionObserver(entries =>
      entries.forEach(e => introEl.classList.toggle('show', e.isIntersecting)),
      { threshold: 0.5 }
    );
    introIO.observe(introEl);
  }

  const visualEl = document.querySelector('#main .area_visual');
  if (visualEl) {
    let hasScrolled = false;
    window.addEventListener('scroll', () => { hasScrolled = true; });
    const curtainIO = new IntersectionObserver(entries =>
      entries.forEach(e => {
        if (!hasScrolled) return;
        visualEl.classList.toggle('up', !e.isIntersecting);
      }),
      { rootMargin: '0px 0px -30% 0px', threshold: 0 }
    );
    curtainIO.observe(visualEl);
  }

  const track       = document.querySelector('.slick_track');
  const slides      = document.querySelectorAll('.slick_slide');
  const btnPrev     = document.querySelector('.slick_arrow');
  const btnNext     = document.querySelector('.slick_next');
  const curTxt      = document.querySelector('.custom_per .num_current');
  const totTxt      = document.querySelector('.custom_per .num_total');

  let idx = 0;
  const max = slides.length;
  totTxt.textContent = max;

  const slideW = () => slides[0].getBoundingClientRect().width;

  function updateMain() {
    track.style.transform = `translateX(-${slideW() * idx}px)`;
    curTxt.textContent = idx + 1;
    slides.forEach((s, i) => s.classList.toggle('slick_current', i === idx));
  }

  btnPrev.addEventListener('click', () => { if (idx > 0)       { idx--; updateMain(); } });
  btnNext.addEventListener('click', () => { if (idx < max - 1) { idx++; updateMain(); } });
  window.addEventListener('resize', updateMain);
  updateMain();

  const slideClasses = [
    '.slick_slide_emoticon',
    '.slick_slide_emoticon1',
    '.slick_slide_emoticon2'
  ];
  const emoSlides = slideClasses.map(cls => document.querySelector(cls));
  const emoPrev   = document.querySelector('.slick_prev13');
  const emoNext   = document.querySelector('.slick_next13');
  const emoCurTxt = document.querySelector('.slick_dots .num_current');
  const emoTotTxt = document.querySelector('.slick_dots .num_total');

  let emoIdx = 0;
  const emoMax = emoSlides.length;
  emoTotTxt.textContent = emoMax;

  function updateEmo() {
    if (emoIdx < 0) emoIdx = 0;
    if (emoIdx >= emoMax) emoIdx = emoMax - 1;

    emoSlides.forEach((el, i) => {
      if (el) el.style.display = (i === emoIdx ? 'block' : 'none');
    });
    emoCurTxt.textContent = emoIdx + 1;
  }

  emoPrev.addEventListener('click', () => { if (emoIdx > 0)       { emoIdx--; updateEmo(); } });
  emoNext.addEventListener('click', () => { if (emoIdx < emoMax-1) { emoIdx++; updateEmo(); } });
  updateEmo();

  document.querySelectorAll('.opt_Theme').forEach(themeSlider => {
    const themeSlides = [
      themeSlider.querySelector('.slick_slide_emoticon'),
      themeSlider.querySelector('.slick_slide_emoticon1'),
      themeSlider.querySelector('.slick_slide_emoticon2')
    ].filter(Boolean);

    const prevBtn = themeSlider.querySelector('.slick_prev13');
    const nextBtn = themeSlider.querySelector('.slick_next13');
    const currentTxt = themeSlider.querySelector('.slick_dots .num_current');
    const totalTxt = themeSlider.querySelector('.slick_dots .num_total');

    let themeIdx = 0;
    const themeMax = themeSlides.length;
    totalTxt.textContent = themeMax;

    function updateTheme() {
      if (themeIdx < 0) themeIdx = 0;
      if (themeIdx >= themeMax) themeIdx = themeMax - 1;

      themeSlides.forEach((el, i) => {
        el.style.display = (i === themeIdx ? 'block' : 'none');
      });
      currentTxt.textContent = themeIdx + 1;
    }

    prevBtn.addEventListener('click', () => {
      if (themeIdx > 0) {
        themeIdx--;
        updateTheme();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (themeIdx < themeMax - 1) {
        themeIdx++;
        updateTheme();
      }
    });

    updateTheme();
  });

  document.querySelectorAll('.opt_Wallet').forEach(walletSlider => {
    const walletSlides = [
      walletSlider.querySelector('.slick_slide_emoticon'),
      walletSlider.querySelector('.slick_slide_emoticon1'),
      walletSlider.querySelector('.slick_slide_emoticon2')
    ].filter(Boolean);

    const prevBtn = walletSlider.querySelector('.slick_prev13');
    const nextBtn = walletSlider.querySelector('.slick_next13');
    const currentTxt = walletSlider.querySelector('.slick_dots .num_current');
    const totalTxt = walletSlider.querySelector('.slick_dots .num_total');

    let walletIdx = 0;
    const walletMax = walletSlides.length;
    totalTxt.textContent = walletMax;

    function updateWallet() {
      if (walletIdx < 0) walletIdx = 0;
      if (walletIdx >= walletMax) walletIdx = walletMax - 1;

      walletSlides.forEach((el, i) => {
        el.style.display = (i === walletIdx ? 'block' : 'none');
      });
      currentTxt.textContent = walletIdx + 1;
    }

    prevBtn.addEventListener('click', () => {
      if (walletIdx > 0) {
        walletIdx--;
        updateWallet();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (walletIdx < walletMax - 1) {
        walletIdx++;
        updateWallet();
      }
    });

    updateWallet();
  });

  const topBtn = document.querySelector('.like_tops');
  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const backdrop = document.createElement('div');
  backdrop.className = 'menu_backdrop';
  document.body.appendChild(backdrop);

  document.querySelectorAll('#gnb_menu .item_menu').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();

      const li = btn.closest('li');
      const isOpen = li.classList.contains('on');

      document.querySelectorAll('#gnb_menu li.on').forEach(el => el.classList.remove('on'));
      document.querySelectorAll('#gnb_menu .item_menu.active').forEach(el => el.classList.remove('active'));
      backdrop.classList.remove('active');

      if (!isOpen) {
        li.classList.add('on');
        btn.classList.add('active');
        backdrop.classList.add('active');
      }
    });
  });

  backdrop.addEventListener('click', () => {
    document.querySelectorAll('#gnb_menu li.on').forEach(li => li.classList.remove('on'));
    document.querySelectorAll('#gnb_menu .item_menu.active').forEach(b => b.classList.remove('active'));
    backdrop.classList.remove('active');
  });

  const toggleBtn = document.querySelector('.relation_toggle_btn');
  const toggleList = document.querySelector('.list_subunfoffs');
  const toggleIcon = toggleBtn.querySelector('.toggle_icon');

  if (toggleBtn && toggleList && toggleIcon) {
    toggleBtn.addEventListener('click', () => {
      toggleList.classList.toggle('active');
      toggleIcon.classList.toggle('active');
    });
  }
});
