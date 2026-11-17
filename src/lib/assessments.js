const part=(label,answer)=>({label,answer});
const exercise=(title,prompt,parts,solution)=>({title,prompt,parts,solution});
const single=(title,prompt,answer,solution)=>exercise(title,prompt,[part('Solución',answer)],solution);
const translate=(prompts,answers)=>exercise('Lenguaje algebraico','Traduce al lenguaje algebraico:',prompts.map((p,i)=>part(`${'abc'[i]}) ${p}`,answers[i])),answers.map((a,i)=>`${'abc'[i]}) ${a}`));
const monomials=(prompt,labels,answers,solution)=>exercise('Operaciones con monomios',prompt,labels.map((p,i)=>part(`${'abc'[i]}) ${p}`,answers[i])),solution);
const division=(dividend,divisor,q,r,ruffini=false,steps=[])=>Object.assign(exercise(ruffini?'Regla de Ruffini':'División entera',`Calcula el cociente y el resto ${ruffini?'mediante Ruffini':'mediante división entera (sin Ruffini)'}: (${dividend}) : (${divisor}).`,[part('Cociente',q),part('Resto',r)],ruffini?[`Usamos la raíz del divisor ${divisor}.`,...steps,`Cociente: ${q}. Resto: ${r}.`,`Comprobación: (${divisor}) · (${q}) + (${r}) = ${dividend}.`]:[...steps,`Cociente: ${q}. Resto: ${r}.`,`Comprobación: (${divisor}) · (${q}) + (${r}) = ${dividend}.`]),{division:ruffini?null:{dividend,divisor,quotient:q,remainder:r},ruffini:ruffini?{dividend,divisor}:null});
const numeric=(p,values,answers,steps)=>exercise('Valor numérico',`Calcula el valor numérico de P(x) = ${p}.`,values.map((x,i)=>part(`P(${x})`,answers[i])),steps);

export const assessments=[
  {id:1,exercises:[
    translate(['El cuádruplo de un número n.','El doble de un número n menos cuatro unidades.','El número anterior a un número n.'],['4n','2n-4','n-1']),
    monomials('Realiza las operaciones con monomios:',['−3x + 7x − (2/3)x + x','(7xy) · (−4x³y²)','(2xy)³ : 4y²'],['13x/3','-28x^4y^3','2x^3y'],['a) (−3 + 7 − 2/3 + 1)x = (5 − 2/3)x = 13x/3.','b) (7 · −4)x¹⁺³y¹⁺² = −28x⁴y³.','c) 8x³y³ / (4y²) = 2x³y.']),
    single('Desarrolla y simplifica','(2x − 3)² − (2x² + 4x + 1)(x − 2)','-2x^3+4x^2-5x+11',['(2x − 3)² = 4x² − 12x + 9.','(2x² + 4x + 1)(x − 2) = 2x³ − 7x − 2.','Restamos: 4x² − 12x + 9 − 2x³ + 7x + 2 = −2x³ + 4x² − 5x + 11.']),
    single('Opera y simplifica','(x² − 3)(2x + 1) − (2x³ + x² − 3x)','-3x-3',['Distribuimos: 2x³ + x² − 6x − 3.','Restamos: 2x³ + x² − 6x − 3 − 2x³ − x² + 3x = −3x − 3.']),
    division('18x⁴ − 15x³ + 3x² + 3x − 6','3x² − 3x + 1','6x^2+x','2x-6',false,['18x⁴ / 3x² = 6x². Restamos 18x⁴ − 18x³ + 6x².','Queda 3x³ − 3x² + 3x − 6. El siguiente término es x.','Restamos 3x³ − 3x² + x y queda 2x − 6.']),
    division('2x³ − 5x² − 18x + 45','x − 3','2x^2+x-15','0',true,['Raíz: 3. Coeficientes: 2, −5, −18, 45.','Bajamos 2; 3·2 − 5 = 1; 3·1 − 18 = −15; 3·(−15) + 45 = 0.']),
    division('2x⁵ − 3x⁴ + 2x − 1','x + 2','2x^4-7x^3+14x^2-28x+58','-117',true,['Raíz: −2. Coeficientes: 2, −3, 0, 0, 2, −1.','Fila final: 2, −7, 14, −28, 58, −117.']),
    single('Teorema del resto','Calcula, sin dividir, el resto de (x¹⁰⁰ − 2x + 3) : (x − 1).','2',['R = P(1) = 1¹⁰⁰ − 2·1 + 3 = 2.','La división no es exacta.']),
    numeric('5x³ + 3x² − 2x + 4',[-1,2],['4','52'],['P(−1) = −5 + 3 + 2 + 4 = 4.','P(2) = 40 + 12 − 4 + 4 = 52.']),
    single('','Calcula el valor numérico de P(x) = 2x² + 3x − 1 para x = 2.','13',['P(2) = 2·2² + 3·2 − 1 = 8 + 6 − 1 = 13.'])
  ]},
  {id:2,exercises:[
    translate(['La suma de un número n y su mitad.','El triple de la mitad de un número n.','El siguiente de un número n.'],['3n/2','3n/2','n+1']),
    monomials('A = 6x³, B = −3x, C = 4x³. Realiza las operaciones:',['(C − A) · B','(B · C) : A','A² : 2B'],['6x^4','-2x','-6x^5'],['a) (4x³ − 6x³)(−3x) = 6x⁴.','b) −12x⁴ / 6x³ = −2x.','c) 36x⁶ / (−6x) = −6x⁵.']),
    single('Desarrolla y simplifica','(x² − 2x + 3)(2x + 1) − (4x − 1)²','2x^3-19x^2+12x+2',['El producto es 2x³ − 3x² + 4x + 3.','(4x − 1)² = 16x² − 8x + 1.','Restamos: 2x³ − 19x² + 12x + 2.']),
    single('Opera y simplifica','(x² − 2x + 3)(x − 2) − (x³ − 4x² + 3)','7x-9',['El producto es x³ − 4x² + 7x − 6.','Restamos x³ − 4x² + 3: el resultado es 7x − 9.']),
    division('2x⁵ − 3x⁴ + 2x² − x + 1','x³ − 2x + 1','2x^2-3x+4','-6x^2+10x-3',false,['Primer término: 2x². Tras restar queda −3x⁴ + 4x³ − x + 1.','Siguiente término: −3x. Tras restar queda 4x³ − 6x² + 2x + 1.','Siguiente término: 4. Tras restar queda −6x² + 10x − 3.']),
    division('3x⁵ − 16x³ + 6x² + 7x − 2','x + 2','3x^4-6x^3-4x^2+14x-21','40',true,['Raíz: −2. Coeficientes: 3, 0, −16, 6, 7, −2.','Fila final: 3, −6, −4, 14, −21, 40.']),
    division('x⁴ − 3x³ + 2x² + 5','x + 1','x^3-4x^2+6x-6','11',true,['Raíz: −1. Coeficientes: 1, −3, 2, 0, 5.','Fila final: 1, −4, 6, −6, 11.']),
    single('Teorema del resto','Calcula, sin dividir, el resto de (x⁷⁰ + x² − 5) : (x + 1).','-3',['R = P(−1) = (−1)⁷⁰ + (−1)² − 5 = 1 + 1 − 5 = −3.','La división no es exacta.']),
    numeric('2x⁴ + 3x³ − 2x²',[-2,1],['0','3'],['P(−2) = 32 − 24 − 8 = 0.','P(1) = 2 + 3 − 2 = 3.']),
    single('','Reduce los términos semejantes: 5x² − 3x + 2x² + 7x − 4.','7x^2+4x-4',['(5 + 2)x² + (−3 + 7)x − 4 = 7x² + 4x − 4.'])
  ]},
  {id:3,exercises:[
    translate(['El doble de un número n más su mitad.','El doble de un número n menos tres unidades.','Un número más su mitad más su tercera parte.'],['5n/2','2n-3','11n/6']),
    monomials('Realiza las operaciones con monomios:',['(7/6)x² + 3x² − 5x² + (1/3)x²','(√5 x³) · (√5 y)','(4x²y)² : (8x³y²)'],['-x^2/2','5x^3y','2x'],['a) (7/6 + 3 − 5 + 1/3)x² = −x²/2.','b) (√5 · √5)x³y = 5x³y.','c) 16x⁴y² / (8x³y²) = 2x.']),
    single('Desarrolla y simplifica','(x + 2)² − 3(x² − 2x + 4)','-2x^2+10x-8',['x² + 4x + 4 − 3x² + 6x − 12 = −2x² + 10x − 8.']),
    single('Opera y simplifica','(2x² − 3x + 1)(2x − 1) − (4x³ − 8x² + 1)','5x-2',['El producto es 4x³ − 8x² + 5x − 1.','Restamos 4x³ − 8x² + 1: el resultado es 5x − 2.']),
    division('4x³ − 2x² + 5x + 3','x² − 2','4x-2','13x-1',false,['Primer término: 4x. Restamos 4x³ − 8x y queda −2x² + 13x + 3.','Siguiente término: −2. Restamos −2x² + 4 y queda 13x − 1.']),
    division('5x⁴ + x³ − 2x² + 1','x − 1','5x^3+6x^2+4x+4','5',true,['Raíz: 1. Coeficientes: 5, 1, −2, 0, 1.','Fila final: 5, 6, 4, 4, 5.']),
    division('5x⁴ − x³ + 2x − 1','x + 2','5x^3-11x^2+22x-42','83',true,['Raíz: −2. Coeficientes: 5, −1, 0, 2, −1.','Fila final: 5, −11, 22, −42, 83.']),
    single('Teorema del resto','Halla k para que kx + 3x² − 2 sea divisible entre x + 2.','5',['La división es exacta si P(−2) = 0.','−2k + 3·4 − 2 = 10 − 2k = 0. Por tanto, k = 5.']),
    numeric('6x² + 3x − 2',[2,-3],['28','43'],['P(2) = 24 + 6 − 2 = 28.','P(−3) = 54 − 9 − 2 = 43.']),
    single('','Calcula y simplifica: 3x · 2x² − 4x³ + x³.','3x^3',['3x · 2x² = 6x³.','6x³ − 4x³ + x³ = (6 − 4 + 1)x³ = 3x³.'])
  ]},
  {id:4,exercises:[
    translate(['El triple de un número n más seis.','La mitad de un número n menos cuatro.','El anterior a un número n.'],['3n+6','n/2-4','n-1']),
    monomials('A = −3x³, B = 4x³, C = x²/2. Realiza las operaciones:',['(B − A) · C','(B : C) · A','2A + 3B'],['7x^5/2','-24x^4','6x^3'],['a) (4x³ + 3x³) · x²/2 = 7x⁵/2.','b) 8x · (−3x³) = −24x⁴.','c) −6x³ + 12x³ = 6x³.']),
    single('Desarrolla y simplifica','((1/2)x + 1)(2x + 2) − (x + 1)²','x+1',['El producto es x² + 3x + 2.','Restamos x² + 2x + 1: el resultado es x + 1.']),
    single('Opera y simplifica','(x − 3)(x + 3) − 2x(x² − 5x)','-2x^3+11x^2-9',['(x − 3)(x + 3) = x² − 9.','Restamos 2x³ − 10x²: queda −2x³ + 11x² − 9.']),
    division('7x⁵ − 2x³ + 3x − 2','x² + 2','7x^3-16x','35x-2',false,['Primer término: 7x³. Restamos 7x⁵ + 14x³ y queda −16x³ + 3x − 2.','Siguiente término: −16x. Restamos −16x³ − 32x y queda 35x − 2.']),
    division('2x³ − 5x² − 18x + 45','x − 3','2x^2+x-15','0',true,['Raíz: 3. Coeficientes: 2, −5, −18, 45.','Fila final: 2, 1, −15, 0.']),
    division('−3x⁴ + 6x² + x − 2','x − 1','-3x^3-3x^2+3x+4','2',true,['Raíz: 1. Coeficientes: −3, 0, 6, 1, −2.','Fila final: −3, −3, 3, 4, 2.']),
    single('Teorema del resto','Halla k para que kx³ + 2kx² − 3x + 1 sea divisible entre x − 1.','2/3',['La división es exacta si P(1) = 0.','k + 2k − 3 + 1 = 3k − 2 = 0. Por tanto, k = 2/3.']),
    numeric('3x² − 3x + 6',[-1,3],['12','24'],['P(−1) = 3 + 3 + 6 = 12.','P(3) = 27 − 9 + 6 = 24.']),
    single('','Desarrolla la identidad notable: (x + 3)².','x^2+6x+9',['Aplicamos (a + b)² = a² + 2ab + b².','x² + 2·x·3 + 3² = x² + 6x + 9.'])
  ]},
  {id:5,exercises:[
    translate(['El anterior a un número n.','El cuádruplo de un número n más dos.','La tercera parte de un número n menos cinco.'],['n-1','4n+2','n/3-5']),
    monomials('Realiza las operaciones con monomios:',['−3x³ + (7/2)x³ + x³ − 5x³','((1/5)x²) · (−(5/4)x)','((√3 x³y²)²)² : (xy)³'],['-7x^3/2','-x^3/4','9x^9y^5'],['a) (−3 + 7/2 + 1 − 5)x³ = −7x³/2.','b) (x²/5)(−5x/4) = −x³/4.','c) 9x¹²y⁸ / (x³y³) = 9x⁹y⁵.']),
    single('Desarrolla y simplifica','(3x − 1)² − 2(6x² − 3x + 1)','-3x^2-1',['9x² − 6x + 1 − 12x² + 6x − 2 = −3x² − 1.']),
    single('Opera y simplifica','(x + 2)² − 2(x³ − 2x + 3)','-2x^3+x^2+8x-2',['x² + 4x + 4 − 2x³ + 4x − 6 = −2x³ + x² + 8x − 2.']),
    division('6x⁴ − 3x² + 2x − 3','x² + x − 1','6x^2-6x+9','-13x+6',false,['Primer término: 6x². Tras restar queda −6x³ + 3x² + 2x − 3.','Siguiente término: −6x. Tras restar queda 9x² − 4x − 3.','Siguiente término: 9. Tras restar queda −13x + 6.']),
    division('3x⁴ + 9x³ + x² − 2x − 8','x + 3','3x^3+x-5','7',true,['Raíz: −3. Coeficientes: 3, 9, 1, −2, −8.','Fila final: 3, 0, 1, −5, 7.']),
    division('−x⁴ + 2x² − x + 2','x + 2','-x^3+2x^2-2x+3','-4',true,['Raíz: −2. Coeficientes: −1, 0, 2, −1, 2.','Fila final: −1, 2, −2, 3, −4.']),
    single('Teorema del resto','Calcula, sin dividir, el resto de (3x⁴ − 2x³ + 2x − 3) : (x − 1).','0',['R = P(1) = 3 − 2 + 2 − 3 = 0.','La división es exacta.']),
    numeric('2x³ − x² + 3x + 4',[0,-2],['4','-22'],['P(0) = 4.','P(−2) = −16 − 4 − 6 + 4 = −22.']),
    single('','Calcula el resto de dividir P(x) = x² + 2x + 3 entre x − 1.','6',['R = P(1) = 1² + 2·1 + 3 = 1 + 2 + 3 = 6.'])
  ]}
];
