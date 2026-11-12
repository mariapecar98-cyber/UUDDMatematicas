// Fictional classroom prices, editable by the pupils; not commercial offers.
export const budgetSections = [
  {id:'food',title:'¿Cómo vais a comer?',icon:'01',items:[
    {id:'groceries',name:'Compra para cocinar en casa',price:8,unit:'comida / persona',frequency:30,people:true,description:'El gasto se ajusta a los días que coméis en casa.'},
    {id:'eatingOut',name:'Comer fuera',price:25,unit:'comida / persona',frequency:4,people:true,description:'Elegid cuántas personas comen fuera y cuántos días al mes.'},
    {id:'delivery',name:'Pedir comida a domicilio',price:65,unit:'pedido para la casa',frequency:2,shared:true,description:'Un pedido compartido sustituye la comida en casa de todo el equipo ese día.'}]},
  {id:'utilities',title:'Facturas y comunicaciones',icon:'02',items:[
    {id:'mobileBasic',name:'Móvil esencial · 20 GB',price:18,unit:'línea / mes',people:true,description:'Para quienes necesitan pocos datos.'},
    {id:'mobilePlus',name:'Móvil amplio · 100 GB',price:30,unit:'línea / mes',people:true,description:'Más datos para navegar fuera de casa.'},
    {id:'mobileUnlimited',name:'Móvil sin límite de datos',price:45,unit:'línea / mes',people:true,description:'Para quienes quieren estar siempre conectados.'},
    {id:'wifi',name:'Wifi en casa · fibra',price:55,unit:'vivienda / mes',shared:true,description:'Una conexión compartida por todo el equipo.'},
    {id:'electricity',name:'Factura de la luz',price:140,unit:'vivienda / mes',shared:true,description:'Estimación mensual de la casa.'},
    {id:'water',name:'Factura del agua',price:55,unit:'vivienda / mes',shared:true,description:'Estimación mensual de la casa.'},
    {id:'heating',name:'Factura de gas y calefacción',price:120,unit:'vivienda / mes',shared:true,description:'Si vuestra vivienda los utiliza.'}]},
  {id:'leisure',title:'Lo que os gusta hacer',icon:'03',items:[
    {id:'gym',name:'Gimnasio',price:55,unit:'persona / mes',people:true,description:'Solo pagan quienes se apuntan.'},
    {id:'video',name:'Plataforma de series y películas',price:20,unit:'suscripción / mes',description:'Indicad las suscripciones necesarias según las condiciones del servicio.'},
    {id:'music',name:'Música en streaming',price:12,unit:'persona / mes',people:true,description:'Una cuenta individual por persona interesada.'},
    {id:'gaming',name:'Suscripción de videojuegos',price:18,unit:'persona / mes',people:true,description:'Para quienes quieren jugar online.'},
    {id:'cinema',name:'Cine y planes culturales',price:16,unit:'entrada / persona',people:true,frequency:2,description:'Decidid cuántas salidas haréis al mes.'}]},
  {id:'transport',title:'¿Cómo os movéis?',icon:'04',items:[
    {id:'publicTransport',name:'Abono de transporte',price:55,unit:'persona / mes',people:true,description:'Una alternativa para los desplazamientos habituales.'},
    {id:'bike',name:'Bicicleta · mantenimiento',price:20,unit:'persona / mes',people:true,description:'Reserva mensual para reparaciones.'},
    {id:'car',name:'Coche · combustible y gastos',price:450,unit:'coche / mes',description:'Estimación mensual de uso y mantenimiento.'}]},
  {id:'other',title:'Y no os olvidéis de…',icon:'05',items:[
    {id:'household',name:'Limpieza y productos de casa',price:65,unit:'vivienda / mes',shared:true,description:'Detergente, papel y productos de limpieza.'},
    {id:'personal',name:'Higiene y cuidado personal',price:55,unit:'persona / mes',people:true,description:'Productos de uso individual.'},
    {id:'buffer',name:'Fondo para imprevistos',price:200,unit:'vivienda / mes',shared:true,description:'Una reserva para gastos inesperados.'},
    {id:'pet',name:'Mascota: comida y cuidados',price:110,unit:'mascota / mes',description:'Alimentación, higiene y accesorios para cada mascota.'},
    {id:'vet',name:'Reserva para veterinario',price:60,unit:'mascota / mes',description:'Ahorro mensual para vacunas, revisiones e imprevistos veterinarios.'},
    {id:'clothes',name:'Ropa y calzado',price:85,unit:'persona / mes',people:true,description:'Reserva mensual para renovar ropa y calzado.'},
    {id:'insurance',name:'Seguro del hogar',price:35,unit:'vivienda / mes',shared:true,description:'Cuota mensual del seguro de la vivienda.'},
    {id:'health',name:'Salud y farmacia',price:45,unit:'persona / mes',people:true,description:'Reserva para medicamentos, dentista y otros cuidados.'},
    {id:'holidays',name:'Ahorro para viajes',price:120,unit:'persona / mes',people:true,description:'Dinero que reserváis cada mes para vacaciones y escapadas.'},
    {id:'custom',name:'Vuestro extra',price:0,unit:'unidad / mes',description:'Añadid otro gasto que forme parte de vuestra vida.'}]}
];
const items=budgetSections.flatMap(section=>section.items.map(item=>({...item,category:section.id})));
const amount=value=>Number.isFinite(Number(value))&&Number(value)>=0?Math.min(Number(value),100000):0;
const round=value=>Math.round((value+Number.EPSILON)*100)/100;
export function normalizeBudget(source,teamSize=4){
  if(!source||typeof source!=='object'||Array.isArray(source))return null;
  const budget=Object.fromEntries(items.filter(item=>source[item.id]?.selected===true).map(item=>{const row=source[item.id];return [item.id,{selected:true,price:amount(row.price??item.price),quantity:item.shared?1:Math.min(item.people?teamSize:100,Math.max(1,Math.floor(amount(row.quantity??1)))),frequency:item.frequency?Math.min(item.category==='food'?30:60,Math.max(item.id==='eatingOut'?0:1,Math.floor(amount(row.frequency??item.frequency)))):1,source:String(row.source||'Precio orientativo de la actividad').slice(0,300),label:String(row.label||'').slice(0,80),...(item.id==='groceries'?{period:'day'}:{})}]}));
  const deliveryDays=budget.delivery?.frequency||0;
  if(budget.eatingOut)budget.eatingOut.frequency=Math.min(budget.eatingOut.frequency,30-deliveryDays);
  if(budget.groceries){
    // Convert saved weekly prices once when opening an older basket.
    if(source.groceries.period!=='day')budget.groceries.price=round(budget.groceries.price/7);
    const meals=30*teamSize-(budget.eatingOut?.quantity||0)*(budget.eatingOut?.frequency||0)-deliveryDays*teamSize;
    budget.groceries.quantity=teamSize;
    budget.groceries.frequency=meals/teamSize;
    budget.groceries.mealCount=meals;
  }
  return budget;
}
export const itemTotal = row => round(amount(row.price)*(row.mealCount===undefined?amount(row.quantity)*amount(row.frequency):amount(row.mealCount)));
export function calculateBudget(source,teamSize){
  const budget=normalizeBudget(source,teamSize)||{};
  const costs=Object.fromEntries(budgetSections.map(s=>[s.id,0]));
  const lines=Object.fromEntries(budgetSections.map(s=>[s.id,[]]));
  const selected=items.filter(item=>budget[item.id]).map(item=>{const row=budget[item.id],total=itemTotal(row),name=item.id==='custom'?(row.label||item.name):item.name,calculation=row.mealCount!==undefined?`${row.price} € × ${row.mealCount} comidas`:`${row.price} € × ${row.quantity}${item.frequency?` × ${row.frequency}`:''}`;costs[item.category]=round(costs[item.category]+total);lines[item.category].push(`${name}: ${calculation} = ${total} €/mes`);return {...item,...row,name,total,calculation}});
  const costEvidence=Object.fromEntries(budgetSections.map(s=>[s.id,{source:[...new Set(selected.filter(i=>i.category===s.id).map(i=>i.source))].join('; ')||'Sin opciones seleccionadas',reason:lines[s.id].join('; ')||'No hemos elegido gastos en esta categoría.'}]));
  return {budget,costs,costEvidence,selected,total:round(Object.values(costs).reduce((sum,n)=>sum+n,0))};
}
export function budgetReady(data){
  const {budget}=calculateBudget(data.budget,data.team.length);
  const mobile=['mobileBasic','mobilePlus','mobileUnlimited'].reduce((sum,id)=>sum+(budget[id]?.quantity||0),0);
  return Boolean(Object.keys(budget).length&&(budget.groceries||budget.eatingOut||budget.delivery)&&mobile<=data.team.length&&data.shareWhy.trim().length>=10);
}
