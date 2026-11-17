import test from 'node:test';
import assert from 'node:assert/strict';
import { answersEquivalent, parseExpression, gradeExercise } from './assessmentMath.js';
import { assessments } from './assessments.js';

test('accepts equivalent fractions, factored polynomials, superscripts and multivariate monomials',()=>{
  for(const [a,b] of [['n+n/2','3n/2'],['(x+3)²','x^2+6x+9'],['(7xy)(−4x³y²)','-28x^4y^3'],['((√3 x³y²)²)² / (xy)³','9x^9y^5'],['−0,5x²','-x^2/2'],['2/3','(4)/(6)'],['(2xy)^3/(4y²)','2x^3y'],['-x²','-(x²)']])assert.ok(answersEquivalent(a,b),`${a} = ${b}`);
  assert.equal(answersEquivalent('x^2','x'),false);
  assert.equal(answersEquivalent('','0'),false);
});
test('rejects malformed, excessive or executable input',()=>{
  for(const input of ['alert(1)','globalThis','1/0','x^999999','x+','(x+1','2**3','x;process.exit()','('.repeat(100)+'1'+')'.repeat(100)])assert.equal(parseExpression(input),null,input);
});
test('five tests have ten one-point exercises; blank and partial answers grade correctly',()=>{
  assert.equal(assessments.length,5);
  for(const assessment of assessments){assert.equal(assessment.exercises.length,10);for(const exercise of assessment.exercises){assert.ok(exercise.solution.length);assert.equal(gradeExercise(exercise,exercise.parts.map(p=>p.answer)).points,1);assert.equal(gradeExercise(exercise,[]).points,0);}}
  assert.equal(gradeExercise(assessments[0].exercises[0],['4n','','']).points,1/3);
  assert.equal(gradeExercise(assessments[0].exercises[4],['6x²+x','']).points,0.5);
});
test('all simplification answers agree with the exercise expressions',()=>{
  for(const assessment of assessments)for(const index of [2,3]){const e=assessment.exercises[index];assert.ok(answersEquivalent(e.prompt,e.parts[0].answer),`Assessment ${assessment.id}, exercise ${index+1}`);}
});
test('all fifteen division answers reconstruct the dividend',()=>{
  for(const assessment of assessments)for(const index of [4,5,6]){const e=assessment.exercises[index],match=e.prompt.match(/: \((.+)\) : \((.+)\)\.$/);assert.ok(match);const [,a,b]=match;assert.ok(answersEquivalent(`(${b})*(${e.parts[0].answer})+(${e.parts[1].answer})`,a),`Assessment ${assessment.id}, exercise ${index+1}`);}
});
