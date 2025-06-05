
const textElement = document.getElementById('text');
const cursorElement = document.getElementById('cursor');

if (textElement && cursorElement) {
    const words = ["Recherche alternance", "Développement Web", "Front-End, Back-End"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        textElement.textContent = currentWord.substring(0, charIndex);

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(type, isDeleting ? 50 : 100);
    }

    type();
}

const audio = document.getElementById('musiqueFond');
const speakerIcon = document.getElementById('speakerIcon');
const stopVideos = document.querySelectorAll('.stopMusic');

audio.volume = 0.2;

let userMuted = false;

// Bouton mute / unmute
speakerIcon.addEventListener('click', () => {
  if (audio.paused) {
    userMuted = false;
    audio.play().catch(err => console.warn("Lecture audio bloquée :", err));
    speakerIcon.classList.remove('fa-volume-xmark');
    speakerIcon.classList.add('fa-volume-high');
  } else {
    userMuted = true;
    audio.pause();
    speakerIcon.classList.remove('fa-volume-high');
    speakerIcon.classList.add('fa-volume-xmark');
  }
});

// Stoppe la musique si une vidéo est jouée
stopVideos.forEach(video => {
  video.addEventListener('play', () => {
    stopVideos.forEach(otherVideo => {
      if (otherVideo !== video && !otherVideo.paused) {
        otherVideo.pause();
      }
    });
    audio.pause(); // Coupe la musique
  });

  // Ne fait plus rien à la pause ou fin d'une vidéo
});

// Stoppe la musique si on clique sur un lien externe
document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', event => {
    const url = new URL(link.href);
    const currentHost = window.location.host;

    if (url.host !== currentHost) {
      audio.pause(); // Stoppe la musique avant de quitter
    }
  });
});

//gère le scroll du header
window.addEventListener("scroll", () => {
const header = document.getElementById("header");
if (window.scrollY > 10) {
    header.classList.add("scrolled");
} else {
    header.classList.remove("scrolled");
}
});

// Sélectionne tous les liens qui ont un href commençant par '#'
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Empêche le comportement par défaut du lien

        // Défilement fluide vers l'élément correspondant à l'ID du lien
        const targetId = this.getAttribute('href').substring(1); // Récupère l'ID cible sans le "#"
        const targetElement = document.getElementById(targetId);

        // Effectue le défilement vers l'élément cible
        targetElement.scrollIntoView({
            behavior: 'smooth', // Défilement fluide
            block: 'start' // Aligne l'élément au début de la fenêtre
        });
    });
});

// Gère le carousel d'images de dessin
const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['précédent', 'suivant'];
const galleryItems = document.querySelectorAll('.gallery-item'); // <- ici c'était ".gallery-items" (erreur)

class Carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateGallery() {
        // Enlève toutes les classes de position
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1');
            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
            el.classList.remove('gallery-item-4');
            el.classList.remove('gallery-item-5');
        });

        // Réattribue les classes en fonction de leur nouvelle position
        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`); // <- backticks
        });
    }

    setCurrentState(direction) {
        if (direction.className.includes('précédent')) {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
    }

    setControls() {
        this.carouselControls.forEach(control => {
            const btn = document.createElement('button');
            btn.className = `gallery-controls-${control}`;
            btn.innerText = control; // texte visible
            galleryControlsContainer.appendChild(btn);
        });
    }

    useControls() {
        const triggers = [...galleryControlsContainer.querySelectorAll('button')];
        triggers.forEach(control => {
            control.addEventListener('click', (e) => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }
}

// Création et lancement du carrousel
if (galleryContainer && galleryControlsContainer && galleryItems.length > 0) {
  const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);
  exampleCarousel.setControls();
  exampleCarousel.useControls();
  exampleCarousel.updateGallery();
}


// Récupère tous les liens ou images avec la classe image-popup
document.querySelectorAll('.image-popup').forEach(img => {
    img.addEventListener('click', function(e) {
        e.preventDefault();

        const src = this.src;
        const popupOverlay = document.getElementById('popupOverlay');
        const popupImage = document.getElementById('popupImage');

        popupImage.src = src;
        popupOverlay.style.display = 'flex';
    });
});

// Fermer le popup quand on clique en dehors de l'image
document.getElementById('popupOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
    }
});

//Les modals
//Modal 1
function openModal() {
    document.getElementById("infoModal").style.display = "block";
}

function closeModal() {
    document.getElementById("infoModal").style.display = "none";
}

// Fermer en cliquant hors de la boîte
window.onclick = function(event) {
    const modal = document.getElementById("infoModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}


//Modal 2
function openModal1() {
    document.getElementById("infoModal1").style.display = "block";
}

function closeModal1() {
    document.getElementById("infoModal1").style.display = "none";
}

// Fermer en cliquant hors de la boîte
window.onclick = function(event) {
    const modal1 = document.getElementById("infoModal1");
    if (event.target === modal1) {
        modal1.style.display = "none";
    }
}

function runCanvasAnimation(ctx, canvas) {

    const SHOOTING_STAR_PROBABILITY = 0.01;
    const SHOOTING_STAR_MIN_LENGTH = 10;
    const SHOOTING_STAR_MAX_LENGTH = 80;
    const SHOOTING_STAR_MIN_SPEED = 5;
    const SHOOTING_STAR_MAX_SPEED = 10;
    const SHOOTING_STAR_ANGLE = Math.PI / 4;
    const SHOOTING_STAR_COLOR = '#FFFFFF';
    const SHOOTING_STAR_OPACITY_DECREASE = 0.01;
    const MAX_PARALLAX_MOVEMENT = 100;
    const GRADIENT_COLOR_START = '#000000';
    const GRADIENT_COLOR_END = '#000000';

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let shootingStarsArray = [];
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    class ShootingStar {
        constructor(x, y, length, speed, angle, color) {
            this.x = x;
            this.y = y;
            this.length = length;
            this.speed = speed;
            this.angle = angle;
            this.color = color;
            this.opacity = 1;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.length * Math.cos(this.angle), this.y + this.length * Math.sin(this.angle));
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
        }

        update() {
            this.x += this.speed * Math.cos(this.angle);
            this.y += this.speed * Math.sin(this.angle);
            this.opacity -= SHOOTING_STAR_OPACITY_DECREASE;
            this.draw();
        }

        isOutOfBounds() {
            return (
                this.x < 0 || this.x > canvas.width ||
                this.y < 0 || this.y > canvas.height ||
                this.opacity <= 0
            );
        }
    }

    function animate() {
        requestAnimationFrame(animate);

        // Garder le fond du canvas transparent ou avec un dégradé léger
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear previous frame

        let parallaxX = ((mouseX - canvas.width / 2) / canvas.width) * MAX_PARALLAX_MOVEMENT;
        let parallaxY = ((mouseY - canvas.height / 2) / canvas.height) * MAX_PARALLAX_MOVEMENT;

        if (Math.random() < SHOOTING_STAR_PROBABILITY) {
            let x = Math.random() * (canvas.width * 2 / 3);
            let y = Math.random() * (canvas.height * 2 / 3);
            let length = SHOOTING_STAR_MIN_LENGTH + Math.random() * (SHOOTING_STAR_MAX_LENGTH - SHOOTING_STAR_MIN_LENGTH);
            let speed = SHOOTING_STAR_MIN_SPEED + Math.random() * (SHOOTING_STAR_MAX_SPEED - SHOOTING_STAR_MIN_SPEED);
            let angle = Math.random() * SHOOTING_STAR_ANGLE;
            let color = SHOOTING_STAR_COLOR;

            shootingStarsArray.push(new ShootingStar(x, y, length, speed, angle, color));
        }

        for (let i = 0; i < shootingStarsArray.length; i++) {
            ctx.save();
            ctx.translate(parallaxX, parallaxY);
            shootingStarsArray[i].update();
            ctx.restore();
            if (shootingStarsArray[i].isOutOfBounds()) {
                shootingStarsArray.splice(i, 1);
                i--;
            }
        }
    }

    function init() {
        shootingStarsArray = [];
    }

    document.addEventListener('mousemove', function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    init();
    animate();
}


const items = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

items.forEach(item => observer.observe(item));




const btn = document.querySelector('.wallpaper');
const imageSelector = document.querySelector('.image-selector');
const imageElement = document.getElementById('background-image');
const imageLinks = document.querySelectorAll('.image-selector a');

// Afficher/masquer le menu déroulant
if (btn) {
    btn.addEventListener('click', () => {
        imageSelector.style.display = (imageSelector.style.display === 'block') ? 'none' : 'block';
    });
}

// Changer l’image au clic
imageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const newImage = e.target.getAttribute('data-image');

        // Effet fondu si souhaité
        imageElement.style.opacity = 0;

        setTimeout(() => {
            if (newImage) {
                imageElement.src = `images/${newImage}`;
            } else {
                imageElement.src = ""; // ou une image par défaut
            }
            imageElement.style.opacity = 1;
        }, 300); // délai pour le fondu

        imageSelector.style.display = 'none';
    });
});

//Compétences popup
document.querySelectorAll('.skill-logo').forEach(img => {
  img.addEventListener('click', () => {
    const tech = img.alt.toLowerCase();
    console.log(`Clicked on ${tech}`);  // Ajoute ce log pour vérifier
    const links = {
      html: 'https://developer.mozilla.org/fr/docs/Web/HTML',
      css: 'https://developer.mozilla.org/fr/docs/Web/CSS',
      c: 'https://fr.wikipedia.org/wiki/C_(langage)',
      java: 'https://www.oracle.com/fr/java/',
      javascript: 'https://developer.mozilla.org/fr/docs/Web/JavaScript',
      assembleur: 'https://fr.wikipedia.org/wiki/Assembleur',
      sql: 'https://fr.wikipedia.org/wiki/Structured_Query_Language',
      php: 'https://www.php.net',
      tutod: 'https://fr.wikipedia.org/wiki/Tutorial_D',
    };
    const link = links[tech];
    if (link) {
      window.open(link, '_blank');
    }
  });
});


//Carousel Langage Informatique
const skillsItems = document.querySelectorAll('.carousel-skills-item');
let skillsArray = Array.from(skillsItems);

function updateSkillsCarousel() {
    skillsArray = skillsArray.filter(el => el !== undefined && el !== null);
    skillsArray.forEach((el, i) => {
        if (!el) return; // Ignore undefined/null
        el.className = 'carousel-skills-item';
        if (i < 5) {
            el.classList.add(`carousel-skills-item-${i + 1}`);
        }
    });
}
setInterval(() => {
  skillsArray.push(skillsArray.shift());
  updateSkillsCarousel();
}, 2500);
updateSkillsCarousel();

//Application
document.querySelectorAll('.appli-logo').forEach(img => {
  img.addEventListener('click', () => {
    const tech = img.alt.toLowerCase();
    console.log(`Clicked on ${tech}`);  // Ajoute ce log pour vérifier
    const links = {
      vsc: 'https://code.visualstudio.com',
      sqlworkbench: 'https://www.mysql.com/products/workbench/',
      canva: 'https://www.canva.com',
      eclipse: 'https://eclipseide.org',
      scenebuilder: 'https://gluonhq.com/products/scene-builder/',
      ciscopackettracer: 'https://www.netacad.com/fr/cisco-packet-tracer',
      excel: 'https://www.microsoft.com/fr-fr/microsoft-365/excel',
      word: 'https://www.microsoft.com/fr-fr/microsoft-365/word',
      figma: 'https://www.figma.com/fr-fr/',
      arduino: 'https://www.arduino.cc',
    };
    const link = links[tech];
    if (link) {
      window.open(link, '_blank');
    }
  });
});


//Carousel Langage Informatique
const appliItems = document.querySelectorAll('.carousel-appli-item');
let appliArray = Array.from(appliItems);

function updateAppliCarousel() {
    appliArray = appliArray.filter(el => el !== undefined && el !== null);
    appliArray.forEach((el, i) => {
        if (!el) return; // Ignore undefined/null
        el.className = 'carousel-appli-item';
        if (i < 5) {
            el.classList.add(`carousel-appli-item-${i + 1}`);
        }
    });
}
setInterval(() => {
  appliArray.push(appliArray.shift());
  updateAppliCarousel();
}, 2500);
updateAppliCarousel();

//Scrolling Avancement
window.addEventListener('scroll', () => {
  const scrollBar = document.getElementById('scrollProgress');
  if (!scrollBar) return; // On sort si pas trouvé
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollBar.style.width = scrollPercent + "%";
});

// Script pour gérer le retournement des cartes
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.flip-card').forEach(card => {
    const inner = card.querySelector('.flip-card-inner');
    card.addEventListener('click', () => {
      inner.classList.toggle('is-flipped');
    });
  });
});

//Cards angle de retournement
document.querySelectorAll('.flip-card').forEach(card => {
  let angle = 0;
  const inner = card.querySelector('.flip-card-inner');
  card.addEventListener('click', () => {
    angle += 180;
    inner.style.transform = `rotateY(${angle}deg)`;
  });
});


//MODAL CARTE DE VISITE
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("openBusinessCard");
  if (button) {
    button.onclick = () => {
      document.getElementById("businessCardModal").style.display = "flex";
    };
  }
});

document.getElementById("closeBusinessCard").onclick = () => {
  document.getElementById("businessCardModal").style.display = "none";
  document.getElementById("businessCard").classList.remove("flip");
};

document.getElementById("businessCard").onclick = () => {
  document.getElementById("businessCard").classList.toggle("flip");
};

window.onclick = (e) => {
  const modal = document.getElementById("businessCardModal");
  if (e.target === modal) {
    modal.style.display = "none";
    document.getElementById("businessCard").classList.remove("flip");
  }
};
