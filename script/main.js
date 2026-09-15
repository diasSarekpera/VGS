// =========================================================================
// VIGO SERVICES (VGS) | Script principal partagé
// Menu mobile, accordéon FAQ, en-tête au scroll, état des champs,
// et moteur générique d'apparitions au scroll (Phase 5 — Motion Design).
// Sans dépendance externe.
// =========================================================================

document.addEventListener('DOMContentLoaded', function () {

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Menu mobile ---
  var burger = document.querySelector('.header__burger');
  var mobileNav = document.querySelector('.mobile-nav');
  var closeBtn = document.querySelector('.mobile-nav__close');

  function openMobileNav() {
    mobileNav.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    mobileNav.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  if (burger && mobileNav) {
    burger.addEventListener('click', openMobileNav);
  }
  if (closeBtn && mobileNav) {
    closeBtn.addEventListener('click', closeMobileNav);
  }
  if (mobileNav) {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeMobileNav();
      }
    });
  }

  // --- Sous-menu "Services" du menu mobile ---
  // Fermé par défaut : c'est le visiteur qui décide de l'ouvrir au tap,
  // comme le menu déroulant "Services" en version bureau. L'état initial
  // suit l'attribut aria-expanded défini dans le HTML.
  var mobileServicesToggle = document.querySelector('.mobile-nav__link--toggle');
  var mobileServicesSub = document.getElementById('mobile-services-sub');
  if (mobileServicesToggle && mobileServicesSub) {
    var mobileServicesInitiallyExpanded = mobileServicesToggle.getAttribute('aria-expanded') === 'true';
    mobileServicesSub.style.maxHeight = mobileServicesInitiallyExpanded ? mobileServicesSub.scrollHeight + 'px' : '0px';
    mobileServicesToggle.addEventListener('click', function () {
      var willExpand = mobileServicesToggle.getAttribute('aria-expanded') !== 'true';
      mobileServicesToggle.setAttribute('aria-expanded', String(willExpand));
      mobileServicesSub.style.maxHeight = willExpand ? mobileServicesSub.scrollHeight + 'px' : '0px';
    });
  }

  // --- Accordéon FAQ ---
  // La hauteur d'ouverture est calculée dynamiquement (scrollHeight) pour
  // que l'animation reste précise quelle que soit la longueur du texte.
  // aria-expanded est synchronisé à chaque changement d'état pour les
  // technologies d'assistance.
  var faqItems = document.querySelectorAll('.faq-item__q');
  faqItems.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('is-open');

      item.parentElement.querySelectorAll('.faq-item').forEach(function (el) {
        el.classList.remove('is-open');
        var q = el.querySelector('.faq-item__q');
        var a = el.querySelector('.faq-item__a');
        if (q) q.setAttribute('aria-expanded', 'false');
        if (a) a.style.maxHeight = '';
      });

      if (!wasOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        var answer = item.querySelector('.faq-item__a');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
  // Un item peut être ouvert par défaut dans le HTML (class="is-open") :
  // on calcule sa hauteur réelle dès le chargement, au lieu de dépendre
  // d'une valeur CSS fixe qui pourrait tronquer un texte plus long.
  document.querySelectorAll('.faq-item.is-open .faq-item__a').forEach(function (a) {
    a.style.maxHeight = a.scrollHeight + 'px';
  });

  // --- Ombre légère sur l'en-tête au scroll ---
  var header = document.querySelector('.header');
  if (header) {
    var toggleHeaderShadow = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    toggleHeaderShadow();
    window.addEventListener('scroll', toggleHeaderShadow, { passive: true });
  }

  // --- Menu déroulant "Services" ---
  // L'affichage repose sur :hover / :focus-within (CSS), ce qui couvre déjà
  // souris et clavier. On ajoute un clic explicite en filet de sécurité :
  // certains navigateurs tactiles (notamment Safari iPad) ne déclenchent
  // pas :hover et gèrent :focus-within de façon inconstante au premier tap.
  document.querySelectorAll('.nav__dropdown').forEach(function (dropdown) {
    var toggle = dropdown.querySelector('.nav__dropdown-toggle');
    if (!toggle) return;
    var setExpanded = function (value) { toggle.setAttribute('aria-expanded', value); };
    dropdown.addEventListener('mouseenter', function () { setExpanded('true'); });
    dropdown.addEventListener('mouseleave', function () {
      if (!dropdown.classList.contains('is-open')) setExpanded('false');
    });
    dropdown.addEventListener('focusin', function () { setExpanded('true'); });
    dropdown.addEventListener('focusout', function (e) {
      if (!dropdown.contains(e.relatedTarget) && !dropdown.classList.contains('is-open')) {
        setExpanded('false');
      }
    });
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !dropdown.classList.contains('is-open');
      document.querySelectorAll('.nav__dropdown.is-open').forEach(function (d) {
        if (d !== dropdown) { d.classList.remove('is-open'); }
      });
      dropdown.classList.toggle('is-open', willOpen);
      setExpanded(willOpen ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.nav__dropdown.is-open').forEach(function (d) {
      d.classList.remove('is-open');
      var t = d.querySelector('.nav__dropdown-toggle');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  });

  // --- Bouton WhatsApp flottant : éviter le doublon visuel ---
  // Certaines sections (carte agent en page Contact, CTA de fin de page)
  // affichent déjà un bouton WhatsApp dédié. Quand une de ces zones est
  // à l'écran, la bulle flottante — toujours en position fixe en bas à
  // droite — se superposerait à ce bouton. On la masque temporairement
  // tant que l'utilisateur voit déjà un moyen équivalent de nous écrire.
  var floatWhatsapp = document.querySelector('.float-whatsapp');
  var duplicateWaCtas = document.querySelectorAll(
    '.contact-actions a[href*="wa.me"], .cta-banner a[href*="wa.me"], .cta-banner--plain a[href*="wa.me"]'
  );
  if (floatWhatsapp && duplicateWaCtas.length && 'IntersectionObserver' in window) {
    var waVisibleCount = 0;
    var waIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        waVisibleCount += entry.isIntersecting ? 1 : -1;
      });
      waVisibleCount = Math.max(0, waVisibleCount);
      floatWhatsapp.classList.toggle('is-hidden', waVisibleCount > 0);
    }, { threshold: 0.4 });
    duplicateWaCtas.forEach(function (el) { waIO.observe(el); });
  }

  // --- État "visité" des champs de formulaire ---
  // N'active un style d'erreur/succès que si le navigateur détecte une
  // contrainte réelle (required, type, pattern) : aucune validation ni
  // confirmation d'envoi n'est simulée côté script.
  document.querySelectorAll('.field input, .field select, .field textarea').forEach(function (input) {
    input.addEventListener('blur', function () {
      var field = input.closest('.field');
      if (field) field.classList.add('is-touched');
    });
  });

  // -----------------------------------------------------------------------
  // Apparitions au scroll — moteur générique piloté par IntersectionObserver
  // -----------------------------------------------------------------------
  // Chaque groupe ci-dessous correspond à une famille de composants du
  // design system. La direction du mouvement renforce la lecture : les
  // colonnes .split s'ouvrent depuis leur bord extérieur, les grilles
  // de cartes montent avec un léger décalage (stagger) qui guide l'œil
  // de gauche à droite sans jamais ralentir la lecture.
  var revealGroups = [
    { selector: '.section-head', direction: 'up' },
    { selector: '.stats__item', direction: 'up', stagger: 70 },
    { selector: '.svc-card', direction: 'up', stagger: 90 },
    { selector: '.pillar', direction: 'up', stagger: 80 },
    { selector: '.step', direction: 'up', stagger: 100 },
    { selector: '.check-card', direction: 'up', stagger: 70 },
    { selector: '.testimonial', direction: 'up', stagger: 100 },
    { selector: '.trio-stats', direction: 'scale' },
    { selector: '.cta-banner, .cta-banner--plain', direction: 'up' },
    { selector: '.callback', direction: 'up' },
    { selector: '.contact-card', direction: 'left' },
    { selector: '.contact-photo, .map-frame', direction: 'right' },
    { selector: '.mini-action', direction: 'up', stagger: 80 },
    { selector: '.faq-item', direction: 'up', stagger: 60 }
  ];
  var MAX_STAGGER_STEPS = 6; // au-delà, tout apparaît avec le même délai plafonné

  revealGroups.forEach(function (group) {
    document.querySelectorAll(group.selector).forEach(function (el, i) {
      el.classList.add('reveal');
      el.dataset.reveal = group.direction;
      if (group.stagger) {
        el.style.transitionDelay = (Math.min(i, MAX_STAGGER_STEPS) * group.stagger) + 'ms';
      }
    });
  });

  // Colonnes .split : le bloc qui suit visuellement l'image s'ouvre côté
  // opposé, pour un effet de "dépliage" cohérent avec la mise en page —
  // y compris quand .split--reverse inverse l'ordre visuel.
  document.querySelectorAll('.split').forEach(function (split) {
    var reversed = split.classList.contains('split--reverse');
    Array.prototype.forEach.call(split.children, function (child, i) {
      var fromLeft = (i === 0) !== reversed;
      child.classList.add('reveal');
      child.dataset.reveal = fromLeft ? 'left' : 'right';
    });
  });

  // En mode "mouvement réduit" ou navigateur sans IntersectionObserver,
  // on n'arme rien : tout reste visible en permanence (déjà le cas par
  // défaut désormais, cette ligne est surtout défensive).
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  var io = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  // On n'arme (masque) un élément qu'au moment précis où l'observateur est
  // effectivement attaché dessus — jamais avant. Si ce code ne s'exécute
  // jamais (script non chargé, erreur plus haut dans le fichier, JS
  // désactivé), aucun élément n'est masqué : le CSS reste visible par défaut.
  document.querySelectorAll('.reveal').forEach(function (el) {
    el.classList.add('reveal-armed');
    io.observe(el);
  });

  // Filet de sécurité : les robots d'indexation, les outils de prévisualisation
  // (aperçus de lien WhatsApp/Facebook) et certains contrôles qualité ne
  // simulent aucun scroll et ne verraient donc jamais le contenu sous la ligne
  // de flottaison. Passé ce délai, tout élément pas encore révélé l'est de
  // force — sans gêner les visiteurs réels, qui ont largement le temps de
  // scroller et de voir l'animation avant cette échéance.
  window.setTimeout(function () {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }, 2500);

});
