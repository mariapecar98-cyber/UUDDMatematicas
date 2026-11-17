import test from 'node:test';
import assert from 'node:assert/strict';
import { syntheticDivision } from './syntheticDivision.js';
import { assessments } from './assessments.js';
import { parseExpression } from './assessmentMath.js';

test('Ruffini places missing coefficients, products and sums in the correct columns',()=>{
  const result=syntheticDivision('2x⁵ − 3x⁴ + 2x − 1','x + 2');
  assert.equal(result.root,-2);
  assert.deepEqual(result.coefficients,[2,-3,0,0,2,-1]);
  assert.deepEqual(result.products,[null,-4,14,-28,56,-116]);
  assert.deepEqual(result.sums,[2,-7,14,-28,58,-117]);
});
test('all ten Ruffini diagrams match the expected quotient and remainder',()=>{
  let count=0;
  for(const t of assessments)for(const e of t.exercises){if(!e.ruffini)continue;count++;const result=syntheticDivision(e.ruffini.dividend,e.ruffini.divisor),quotient=parseExpression(e.parts[0].answer),degree=result.quotient.length-1;
    assert.deepEqual(result.quotient,Array.from({length:degree+1},(_,i)=>quotient[`${degree-i},0,0`]||0));
    assert.equal(result.remainder,Number(e.parts[1].answer));
  }
  assert.equal(count,10);
});
