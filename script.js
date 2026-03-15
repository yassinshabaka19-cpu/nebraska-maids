/**
 * Austin House Cleaners — Deep Moss + Lavender
 * Banner, header, mobile menu, hero quote widget, checklist, FAQ, smooth scroll, fade-in, contact form
 */

(function () {
  "use strict";

  var SCROLL_OFFSET = 88;
  var HEADER_SCROLL = 80;
  var BANNER_INTERVAL = 4500;

  // --- 10. Current year ---
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- 1. Banner: rotate slides 4.5s, dots, close with slideUp then remove ---
  var banner = document.getElementById("announcement-banner");
  var bannerClose = document.getElementById("banner-close");
  var slides = document.querySelectorAll(".banner-slide");
  var dots = document.querySelectorAll(".banner-dot");

  if (banner && slides.length) {
    var currentSlide = 0;

    function setSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        s.classList.toggle("active", i === currentSlide);
      });
      dots.forEach(function (d, i) {
        d.classList.toggle("active", i === currentSlide);
      });
    }

    var bannerTimer = setInterval(function () {
      setSlide(currentSlide + 1);
    }, BANNER_INTERVAL);

    if (bannerClose) {
      bannerClose.addEventListener("click", function () {
        clearInterval(bannerTimer);
        banner.classList.add("dismissed");
        setTimeout(function () {
          banner.classList.add("removed");
        }, 450);
      });
    }
  }

  // --- 2. Sticky header: add 'scrolled' when scrollY > 80 ---
  var header = document.getElementById("site-header");
  if (header) {
    function onScroll() {
      if (window.scrollY > HEADER_SCROLL) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // --- 3. Mobile menu: open/close, body overflow ---
  var menuToggle = document.querySelector(".menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  var mobileClose = document.querySelector(".mobile-close");
  var body = document.body;

  function openMobile() {
    if (mobileMenu) {
      mobileMenu.hidden = false;
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "true");
      body.style.overflow = "hidden";
    }
  }

  function closeMobile() {
    if (mobileMenu) {
      mobileMenu.hidden = true;
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
      body.style.overflow = "";
    }
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      if (mobileMenu.hidden) openMobile();
      else closeMobile();
    });
  }
  if (mobileClose) mobileClose.addEventListener("click", closeMobile);
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobile);
    });
  }

  // --- 4. Hero quote widget: Step 1 → Step 2 (validate phone), Step 2 submit → success ---
  var step1 = document.getElementById("quote-step-1");
  var step2 = document.getElementById("quote-step-2");
  var quoteSuccess = document.getElementById("quote-success");
  var quotePhone = document.getElementById("quote-phone");
  var quoteContinue = document.getElementById("quote-continue");
  var quoteSubmit = document.getElementById("quote-submit");

  var phoneRegex = /[\d\s\-\(\)\+]{7,}/;

  if (quoteContinue && step1 && step2) {
    quoteContinue.addEventListener("click", function () {
      var val = quotePhone ? quotePhone.value.trim() : "";
      if (!val) {
        if (quotePhone) {
          quotePhone.classList.add("error");
          quotePhone.focus();
        }
        return;
      }
      if (val.replace(/\D/g, "").length < 7 || !phoneRegex.test(val)) {
        if (quotePhone) {
          quotePhone.classList.add("error");
          quotePhone.focus();
        }
        return;
      }
      if (quotePhone) quotePhone.classList.remove("error");
      step1.classList.add("hidden");
      step2.classList.remove("hidden");
    });
  }

  if (quoteSubmit && step2 && quoteSuccess) {
    quoteSubmit.addEventListener("click", function () {
      step2.classList.add("hidden");
      quoteSuccess.classList.remove("hidden");
    });
  }

  if (quotePhone) {
    quotePhone.addEventListener("input", function () {
      quotePhone.classList.remove("error");
    });
  }

  // --- 5. Checklist tabs ---
  var checklistTabs = document.querySelectorAll(".checklist-tab");
  var checklistPanels = document.querySelectorAll(".checklist-panel");

  if (checklistTabs.length && checklistPanels.length) {
    checklistTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var targetId = "panel-" + tab.getAttribute("data-tab");
        checklistTabs.forEach(function (t) {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        checklistPanels.forEach(function (panel) {
          if (panel.id === targetId) {
            panel.classList.add("active");
            panel.hidden = false;
          } else {
            panel.classList.remove("active");
            panel.hidden = true;
          }
        });
      });
    });
  }

  // --- 6. FAQ accordion: one open at a time, rotate + icon ---
  var faqItems = document.querySelectorAll(".faq-item");
  var faqButtons = document.querySelectorAll(".faq-q[data-faq]");

  if (faqButtons.length && faqItems.length) {
    faqButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".faq-item");
        var wasOpen = item.classList.contains("is-open");
        faqItems.forEach(function (it) {
          it.classList.remove("is-open");
          var b = it.querySelector(".faq-q");
          if (b) b.setAttribute("aria-expanded", "false");
        });
        if (!wasOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  // --- 7. Smooth scroll: offset 88px ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    var href = anchor.getAttribute("href");
    if (href === "#") return;
    anchor.addEventListener("click", function (e) {
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    });
  });

  // --- 8. IntersectionObserver: .fade-in → .visible, 15% threshold ---
  var fadeEls = document.querySelectorAll(".fade-in");
  if (fadeEls.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { rootMargin: "0px", threshold: 0.15 }
    );
    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- 9. Contact form validation: required, email, phone, inline errors (lavender), success ---
  var form = document.getElementById("contact-form");
  var formSuccess = document.getElementById("form-success");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.querySelectorAll(".error").forEach(function (el) {
        el.classList.remove("error");
      });
      form.querySelectorAll(".error-msg").forEach(function (el) {
        el.remove();
      });
      if (formSuccess) formSuccess.classList.add("hidden");

      var name = form.querySelector("#name");
      var phone = form.querySelector("#phone");
      var email = form.querySelector("#email");
      var hasError = false;

      function showError(field, msg) {
        if (!field) return;
        field.classList.add("error");
        var span = document.createElement("span");
        span.className = "error-msg";
        span.style.color = "var(--lavender)";
        span.style.fontSize = "13px";
        span.style.marginTop = "4px";
        span.style.display = "block";
        span.textContent = msg;
        field.parentNode.appendChild(span);
        hasError = true;
      }

      if (!name || !name.value.trim() || name.value.trim().length < 2) {
        showError(name, "Please enter your full name (at least 2 characters).");
      }

      var pVal = phone ? phone.value.replace(/\D/g, "") : "";
      if (pVal.length < 10) {
        showError(phone, "Please enter a valid phone number (at least 10 digits).");
      }

      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !email.value.trim()) {
        showError(email, "Please enter your email address.");
      } else if (!emailRegex.test(email.value.trim())) {
        showError(email, "Please enter a valid email address.");
      }

      if (!hasError && formSuccess) {
        formSuccess.classList.remove("hidden");
        form.reset();
      }
    });
  }
})();
