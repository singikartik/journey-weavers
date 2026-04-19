// v2.js — reveal on scroll, nav behavior, filter, gentle parallax
(function(){
  // nav color switching based on hero
  const nav = document.getElementById('v2-nav');
  const hero = document.getElementById('v2-hero');
  const onScroll = () => {
    const y = window.scrollY;
    if (hero) {
      const h = hero.offsetHeight;
      if (y > h - 80) { nav.classList.add('light'); } else { nav.classList.remove('light'); }
    }
    if (y > 40) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');

    // parallax hero bg
    const bg = document.querySelector('.v2-hero-bg');
    if (bg && y < window.innerHeight) {
      bg.style.transform = `scale(1.08) translateY(${y * 0.25}px)`;
    }
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Reveal on scroll — simple & reliable.
  const reveals = Array.from(document.querySelectorAll('.v2-reveal, .v2-reveal-img'));
  const checkReveals = () => {
    const wh = window.innerHeight;
    for (let i = reveals.length - 1; i >= 0; i--) {
      const el = reveals[i];
      const r = el.getBoundingClientRect();
      // Reveal if element is in viewport OR has scrolled past (above viewport).
      if (r.top < wh - 40) {
        el.classList.add('in');
        reveals.splice(i, 1);
      }
    }
  };
  checkReveals();
  window.addEventListener('scroll', checkReveals, {passive:true});
  window.addEventListener('resize', checkReveals);

  // filter chips
  const chips = document.querySelectorAll('.v2-chip');
  const cards = document.querySelectorAll('.v2-insp-card');
  chips.forEach(c => c.addEventListener('click', () => {
    chips.forEach(x => x.classList.remove('on'));
    c.classList.add('on');
    const tag = c.dataset.tag;
    cards.forEach(card => {
      const tags = (card.dataset.tags||'').split(',');
      const show = tag === 'all' || tags.includes(tag);
      card.style.display = show ? '' : 'none';
    });
  }));

  // mark hero bg as loaded after a tick
  requestAnimationFrame(() => {
    document.querySelectorAll('.v2-hero-bg').forEach(el => el.style.transform = 'scale(1.02)');
  });
})();
