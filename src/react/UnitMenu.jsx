import React from 'react';

export default function UnitMenu({ back, project, hasSaved }) {
  return <main className="landing landing-new unit-catalog">
    <header className="landing-bar">
      <button className="brand" onClick={back} aria-label="Volver a unidades didácticas"><img className="brand-logo" src={`${import.meta.env.BASE_URL}logo-mates-transparente.png`} alt="Mates para la vida"/></button>
      <button className="button button-dark" onClick={back}>← Unidades didácticas</button>
    </header>
    <section className="landing-title catalog-intro" aria-labelledby="unit-title">
      <div className="landing-heading"><span className="grade-label">UNIDAD 01 · MATEMÁTICAS A</span><h1 id="unit-title">Polinomios</h1></div>
      <div className="catalog-art" aria-hidden="true"><span className="catalog-art-main">x²</span></div>
    </section>
    <section className="chapter-section" aria-label="Contenido de la unidad">
      <div className="unit-grid unit-menu-grid">
        <button className="unit-card unit-available" onClick={project}>
          <div className="unit-card-top"><span>PROYECTO DE LA UNIDAD</span><span className="unit-status">Disponible</span></div>
          <div className="age-art" aria-hidden="true"><div className="age-number">25</div><div className="euro-stamp">€</div><div className="math-stamp">x + 1</div><div className="art-square"/></div>
          <div className="unit-card-copy"><h2>Proyecto de la unidad</h2><h3>El polinomio de la vida</h3><p>Tenéis 25 años y os vais a vivir juntos. Diseñad vuestro presupuesto y modelizadlo con polinomios.</p><span className="unit-enter">{hasSaved ? 'Continuar proyecto' : 'Entrar en el proyecto'} <b>→</b></span></div>
        </button>
        <article className="unit-card unit-review">
          <div className="unit-card-top"><span>APUNTES Y EJERCICIOS</span><span className="unit-status">Próximamente</span></div>
          <div className="review-art" aria-hidden="true">x² + 2x + 1</div>
          <div className="unit-card-copy"><h2>Repasa el contenido</h2><p>Aquí encontrarás apuntes y ejercicios para repasar los polinomios y practicar lo aprendido.</p><span className="review-status">Disponible próximamente</span></div>
        </article>
      </div>
    </section>
  </main>;
}
