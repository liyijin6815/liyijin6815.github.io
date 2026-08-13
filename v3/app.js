if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.7 } });

const progressBar = document.getElementById('progressBar');
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('is-visible');
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobileNav');
const closeMenu = () => {
  mobileNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = menuToggle.dataset.openLabel;
};
menuToggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? menuToggle.dataset.closeLabel : menuToggle.dataset.openLabel;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav a');
const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
  });
}), { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => navObserver.observe(section));

const projectStrip = document.getElementById('projectStrip');
projectStrip.addEventListener('wheel', event => {
  if (event.shiftKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
  const direction = Math.sign(event.deltaY);
  const canMove = direction > 0
    ? projectStrip.scrollLeft + projectStrip.clientWidth < projectStrip.scrollWidth - 1
    : projectStrip.scrollLeft > 1;
  if (!canMove) return;
  event.preventDefault();
  projectStrip.scrollBy({ left: event.deltaY, behavior: 'smooth' });
}, { passive: false });

const publicationItems = [...document.querySelectorAll('.publication')];
const publicationButtons = [...document.querySelectorAll('.pub-filter')];
const publicationList = document.getElementById('publicationList');
const publicationStatus = document.getElementById('publicationStatus');
const publicationCounts = {
  all: publicationItems.length,
  journal: publicationItems.filter(item => item.dataset.type === 'journal').length,
  conference: publicationItems.filter(item => item.dataset.type === 'conference').length,
  abstract: publicationItems.filter(item => item.dataset.type === 'abstract').length,
  first: publicationItems.filter(item => item.dataset.first === 'true').length
};
publicationButtons.forEach(button => {
  button.querySelector('span').textContent = publicationCounts[button.dataset.filter];
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    publicationButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    publicationItems.forEach(item => {
      const show = filter === 'all' || (filter === 'first'
        ? item.dataset.first === 'true'
        : item.dataset.type === filter);
      item.hidden = !show;
      visible += Number(show);
    });
    publicationList.scrollTop = 0;
    publicationStatus.textContent = `Showing ${visible} publications.`;
  });
});

const projectDetails = Object.fromEntries(JSON.parse(document.getElementById('projectData').textContent)
  .map(project => [project.id, project]));
const projectDialog = document.getElementById('projectDialog');
const dialogClose = projectDialog.querySelector('.dialog-close');
const dialogVisual = projectDialog.querySelector('.dialog-visual');
const dialogImage = document.getElementById('dialogImage');
const dialogKicker = document.getElementById('dialogKicker');
const dialogTitle = document.getElementById('dialogTitle');
const dialogDescription = document.getElementById('dialogDescription');
const dialogOutputs = document.getElementById('dialogOutputs');
let projectOpener = null;

const closeProject = () => {
  if (!projectDialog.open) return;
  projectDialog.close();
  document.body.classList.remove('dialog-open');
  projectOpener?.focus();
};

document.querySelectorAll('.project-highlight').forEach(button => button.addEventListener('click', () => {
  const project = projectDetails[button.dataset.project];
  if (!project) return;
  projectOpener = button;
  dialogKicker.textContent = project.kicker;
  dialogTitle.textContent = project.title;
  dialogDescription.textContent = project.description;
  dialogOutputs.replaceChildren(...project.outputs.map(output => {
    const item = document.createElement('li');
    item.textContent = output;
    return item;
  }));
  dialogVisual.classList.toggle('is-placeholder', !project.image);
  dialogImage.src = project.image || '';
  dialogImage.alt = project.image_alt || '';
  projectDialog.showModal();
  document.body.classList.add('dialog-open');
}));

dialogClose.addEventListener('click', closeProject);
projectDialog.addEventListener('click', event => { if (event.target === projectDialog) closeProject(); });
projectDialog.addEventListener('cancel', event => { event.preventDefault(); closeProject(); });
