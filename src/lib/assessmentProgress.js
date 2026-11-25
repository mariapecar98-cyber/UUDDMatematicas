import { gradeExercise } from './assessmentMath.js';

export const assessmentScore=(test,answers=[])=>test.exercises.reduce((sum,e,i)=>sum+gradeExercise(e,answers[i]).points,0);

export function progressLines(assessments,tests){
  const number=n=>n.toLocaleString('es-ES',{maximumFractionDigits:2});
  const lines=['Las notas son orientativas: el procedimiento también cuenta.'];
  for(const test of assessments){
    const entry=tests[test.id]||{answers:[]};
    const done=test.exercises.filter((e,i)=>e.parts.every((_,j)=>entry.answers[i]?.[j]?.trim())).length;
    lines.push('',`AUTOEVALUACIÓN ${test.id}`,`${done} de ${test.exercises.length} ejercicios completados`,entry.submitted?`Nota actual: ${number(assessmentScore(test,entry.answers))} / 10`:'Estado actual: pendiente de corregir');
    for(const [i,e] of test.exercises.entries()){
      const result=gradeExercise(e,entry.answers[i]);
      lines.push('',`Ejercicio ${i+1}${e.title?` · ${e.title}`:''}`,e.prompt);
      e.parts.forEach((p,j)=>lines.push(`${p.label}: ${entry.answers[i]?.[j]?.trim()||'Sin responder'}${entry.submitted?` · ${result.correct[j]?'Correcto':'Revisar'}`:''}`));
      if(entry.submitted)lines.push(`Puntuación: ${number(result.points)} / 1`);
    }
    lines.push('','HISTORIAL DE CORRECCIONES');
    if(!entry.attempts?.length)lines.push(entry.submitted?'Corrección anterior sin fecha registrada.':'Todavía no hay correcciones registradas.');
    for(const [i,attempt] of (entry.attempts||[]).entries()){
      lines.push(`Intento ${i+1} · ${new Date(attempt.at).toLocaleString('es-ES')} · Nota: ${number(assessmentScore(test,attempt.answers))} / 10`);
      test.exercises.forEach((e,k)=>lines.push(`Ejercicio ${k+1}: ${e.parts.map((p,j)=>`${p.label}: ${attempt.answers[k]?.[j]||'Sin responder'}`).join(' · ')}`));
    }
  }
  return lines;
}
