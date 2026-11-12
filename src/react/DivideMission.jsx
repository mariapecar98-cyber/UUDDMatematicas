import React, { useState } from 'react';
import { ruffiniCells, ruffiniComplete } from '../lib/ruffini.js';
const Question=({n,title,children})=><article className="fraud-question"><span className="question-number">{n}</span><div className="question-body"><h3>{title}</h3>{children}</div></article>;
const Hint=({part,edit,children})=><details className="division-hint" onToggle={e=>{if(e.currentTarget.open)edit(['algebra',`divisionHint${part}`],'used')}}><summary>Pista</summary><p>{children}</p></details>;
export default function DivideMission({data,edit,check,checkValue}) {
 const bind=key=>({value:data.algebra[key]||'',onChange:e=>edit(['algebra',key],e.target.value)});
 const [checked,setChecked]=useState(false);
 const cell=(key,label)=>{const value=data.algebra[key]||'',correct=value.trim()!==''&&Number(value.replace(',','.').replace('−','-'))===ruffiniCells[key];return <input aria-label={label} inputMode="decimal" value={value} placeholder="?" className={checked?(correct?'ruffini-correct':'ruffini-error'):''} aria-invalid={checked&&!correct} onChange={e=>{edit(['algebra',key],e.target.value);setChecked(false)}}/>};
 return <section className="work-panel challenge-mission housing-fraud">
 <div className="problem-kicker">CAPÍTULO 1 · IMPREVISTO</div><h2>¡La agencia os debe dinero!</h2>
 <p className="problem-story">Habéis ganado el juicio contra la agencia inmobiliaria por anunciar el piso con unas dimensiones incorrectas. Tras vuestra reclamación, la agencia debe pagaros una indemnización. Sin embargo, no os dará todo el dinero de golpe: lo repartirá en varios pagos mensuales iguales.</p>
 <p className="problem-story">La indemnización total depende del número de meses durante los que hayáis pagado el alquiler. En este problema, x representa ese número de meses.</p>
 <div className="ad-measure"><span>INDEMNIZACIÓN TOTAL</span><b>I(x) = 2x³ + 7x² + 7x + 2 €</b></div><div className="real-measure"><span>PAGOS MENSUALES IGUALES</span><b>x + 2 pagos</b></div>
 <div className="fraud-questions">
 <Question n="a" title="¿Cuánto recibiríais en cada pago?"><Hint part="a" edit={edit}>Completad la tabla de Ruffini. Elegid el número que anula x + 2, colocad los coeficientes y bajad el primero. Después, multiplicad y sumad en cada columna.</Hint><div className="operation division-operation">(2x³ + 7x² + 7x + 2) ÷ (x + 2)</div>
 <div className="ruffini-scroll"><table className="ruffini-table"><caption>Ruffini · completad todos los huecos</caption><thead><tr><th scope="col">Raíz</th><th scope="col">x³</th><th scope="col">x²</th><th scope="col">x</th><th scope="col">Constante</th></tr></thead><tbody>
 <tr><td className="ruffini-root" rowSpan="2">{cell('ruffiniRoot','Número que anula x + 2')}</td>{['ruffiniC3','ruffiniC2','ruffiniC1','ruffiniC0'].map((k,i)=><td key={k}>{cell(k,`Coeficiente del dividendo, columna ${i+1}`)}</td>)}</tr>
 <tr><td></td>{['ruffiniP2','ruffiniP1','ruffiniP0'].map((k,i)=><td key={k}>{cell(k,`Producto ${i+1}`)}</td>)}</tr>
 <tr className="ruffini-sums"><th scope="row">Sumas</th>{['ruffiniQ2','ruffiniQ1','ruffiniQ0','ruffiniR'].map((k,i)=><td key={k}>{cell(k,i===3?'Resto':`Coeficiente del cociente, columna ${i+1}`)}</td>)}</tr>
 </tbody></table></div>
 <button className="check-button" onClick={()=>setChecked(true)}>Comprobar Ruffini ↗</button>{checked&&<p className="ruffini-feedback" role="status">{ruffiniComplete(data.algebra)?'¡Correcto! Ya podéis escribir el cociente y el resto en el apartado b.':'Revisad los huecos marcados: la raíz, los coeficientes, los productos y las sumas.'}</p>}
 </Question>
 <Question n="b" title="¿Cuál es el cociente? ¿Y el resto?"><Hint part="b" edit={edit}>Las tres primeras sumas son los coeficientes del cociente (x², x y término independiente). La última es el resto.</Hint><div className="division-answers"><label>Cociente: importe de cada pago (€)<input {...bind('compensationQuotient')} placeholder="Polinomio en x"/></label><label>Resto (€)<input {...bind('compensationRemainder')} placeholder="Número"/></label></div><button className="check-button" onClick={()=>check('compensation','2x^3+7x^2+7x+2','x+2')}>Comprobar división ↗</button></Question>
 <Question n="c" title="Si x = 3, ¿cuál sería el importe de cada pago?"><Hint part="c" edit={edit}>Habéis pagado el alquiler durante 3 meses. Sustituid x por 3 en el cociente para calcular cuánto recibiríais en cada uno de los 5 pagos.</Hint><label>Importe de cada pago (€)<input {...bind('compensationPayment')} inputMode="decimal" placeholder="Importe en euros"/></label><button className="check-button" onClick={()=>checkValue('compensationPayment',28)}>Comprobar importe ↗</button></Question>
 <Question n="d" title="¿Qué significaría que el resto fuera distinto de cero?"><Hint part="d" edit={edit}>Explicad qué representaría ese resto en el reparto de la indemnización y cómo afectaría al importe de los pagos.</Hint><label>Vuestra interpretación<textarea {...bind('compensationMeaning')} rows="4" placeholder="Si el resto fuera distinto de cero…"/></label></Question>
 </div></section>;
}
