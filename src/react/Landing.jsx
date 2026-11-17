import React from 'react';

export default function Landing({start}) {
  return <main className="landing landing-new unit-catalog">
    <header className="landing-bar">
      <div className="brand"><img className="brand-logo" src={`${import.meta.env.BASE_URL}logo-mates-en-practicas.svg`} alt="Mates en Prácticas"/></div>
    </header>
    <section className="landing-title catalog-intro" aria-labelledby="catalog-title">
      <div className="landing-heading">
        <span className="grade-label">4.º ESO · MATEMÁTICAS A</span>
        <h1 id="catalog-title">Mates en<br/>Prácticas</h1>
      </div>
      <div className="catalog-art" aria-hidden="true"><span className="catalog-art-main">m²</span></div>
    </section>
    <section className="chapter-section" aria-labelledby="units-heading">
      <div className="chapter-heading"><h2 id="units-heading">Unidades didácticas</h2></div>
      <div className="unit-grid">
        <button className="unit-card unit-available" onClick={start}>
          <div className="unit-card-top"><span>UNIDAD 01 · POLINOMIOS</span><span className="unit-status">Disponible</span></div>
          <div className="age-art" aria-hidden="true"><div className="age-number">25</div><div className="euro-stamp">€</div><div className="math-stamp">x + 1</div><div className="art-square"/></div>
          <div className="unit-card-copy"><h3>Polinomios</h3><p>Autoevaluaciones disponibles. Proyecto de la unidad bloqueado.</p><span className="unit-enter">Entrar en la unidad <b>→</b></span></div>
        </button>
        <article className="unit-card unit-upcoming unit-locked" aria-label="Unidad 2: Ecuaciones. Bloqueada"><div className="unit-card-top"><span>UNIDAD 02</span><span className="unit-status">Bloqueado</span></div><div className="unit-placeholder" aria-hidden="true">x = ?</div><div className="unit-card-copy"><h3>Ecuaciones</h3><span className="unit-lock-label">Bloqueado</span></div></article>
        <article className="unit-card unit-upcoming unit-upcoming-blue unit-locked" aria-label="Unidad 3: Sistemas de ecuaciones e inecuaciones. Bloqueada"><div className="unit-card-top"><span>UNIDAD 03</span><span className="unit-status">Bloqueado</span></div><div className="unit-placeholder" aria-hidden="true">≤ ≥</div><div className="unit-card-copy"><h3>Sistemas de ecuaciones e inecuaciones</h3><span className="unit-lock-label">Bloqueado</span></div></article>
      </div>
    </section>
  </main>;
}
