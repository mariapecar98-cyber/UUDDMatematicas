import React from 'react';
import { parseExpression } from '../lib/assessmentMath.js';

function coefficients(expression){return Object.fromEntries(Object.entries(parseExpression(expression)||{}).map(([powers,value])=>[Number(powers.split(',')[0]),value]));}
const degree=p=>Math.max(0,...Object.keys(p).map(Number).filter(k=>Math.abs(p[k])>1e-8));
function terms(p){const highest=degree(p);return Array.from({length:highest+1},(_,i)=>highest-i).filter(k=>Math.abs(p[k]||0)>1e-8);}
function Term({coefficient,exponent,first}){
  const magnitude=Math.abs(coefficient);
  return <>{coefficient<0?'− ':first?'':'+ '}{exponent===0||magnitude!==1?magnitude:''}{exponent>0&&<>x{exponent>1&&<sup>{exponent}</sup>}</>}</>;
}
function Polynomial({value}){const p=coefficients(value),powers=terms(p);return <>{powers.length?powers.map((k,i)=><React.Fragment key={k}><Term coefficient={p[k]} exponent={k} first={i===0}/>{' '}</React.Fragment>):'0'}</>;}
export default function DivisionBox({division}){
  const dividend=coefficients(division.dividend),divisor=coefficients(division.divisor),divisorDegree=degree(divisor),columns=Array.from({length:degree(dividend)+1},(_,i)=>degree(dividend)-i);
  let remainder={...dividend};const rows=[{value:dividend,type:'dividend'}];
  for(let limit=0;limit<20&&terms(remainder).length&&degree(remainder)>=divisorDegree;limit++){
    const power=degree(remainder)-divisorDegree,coefficient=remainder[degree(remainder)]/divisor[divisorDegree],product={};
    for(const k of terms(divisor))product[k+power]=divisor[k]*coefficient;
    rows.push({value:product,type:'subtract'});
    remainder={...remainder};for(const k in product)remainder[k]=(remainder[k]||0)-product[k];
    rows.push({value:remainder,type:'difference'});
  }
  return <figure className="division-figure"><figcaption>División entera paso a paso</figcaption><div className="division-scroll" tabIndex="0" role="region" aria-label="División con cajita: dividendo y restas a la izquierda; divisor y cociente a la derecha"><div className="division-box"><table className="division-calculation" aria-label="Restas sucesivas de la división"><tbody>{rows.map((row,i)=>{const powers=terms(row.value);return <tr key={i} className={`division-row-${row.type} ${i===rows.length-1?'division-row-final':''}`}><th scope="row"><span className="assessment-sr">{row.type==='dividend'?'Dividendo':row.type==='subtract'?'Restamos':i===rows.length-1?'Resto':'Resultado parcial'}</span>{row.type==='subtract'?'− (':''}</th>{columns.map(k=><td key={k}>{Math.abs(row.value[k]||0)>1e-8?<Term coefficient={row.value[k]} exponent={k} first={powers[0]===k}/>:!powers.length&&k===0?'0':null}</td>)}<td>{row.type==='subtract'?')':''}</td></tr>;})}</tbody></table><div className="division-right"><div className="division-divisor"><span className="assessment-sr">Divisor: </span><Polynomial value={division.divisor}/></div><div className="division-quotient"><span className="assessment-sr">Cociente: </span><Polynomial value={division.quotient}/></div></div></div></div><p className="division-legend">Cociente: <Polynomial value={division.quotient}/> · Resto: <Polynomial value={division.remainder}/></p></figure>;
}
