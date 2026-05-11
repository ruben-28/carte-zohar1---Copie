/* ============================================================
   BAR MITSVAH ZOHAR ITSHAK - SCRIPT v2 (Polaroïd Edition)
   ============================================================ */

const CONFIG = {
  // ========== DATE PRINCIPALE ==========
  eventDate: new Date(2026, 7, 17, 18, 0, 0),

  // ========== HORAIRES ==========
  tefilinesTime: 'à 09H00',
  receptionTime: 'à partir de 09H00',

  // ========== LIEUX ==========
  tefilinesPlace: 'dans la salle MAKOM BAYAM',
  tefilinesAddress: 'Yekuti\'el Adam St 7", Ashkelon',
  receptionPlace: 'dans la salle MAKOM BAYAM',
  receptionAddressEn: 'Yekuti\'el Adam St 7", Ashkelon',
  receptionAddressHe: 'רח\' יקוטיאל אדם 7, אשקלון',

  // ========== LIENS WAZE ==========
  wazeTefilines: 'https://waze.com/ul/hsv8s62prn',
  wazeReception: 'https://waze.com/ul/hsv8s62prn',

  // ========== ÉVÉNEMENT (calendrier) ==========
  eventTitle: 'Bar Mitsvah de Zohar Itshak',
  eventDescription: 'Bar Mitsvah de Zohar Itshak - Mise des téfilines et réception',
  eventLocation: 'Salle XXXX, [adresse à compléter]',
  eventDurationHours: 5,

  // ========== PHOTO HÉRO (Polaroïd) ==========
  heroPhoto: 'assets/images/zohar.jpeg', // 738x1600
  heroPhotoCaption: 'Zohar · Été 2026',
  polaroidRotation: -3, // degrés

  // ========== PHOTOS DU CAROUSEL ==========
  photos: [
    { src: '', alt: 'Photo 1', label: 'Souvenir' },
    { src: '', alt: 'Photo 2', label: 'Souvenir' },
    { src: '', alt: 'Photo 3', label: 'Souvenir' },
    { src: '', alt: 'Photo 4', label: 'Souvenir' },
    { src: '', alt: 'Photo 5', label: 'Souvenir' },
    { src: '', alt: 'Photo 6', label: 'Souvenir' },
    { src: '', alt: 'Photo 7', label: 'Souvenir' },
    { src: '', alt: 'Photo 8', label: 'Souvenir' }
  ],

  // ========== AUDIO ==========
  audioPath: 'assets/audio/background.mp3',
  audioFadeInDuration: 3000,
  audioTargetVolume: 0.4,

  // ========== RSVP ==========
  rsvpEndpoint: '',

  loaderMinDuration: 1400
};

/* ============================================================
   TEXTES MODIFIABLES
   ============================================================ */
function initEditableTexts() {
  const updates = {
    tefilinesTime: CONFIG.tefilinesTime,
    tefilinesPlace: CONFIG.tefilinesPlace,
    tefilinesAddress: CONFIG.tefilinesAddress,
    receptionTime: CONFIG.receptionTime,
    receptionPlace: CONFIG.receptionPlace,
    receptionAddressEn: CONFIG.receptionAddressEn,
    receptionAddressHe: CONFIG.receptionAddressHe
  };
  for (const [id, value] of Object.entries(updates)) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }
  const wazeTef = document.getElementById('wazeTefilinesBtn');
  const wazeRec = document.getElementById('wazeReceptionBtn');
  if (wazeTef) wazeTef.href = CONFIG.wazeTefilines;
  if (wazeRec) wazeRec.href = CONFIG.wazeReception;
}

/* ============================================================
   PHOTO HÉRO - chargement + effet flou→net
   ============================================================ */
function initHeroPhoto() {
  const heroPhoto = document.getElementById('heroPhoto');
  const img = document.getElementById('heroPhotoImg');
  const placeholder = document.getElementById('heroPhotoPlaceholder');
  const captionEls = document.querySelectorAll('.hero-photo-caption');
  captionEls.forEach(el => el.textContent = CONFIG.heroPhotoCaption);

  // Définir le mini-médaillon de chaque section
  const thumbs = document.querySelectorAll('[data-thumb]');
  thumbs.forEach(t => {
    if (CONFIG.heroPhoto) {
      t.style.backgroundImage = `url("${CONFIG.heroPhoto}")`;
    } else {
      t.style.background = 'linear-gradient(135deg, var(--color-sand) 0%, var(--color-sea-light) 100%)';
    }
  });

  if (!CONFIG.heroPhoto) {
    img.style.display = 'none';
    heroPhoto.classList.add('loaded');
    return;
  }

  img.onload = () => {
    placeholder.style.display = 'none';
    setTimeout(() => heroPhoto.classList.add('loaded'), 100);
  };
  img.onerror = () => {
    img.style.display = 'none';
    heroPhoto.classList.add('loaded');
  };
  img.src = CONFIG.heroPhoto;
}

/* ============================================================
   LOADER
   ============================================================ */
function initLoader() {
  const loader = document.getElementById('loader');
  const start = performance.now();
  window.addEventListener('load', () => {
    const elapsed = performance.now() - start;
    const remaining = Math.max(0, CONFIG.loaderMinDuration - elapsed);
    setTimeout(() => loader.classList.add('hidden'), remaining);
  });
}

/* ============================================================
   OVERLAY + MORPHING POLAROÏD (Amélioration 5a)
   ============================================================ */
function initOverlay() {
  const overlay = document.getElementById('overlay');
  const openBtn = document.getElementById('openInvitationBtn');
  const invitation = document.getElementById('invitation');
  const musicBtn = document.getElementById('musicToggleBtn');
  const menuBtn = document.getElementById('menuToggleBtn');
  const heroPhoto = document.getElementById('heroPhoto');
  const polaroidWrapper = document.getElementById('polaroidWrapper');

  openBtn.addEventListener('click', () => {
    // 1. Préparer l'invitation (cachée mais mesurable)
    invitation.hidden = false;
    invitation.style.opacity = '0';

    // 2. Mesurer la position cible du polaroïd
    const targetRect = polaroidWrapper.getBoundingClientRect();
    const currentRect = heroPhoto.getBoundingClientRect();

    // 3. Définir les variables CSS pour la transition
    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height / 2;

    // Fixer la position initiale (avant morphing)
    heroPhoto.style.position = 'fixed';
    heroPhoto.style.top = (currentRect.top + currentRect.height / 2) + 'px';
    heroPhoto.style.left = (currentRect.left + currentRect.width / 2) + 'px';
    heroPhoto.style.transform = 'translate(-50%, -50%)';
    heroPhoto.style.width = currentRect.width + 'px';
    heroPhoto.style.height = currentRect.height + 'px';
    heroPhoto.style.margin = '0';

    // Forcer un reflow
    void heroPhoto.offsetHeight;

    // 4. Lancer le morphing
    heroPhoto.style.setProperty('--target-x', targetX + 'px');
    heroPhoto.style.setProperty('--target-y', targetY + 'px');
    heroPhoto.style.setProperty('--target-w', targetRect.width + 'px');
    heroPhoto.style.setProperty('--target-h', targetRect.height + 'px');
    heroPhoto.style.setProperty('--target-rotate', CONFIG.polaroidRotation + 'deg');
    heroPhoto.classList.add('morphing');

    // 5. Fade out overlay (background) tout en gardant la photo visible
    setTimeout(() => {
      overlay.classList.add('fading-out');
    }, 600);

    // 6. Faire apparaître progressivement l'invitation
    setTimeout(() => {
      invitation.style.transition = 'opacity 0.8s ease';
      invitation.style.opacity = '1';
    }, 700);

    // 7. Démarrer la musique
    audioModule.play();

    // 8. À la fin du morphing, placer le polaroïd dans son wrapper final et nettoyer
    setTimeout(() => {
      // Déplacer physiquement le polaroïd dans le wrapper
      polaroidWrapper.appendChild(heroPhoto);

      // Réinitialiser les styles inline et passer en mode "posé"
      heroPhoto.classList.remove('morphing');
      heroPhoto.classList.add('settled');
      heroPhoto.removeAttribute('style');

      // Afficher boutons flottants
      musicBtn.hidden = false;
      menuBtn.hidden = false;

      // Cacher l'overlay totalement
      overlay.style.display = 'none';

      // Lancer les reveals
      observeReveals();
      observeThumbs();
    }, 1500);
  });
}

/* ============================================================
   STYLES "SETTLED" (polaroïd posé)
   On les ajoute dynamiquement pour ne pas écraser le morphing
   ============================================================ */
function injectSettledStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .hero-photo.settled {
      width: 100%;
      height: 100%;
      margin: 0;
      transform: rotate(${CONFIG.polaroidRotation}deg);
      animation: polaroidFloat 6s ease-in-out infinite;
    }
    .hero-photo.settled .hero-photo-inner {
      border-radius: 4px;
      background: var(--color-paper);
      border: none;
      padding: 12px 12px 50px;
      box-shadow: var(--shadow-polaroid);
      filter: blur(0);
      width: 100%;
      height: 100%;
    }
    .hero-photo.settled .hero-photo-inner img,
    .hero-photo.settled .hero-photo-inner .hero-photo-placeholder {
      border-radius: 2px;
      width: calc(100% - 24px);
      height: calc(100% - 62px);
      position: absolute;
      top: 12px;
      left: 12px;
    }
    .hero-photo.settled .hero-photo-caption {
      opacity: 1;
      bottom: 16px;
      color: var(--color-text-soft);
      font-size: 1.2rem;
      font-family: var(--font-handwritten);
    }
    @keyframes polaroidFloat {
      0%, 100% { transform: rotate(${CONFIG.polaroidRotation}deg) translateY(0); }
      50% { transform: rotate(${CONFIG.polaroidRotation + 0.5}deg) translateY(-4px); }
    }
  `;
  document.head.appendChild(style);
}

/* ============================================================
   AUDIO
   ============================================================ */
const audioModule = (() => {
  const audio = document.getElementById('bgAudio');
  const btn = document.getElementById('musicToggleBtn');
  let isPlaying = false;
  let fadeInterval = null;

  function fadeIn() {
    audio.volume = 0;
    if (fadeInterval) clearInterval(fadeInterval);
    const steps = 30;
    const stepTime = CONFIG.audioFadeInDuration / steps;
    const volumeStep = CONFIG.audioTargetVolume / steps;
    let currentStep = 0;
    fadeInterval = setInterval(() => {
      currentStep++;
      audio.volume = Math.min(volumeStep * currentStep, CONFIG.audioTargetVolume);
      if (currentStep >= steps) clearInterval(fadeInterval);
    }, stepTime);
  }

  function fadeOut(callback) {
    if (fadeInterval) clearInterval(fadeInterval);
    const steps = 15;
    const stepTime = 500 / steps;
    const startVolume = audio.volume;
    let currentStep = 0;
    fadeInterval = setInterval(() => {
      currentStep++;
      audio.volume = Math.max(0, startVolume - (startVolume / steps) * currentStep);
      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        if (callback) callback();
      }
    }, stepTime);
  }

  function play() {
    const promise = audio.play();
    if (promise !== undefined) {
      promise
        .then(() => { isPlaying = true; btn.classList.remove('muted'); fadeIn(); })
        .catch(() => { isPlaying = false; btn.classList.add('muted'); });
    }
  }

  function toggle() {
    if (isPlaying) {
      fadeOut(() => { audio.pause(); isPlaying = false; btn.classList.add('muted'); });
    } else {
      play();
    }
  }

  function init() { btn.addEventListener('click', toggle); }
  return { init, play, toggle };
})();

/* ============================================================
   COUNTDOWN
   ============================================================ */
function initCountdown() {
  const dEl = document.getElementById('cdDays');
  const hEl = document.getElementById('cdHours');
  const mEl = document.getElementById('cdMinutes');
  const sEl = document.getElementById('cdSeconds');

  function update() {
    const diff = CONFIG.eventDate - new Date();
    if (diff <= 0) {
      dEl.textContent = '00'; hEl.textContent = '00'; mEl.textContent = '00'; sEl.textContent = '00';
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    dEl.textContent = String(days).padStart(2, '0');
    hEl.textContent = String(hours).padStart(2, '0');
    mEl.textContent = String(minutes).padStart(2, '0');
    sEl.textContent = String(seconds).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}

/* ============================================================
   CALENDRIER
   ============================================================ */
function initCalendar() {
  const btn = document.getElementById('addToCalendarBtn');
  const menu = document.getElementById('calendarMenu');
  btn.addEventListener('click', () => menu.classList.toggle('open'));

  menu.querySelectorAll('.calendar-option').forEach((opt) => {
    opt.addEventListener('click', () => {
      const type = opt.dataset.cal;
      const start = CONFIG.eventDate;
      const end = new Date(start.getTime() + CONFIG.eventDurationHours * 3600 * 1000);
      const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

      if (type === 'google') {
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
          `&text=${encodeURIComponent(CONFIG.eventTitle)}` +
          `&dates=${fmt(start)}/${fmt(end)}` +
          `&details=${encodeURIComponent(CONFIG.eventDescription)}` +
          `&location=${encodeURIComponent(CONFIG.eventLocation)}`;
        window.open(url, '_blank');
      } else if (type === 'outlook') {
        const url = `https://outlook.live.com/calendar/0/deeplink/compose?` +
          `path=/calendar/action/compose&rru=addevent` +
          `&subject=${encodeURIComponent(CONFIG.eventTitle)}` +
          `&startdt=${start.toISOString()}` +
          `&enddt=${end.toISOString()}` +
          `&body=${encodeURIComponent(CONFIG.eventDescription)}` +
          `&location=${encodeURIComponent(CONFIG.eventLocation)}`;
        window.open(url, '_blank');
      } else if (type === 'apple') {
        const ics = [
          'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Bar Mitsvah Zohar//FR',
          'BEGIN:VEVENT',`UID:${Date.now()}@bar-mitsvah-zohar`,
          `DTSTAMP:${fmt(new Date())}`,`DTSTART:${fmt(start)}`,`DTEND:${fmt(end)}`,
          `SUMMARY:${CONFIG.eventTitle}`,`DESCRIPTION:${CONFIG.eventDescription}`,
          `LOCATION:${CONFIG.eventLocation}`,'END:VEVENT','END:VCALENDAR'
        ].join('\r\n');
        const blob = new Blob([ics], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'bar-mitsvah-zohar.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
      menu.classList.remove('open');
    });
  });
}

/* ============================================================
   MENU
   ============================================================ */
function initMenu() {
  const menuBtn = document.getElementById('menuToggleBtn');
  const navMenu = document.getElementById('navMenu');
  const closeBtn = document.getElementById('navCloseBtn');
  const links = navMenu.querySelectorAll('.nav-link');

  function openMenu() { navMenu.classList.add('open'); menuBtn.classList.add('open'); navMenu.setAttribute('aria-hidden', 'false'); }
  function closeMenu() { navMenu.classList.remove('open'); menuBtn.classList.remove('open'); navMenu.setAttribute('aria-hidden', 'true'); }

  menuBtn.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) closeMenu();
    else openMenu();
  });
  closeBtn.addEventListener('click', closeMenu);
  links.forEach((l) => l.addEventListener('click', closeMenu));
}

/* ============================================================
   CAROUSEL
   ============================================================ */
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  let currentIndex = 0;
  const total = CONFIG.photos.length;

  CONFIG.photos.forEach((photo, idx) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    if (photo.src) {
      const img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.alt || `Photo ${idx + 1}`;
      img.loading = 'lazy';
      slide.appendChild(img);
    } else {
      const ph = document.createElement('div');
      ph.className = 'carousel-placeholder';
      ph.innerHTML = `<span>📸</span>${photo.label || 'Photo à venir'}`;
      slide.appendChild(ph);
    }
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Aller à la photo ${idx + 1}`);
    dot.addEventListener('click', () => goTo(idx));
    dotsContainer.appendChild(dot);
  });

  function update() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }
  function goTo(idx) { currentIndex = (idx + total) % total; update(); }
  function next() { goTo(currentIndex + 1); }
  function prev() { goTo(currentIndex - 1); }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  let startX = 0, endX = 0, isSwiping = false;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; isSwiping = true; }, { passive: true });
  track.addEventListener('touchmove', (e) => { if (!isSwiping) return; endX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', () => {
    if (!isSwiping) return;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) { if (diff > 0) next(); else prev(); }
    isSwiping = false; startX = 0; endX = 0;
  });
}

/* ============================================================
   RSVP
   ============================================================ */
function initRSVP() {
  const form = document.getElementById('rsvpForm');
  const feedback = document.getElementById('formFeedback');

  function setError(name, message) {
    const errEl = form.querySelector(`[data-error-for="${name}"]`);
    if (errEl) errEl.textContent = message;
    const group = form.querySelector(`#${name}`)?.closest('.form-group') ||
                  form.querySelector(`[name="${name}"]`)?.closest('.form-group');
    if (group) group.classList.toggle('error', !!message);
  }
  function clearErrors() {
    form.querySelectorAll('.form-error').forEach((e) => (e.textContent = ''));
    form.querySelectorAll('.form-group').forEach((g) => g.classList.remove('error'));
    feedback.textContent = '';
    feedback.classList.remove('success');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const data = {
      fullName: form.fullName.value.trim(),
      guestCount: form.guestCount.value,
      tefilines: form.tefilines.value || '',
      reception: form.reception.value || '',
      message: form.message.value.trim()
    };

    let hasError = false;
    if (!data.fullName) { setError('fullName', 'Merci d\'indiquer votre nom complet'); hasError = true; }
    if (!data.guestCount || data.guestCount < 1) { setError('guestCount', 'Indiquez au moins 1 personne'); hasError = true; }
    if (data.guestCount > 20) { setError('guestCount', 'Maximum 20 personnes'); hasError = true; }
    if (!data.tefilines) { setError('tefilines', 'Merci de préciser votre présence'); hasError = true; }
    if (!data.reception) { setError('reception', 'Merci de préciser votre présence'); hasError = true; }

    if (hasError) { feedback.textContent = 'Merci de compléter les champs requis'; return; }

    feedback.textContent = 'Envoi en cours…';

    try {
      if (CONFIG.rsvpEndpoint) {
        const res = await fetch(CONFIG.rsvpEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Erreur réseau');
      } else {
        console.log('RSVP reçu (à connecter à un backend):', data);
        await new Promise((r) => setTimeout(r, 600));
      }
      feedback.textContent = `Merci ${data.fullName.split(' ')[0]} ! Votre réponse a bien été enregistrée.`;
      feedback.classList.add('success');
      form.reset();
      launchConfetti();
    } catch (err) {
      feedback.textContent = 'Une erreur est survenue. Merci de réessayer.';
      console.error(err);
    }
  });
}

/* ============================================================
   CONFETTIS DORÉS
   ============================================================ */
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#C9A96E', '#E0C28E', '#F4E8D0', '#7FB3B8', '#FFFFFF'];
  const particles = [];
  const count = 80;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.3,
      size: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 3,
      rotation: Math.random() * Math.PI * 2,
      vRotation: (Math.random() - 0.5) * 0.2,
      opacity: 1
    });
  }

  let frame = 0;
  const maxFrames = 200;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.03;
      p.rotation += p.vRotation;
      if (frame > 100) p.opacity = Math.max(0, p.opacity - 0.012);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    frame++;
    if (frame < maxFrames) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  animate();
}

/* ============================================================
   PARALLAX
   ============================================================ */
function initParallax() {
  const sun = document.querySelector('.parallax-sun');
  const waves = document.querySelector('.parallax-waves');
  if (!sun || !waves) return;
  let ticking = false;
  function update() {
    const y = window.scrollY;
    sun.style.transform = `translateY(${y * 0.15}px)`;
    waves.style.transform = `translateY(${y * 0.08}px)`;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
}

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
function observeReveals() {
  const elements = document.querySelectorAll('.reveal:not(.visible)');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0, 10);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  elements.forEach((el) => observer.observe(el));
}

/* ============================================================
   MINI MÉDAILLON PHOTO EN HAUT DE SECTION
   ============================================================ */
function observeThumbs() {
  const thumbs = document.querySelectorAll('.section-thumb');
  if (!('IntersectionObserver' in window)) {
    thumbs.forEach((el) => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  thumbs.forEach((el) => observer.observe(el));
}

/* ============================================================
   INITIALISATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  injectSettledStyles();
  initEditableTexts();
  initHeroPhoto();
  initLoader();
  initOverlay();
  audioModule.init();
  initCountdown();
  initCalendar();
  initMenu();
  initCarousel();
  initRSVP();
  initParallax();
});