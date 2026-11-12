import { activityHints, hintKey } from './hints.js';
import { ruffiniCells } from './ruffini.js';
export const initial = {
  team: [{ alias: '', job: '', salary: '', source: '' }, { alias: '', job: '', salary: '', source: '' }],
  home: { city: '', area: '', squareMeters: '', rent: '', rooms: '', url: '', why: '' },
  budget: null,
  costs: { food: '', utilities: '', transport: '', leisure: '', other: '', deposit: 1 },
  costEvidence: { food: { source: '', reason: '' }, utilities: { source: '', reason: '' }, transport: { source: '', reason: '' }, leisure: { source: '', reason: '' }, other: { source: '', reason: '' } },
  share: 'equal', shareWhy: '', expressions: { costs: '', income: '', balance: '' },
  calculations: {}, algebra: { ...Object.fromEntries(Object.keys(activityHints).map(k=>[hintKey(k),''])), ...Object.fromEntries(Object.keys(ruffiniCells).map(k=>[k,''])), mulLength: '', mulWidth: '', mulArea: '', mulDifference: '', room1Advertised: '', room2Advertised: '', room2Real: '', room2Difference: '', homeDifference: '', homeDifferenceAt4: '', rentSavings: '', claimText: '', divisionHinta: '', divisionHintb: '', divisionHintc: '', divisionHintd: '', compensationWork: '', compensationQuotient: '', compensationRemainder: '', compensationPayment: '', compensationMeaning: '' }, reflections: '', hints: [], completed: [], active: 0
};
export const missions = [
  { title: 'Elegimos nuestro futuro', short: 'Elegimos nuestro futuro', icon: '↗', scene: '01 / PROFESIONES' },
  { title: 'Buscamos vivienda', short: 'Buscamos vivienda', icon: '⌂', scene: '02 / VIVIENDA' },
  { title: 'Organizamos nuestros gastos', short: 'Organizamos nuestros gastos', icon: '◷', scene: '03 / PRESUPUESTO' },
  { title: '¡Nos han engañado con los metros de la vivienda!', short: 'Metros de la vivienda', icon: '!', scene: '04 / IMPREVISTO' },
  { title: '¡La agencia os debe dinero!', short: 'La indemnización', icon: '÷', scene: '05 / DIVISIÓN' },
  { title: 'Construimos nuestro modelo matemático', short: 'Construimos nuestro modelo matemático', icon: '∑', scene: '06 / POLINOMIOS' },
  { title: 'Evaluación final', short: 'Evaluación final', icon: '✓', scene: '07 / RESULTADOS' }
];
export const monthly = d => Number(d.home.rent || 0) + ['food','utilities','transport','leisure','other'].reduce((s,k)=>s+Number(d.costs[k]||0),0);
export const salaries = d => d.team.reduce((s,p)=>s+Number(p.salary||0),0);

// Parse a small, safe polynomial language into coefficients; no eval and no sampling.
export function polynomial(input, variable='x') {
  const s = String(input).replace(/\s+/g,'').replace(/−/g,'-').replace(/×/g,'*').replace(/\^\(?([0-9]+)\)?/g,'^$1');
  if (!s) return null;
  let i=0, terms={};
  while(i<s.length){
    let sign=1; if(s[i]==='+')i++; else if(s[i]==='-'){sign=-1;i++;}
    let start=i, coeff=1, hasCoeff=false;
    while(i<s.length && /[0-9.]/.test(s[i]))i++;
    if(i>start){coeff=Number(s.slice(start,i));hasCoeff=true;if(!Number.isFinite(coeff))return null;}
    if(s[i]==='*')i++;
    let exp=0;
    if(s[i]?.toLowerCase()===variable.toLowerCase()){
      exp=1;i++;
      if(s[i]==='^'){i++;let e=i;while(/[0-9]/.test(s[i]||''))i++;if(e===i)return null;exp=Number(s.slice(e,i));}
      if(exp>12)return null;
    } else if(!hasCoeff)return null;
    if(s[i] && !'+-'.includes(s[i]))return null;
    terms[exp]=(terms[exp]||0)+sign*coeff;
  }
  return terms;
}
export function equivalent(a,b){const p=polynomial(a),q=polynomial(b);if(!p||!q)return false;const keys=new Set([...Object.keys(p),...Object.keys(q)]);return [...keys].every(k=>Math.abs((p[k]||0)-(q[k]||0))<1e-8);}
function multiply(p,q){const out={};for(const [a,av] of Object.entries(p))for(const [b,bv] of Object.entries(q)){const degree=Number(a)+Number(b);out[degree]=(out[degree]||0)+av*bv;}return out;}
function same(p,q){const keys=new Set([...Object.keys(p),...Object.keys(q)]);return [...keys].every(k=>Math.abs((p[k]||0)-(q[k]||0))<1e-8);}
export function productEquivalent(answer,left,right,variable='x'){const a=polynomial(answer,variable),b=polynomial(left,variable),c=polynomial(right,variable);return Boolean(a&&b&&c&&same(a,multiply(b,c)));}
export function polynomialValue(input,x,variable='x'){const p=polynomial(input,variable);if(!p||!Number.isFinite(Number(x)))return null;return Object.entries(p).reduce((sum,[degree,coefficient])=>sum+coefficient*Number(x)**Number(degree),0);}
export function productValue(left,right,x,variable='x'){const a=polynomial(left,variable),b=polynomial(right,variable),n=Number(x);if(!a||!b||!Number.isFinite(n))return null;return Object.entries(multiply(a,b)).reduce((sum,[degree,coefficient])=>sum+coefficient*n**Number(degree),0);}
export function divisionEquivalent(dividend,divisor,quotient,remainder,variable='x'){const a=polynomial(dividend,variable),b=polynomial(divisor,variable),q=polynomial(quotient,variable),r=polynomial(remainder||'0',variable);if(!a||!b||!q||!r)return false;const bDegrees=Object.keys(b).map(Number).filter(k=>Math.abs(b[k])>1e-8);if(!bDegrees.length)return false;const sum={...multiply(b,q)};for(const [degree,value] of Object.entries(r))sum[degree]=(sum[degree]||0)+value;const bDegree=Math.max(...bDegrees);const rDegrees=Object.keys(r).map(Number).filter(k=>Math.abs(r[k])>1e-8);return same(a,sum)&&(!rDegrees.length||Math.max(...rDegrees)<bDegree);}
