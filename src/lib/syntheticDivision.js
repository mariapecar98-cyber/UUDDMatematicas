import { parseExpression } from './assessmentMath.js';

export function syntheticDivision(dividend,divisor){
  const p=parseExpression(dividend),d=parseExpression(divisor);
  if(!p||!d||d['1,0,0']!==1||Object.keys(d).some(k=>!['1,0,0','0,0,0'].includes(k)))throw Error('Ruffini necesita un divisor de la forma x − a.');
  const degree=Math.max(...Object.keys(p).map(k=>Number(k.split(',')[0])));
  const root=-(d['0,0,0']||0),coefficients=Array.from({length:degree+1},(_,i)=>p[`${degree-i},0,0`]||0);
  const products=[null],sums=[coefficients[0]];
  for(let i=1;i<coefficients.length;i++){products.push(root*sums[i-1]);sums.push(coefficients[i]+products[i]);}
  return {root,coefficients,products,sums,quotient:sums.slice(0,-1),remainder:sums.at(-1)};
}
