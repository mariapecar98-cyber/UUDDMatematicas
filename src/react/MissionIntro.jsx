import React, { useEffect, useRef } from 'react';

const introductions = {
  0: {
    title: 'Bienvenidos al proyecto de Polinomios',
    paragraphs: [
      'En lo que sigue deberéis llevar a cabo varias misiones.',
      'Poneos en situación: tú y los miembros de tu equipo os vais a vivir juntos. Tenéis 25 años y vuestra vida adulta ha comenzado.',
      'Lo primero que tendréis que hacer será describiros a vosotros, eligiendo vuestras propias profesiones y poniéndoos un sueldo.'
    ]
  },
  1: {
    title: 'Buscamos vivienda',
    paragraphs: ['Ahora, tendréis que buscar una casa en la que vivir. ¡Es importante que quepáis todos!']
  },
  2: {
    title: 'Organizamos nuestros gastos',
    paragraphs: ['No todo es la vivienda, también tendréis que elegir qué servicios vais a querer consumir a lo largo de los meses.']
  }
};

export default function MissionIntro({ mission }) {
  const dialog = useRef(null);
  const introduction = introductions[mission];
  useEffect(() => {
    const element = dialog.current;
    if (introduction) element?.showModal();
    return () => element?.close();
  }, [mission]);
  if (!introduction) return null;
  return <dialog ref={dialog} className="reset-dialog" aria-labelledby="mission-intro-title" aria-describedby="mission-intro-description">
    <span className="eyebrow">MISIÓN 0{mission + 1}</span>
    <h2 id="mission-intro-title">{introduction.title}</h2>
    <div id="mission-intro-description">{introduction.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
    <form method="dialog" className="reset-actions"><button className="button button-dark" autoFocus>¡Vamos allá!</button></form>
  </dialog>;
}
