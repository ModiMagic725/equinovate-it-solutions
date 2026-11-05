/* Set your form service URL here (Formspree / Web3Forms / Apps Script). Empty = demo mode. */
const ENDPOINT = '';
const $ = (s) => document.querySelector(s);
const img = (n, a = '') => `<img src="assets/img/${n}.jpg" alt="${a}" loading="lazy" decoding="async">`;
const put = (id, arr, fn) => { $(id).innerHTML = arr.map((x, i) => fn(x, i)).join(''); };

put('#strip', [['☁️', 'Cloud Web + Mobile', 'Access from anywhere'], ['🏢', 'Multi-Branch Support', 'Manage all locations'], ['🔒', 'Secure & Scalable', 'Enterprise-grade security'], ['⚙️', 'Customizable', 'As per your business needs'], ['📊', 'Real-time Reports', 'Actionable insights'], ['🎧', 'Dedicated Support', 'We’re always here']],
  ([i, t, d], n) => `<div class="si rv" style="--i:${n}"><i>${i}</i><div><b>${t}</b><span>${d}</span></div></div>`);

const prod = (c) => ([ic, t, d, im], n) => `<article class="pc rv" style="--i:${n};--c:${c[n % c.length]}"><span class="ic">${ic}</span><div><h4>${t}</h4><p>${d}</p></div><div class="t">${img(im, t)}</div><a class="lk" href="#contact">View Features</a></article>`;
put('#p1', [['👥', 'HRMS', 'Complete HR, payroll, attendance and employee management.', 'hrms'], ['👷', 'Contractor & Labour Management', 'Manage contractors, labour registration and work orders.', 'contractor'], ['🍴', 'Canteen Management', 'Smart canteen operations with biometric integration and subsidy handling.', 'canteen'], ['🪪', 'Visitor Management', 'Secure and digital visitor management with QR code and notifications.', 'visitor'], ['🖥️', 'Asset Management', 'Track and manage your assets with maintenance, warranty and lifecycle.', 'asset']],
  prod(['#e3eeff', '#ffeccc', '#ffe3e3', '#efe5ff', '#dff7e6']));
put('#p2', [['📦', 'Inventory Management', 'Purchase, sales, stock and multi-warehouse management.', 'inventory'], ['🚚', 'Vehicle Management', 'Complete fleet and vehicle operations with maintenance tracking.', 'vehicle'], ['🏋️', 'Gym & Club Membership', 'Manage memberships, access control, payments and attendance.', 'gym'], ['✂️', 'Salon Management', 'Manage appointments, services, staff and memberships.', 'salon'], ['🎓', 'School ERP', 'Complete school management for academic and administrative operations.', 'school'], ['🧩', 'Custom ERP Solution', 'Industry-specific ERP built for your unique business requirement.', 'erp']],
  prod(['#ffe9cf', '#e3eeff', '#ffe3e3', '#ffe3e3', '#e3eeff', '#efe5ff']));

put('#why', [['🎯', 'Business-Focused', 'Software designed around your processes.'], ['⚙️', 'Customizable', 'Adapt the system as your business grows.'], ['📱', 'Cross-Platform', 'Web, Windows, macOS, Android & iOS.'], ['🎧', 'Reliable Support', 'Support beyond implementation.']],
  ([i, t, d], n) => `<div class="wc rv" style="--i:${n}"><i>${i}</i><div><h4>${t}</h4><p>${d}</p></div></div>`);
put('#ind', ['Manufacturing', 'Corporate Offices', 'Contractors & Projects', 'Retail & Distribution', 'Schools & Educational Institutions', 'Gyms & Clubs', 'Healthcare', 'Service Businesses'],
  (t, n) => `<div class="in1 rv" style="--i:${n}"><div>${img('i' + (n + 1), t)}</div>${t}</div>`);
put('#cs', [['c1', 'Manufacturing', 'End-to-End Manufacturing ERP', 'Automated inventory, production and dispatch processes.'], ['c2', 'Canteen Management', '', 'Digitized canteen operations with biometric integration and subsidy handling.'], ['c3', 'Gym & Club Management', '', 'Membership management with biometric access and online payments.']],
  ([im, s, t, d], n) => `<article class="cc rv" style="--i:${n}">${img(im, s)}<div><small>${s}</small>${t ? `<h4>${t}</h4>` : ''}<p>${d}</p><a href="#contact">Read Case Study</a></div></article>`);

/* scroll reveal */
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -30px' });
document.querySelectorAll('.rv').forEach((el) => io.observe(el));

/* nav: shadow on scroll, mobile menu, active link */
const nav = $('#nav'), menu = $('#menu'), mb = $('#mb');
addEventListener('scroll', () => nav.classList.toggle('sc', scrollY > 8), { passive: true });
const shut = () => { menu.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); };
mb.onclick = () => mb.setAttribute('aria-expanded', menu.classList.toggle('open'));
menu.onclick = (e) => { if (e.target.closest('a')) shut(); };
addEventListener('keydown', (e) => e.key === 'Escape' && shut());
const links = [...menu.querySelectorAll('a:not(.btn)')];
const so = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-40% 0px -55%' });
links.forEach((a) => { const s = document.getElementById(a.getAttribute('href').slice(1)); s && so.observe(s); });

/* form */
$('#f').onsubmit = async (e) => {
  e.preventDefault();
  const f = e.target, st = $('#st'), b = f.querySelector('button');
  const bad = [...f.querySelectorAll('[required]')].filter((i) => { const v = !i.value.trim() || (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value)); i.setAttribute('aria-invalid', v); return v; });
  if (bad.length) { st.textContent = 'Please fill the required fields correctly.'; bad[0].focus(); return; }
  if (!ENDPOINT) { st.textContent = 'Form is not connected yet. Set ENDPOINT in main.js.'; return; }
  b.disabled = true; st.textContent = 'Sending…';
  try {
    const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(f))) });
    if (!r.ok) throw 0; f.reset(); st.textContent = 'Thank you! We will contact you shortly.';
  } catch { st.textContent = 'Something went wrong. Please try again.'; }
  b.disabled = false;
};
