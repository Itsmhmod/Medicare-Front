let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Scroll Reveal Animation
window.addEventListener("scroll", reveal);

function reveal() {
  let reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let revealTop = reveals[i].getBoundingClientRect().top;
    let revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    }
  }
}

// Intersection Observer for Counter Animation
const observerOptions = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

counters.forEach((counter) => observer.observe(counter));

// Image Loading Animation
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", function () {
    this.classList.add("loaded");
  });
});

// Form Validation
document.addEventListener("DOMContentLoaded", function () {
  const bookingForm = document.querySelector(".book .row form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = this.querySelector('input[name="name"]').value;
      const email = this.querySelector('input[name="email"]').value;
      const phone = this.querySelector('input[name="phone"]').value;
      const department = this.querySelector('select[name="department"]').value;
      const date = this.querySelector('input[name="date"]').value;

      if (!name || !email || !phone || !department || !date) {
        showAlert("الرجاء ملء جميع الحقول", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showAlert("الرجاء إدخال بريد إلكتروني صحيح", "error");
        return;
      }

      if (!isValidPhone(phone)) {
        showAlert("الرجاء إدخال رقم هاتف صحيح", "error");
        return;
      }

      // Show success alert
      showAlert("تم الحجز بنجاح! سنتواصل معك قريباً", "success");
      this.reset();
    });
  }
});

// Helper Functions
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^\+?[\d\s-]{10,}$/.test(phone);
}

// Show Alert Function
function showAlert(message, type) {
  // Remove any existing alerts
  const existingAlerts = document.querySelectorAll(".alert");
  existingAlerts.forEach((alert) => alert.remove());

  // Create alert element
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `
    <i class="fas ${
      type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
    }"></i>
    <span>${message}</span>
  `;

  // Add to page
  document.body.appendChild(alertDiv);

  // Remove after 3 seconds
  setTimeout(() => {
    alertDiv.classList.add("fade-out");
    setTimeout(() => {
      alertDiv.remove();
    }, 500);
  }, 3000);
}

// Counter Animation for Statistics
const counters = document.querySelectorAll(".icons-container .icons h3");
const speed = 200;

const animateCounter = (counter) => {
  const target = parseInt(counter.innerText);
  let count = 0;

  const updateCount = () => {
    const increment = target / speed;

    if (count < target) {
      count = Math.ceil(count + increment);
      counter.innerText = count + "+";
      setTimeout(updateCount, 1);
    } else {
      counter.innerText = target + "+";
    }
  };

  updateCount();
};

// Start counter animation when element is in view
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
};

const counterObserver = new IntersectionObserver(observerCallback, {
  threshold: 0.5
});

counters.forEach((counter) => {
  counter.innerText = "0+";
  counterObserver.observe(counter);
});

// Scroll to Top Button
const scrollTop = document.querySelector(".scroll-top");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    scrollTop.classList.add("active");
  } else {
    scrollTop.classList.remove("active");
  }
});
