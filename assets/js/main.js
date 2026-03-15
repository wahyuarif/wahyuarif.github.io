document.addEventListener('DOMContentLoaded', function () {
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
      // portfolio section opened
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
    });
  });

  // ── PORTFOLIO MODAL (marketplace style) ───────────
  var modal = document.getElementById("pf-modal");
  var mainImg = document.getElementById("pfm-main-img");
  var thumbsEl = document.getElementById("pfm-thumbs");
  var counterEl = document.getElementById("pfm-counter");
  var prevBtn = document.getElementById("pfm-prev");
  var nextBtn = document.getElementById("pfm-next");
  var pfmCat = document.getElementById("pfm-cat");
  var pfmTitle = document.getElementById("pfm-title");
  var pfmDesc = document.getElementById("pfm-desc");
  var pfmYear = document.getElementById("pfm-year");
  var pfmImgCnt = document.getElementById("pfm-imgcount");
  var pfmTags = document.getElementById("pfm-tags");
  var closeBtn = document.getElementById("pfm-close");

  var activeImages = [];
  var activeIdx = 0;

  function setImage(idx) {
    activeIdx = idx;
    mainImg.classList.add("fade");
    setTimeout(function () {
      mainImg.src = activeImages[idx];
      mainImg.onload = function () { mainImg.classList.remove("fade"); };
      // fallback if cached
      setTimeout(function () { mainImg.classList.remove("fade"); }, 150);
    }, 140);
    // update thumbs
    document.querySelectorAll(".pfm-thumb").forEach(function (t, i) {
      t.classList.toggle("active", i === idx);
    });
    // counter
    counterEl.textContent = (idx + 1) + " / " + activeImages.length;
    // nav visibility
    prevBtn.classList.toggle("hidden", activeImages.length <= 1);
    nextBtn.classList.toggle("hidden", activeImages.length <= 1);
  }

  function openModal(card) {
    var images = JSON.parse(card.getAttribute("data-images") || "[]");
    activeImages = images.length ? images : [""];
    activeIdx = 0;

    // populate info
    pfmCat.textContent = card.getAttribute("data-cat") || "";
    pfmTitle.textContent = card.getAttribute("data-title") || "";
    pfmDesc.innerHTML = card.getAttribute("data-desc") || "";
    pfmYear.textContent = card.getAttribute("data-year") || "—";
    pfmImgCnt.textContent = activeImages.length + " gambar";

    var tagsRaw = card.getAttribute("data-tags") || "";
    pfmTags.innerHTML = tagsRaw.split(",").map(function (t) {
      return '<span class="pfm-tag">' + t.trim() + '</span>';
    }).join("");

    // build thumbs
    thumbsEl.innerHTML = "";
    if (activeImages.length > 1) {
      activeImages.forEach(function (src, i) {
        var th = document.createElement("div");
        th.className = "pfm-thumb" + (i === 0 ? " active" : "");
        th.innerHTML = '<img src="' + src + '" alt="thumb ' + (i + 1) + '" loading="lazy"/>';
        th.addEventListener("click", function () { setImage(i); });
        thumbsEl.appendChild(th);
      });
      thumbsEl.style.display = "flex";
    } else {
      thumbsEl.style.display = "none";
    }

    // set initial image
    mainImg.src = activeImages[0];
    counterEl.textContent = "1 / " + activeImages.length;
    prevBtn.classList.toggle("hidden", activeImages.length <= 1);
    nextBtn.classList.toggle("hidden", activeImages.length <= 1);

    // reset mobile tab ke Foto
    switchMobTab("foto");

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  // ── MOBILE TAB SWITCHER ───────────────────────────
  var pfmLeft = document.querySelector(".pfm-left");
  var pfmRight = document.querySelector(".pfm-right");

  function switchMobTab(tab) {
    document.querySelectorAll(".pfm-mob-tab").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tab);
    });
    if (tab === "foto") {
      pfmLeft.classList.add("mob-active");
      pfmRight.classList.remove("mob-active");
    } else {
      pfmLeft.classList.remove("mob-active");
      pfmRight.classList.add("mob-active");
    }
  }

  document.querySelectorAll(".pfm-mob-tab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      switchMobTab(btn.getAttribute("data-tab"));
    });
  });

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  // Wire each card
  document.querySelectorAll(".pc").forEach(function (card) {
    card.addEventListener("click", function () { openModal(card); });
  });

  // Nav buttons
  prevBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    setImage((activeIdx - 1 + activeImages.length) % activeImages.length);
  });
  nextBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    setImage((activeIdx + 1) % activeImages.length);
  });

  // Close
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  // Keyboard
  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") setImage((activeIdx - 1 + activeImages.length) % activeImages.length);
    if (e.key === "ArrowRight") setImage((activeIdx + 1) % activeImages.length);
  });

  // ── CONTACT FORM ──
  var form = document.querySelector('form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var popup = document.getElementById('success-popup');
    var data = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
      .then(function (res) {
        form.reset();
        if (popup) popup.classList.add('show');
      })
      .catch(function () {
        if (popup) popup.classList.add('show');
      });
  });

  var closeBtn = document.getElementById('popup-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      document.getElementById('success-popup').classList.remove('show');
    });
  }

});