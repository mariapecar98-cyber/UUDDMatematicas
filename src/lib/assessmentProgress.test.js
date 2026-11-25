import test from 'node:test';
import assert from 'node:assert/strict';
import { assessmentScore, progressLines } from './assessmentProgress.js';

const assessment={id:1,exercises:[{title:'Suma',prompt:'Suma los términos.',parts:[{label:'a',answer:'2x'},{label:'b',answer:'3'}]}]};

test('progress distinguishes uncorrected work from grades and retains past answers',()=>{
  const attempts=[{at:'2026-11-25T09:00:00Z',answers:[['x+x','0']]}];
  const entry={answers:[['','']],submitted:false,attempts};
  const lines=progressLines([assessment],{1:entry});
  assert.ok(lines.includes('0 de 1 ejercicios completados'));
  assert.ok(lines.includes('Estado actual: pendiente de corregir'));
  assert.ok(lines.some(l=>l.includes('Nota: 0,5 / 10')));
  assert.ok(lines.some(l=>l.includes('a: x+x')));
  assert.ok(!lines.some(l=>l.startsWith('Nota actual:')));
  assert.equal(attempts[0].answers[0][0],'x+x');
});

test('corrected reports include partial credit, blank answers and unstarted assessments',()=>{
  const entry={answers:[['2x','']],submitted:true};
  const lines=progressLines([assessment,{...assessment,id:2}],{1:entry});
  assert.equal(assessmentScore(assessment,entry.answers),0.5);
  assert.ok(lines.includes('Nota actual: 0,5 / 10'));
  assert.ok(lines.includes('b: Sin responder · Revisar'));
  assert.ok(lines.includes('Puntuación: 0,5 / 1'));
  assert.ok(lines.includes('AUTOEVALUACIÓN 2'));
});
