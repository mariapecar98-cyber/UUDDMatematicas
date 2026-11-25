import { progressLines } from './assessmentProgress.js';

export async function downloadAssessmentProgress(assessments,tests){
  const {jsPDF}=await import('jspdf');
  const pdf=new jsPDF({unit:'mm',format:'a4',compress:true});
  pdf.setProperties({title:'Progreso de autoevaluaciones · Polinomios',author:'Mates para la vida'});
  // Browser typography preserves mathematical symbols and powers in the PDF.
  const canvas=document.createElement('canvas'),scale=8;
  canvas.width=210*scale;canvas.height=297*scale;
  const ctx=canvas.getContext('2d');ctx.scale(scale,scale);
  let y,page=0;
  const start=()=>{
    ctx.fillStyle='#f7f4ec';ctx.fillRect(0,0,210,297);
    ctx.fillStyle='#593be0';ctx.font='bold 6px Arial';ctx.fillText('Progreso · Polinomios',16,20);
    ctx.font='3.4px Arial';ctx.fillStyle='#22201f';
    ctx.fillText(`Mates para la vida · ${new Date().toLocaleString('es-ES')}`,16,28);y=40;
  };
  const finish=()=>{
    ctx.fillText(`Página ${++page}`,16,287);
    if(page>1)pdf.addPage();
    pdf.addImage(canvas.toDataURL('image/png'),'PNG',0,0,210,297,undefined,'FAST');
  };
  const row=value=>{if(y>275){finish();start();}ctx.fillText(value,16,y);y+=5;};
  start();
  for(const line of progressLines(assessments,tests)){
    let current='';
    // Wrap by characters as answers may contain long expressions without spaces.
    for(const char of line){if(ctx.measureText(current+char).width>178){row(current);current='';}current+=char;}
    row(current);
  }
  finish();canvas.width=0;canvas.height=0;
  pdf.save(assessments.length===1?`progreso-autoevaluacion-${assessments[0].id}.pdf`:'progreso-autoevaluaciones-polinomios.pdf');
}
