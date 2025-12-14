document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('#projectConveyor');
  const randomBtn = document.querySelector('#randomProjectBtn');

  // Собираем капсулы
  let chips = track ? Array.from(track.querySelectorAll('.nav-project-chip')) : [];

  // Дублируем содержимое трека для бесконечной прокрутки
  if (track && chips.length) {
    track.innerHTML = track.innerHTML + track.innerHTML;
    // после дублирования пересобираем список чипов
    chips = Array.from(track.querySelectorAll('.nav-project-chip'));
  }

  if (randomBtn && chips.length) {
    let previewChip = null;
    let lastRandomChip = null;

    function pickRandomChip(excludeChip) {
      const all = Array.from(document.querySelectorAll('.nav-project-chip'));
      if (!all.length) return null;
      if (all.length === 1) return all[0];

      let chip;
      let guard = 0;
      do {
        chip = all[Math.floor(Math.random() * all.length)];
        guard += 1;
      } while (chip === excludeChip && guard < 20);
      return chip;
    }

    function highlightChip(chip) {
      const all = Array.from(document.querySelectorAll('.nav-project-chip'));
      all.forEach(c => c.classList.remove('is-random-preview'));
      if (chip) chip.classList.add('is-random-preview');
    }

    // ---------- HOVER PREVIEW ----------
    randomBtn.addEventListener('mouseenter', function () {
      const chip = pickRandomChip(lastRandomChip || previewChip);
      if (!chip) return;
      previewChip = chip;
      highlightChip(previewChip);
    });

    randomBtn.addEventListener('mouseleave', function () {
      highlightChip(null);
      previewChip = null;
    });

    // ---------- CLICK (основной Random — без анимаций) ----------
    randomBtn.addEventListener('click', function (e) {
      e.preventDefault();

      const chip = previewChip || pickRandomChip(lastRandomChip);
      if (!chip) return;
      lastRandomChip = chip;
      highlightChip(chip);

      const url = chip.getAttribute('href');
      if (url) {
        window.location.href = url;   // сразу переходим, без задержки и без анимаций
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;

  const factor = 0.5;      // твой коэффициент (сетку тянет в другую сторону)
  const ease = 0.8;        // “жёсткость пружины” (0.05–0.15 норм)
  let targetOffset = 0;     // куда хотим прийти
  let currentOffset = 0;    // где сейчас
  let rafId = null;

  function updateParallax() {
    const diff = targetOffset - currentOffset;
    currentOffset += diff * ease; // движение к цели

    root.style.backgroundPosition = `0px ${currentOffset}px`;

    // если ещё есть разница — продолжаем анимацию
    if (Math.abs(diff) > 0.3) {
      rafId = requestAnimationFrame(updateParallax);
    } else {
      // дотягиваем до конца и останавливаемся
      currentOffset = targetOffset;
      root.style.backgroundPosition = `0px ${currentOffset}px`;
      rafId = null;
    }
  }

  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    targetOffset = scrollY * factor;

    // если анимация не запущена — запускаем
    if (!rafId) {
      rafId = requestAnimationFrame(updateParallax);
    }
  }

  window.addEventListener('scroll', onScroll);

  // начальная позиция
  onScroll();
});

document.addEventListener('DOMContentLoaded', () => {
  const items = Array.from(document.querySelectorAll('.cf-item'));
  if (!items.length) return;

  const prevBtn = document.querySelector('.cf-prev');
  const nextBtn = document.querySelector('.cf-next');
  const metaAsset = document.querySelector('.cf-meta-asset');
  const metaProject = document.querySelector('.cf-meta-project');

  let current = 0;
  let autoTimer = null;

  const total = items.length;

  function circularOffset(index) {
    // смещаем относительно current с учётом круга
    let raw = index - current;
    const half = Math.floor(total / 2);

    if (raw > half) raw -= total;
    if (raw < -half) raw += total;
    return raw;
  }

  function render() {
    const spacing = 480;   // широкие расстояния между картами
const depth = 260;     // глубина 3D

    const angle   = 45;


    items.forEach((item, index) => {
      const offset = circularOffset(index); // -2..2 нас интересуют

      if (Math.abs(offset) > 2) {
        item.style.opacity = '0';
        item.style.pointerEvents = 'none';
        item.classList.remove('is-active');
        return;
      }

      const translateX = offset * spacing;
      const rotateY    = offset * -angle;
      const translateZ = -Math.abs(offset) * depth;

      item.style.opacity = '1';
      item.style.pointerEvents = (offset === 0) ? 'auto' : 'none';

      item.style.transform = `
        translate3d(${translateX}px, -50%, ${translateZ}px)
        rotateY(${rotateY}deg)
      `;
      const isActive = (offset === 0);
      item.classList.toggle('is-active', isActive);

      item.style.filter = isActive
        ? 'brightness(1.05) contrast(1.02)'
        : 'brightness(0.92) contrast(0.96)';
    });

    // обновляем подпись под центром
    const active = items[current];
    if (active && metaAsset && metaProject) {
      metaAsset.textContent = active.dataset.asset || '';
      metaProject.textContent = active.dataset.project || '';
    }
  }

  function goTo(idx) {
    // зацикливаем
    current = (idx + total) % total;
    render();
    restartAuto();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  prevBtn && prevBtn.addEventListener('click', prev);
  nextBtn && nextBtn.addEventListener('click', next);

  function startAuto() {
    if (autoTimer) return;
    autoTimer = setInterval(next, 10000); // каждые 5 секунд
  }

  function stopAuto() {
    if (!autoTimer) return;
    clearInterval(autoTimer);
    autoTimer = null;
  }

  function restartAuto() {
    stopAuto();
    startAuto();
  }

  // при ховере останавливаем автоплей, чтобы можно было рассматривать
  const heroCoverflow = document.querySelector('.hero-coverflow');
  if (heroCoverflow) {
    heroCoverflow.addEventListener('mouseenter', stopAuto);
    heroCoverflow.addEventListener('mouseleave', startAuto);
  }

  render();
  startAuto();
});

// ---------- NEXT / PREV PROJECT NAV ----------
document.addEventListener('DOMContentLoaded', () => {
  const projectPage = document.querySelector('.project-page');
  if (!projectPage) return;

  const pathnameParts = window.location.pathname.split('/');
  const currentFile = pathnameParts[pathnameParts.length - 1] || '';
  const currentId = currentFile.replace('.html', '');

  const projects = [
    {
      id: 'bonch_tigers',
      title: 'Bonch Tigers',
      year: '2024',
      thumb: '../assets/img/projects/bonch-tigers/Bonch_Tigers_Icon.png',
      url: 'bonch_tigers.html',
    },
    {
      id: 'stream_studio',
      title: 'Stream Studio',
      year: '2024',
      thumb: '../assets/img/projects/stream-studio/Stream_Studio_Icon.png',
      url: 'stream_studio.html',
    },
    {
      id: 'enhavor',
      title: 'Enhavor',
      year: '2023',
      thumb: '../assets/img/projects/enhavor/Enhavor_Icon.png',
      url: 'enhavor.html',
    },
    {
      id: 'se_league',
      title: 'Student e-sport league',
      year: '2022',
      thumb: '../assets/img/projects/se-league/SEL_Icon.png',
      url: 'se_league.html',
    },
    {
      id: 'vist_plus',
      title: 'Vist+',
      year: '2021',
      thumb: '../assets/img/projects/vist-plus/Vist_Icon.png',
      url: 'vist_plus.html',
    },
    {
      id: 'trainx',
      title: 'TrainX',
      year: '2021',
      thumb: '../assets/img/projects/trainx/TrainX_Icon.png',
      url: 'trainx.html',
    },
    {
      id: 'oceanic_zen_zone',
      title: 'Oceanic Zen Zone',
      year: '2020',
      thumb: '../assets/img/projects/oceanzone/OceanZone_Icon.png',
      url: 'oceanic_zen_zone.html',
    },
    {
      id: 'fortuna',
      title: 'Fortuna',
      year: '2020',
      thumb: '../assets/img/projects/fortuna/Fortuna_Icon.png',
      url: 'fortuna.html',
    },
    {
      id: 'dushechkina',
      title: 'Elena Dushechkina',
      year: '2020',
      thumb: '../assets/img/projects/dushechkina/Dushechkina_Icon.png',
      url: 'dushechkina.html',
    },
    {
      id: 'tdk_electric',
      title: 'TDK Electric',
      year: '2019',
      thumb: '../assets/img/projects/tdk-electric/TDK_Icon.png',
      url: 'tdk_electric.html',
    },
  ];

  const currentIndex = projects.findIndex((p) => p.id === currentId);
  if (currentIndex === -1) return;

  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  function createCard(project, direction) {
    const card = document.createElement('a');
    card.className = `project-nav-card project-nav-${direction}`;
    card.href = project.url;
    card.innerHTML = `
      <div class="project-nav-thumb">
        <div class="project-nav-thumb-bg"></div>
        <img src="${project.thumb}" alt="${project.title}">
      </div>
      <div class="project-nav-meta">
        <span class="project-nav-label">${direction === 'prev' ? 'Previous' : 'Next'}</span>
        <span class="project-nav-title">${project.title}</span>
        <span class="project-nav-year">${project.year}</span>
      </div>
      <span class="project-nav-arrow">${direction === 'prev' ? '←' : '→'}</span>
    `;
    return card;
  }

  const nav = document.createElement('section');
  nav.className = 'project-nav';
  nav.setAttribute('aria-label', 'Project navigation');

  const inner = document.createElement('div');
  inner.className = 'project-nav-inner';

  inner.appendChild(createCard(prevProject, 'prev'));
  inner.appendChild(createCard(nextProject, 'next'));

  nav.appendChild(inner);
  projectPage.appendChild(nav);
});
