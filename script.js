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

  // --- 4. Hero quote widget: 4-step flow, state, buildAddonGrid, buildSummary, showStep ---
  var widgetPhone = "";
  var widgetBedrooms = "";
  var widgetBathrooms = "";
  var widgetHomeSize = "";
  var widgetCleaningType = "";
  var widgetAddons = [];
  var widgetFirstName = "";
  var widgetLastName = "";
  var widgetEmail = "";

  var allAddons = [
    { id: "fridge", label: "Inside Fridge", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="5" y1="10" x2="19" y2="10"/><line x1="9" y1="6" x2="9" y2="8"/><line x1="9" y1="14" x2="9" y2="18"/></svg>' },
    { id: "oven", label: "Inside Oven", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><rect x="7" y="8" width="10" height="8" rx="1"/><circle cx="7.5" cy="3" r="0.5" fill="#C4B5FD"/><circle cx="12" cy="3" r="0.5" fill="#C4B5FD"/><circle cx="16.5" cy="3" r="0.5" fill="#C4B5FD"/></svg>' },
    { id: "cabinets", label: "Inside Cabinets", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="9" rx="1"/><rect x="2" y="12" width="20" height="9" rx="1"/><line x1="12" y1="3" x2="12" y2="12"/><line x1="12" y1="12" x2="12" y2="21"/><circle cx="9" cy="7.5" r="0.8" fill="#C4B5FD"/><circle cx="15" cy="7.5" r="0.8" fill="#C4B5FD"/><circle cx="9" cy="16.5" r="0.8" fill="#C4B5FD"/><circle cx="15" cy="16.5" r="0.8" fill="#C4B5FD"/></svg>' },
    { id: "windows", label: "Interior Windows", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M6 6 Q8 8 6 10" stroke-width="1.2"/></svg>' },
    { id: "laundry", label: "Laundry & Folding", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="13" r="4"/><circle cx="12" cy="13" r="1.5"/><line x1="7" y1="6" x2="7.01" y2="6"/><line x1="10" y1="6" x2="13" y2="6"/></svg>' },
    { id: "organize", label: "Organization", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>' },
    { id: "blinds", label: "Window Blinds", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="2" rx="1"/><rect x="3" y="8" width="18" height="2" rx="1"/><rect x="3" y="13" width="18" height="2" rx="1"/><rect x="3" y="18" width="18" height="2" rx="1"/><line x1="12" y1="5" x2="12" y2="20"/></svg>' },
    { id: "office", label: "Office Cleaning", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>' },
    { id: "washer", label: "Washer & Dryer", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="13" r="4"/><circle cx="12" cy="13" r="1.5"/><circle cx="7" cy="7" r="0.8" fill="#C4B5FD"/><line x1="10" y1="7" x2="14" y2="7"/></svg>' },
    { id: "stairs", label: "Stairway Detail", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3,21 3,15 7,15 7,11 11,11 11,7 15,7 15,3 21,3 21,21"/><line x1="3" y1="21" x2="21" y2="21"/></svg>' },
    { id: "hardwood", label: "Hardwood Care", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="8" width="20" height="3" rx="0.5"/><rect x="2" y="13" width="20" height="3" rx="0.5"/><rect x="2" y="18" width="20" height="3" rx="0.5"/><line x1="8" y1="8" x2="8" y2="11"/><line x1="15" y1="13" x2="15" y2="16"/><line x1="10" y1="18" x2="10" y2="21"/></svg>' },
    { id: "tilegrout", label: "Tile & Grout", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>' },
    { id: "pethair", label: "Pet Hair Removal", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"/><path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5"/><path d="M8 14v.5A3.5 3.5 0 0 0 11.5 18h1a3.5 3.5 0 0 0 3.5-3.5V14"/><path d="M11.5 18H10a2 2 0 0 0-2 2v1h8v-1a2 2 0 0 0-2-2h-1.5"/></svg>' },
    { id: "baseboard", label: "Baseboard Detail", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="20" x2="22" y2="20"/><line x1="2" y1="17" x2="22" y2="17"/><path d="M5 17 L5 10 L19 10 L19 17"/><path d="M8 13 L8 10"/><path d="M12 13 L12 10"/><path d="M16 13 L16 10"/></svg>' },
    { id: "superdeep", label: "Super Deep Clean", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L9.5 8.5 3 9.27l5 4.87-1.18 6.88L12 17.77l5.18 3.25L15.82 14.14 21 9.27l-6.5-.77z"/></svg>' },
    { id: "microwave", label: "Microwave Cleaning", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="13" rx="2"/><rect x="5" y="9" width="10" height="7" rx="1"/><circle cx="18.5" cy="10.5" r="0.8" fill="#C4B5FD"/><circle cx="18.5" cy="13" r="0.8" fill="#C4B5FD"/><circle cx="18.5" cy="15.5" r="0.8" fill="#C4B5FD"/></svg>' },
    { id: "wallstain", label: "Wall Stain Removal", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3a3 3 0 0 1 3 3 7 7 0 0 1-7 7 3 3 0 0 1-3-3 7 7 0 0 1 7-7"/><path d="M6.9 13.9 4 21l7.1-2.9"/><path d="m6.9 13.9 3.1-3.8"/></svg>' },
    { id: "dishes", label: "Dish Washing", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="11" rx="8" ry="3"/><path d="M4 11v7a8 3 0 0 0 16 0v-7"/><path d="M12 8 C12 5 16 3 16 3"/><path d="M9 7.5 C9 5 11 3.5 11 3.5"/></svg>' },
    { id: "dishwasher", label: "Dishwasher Cleaning", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><circle cx="12" cy="15" r="3"/><circle cx="12" cy="15" r="1"/><line x1="7" y1="6" x2="7.01" y2="6"/><line x1="10" y1="6" x2="13" y2="6"/></svg>' }
  ];

  var exclusions = {
    "Deep Clean": ["tilegrout", "baseboard"],
    "Move Out Clean": ["tilegrout", "cabinets", "baseboard"],
    "Post-Construction": ["tilegrout", "baseboard", "superdeep"]
  };

  var quoteSteps = [
    document.getElementById("quote-step-1"),
    document.getElementById("quote-step-2"),
    document.getElementById("quote-step-3"),
    document.getElementById("quote-step-4")
  ];
  var quoteSuccessEl = document.getElementById("quote-success");
  var addonGridEl = document.getElementById("quote-addon-grid");
  var summaryTextEl = document.getElementById("quote-summary-text");
  var successEmailPlaceholder = document.getElementById("quote-success-email-placeholder");

  function clearQuoteErrors() {
    document.querySelectorAll(".field-error").forEach(function (el) {
      el.remove();
    });
  }

  function showStep(n) {
    quoteSteps.forEach(function (step) {
      if (!step) return;
      step.classList.add("step-hidden");
      step.style.display = "";
      step.style.opacity = "";
    });
    if (quoteSuccessEl) {
      quoteSuccessEl.classList.add("step-hidden");
      quoteSuccessEl.style.display = "";
    }
    setTimeout(function () {
      var step = quoteSteps[n - 1];
      if (step) {
        step.classList.remove("step-hidden");
        step.style.display = "block";
        step.offsetHeight;
        step.style.opacity = "1";
        step.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 350);
  }

  function buildAddonGrid() {
    if (!addonGridEl) return;
    var cleaningType = widgetCleaningType;
    var excluded = exclusions[cleaningType] || [];
    var filtered = allAddons.filter(function (a) {
      return excluded.indexOf(a.id) === -1;
    });
    addonGridEl.innerHTML = "";
    widgetAddons = [];
    filtered.forEach(function (addon) {
      var tile = document.createElement("div");
      tile.className = "addon-tile";
      tile.setAttribute("data-id", addon.id);
      tile.innerHTML = "<span class=\"addon-icon\">" + addon.svg + "</span><span class=\"addon-label\">" + addon.label + "</span>";
      tile.addEventListener("click", function () {
        var isSelected = tile.classList.contains("addon-selected");
        if (isSelected) {
          tile.classList.remove("addon-selected");
          widgetAddons = widgetAddons.filter(function (id) { return id !== addon.id; });
        } else {
          tile.classList.add("addon-selected");
          widgetAddons.push(addon.id);
        }
      });
      addonGridEl.appendChild(tile);
    });
  }

  function buildSummary() {
    if (!summaryTextEl) return;
    var addonLabels = widgetAddons.length > 0
      ? widgetAddons.map(function (id) {
          var a = allAddons.find(function (x) { return x.id === id; });
          return a ? a.label : id;
        }).join(", ")
      : "None selected";
    var lines = [
      "Cleaning Type: " + widgetCleaningType,
      "Bedrooms: " + widgetBedrooms + " | Bathrooms: " + widgetBathrooms,
      "Home Size: " + widgetHomeSize,
      "Add-Ons: " + addonLabels
    ];
    summaryTextEl.innerHTML = lines.join("<br>");
  }

  var phoneRegex = /^[+\d\s\-().]{7,}$/;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var continueBtn = document.getElementById("quote-continue");
  if (continueBtn) {
    continueBtn.addEventListener("click", function () {
      clearQuoteErrors();
      var phoneInput = document.getElementById("quote-phone");
      var val = phoneInput ? phoneInput.value.trim() : "";
      if (!val || val.length < 7 || !phoneRegex.test(val)) {
        var err = document.createElement("span");
        err.className = "field-error";
        err.textContent = "Please enter a valid phone number";
        if (phoneInput) {
          phoneInput.parentNode.appendChild(err);
          phoneInput.focus();
        }
        return;
      }
      widgetPhone = val;
      showStep(2);
    });
  }

  var back2 = document.getElementById("quote-back-2");
  if (back2) back2.addEventListener("click", function () { showStep(1); });

  var next2 = document.getElementById("quote-next-2");
  if (next2) {
    next2.addEventListener("click", function () {
      clearQuoteErrors();
      var bedrooms = document.getElementById("quote-bedrooms");
      var bathrooms = document.getElementById("quote-bathrooms");
      var size = document.getElementById("quote-size");
      var type = document.getElementById("quote-type");
      var fields = [
        { el: bedrooms, name: "Bedrooms" },
        { el: bathrooms, name: "Bathrooms" },
        { el: size, name: "Home Size" },
        { el: type, name: "Cleaning Type" }
      ];
      var hasError = false;
      fields.forEach(function (f) {
        if (!f.el || f.el.value === "") {
          var err = document.createElement("span");
          err.className = "field-error";
          err.textContent = "Please select an option";
          if (f.el && f.el.parentNode) f.el.parentNode.appendChild(err);
          hasError = true;
        }
      });
      if (hasError) return;
      widgetBedrooms = bedrooms ? bedrooms.value : "";
      widgetBathrooms = bathrooms ? bathrooms.value : "";
      widgetHomeSize = size ? size.value : "";
      widgetCleaningType = type ? type.value : "";
      buildAddonGrid();
      showStep(3);
    });
  }

  var back3 = document.getElementById("quote-back-3");
  if (back3) back3.addEventListener("click", function () { showStep(2); });

  var next3 = document.getElementById("quote-next-3");
  if (next3) {
    next3.addEventListener("click", function () {
      buildSummary();
      showStep(4);
    });
  }

  var back4 = document.getElementById("quote-back-4");
  if (back4) back4.addEventListener("click", function () { showStep(3); });

  var submitBtn = document.getElementById("quote-submit");
  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      clearQuoteErrors();
      var firstName = document.getElementById("quote-first-name");
      var lastName = document.getElementById("quote-last-name");
      var emailInput = document.getElementById("quote-email");
      var firstVal = firstName ? firstName.value.trim() : "";
      var lastVal = lastName ? lastName.value.trim() : "";
      var emailVal = emailInput ? emailInput.value.trim() : "";
      var hasError = false;
      if (!firstVal) {
        var e1 = document.createElement("span");
        e1.className = "field-error";
        e1.textContent = "Please enter your first name";
        if (firstName && firstName.parentNode) firstName.parentNode.appendChild(e1);
        hasError = true;
      }
      if (!lastVal) {
        var e2 = document.createElement("span");
        e2.className = "field-error";
        e2.textContent = "Please enter your last name";
        if (lastName && lastName.parentNode) lastName.parentNode.appendChild(e2);
        hasError = true;
      }
      if (!emailVal || !emailRegex.test(emailVal)) {
        var e3 = document.createElement("span");
        e3.className = "field-error";
        e3.textContent = "Please enter a valid email address";
        if (emailInput && emailInput.parentNode) emailInput.parentNode.appendChild(e3);
        hasError = true;
      }
      if (hasError) return;
      widgetFirstName = firstVal;
      widgetLastName = lastVal;
      widgetEmail = emailVal;
      if (successEmailPlaceholder) successEmailPlaceholder.textContent = widgetEmail;
      quoteSteps.forEach(function (step) {
        if (step) {
          step.classList.add("step-hidden");
          step.style.display = "none";
        }
      });
      if (quoteSuccessEl) {
        quoteSuccessEl.classList.remove("step-hidden");
        quoteSuccessEl.style.display = "block";
        quoteSuccessEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
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
