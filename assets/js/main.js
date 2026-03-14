(function () {
  // ── SECTIONS ──────────────────────────────────────
  var PAGES = [
    "home",
    "about",
    "skills",
    "resume",
    "portfolio",
    "services",
    "contact",
  ];
  var ctrDone = false,
    skillsDone = false;

  function go(id) {
    PAGES.forEach(function (p) {
      var s = document.getElementById("s-" + p);
      if (s) s.classList.toggle("on", p === id);
      var nl = document.getElementById("nl-" + p);
      if (nl) nl.classList.toggle("on", p === id);
      var dl = document.getElementById("dl-" + p);
      if (dl) dl.classList.toggle("on", p === id);
    });
    window.scrollTo(0, 0);
    closeDrawer();
    if (id === "about" && !ctrDone) {
      ctrDone = true;
      setTimeout(runCounters, 300);
    }
    if (id === "skills" && !skillsDone) {
      skillsDone = true;
      setTimeout(runBars, 150);
    }
    if (id === "portfolio") {
      setTimeout(function () {
        lb && lb.reload();
      }, 100);
    }
  }

  // Wire nav links
  PAGES.forEach(function (p) {
    var nl = document.getElementById("nl-" + p);
    if (nl)
      nl.addEventListener("click", function () {
        go(p);
      });
    var dl = document.getElementById("dl-" + p);
    if (dl)
      dl.addEventListener("click", function () {
        go(p);
      });
  });
  document.getElementById("logo").addEventListener("click", function () {
    go("home");
  });
  document.getElementById("nc").addEventListener("click", function () {
    go("contact");
  });
  document.getElementById("dc").addEventListener("click", function () {
    go("contact");
  });
  document
    .getElementById("hw-porto")
    .addEventListener("click", function () {
      go("portfolio");
    });
  document
    .getElementById("cta-porto")
    .addEventListener("click", function () {
      go("portfolio");
    });
  document.querySelectorAll("[data-go]").forEach(function (el) {
    el.addEventListener("click", function () {
      go(el.getAttribute("data-go"));
    });
  });

  // ── HAMBURGER ─────────────────────────────────────
  var ham = document.getElementById("ham");
  var drawer = document.getElementById("drawer");
  var drawerOpen = false;
  function closeDrawer() {
    drawerOpen = false;
    ham.classList.remove("x");
    drawer.classList.remove("show");
  }
  ham.addEventListener("click", function (e) {
    e.stopPropagation();
    drawerOpen = !drawerOpen;
    ham.classList.toggle("x", drawerOpen);
    drawer.classList.toggle("show", drawerOpen);
  });
  document.addEventListener("click", function (e) {
    if (drawerOpen && !drawer.contains(e.target) && e.target !== ham) {
      closeDrawer();
    }
  });

  // ── TYPED TEXT ────────────────────────────────────
  var tw = document.getElementById("tw");
  var words = ["Designer", "Developer", "Freelancer"];
  var wi = 0,
    ci = 0,
    del = false;
  function type() {
    var w = words[wi];
    if (!del) {
      tw.textContent = w.slice(0, ++ci);
      if (ci === w.length) {
        del = true;
        setTimeout(type, 1600);
        return;
      }
    } else {
      tw.textContent = w.slice(0, --ci);
      if (ci === 0) {
        del = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(type, del ? 60 : 110);
  }
  type();

  // ── COUNTERS ──────────────────────────────────────
  function runCounters() {
    document.querySelectorAll(".ctr").forEach(function (el) {
      var t = parseInt(el.getAttribute("data-t")),
        n = 0,
        step = t / (1400 / 16);
      var iv = setInterval(function () {
        n += step;
        if (n >= t) {
          el.textContent = t + "+";
          clearInterval(iv);
        } else {
          el.textContent = Math.floor(n);
        }
      }, 16);
    });
  }

  // ── SKILL BARS ────────────────────────────────────
  function runBars() {
    document.querySelectorAll(".sk-fill").forEach(function (b) {
      b.style.width = b.getAttribute("data-w") + "%";
    });
  }

  // ── PORTFOLIO FILTER ──────────────────────────────
  document.querySelectorAll(".pf-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".pf-btn").forEach(function (b) {
        b.classList.remove("on");
      });
      btn.classList.add("on");
      var f = btn.getAttribute("data-f");
      document.querySelectorAll(".pc").forEach(function (c) {
        c.classList.toggle(
          "hide",
          f !== "all" && c.getAttribute("data-c") !== f,
        );
      });
      setTimeout(function () {
        lb && lb.reload();
      }, 80);
    });
  });

  // ── LIGHTBOX ──────────────────────────────────────
  var lb = GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: true,
    openEffect: "zoom",
    closeEffect: "fade",
  });
})();