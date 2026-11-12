import Hint from './Hint.jsx';
import React from 'react';

const Field=({label,value,onChange,placeholder='Polinomio en x'})=><label>{label}<input value={value} onChange={onChange} placeholder={placeholder}/></label>;
const Question=({n,title,children})=><article className="fraud-question"><span className="question-number">{n}</span><div className="question-body"><h3>{title}</h3>{children}</div></article>;

export default function MultiplyMission({data,edit,check,checkDimensions,checkArea,checkValue,pricePerSquareMeter,rentSavings}) {
  const a=data.algebra, bind=k=>({value:a[k],onChange:e=>edit(['algebra',k],e.target.value)});
  return <section className="work-panel challenge-mission housing-fraud">
    <div className="problem-kicker">CAPÍTULO 1 · IMPREVISTO</div>
    <h2>¡Nos han estafado con los metros de nuestra vivienda!</h2>
    <p className="problem-story">Hace unos meses alquilasteis la vivienda que encontrasteis en un portal inmobiliario. Os decidisteis por ella según las dimensiones del anuncio. Ahora, tras una noticia sobre una inmobiliaria que anunciaba viviendas más grandes de lo que eran, un técnico ha medido vuestra casa. Las medidas no coinciden.</p>
    <div className="fraud-questions">
      <Question n="1" title="Dormitorio principal">
        <p>El anuncio decía: largo x m y ancho x + 2 m. En realidad, tiene un metro menos de largo y un metro menos de ancho.</p>
        <Hint id="bedroom" edit={edit}/>
        <div className="dimension-inputs"><Field label="Largo real" {...bind('mulLength')}/><Field label="Ancho real" {...bind('mulWidth')}/></div><button className="check-button" onClick={checkDimensions}>Comprobar dimensiones ↗</button>
        <div className="dimension-inputs followup-fields"><Field label="Superficie anunciada" {...bind('room1Advertised')}/><Field label="Superficie real" {...bind('mulArea')}/><Field label="Metros cuadrados que faltan" {...bind('mulDifference')}/></div>
        <div className="check-row"><button className="check-button" onClick={()=>check('room1Advertised','x^2+2x')}>Superficie anunciada ↗</button><button className="check-button" onClick={checkArea}>Superficie real ↗</button><button className="check-button" onClick={()=>check('mulDifference','2x+1')}>Diferencia ↗</button></div>
      </Question>
      <Question n="2" title="Salón">
        <p>Según el anuncio, medía 2x + 1 m de largo y x + 3 m de ancho. En realidad, tanto el largo como el ancho son dos metros menores.</p>
        <Hint id="livingRoom" edit={edit}/>
        <div className="dimension-inputs"><Field label="Superficie anunciada" {...bind('room2Advertised')}/><Field label="Superficie real" {...bind('room2Real')}/><Field label="Diferencia" {...bind('room2Difference')}/></div>
        <div className="check-row"><button className="check-button" onClick={()=>check('room2Advertised','2x^2+7x+3')}>Anunciada ↗</button><button className="check-button" onClick={()=>check('room2Real','2x^2+x-1')}>Real ↗</button><button className="check-button" onClick={()=>check('room2Difference','6x+4')}>Diferencia ↗</button></div>
      </Question>
      <Question n="3" title="La vivienda completa">
        <p>El técnico calcula que la superficie anunciada era 3x² + 8x + 12 m² y que la real es 2x² + 5x + 9 m².</p>
        <Hint id="wholeHome" edit={edit}/>
        <div className="dimension-inputs"><Field label="Polinomio de los metros que faltan" {...bind('homeDifference')}/><Field label="Metros de más si x = 2" {...bind('homeDifferenceAt4')} placeholder="Número"/></div>
        <div className="check-row"><button className="check-button" onClick={()=>check('homeDifference','x^2+3x+3')}>Comprobar polinomio ↗</button><button className="check-button" onClick={()=>checkValue('homeDifferenceAt4',13)}>Comprobar x = 2 ↗</button></div>
      </Question>
      <Question n="4" title="¡A reclamar!">
        <p>Con los datos del anuncio que habéis encontrado, pagáis <b>{pricePerSquareMeter>0?`${pricePerSquareMeter.toLocaleString('es-ES',{minimumFractionDigits:2,maximumFractionDigits:2})} € por metro cuadrado al mes`:'— €/m² al mes (completad primero los datos de la vivienda)'}</b>.</p>
        <Hint id="claimAmount" edit={edit}/>
        <p>Si x = 2, ¿cuánto os ahorraríais al mes de alquiler si os descontaran los metros que faltan? Escribe el importe en euros.</p>
        <Field label="Ahorro mensual de alquiler (€)" {...bind('rentSavings')} placeholder="Importe en euros"/>
        <button className="check-button" onClick={()=>checkValue('rentSavings',Number(rentSavings.toFixed(2)))}>Comprobar ↗</button>
      </Question>
      <Question n="5" title="Expone / solicita">
        <Hint id="claimText" edit={edit}/>
        <label>Texto de la reclamación<textarea value={a.claimText} onChange={e=>edit(['algebra','claimText'],e.target.value)} placeholder="Expone: … Solicita: …" rows="5"/></label>
      </Question>
    </div>
  </section>;
}
