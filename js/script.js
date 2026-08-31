const dataSkills = ['SQL', 'Power BI', 'Excel (Advanced)', 'Tableau', 'Data Visualisation'];
const progSkills = ['Python', 'Pandas', 'R', 'MySQL', 'VBA'];
const toolSkills = ['Git & GitHub', 'Azure', 'Jupyter Notebook', 'Jira', 'Google Cloud', 'Data Studio'];
const softSkills = ['Statistical Analysis', 'Stakeholder Reporting', 'Problem Solving', 'Communication', 'Teamwork'];

const projects = [
  {
    title: 'Breathing Inequality - Global Air Quality Dashboard',
    status: 'Complete',
    overview: 'A geographic analytics project that takes a raw, city-level global air quality dataset and turns it into a map-based visual narrative - cleaning and aggregating the data, iterating through prototype map designs, and finishing with an interactive Plotly dashboard highlighting where pollution is worst and why.',
    brief: 'Mapping global air quality city-by-city to reveal where pollution is worst.',
    problem: 'Air pollution is a leading global health risk, but its severity varies hugely by city and region. Simple country-level averages hide where the real danger is concentrated, making it hard to see which cities and populations face the greatest exposure risk.',
    approach: [
      'Cleaned and aggregated the raw Kaggle "World Air Quality Index by City and Coordinates" dataset - removing 302 rows with missing country data and consolidating duplicates into 13,956 unique city records across 174 countries',
      'Prototyped and evaluated two earlier map designs (a country-level choropleth, then a one-city-per-country bubble map) to identify their limitations before settling on a final approach',
      'Built a final categorical bubble map in Plotly using stratified sampling (1,169 cities) - colour encodes WHO/EPA health category, size encodes average AQI - with interactive filters for country, region, and AQI level',
      'Supported the map with additional analysis: top/bottom 20 city rankings, a pollutant correlation scatter plot, and a country-level regional box plot',
    ],
    dataset: 'World Air Quality Index by City and Coordinates - Kaggle',
    tools: 'Google Colab (Python), Plotly, Excel/pandas for cleaning',
    findings: 'PM2.5 has by far the strongest correlation with overall AQI (r = 0.980), well ahead of CO (0.495), ozone (0.348), and NO2 (0.308). A 493-point gap separates the cleanest city (Macas, Ecuador, AQI 7) from the most polluted cities (multiple cities at the scale ceiling of 500, including Delhi). On a country-level basis, the Middle East has the highest regional average AQI (136.6), followed by Asia (92.0) and Africa (78.8) - but every region contains at least one city above the "Good" threshold, showing pollution is geographically uneven but not confined to one region.',
    link: 'TBC',
  },
  {
    title: 'T-Level Outcomes Dashboard',
    status: 'Complete',
    overview: "An end-to-end analytics pipeline that takes DfE's published national T Level results and turns it into a decision-ready recruitment evidence base for Ada Manchester - cleaning and validating in Python, storing in Google Sheets, and finishing in Looker Studio for visualisation and reporting.",
    brief: "Turning DfE's national T Level results into recruitment evidence for Ada Manchester.",
    problem: "Ada Manchester needs to reassure prospective students and families that its Digital T Level pathways lead somewhere good - specifically, that fast enrolment growth hasn't come at the cost of outcome quality - but there was no structured, data-driven way to answer that question before now.",
    approach: [
      "Cleaned and validated 1,071 rows of raw DfE data in Python/pandas (dropping constant columns, checking pathway/sex categories against DfE's published lists, replacing 'z' placeholders, reshaping long-to-wide)",
      'Calculated Merit-or-above and Unclassified rates per Digital pathway per year, flagging small cohorts (<100 students) so noisy rates aren\'t misread as trends',
      'Validated the pipeline with a 10-test pytest suite covering nulls, types, ranges, duplicates, and edge cases (corrupted pathway names, negative counts)',
      "Built an interactive Looker Studio dashboard surfacing enrolment growth, grade outcomes over time, latest-year snapshots, and a scale-vs-quality check, for Ada's outreach and admissions teams",
    ],
    dataset: 'DfE "Overall T Level results" (2021/22-2024/25), 1,071 rows, published under the Open Government Licence',
    tools: 'Python (pandas), Google Sheets, Google Looker Studio, pytest',
    findings: "56.34% of Digital pathway students achieved Merit or above across the four years - 10.5 points below the all-T-Level national average - and under 0.5% received an Unclassified result. There's no consistent link between faster enrolment growth and worse outcomes: the pathway that scaled fastest (Digital Production, 331 to 1,472 students) dipped mid-rollout before recovering, tracking the same pattern as the national average.",
    link: 'https://datastudio.google.com/reporting/b9221ea7-35ba-40b6-9fd1-4b45f6f32a4',
  },
];

function renderTags(id, list) {
  const el = document.getElementById(id);
  el.innerHTML = list.map((s) => `<span class="skill-tag">${s}</span>`).join('');
}

renderTags('dataSkills', dataSkills);
renderTags('progSkills', progSkills);
renderTags('toolSkills', toolSkills);
renderTags('softSkills', softSkills);

const projectRow = document.getElementById('projectRow');
projects.forEach((proj, i) => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `
    <span class="status-pill">${proj.status}</span>
    <h3>${proj.title}</h3>
    <p>${proj.brief}</p>
  `;
  card.addEventListener('click', () => openModal(i));
  projectRow.appendChild(card);
});

const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');

function openModal(i) {
  const p = projects[i];
  document.getElementById('modalStatus').textContent = p.status;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalOverview').textContent = p.overview;
  document.getElementById('modalProblem').textContent = p.problem;
  document.getElementById('modalApproach').innerHTML = p.approach.map((s) => `<li>${s}</li>`).join('');
  document.getElementById('modalDataset').textContent = p.dataset;
  document.getElementById('modalTools').textContent = p.tools;
  document.getElementById('modalFindings').textContent = p.findings;
  document.getElementById('modalLink').textContent = p.link;
  modalOverlay.classList.add('open');
}

function closeModal() {
  modalOverlay.classList.remove('open');
}

modalOverlay.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => e.stopPropagation());
document.getElementById('modalClose').addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const id = link.dataset.target;
    const el = document.getElementById(id);
    if (!el) return;
    const targetY = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  });
});

// Scroll-spy active nav state
const navLinks = document.querySelectorAll('.nav-link');
const sections = ['home', 'about', 'skills', 'projects', 'connect']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visible[0]) {
      const activeId = visible[0].target.id;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.dataset.target === activeId);
      });
    }
  },
  { threshold: [0.3, 0.5, 0.7], rootMargin: '-30% 0px -40% 0px' }
);

sections.forEach((s) => observer.observe(s));

// Contact form -> mailto
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('formName').value;
  const email = document.getElementById('formEmail').value;
  const message = document.getElementById('formMessage').value;
  const subject = encodeURIComponent(`Portfolio enquiry from ${name || 'a visitor'}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:amitgrg260@gmail.com?subject=${subject}&body=${body}`;
});
