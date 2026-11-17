// A bounded expression parser: arithmetic only, without evaluating JavaScript.
const key = powers => powers.join(',');
const constant = n => ({'0,0,0': n});
function add(a,b,sign=1){const out={...a};for(const k in b)out[k]=(out[k]||0)+sign*b[k];return out;}
function mul(a,b){const out={};for(const i in a)for(const j in b){const p=i.split(',').map((n,k)=>Number(n)+Number(j.split(',')[k]));if(p.some(n=>Math.abs(n)>120))throw Error();const k=key(p);out[k]=(out[k]||0)+a[i]*b[j];}if(Object.keys(out).length>300)throw Error();return out;}
function divide(a,b){const terms=Object.entries(b).filter(([,v])=>Math.abs(v)>1e-12);if(terms.length!==1)throw Error();const [k,v]=terms[0],powers=k.split(',').map(Number);return Object.fromEntries(Object.entries(a).map(([i,n])=>[key(i.split(',').map((p,j)=>Number(p)-powers[j])),n/v]));}
export function parseExpression(value){
  try{
    const superscripts={'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9'};
    const s=String(value).toLowerCase().replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g,m=>'^'+[...m].map(c=>superscripts[c]).join('')).replace(/\s/g,'').replace(/−|–/g,'-').replace(/[×·]/g,'*').replace(/[÷:]/g,'/').replace(/,/g,'.').replace(/√/g,'sqrt');
    if(!s||s.length>500)return null;
    let i=0,depth=0;
    function atom(){if(++depth>40)throw Error();let out;
      if(s[i]==='+'||s[i]==='-'){const sign=s[i++]==='-'?-1:1;out=mul(constant(sign),atom());depth--;return out;}
      if(s.startsWith('sqrt',i)){i+=4;const p=atom(), entries=Object.entries(p).filter(([,v])=>v!==0);if(entries.some(([k])=>k!=='0,0,0'))throw Error();const n=p['0,0,0']||0;if(n<0)throw Error();out=constant(Math.sqrt(n));}
      else if(s[i]==='('){i++;out=sum();if(s[i++]!==')')throw Error();}
      else if('xyn'.includes(s[i]||' ')&&s[i]){const p=[0,0,0];p['xyn'.indexOf(s[i++])]=1;out={[key(p)]:1};}
      else{const m=s.slice(i).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);if(!m)throw Error();i+=m[0].length;out=constant(Number(m[0]));}
      if(s[i]==='^'){i++;let wrapped=s[i]==='(';if(wrapped)i++;const m=s.slice(i).match(/^\d+/);if(!m)throw Error();i+=m[0].length;if(wrapped&&s[i++]!==')')throw Error();const n=Number(m[0]);if(n>100)throw Error();const base=out;out=constant(1);for(let j=0;j<n;j++)out=mul(out,base);}
      depth--;return out;
    }
    function product(){let out=atom();while(i<s.length){const c=s[i];if(c==='*'||c==='/'){i++;const b=atom();out=c==='*'?mul(out,b):divide(out,b);}else if(c==='('||/[xyn\d.]/.test(c)||s.startsWith('sqrt',i)){out=mul(out,atom());}else break;}return out;}
    function sum(){let out=product();while(s[i]==='+'||s[i]==='-'){const sign=s[i++]==='+'?1:-1;out=add(out,product(),sign);}return out;}
    const out=sum();if(i!==s.length||Object.values(out).some(n=>!Number.isFinite(n)))return null;return out;
  }catch{return null;}
}
export function answersEquivalent(answer,expected){const a=parseExpression(answer),b=parseExpression(expected);return Boolean(a&&b&&[...new Set([...Object.keys(a),...Object.keys(b)])].every(k=>Math.abs((a[k]||0)-(b[k]||0))<1e-8));}
export function gradeExercise(exercise,answers=[]){const correct=exercise.parts.map((part,i)=>answersEquivalent(answers[i]||'',part.answer));return {correct,points:correct.filter(Boolean).length/correct.length};}
