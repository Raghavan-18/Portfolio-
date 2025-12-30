// Smooth Scroll + Active Nav Link
const navLinks = document.querySelectorAll('.nav-link');
const sections = [...document.querySelectorAll('section')];

navLinks.forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href');
    document.querySelector(id)?.scrollIntoView({behavior:'smooth'});
  });
});

function setActive() {
  const y = scrollY + 120;
  let current = sections[0].id;

  sections.forEach(s=>{
    if (y >= s.offsetTop) current = s.id;
  });

  navLinks.forEach(a=>{
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}
addEventListener('scroll', setActive);
setActive();

// Reveal On Scroll
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
},{threshold:.2});

document.querySelectorAll('.fade-up').forEach(el=> io.observe(el));

// Hero Typing Effect
(() => {
  const title = document.querySelector('.hero-title');
  if (!title) return;

  const nodes = [...title.childNodes];
  title.innerHTML = '';

  const type = (node, cb) => {
    if (node.nodeType === Node.TEXT_NODE) {
      let txt = node.textContent, i = 0;

      const tick = () => {
        if (i < txt.length) {
          title.append(txt[i++]);
          setTimeout(tick, 30);
        } else cb();
      };
      tick();
    } else {
      const span = node.cloneNode(true);
      span.textContent = '';
      title.appendChild(span);

      let txt = node.textContent, i = 0;

      const tick = () => {
        if (i < txt.length) {
          span.textContent += txt[i++];
          setTimeout(tick, 35);
        } else cb();
      };
      tick();
    }
  };

  const run = (i = 0) => {
    if (i >= nodes.length) return;
    type(nodes[i], () => run(i + 1));
  };

  setTimeout(run, 250);
})();

// Contact Form
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.target);
  alert(`Thanks, ${data.get('name')}! I'll reach out soon.`);
  e.target.reset();
});

// Footer Year
document.getElementById('year').textContent = new Date().getFullYear();
