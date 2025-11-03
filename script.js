// Tumšā režīma pārslēgšana
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  
  if (document.body.classList.contains("dark-mode")) {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// Saglabātā režīma ielāde
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
}

// Animācijas elementiem, kad tie parādās ekrānā
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Novērot visus elementus, kuriem jābūt animētiem
document.querySelectorAll('.card, .about').forEach(el => {
  observer.observe(el);
});

// Gluda ritināšana uz sadaļām
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if(targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if(targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// =============================
// 🔹 Dinamiska kartīšu ģenerēšana
// =============================
const products = [
  {
    title: "Galdiņš pie loga",
    text: "Ideāli piemērots romantiskam vakaram ar skatu uz pilsētu.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1350&q=80"
  },
  {
    title: "Lielais galds",
    text: "Piemērots draugu kompānijai vai ģimenes vakariņām.",
    img: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1350&q=80"
  },
  {
    title: "VIP zona",
    text: "Privātība un elegance īpašiem dzīves mirkļiem.",
    img: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1350&q=80"
  }
];

const cardsContainer = document.querySelector(".cards");

function renderCards(items) {
  cardsContainer.innerHTML = ""; // Notīra vecās kartītes
  items.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div class="card-content">
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <button>Rezervēt</button>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}

renderCards(products); // Izveido sākotnējās kartītes

// =============================
// 🔹 Meklēšana / Filtrēšana
// =============================
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(query) ||
    p.text.toLowerCase().includes(query)
  );
  renderCards(filtered);
});

// =============================
// 🔹 Kārtošana (A-Z un Z-A)
// =============================
document.getElementById("sortAZ").addEventListener("click", () => {
  const sorted = [...products].sort((a, b) => a.title.localeCompare(b.title));
  renderCards(sorted);
});

document.getElementById("sortZA").addEventListener("click", () => {
  const sorted = [...products].sort((a, b) => b.title.localeCompare(a.title));
  renderCards(sorted);
});

// =============================
// 🔹 Formas validācija
// =============================
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  
  // E-pasta formāta pārbaude
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    showFormMessage("Lūdzu, aizpildi visus laukus!", "error");
  } else if (!emailRegex.test(email)) {
    showFormMessage("Ievadi derīgu e-pasta adresi!", "error");
  } else {
    showFormMessage("Ziņojums veiksmīgi nosūtīts!", "success");
    contactForm.reset();
  }
});

function showFormMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`;
  formMessage.style.opacity = 1;
  setTimeout(() => {
    formMessage.style.opacity = 0;
  }, 3000);
}