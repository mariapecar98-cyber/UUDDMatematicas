export const activityHints = {
  professions: ['Profesiones', 'Buscad un salario neto mensual y guardad el enlace a la fuente consultada.'],
  housing: ['Vivienda', 'Para justificar la elección, comparad tamaño, ubicación y precio. El precio por metro cuadrado se obtiene dividiendo el alquiler mensual entre la superficie.'],
  bedroom: ['Metros: dormitorio', 'Restad un metro a cada dimensión anunciada. Para hallar cada superficie, multiplicad largo por ancho. Restad la superficie real de la anunciada.'],
  livingRoom: ['Metros: salón', 'Restad dos metros a cada dimensión. Multiplicad los binomios para obtener las superficies y restad la real de la anunciada.'],
  wholeHome: ['Metros: vivienda completa', 'Restad los dos polinomios agrupando términos del mismo grado. Después, sustituid x por 2 en la diferencia.'],
  claimAmount: ['Reclamación: importe', 'Multiplicad los metros cuadrados que faltan para x = 2 por el precio mensual del alquiler por metro cuadrado.'],
  claimText: ['Reclamación: texto', 'Explicad qué ha ocurrido y qué pedís a la inmobiliaria. Indicad la superficie que falta y el importe que reclamáis.'],
  modelCosts: ['Modelo de gastos', 'Multiplicad el gasto mensual por x y añadid la fianza, que se paga una sola vez.'],
  modelIncome: ['Modelo de ingresos', 'Multiplicad la suma de los ingresos mensuales del equipo por x.'],
  modelBalance: ['Modelo de balance', 'Restad el gasto acumulado de los ingresos acumulados. Recordad incluir la fianza.'],
  reflection: ['Reflexión final', 'Valorad si podéis mantener el presupuesto, qué gastos ajustaríais y cómo os han ayudado los polinomios a tomar decisiones.']
};
export const hintKey = id => `activityHint_${id}`;
export const activityHintReport = algebra => Object.entries(activityHints).map(([id,[label]])=>`Pista - ${label}: ${algebra[hintKey(id)]==='used'?'Sí':'No'}`);
