/* ==========================================================
   CONTACT — CARDS REFINEMENT (MODERN • PREMIUM)
   Replace/append to your existing contact CSS to improve the info cards
========================================================== */

/* Layout container adjustments for better card arrangement */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1px 420px; /* form / separator / cards column */
  gap: 2.5rem;
  align-items: start;
}

/* When screen narrower, the grid collapses via responsive rules kept elsewhere */
.sparator {
  width: 1px;
  height: auto;
  background: linear-gradient(to bottom, rgba(0,0,0,0.06), rgba(0,0,0,0.02));
  align-self: stretch;
  border-radius: 2px;
}

/* Clean card column wrapper (right side) */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: stretch;
  justify-content: start;
  padding: 0;
}

/* New card style — premium glass + soft elevation + accent border */
.contact-info article {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 1rem;
  align-items: center;
  padding: 1.25rem 1.25rem;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(255,255,255,0.62), rgba(255,255,255,0.50));
  border: 1px solid rgba(26, 61, 120, 0.06);
  box-shadow:
    0 8px 20px rgba(6, 22, 60, 0.06),
    inset 0 1px 0 rgba(255,255,255,0.45);
  transition: transform .32s cubic-bezier(.2,.9,.3,1), box-shadow .32s ease, background .32s ease;
  width: 100%;
  min-height: 72px;
  overflow: hidden;
}

/* Hover: lift + soft accent glow */
.contact-info article:hover {
  transform: translateY(-8px);
  box-shadow:
    0 20px 40px rgba(6,22,60,0.12),
    0 6px 18px rgba(26,77,143,0.08);
  background: linear-gradient(180deg, rgba(255,255,255,0.80), rgba(250,251,255,0.72));
}

/* Icon container: circle with subtle gradient and border */
.contact-info article i {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 12px;
  font-size: 1.25rem;
  color: var(--color-primary);
  background: linear-gradient(180deg, rgba(175,203,255,0.20), rgba(175,203,255,0.06));
  border: 1px solid rgba(26,77,143,0.08);
  box-shadow: 0 6px 18px rgba(26,77,143,0.06);
}

/* Text block inside card */
.contact-info article .info-title {
  margin: 0 0 .15rem 0;
  font-size: 1.02rem;
  font-weight: 700;
  color: var(--color-dark);
  letter-spacing: .2px;
}

/* Secondary info line (detail) */
.contact-info article p:last-child {
  margin: 0;
  font-size: .98rem;
  color: var(--text-muted);
  opacity: .95;
}

/* Optional small action row (if later you add link or CTA inside card) */
.contact-info article .card-actions {
  display: flex;
  gap: .6rem;
  margin-top: .5rem;
  align-items: center;
}

/* Small subtle badge — example (unused by default) */
.contact-info article .badge {
  display:inline-block;
  padding: .22rem .55rem;
  border-radius: 999px;
  font-size: .78rem;
  font-weight:600;
  color: var(--color-primary);
  background: rgba(175,203,255,0.12);
  border: 1px solid rgba(26,77,143,0.06);
}

/* ============================
   FORM — small visual tuning to match card style
   (keeps fields clear and aligned with new cards)
   — only desktop tweaks here, responsive rules remain in your responsive section
============================ */
.contact-form {
  background: linear-gradient(180deg, rgba(255,255,255,0.70), rgba(255,255,255,0.60));
  border: 1px solid rgba(26,77,143,0.06);
  box-shadow: 0 14px 40px rgba(6,22,60,0.06);
  border-radius: 18px;
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Form group cleaned */
.form-group {
  position: relative;
  width: 100%;
}
.form-group i {
  left: 1.15rem;
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  color: var(--color-primary);
  opacity: .9;
  font-size: 1.05rem;
}

/* Inputs */
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem 1rem 1rem 3.6rem;
  border-radius: 12px;
  border: 1px solid rgba(6,22,60,0.06);
  background: rgba(255,255,255,0.92);
  font-size: 1rem;
  color: var(--color-dark);
  transition: box-shadow .22s ease, border-color .22s ease, transform .18s ease;
  outline: none;
}

/* Focus states */
.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 6px 18px rgba(26,77,143,0.08);
  background: #fff;
  transform: translateY(-1px);
}

/* Submit CTA tuned */
.contact-form .btn {
  align-self: flex-start;
  padding: .95rem 1.6rem;
  border-radius: 12px;
  background: var(--color-primary);
  color: #fff;
  font-weight: 700;
  box-shadow: 0 10px 26px rgba(26,77,143,0.14);
  transition: transform .22s ease, box-shadow .22s ease;
}
.contact-form .btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 18px 36px rgba(26,77,143,0.18);
}

/* ============================
   GRID VARIANT: two small cards in one row (optional)
   Use when you want to show two items side-by-side on wide screens
============================ */
.contact-info.row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* ============================
   Accessibility / focus-visible
============================ */
.contact-info article:focus-within,
.contact-info article:focus {
  outline: 3px solid rgba(26,77,143,0.08);
  outline-offset: 4px;
}

/* ============================
   Tiny responsive tweak (keeps cards full width on medium screens)
   - If you already have breakpoints, these are safe minimal additions.
============================ */
@media (max-width: 1100px) {
  .contact-content { grid-template-columns: 1fr 1px 360px; gap: 2rem; }
  .contact-info article { grid-template-columns: 56px 1fr; padding: 1rem; }
  .contact-info article i { width:56px; height:56px; font-size:1.05rem; border-radius:10px; }
}

@media (max-width: 900px) {
  /* Collapse into column — your existing responsive rules will handle the rest,
     but we ensure the cards remain visually coherent */
  .contact-content { grid-template-columns: 1fr; }
  .sparator { display: none; }
  .contact-info { margin-top: 0; order: 2; }
  .contact-form { order: 1; }
  .contact-info article { grid-template-columns: 56px 1fr; }
}
