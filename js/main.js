(function () {
  document.documentElement.classList.add('js-ready');
  document.body.classList.add('js-ready');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

  setTimeout(() => {
    document.querySelectorAll('.fade-in:not(.is-visible)').forEach((el) => {
      el.classList.add('is-visible');
    });
  }, 2500);

  const patterns = document.querySelector('#pattern-arcs');
  if (patterns) {
    const P = {
      img1: { x: 75, y: 22 },
      img2: { x: 22, y: 70 },
      img3: { x: 14, y: 28 },
      img4: { x: 38, y: 38 },
      img5: { x: 72, y: 78 },
    };

    function arc(start, end, control, color) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', '1.2');
      path.setAttribute('stroke-dasharray', '3 2.5');
      path.setAttribute('opacity', '0.7');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('vector-effect', 'non-scaling-stroke');
      return path;
    }

    patterns.appendChild(arc(P.img1, P.img5, { x: 88, y: 50 }, 'var(--p-response)'));
    patterns.appendChild(arc(P.img3, P.img1, { x: 44, y: 8 }, 'var(--p-vertical)'));
    patterns.appendChild(arc(P.img2, P.img5, { x: 47, y: 92 }, 'var(--p-scale)'));
  }
})();
