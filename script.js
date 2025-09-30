const products = [
  {
    name: 'ThinkSystem SR650 V3',
    category: 'ISG',
    description: 'Servidor en rack 2U optimizado para cargas mixtas y virtualización masiva.',
    price: 'Desde $8,500',
    tags: ['Intel Xeon', 'VMware Ready', 'HCI'],
  },
  {
    name: 'ThinkAgile HX Series',
    category: 'ISG',
    description: 'Plataforma hiperconvergente co-diseñada con Nutanix para nube híbrida.',
    price: 'Desde $11,200',
    tags: ['Hiperconvergencia', 'Escalabilidad', 'Nutanix'],
  },
  {
    name: 'ThinkEdge SE450',
    category: 'ISG',
    description: 'Servidor compacto para edge AI con GPU NVIDIA y tolerancia industrial.',
    price: 'Desde $6,900',
    tags: ['Edge', 'IA', 'GPU'],
  },
  {
    name: 'ThinkPad X1 Carbon Gen 11',
    category: 'IDG',
    description: 'Ultrabook premium con certificaciones Intel vPro y Lenovo ThinkShield.',
    price: 'Desde $1,750',
    tags: ['Trabajo híbrido', 'vPro', 'ThinkShield'],
  },
  {
    name: 'ThinkStation P16',
    category: 'IDG',
    description: 'Workstation certificada ISV para ingeniería, render y data science.',
    price: 'Desde $4,200',
    tags: ['ISV', 'NVIDIA RTX', 'AMD Threadripper'],
  },
  {
    name: 'ThinkSmart Hub',
    category: 'IDG',
    description: 'Solución de colaboración todo-en-uno para salas de reunión híbridas.',
    price: 'Desde $3,100',
    tags: ['Collab', 'Microsoft Teams', 'Zoom'],
  },
  {
    name: 'Lenovo TruScale IaaS',
    category: 'Servicios',
    description: 'Infraestructura bajo consumo con pago por uso y soporte gestionado.',
    price: 'Modelo suscripción',
    tags: ['As-a-Service', 'Opex', 'SLA'],
  },
  {
    name: 'Premier Support Plus',
    category: 'Servicios',
    description: 'Atención prioritaria 24/7, monitoreo proactivo y protección avanzada.',
    price: 'Planes personalizados',
    tags: ['Soporte', 'Seguridad', 'Garantía'],
  },
];

const catalogGrid = document.getElementById('catalog-grid');
const filterButtons = document.querySelectorAll('.filter-button');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterFeedback = document.getElementById('newsletter-feedback');
const contactForm = document.getElementById('contact-form');
const contactFeedback = document.getElementById('contact-feedback');

function createProductCard(product) {
  const article = document.createElement('article');
  article.className = 'product-card';

  const badge = document.createElement('span');
  badge.className = 'product-card__badge';
  badge.textContent = product.category;

  const title = document.createElement('h3');
  title.textContent = product.name;

  const description = document.createElement('p');
  description.textContent = product.description;

  const tagsContainer = document.createElement('div');
  tagsContainer.className = 'product-card__tags';

  product.tags.forEach((tag) => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  const footer = document.createElement('div');
  footer.className = 'product-card__footer';

  const price = document.createElement('span');
  price.className = 'product-card__price';
  price.textContent = product.price;

  const cta = document.createElement('a');
  cta.href = '#contacto';
  cta.className = 'product-card__cta';
  cta.textContent = 'Cotizar';

  footer.append(price, cta);
  article.append(badge, title, description, tagsContainer, footer);

  return article;
}

function renderCatalog(filter = 'all') {
  catalogGrid.innerHTML = '';
  const filtered =
    filter === 'all' ? products : products.filter((item) => item.category === filter);

  if (!filtered.length) {
    const empty = document.createElement('p');
    empty.textContent = 'No hay productos disponibles para esta categoría en este momento.';
    catalogGrid.appendChild(empty);
    return;
  }

  filtered.forEach((product) => {
    catalogGrid.appendChild(createProductCard(product));
  });
}

function handleFilterClick(event) {
  const button = event.currentTarget;
  const filter = button.dataset.filter;

  filterButtons.forEach((btn) => btn.classList.remove('is-active'));
  button.classList.add('is-active');

  renderCatalog(filter);
}

filterButtons.forEach((button) => button.addEventListener('click', handleFilterClick));
renderCatalog();

newsletterForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(newsletterForm);
  const email = (formData.get('email') || '').toString().trim();

  if (!email) {
    newsletterFeedback.textContent = 'Ingresa un correo corporativo válido para continuar.';
    newsletterFeedback.style.color = 'var(--color-primary)';
    return;
  }

  newsletterFeedback.textContent = '¡Gracias! Hemos registrado tu suscripción corporativa.';
  newsletterFeedback.style.color = 'var(--color-success)';

  newsletterForm.reset();

  setTimeout(() => {
    newsletterFeedback.textContent = '';
  }, 5000);
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const company = formData.get('company');
  const segment = formData.get('segment');

  if (!name || !company || !segment) {
    contactFeedback.textContent = 'Por favor completa los campos obligatorios.';
    contactFeedback.style.color = 'var(--color-primary)';
    return;
  }

  contactFeedback.textContent = '¡Solicitud enviada! Nuestro equipo corporativo te contactará en breve.';
  contactFeedback.style.color = 'var(--color-success)';

  contactForm.reset();

  setTimeout(() => {
    contactFeedback.textContent = '';
  }, 6000);
});
