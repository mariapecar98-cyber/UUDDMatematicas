// Render at 300 dpi so powers, radicals and mathematical signs retain the
// browser's Unicode typography instead of falling back to PDF base fonts.
const WIDTH=210,HEIGHT=297,SCALE=300/25.4;
const COLORS={paper:'#f7f4ec',ink:'#22201f',purple:'#593be0',yellow:'#f6cb39',muted:'#645f56'};

function loadImage(src){return new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(new Error('No se pudo cargar el logo'));image.src=src;});}
export async function createAssessmentPdf(assessment){
  const [{jsPDF},logo]=await Promise.all([import('jspdf'),loadImage(`${import.meta.env.BASE_URL}logo-mates-transparente.png`)]);
  const pdf=new jsPDF({unit:'mm',format:'a4',compress:true});
  pdf.setProperties({title:`Autoevaluación ${assessment.id}`,subject:'Polinomios · Enunciados',author:'Mates para la vida'});
  const canvas=document.createElement('canvas');canvas.width=Math.round(WIDTH*SCALE);canvas.height=Math.round(HEIGHT*SCALE);
  const ctx=canvas.getContext('2d');ctx.scale(SCALE,SCALE);
  const font=(size,bold=false)=>{ctx.font=`${bold?'700':'400'} ${size}px Arial, "Cambria Math", sans-serif`;};
  const text=(value,x,y,size=3.8,color=COLORS.ink,bold=false)=>{font(size,bold);ctx.fillStyle=color;ctx.fillText(value,x,y);};
  const line=(x1,y1,x2,y2,color=COLORS.ink,width=.4)=>{ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();};
  const wrap=(value,width,size=3.8,bold=false)=>{font(size,bold);const rows=[];let row='';for(const word of value.split(/\s+/)){const next=row?`${row} ${word}`:word;if(row&&ctx.measureText(next).width>width){rows.push(row);row=word;}else row=next;}if(row)rows.push(row);return rows;};
  const pages=[];let y=58,pageNumber=0;
  const startPage=()=>{
    pageNumber++;ctx.fillStyle=COLORS.paper;ctx.fillRect(0,0,WIDTH,HEIGHT);
    const logoHeight=25,logoWidth=logoHeight*logo.naturalWidth/logo.naturalHeight;
    ctx.drawImage(logo,15,4,logoWidth,logoHeight);
    ctx.textAlign='right';text('MATEMÁTICAS A · 4.º ESO',194,16,3.1,COLORS.purple,true);ctx.textAlign='left';
  };
  // Headers use explicit alignment to keep the logo and the course label apart.
  const header=()=>{
    startPage();ctx.textAlign='right';text('POLINOMIOS',194,23,3.2,COLORS.muted);ctx.textAlign='left';
    ctx.fillStyle=COLORS.yellow;ctx.fillRect(16,32,178,15);ctx.strokeStyle=COLORS.ink;ctx.lineWidth=.65;ctx.strokeRect(16,32,178,15);
    text(`Autoevaluación ${assessment.id}`,21,42,6.5,COLORS.ink,true);
    text('10 ejercicios · 1 punto por ejercicio · Resuelve en tu cuaderno.',16,53,3.4,COLORS.muted);
    y=61;
  };
  const finishPage=()=>{line(16,281,194,281,'#dcd8cd');text('Mates para la vida · Autoevaluación '+assessment.id,16,287,3,COLORS.muted);ctx.textAlign='right';text(`Página ${pageNumber}`,194,287,3,COLORS.muted);ctx.textAlign='left';pages.push(canvas.toDataURL('image/png'));};
  header();
  for(const [i,exercise] of assessment.exercises.entries()){
    const prompt=wrap(exercise.prompt,164);
    const labels=exercise.parts.filter(p=>p.label!=='Solución').map(p=>wrap(p.label,160));
    const height=14+prompt.length*5.3+labels.reduce((sum,rows)=>sum+rows.length*5.3+2,0)+7;
    if(y+height>275){finishPage();header();}
    ctx.fillStyle='#fffdf7';ctx.fillRect(16,y,178,height);ctx.strokeStyle='#dcd8cd';ctx.lineWidth=.35;ctx.strokeRect(16,y,178,height);
    ctx.fillStyle=COLORS.purple;ctx.fillRect(16,y,1.5,height);
    text(`EJERCICIO ${i+1}${exercise.title?' · '+exercise.title:''}`,21,y+7,3.5,COLORS.purple,true);
    ctx.textAlign='right';text('1 punto',189,y+7,3.2,COLORS.muted);ctx.textAlign='left';
    let at=y+15;
    for(const row of prompt){text(row,22,at);at+=5.3;}
    for(const rows of labels){at+=1;for(const row of rows){text(row,24,at,3.8);at+=5.3;}at+=1;}
    line(23,y+height-4,187,y+height-4,'#dcd8cd',.25);
    y+=height+5;
  }
  finishPage();
  for(const [i,page] of pages.entries()){if(i)pdf.addPage();pdf.addImage(page,'PNG',0,0,WIDTH,HEIGHT,undefined,'FAST');}
  canvas.width=0;canvas.height=0;
  return pdf;
}

export async function downloadAssessmentPdf(assessment){const pdf=await createAssessmentPdf(assessment);pdf.save(`autoevaluacion-${assessment.id}-polinomios.pdf`);}
