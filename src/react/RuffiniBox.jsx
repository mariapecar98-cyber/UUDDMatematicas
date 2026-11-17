import React from 'react';
import { syntheticDivision } from '../lib/syntheticDivision.js';

const number=n=>n<0?`−${Math.abs(n)}`:String(n===0?0:n);
export default function RuffiniBox({division}){
  const {root,coefficients,products,sums}=syntheticDivision(division.dividend,division.divisor);
  return <figure className="division-figure"><figcaption>Regla de Ruffini paso a paso</figcaption><div className="division-scroll" tabIndex="0" role="region" aria-label="Esquema de Ruffini: raíz a la izquierda, coeficientes arriba, productos en el centro y resultados abajo"><table className="ruffini-box" aria-label="División mediante Ruffini"><tbody>
    <tr><th scope="row" className="ruffini-root"><span className="assessment-sr">Coeficientes del dividendo</span></th>{coefficients.map((n,i)=><td key={i}>{number(n)}</td>)}</tr>
    <tr><th scope="row" className="ruffini-root"><span className="assessment-sr">Raíz del divisor: </span>{number(root)}<span className="assessment-sr">. Productos</span></th>{products.map((n,i)=><td key={i}>{n===null?<span className="assessment-sr">Bajamos el primer coeficiente</span>:number(n)}</td>)}</tr>
    <tr className="ruffini-sums"><th scope="row" className="ruffini-root"><span className="assessment-sr">Coeficientes del cociente y resto</span></th>{sums.map((n,i)=><td className={i===sums.length-1?'ruffini-remainder':''} key={i}>{number(n)}</td>)}</tr>
    </tbody></table></div><p className="division-legend">La última fila contiene los coeficientes del cociente. El último número, destacado en la cajita, es el resto.</p></figure>;
}
