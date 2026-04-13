(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Car detail: data from query ?id= ---------- */
  var cars = {
    "1": {
      name: "Hyundai IONIQ 6",
      price: "247,999",
      tier: "A",
      tierClass: "tier-a",
      image:
        "Material/huyindai/img1.jpg",
      topSpeed: "185 km/h",
      accel: "5.1 s",
      handling: 82,
      grip: 78,
      traction: "RWD",
    },
    "2": {
      name: "BMW i4 M50",
      price: "287,500",
      tier: "S",
      tierClass: "tier-s",
      image:
        "Material/BMW/whitebmw.png",
      topSpeed: "225 km/h",
      accel: "3.7 s",
      handling: 92,
      grip: 88,
      traction: "AWD",
    },
    "3": {
      name: "Mercedes-Benz EQE",
      price: "411,000",
      tier: "A",
      tierClass: "tier-a",
      image:
        "Material/benz/benz.png",
      topSpeed: "210 km/h",
      accel: "4.7 s",
      handling: 80,
      grip: 85,
      traction: "RWD",
    },
    "4": {
      name: "Rolls Royce Phantom VIII",
      price: "1,950,000",
      tier: "S",
      tierClass: "tier-s",
      image:
        "Material/rollsRoyce/phantom.png",
      topSpeed: "250 km/h",
      accel: "5.1 s",
      handling: 90,
      grip: 95,
      traction: "AWD",
    },
    "5": {
      name: "Audi e-tron GT",
      price: "445,000",
      tier: "S",
      tierClass: "tier-s",
      image:
        "Material/Audi/e-tron.png",
      topSpeed: "245 km/h",
      accel: "3.3 s",
      handling: 90,
      grip: 89,
      traction: "AWD",
    },
    "6": {
      name: "Tesla Model X Plaid",
      price: "487,900",
      tier: "S",
      tierClass: "tier-s",
      image:
        "Material/Tesla/model_x_plaid.png",
      topSpeed: "225 km/h",
      accel: "4.2 s",
      handling: 76,
      grip: 74,
      traction: "RWD",
    },
  };

  function getQueryId() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    return id && cars[id] ? id : "1";
  }

  function applyCarDetail() {
    var root = document.querySelector("[data-car-detail]");
    if (!root) return;

    var id = getQueryId();
    var c = cars[id];
    if (!c) return;

    var setText = function (sel, text) {
      var el = root.querySelector(sel);
      if (el) el.textContent = text;
    };

    setText("[data-field='name']", c.name);
    setText("[data-field='price']", c.price);
    setText("[data-field='topSpeed']", c.topSpeed);
    setText("[data-field='accel']", c.accel);
    setText("[data-field='traction']", c.traction);

    var tierEl = root.querySelector("[data-field='tier']");
    if (tierEl) {
      tierEl.textContent = c.tier;
      tierEl.className = "tier " + c.tierClass;
    }

    var img = root.querySelector("[data-field='image']");
    if (img) {
      img.src = c.image;
      img.alt = c.name;
    }

    document.title = c.name + " | Musab Dealership";

    var handlingFill = root.querySelector("[data-bar='handling']");
    var gripFill = root.querySelector("[data-bar='grip']");
    function animateBar(el, pct) {
      if (!el) return;
      var reduce =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        el.style.width = pct + "%";
        return;
      }
      el.style.width = "0%";
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.style.width = pct + "%";
        });
      });
    }
    animateBar(handlingFill, c.handling);
    animateBar(gripFill, c.grip);

    root.querySelectorAll("[data-car-link]").forEach(function (a) {
      var cid = a.getAttribute("data-car-id");
      if (cid === id) {
        a.setAttribute("aria-current", "page");
        a.style.opacity = "0.65";
        a.style.pointerEvents = "none";
      } else {
        a.removeAttribute("aria-current");
        a.style.opacity = "";
        a.style.pointerEvents = "";
      }
    });
  }
  document.addEventListener("click", function (e) {
  var link = e.target.closest("[data-car-link]");
  if (!link) return;

  e.preventDefault(); // 🚫 stop page reload

  var id = link.getAttribute("data-car-id");
  if (!id) return;

  // Update URL without reload
  history.pushState({ id: id }, "", "car.html?id=" + id);

  // Re-render car
  applyCarDetail();
});

  applyCarDetail();
})();
