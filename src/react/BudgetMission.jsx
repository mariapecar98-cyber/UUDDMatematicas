import React from 'react';
import { budgetSections, calculateBudget, itemTotal } from '../lib/budget.js';
import { monthly, salaries } from '../lib/game.js';
const euro=n=>n.toLocaleString('es-ES',{minimumFractionDigits:2,maximumFractionDigits:2});
export default function BudgetMission({data,edit}) {
 const {budget,costs,selected}=calculateBudget(data.budget,data.team.length);
 const update=(item,patch)=>edit(['budget'],{...budget,[item.id]:{selected:true,price:item.price,quantity:1,frequency:item.frequency||1,...(item.id==='groceries'?{period:'day'}:{}),source:'Precio orientativo de la actividad',...budget[item.id],...patch}});
 const toggle=item=>{if(budget[item.id]){const next={...budget};delete next[item.id];edit(['budget'],next)}else update(item,{})};
 const mobile=['mobileBasic','mobilePlus','mobileUnlimited'].reduce((sum,id)=>sum+(budget[id]?.quantity||0),0);
 const net=salaries(data)-monthly(data);
 return <section className="work-panel life-market">
  <div className="panel-heading"><div><span className="eyebrow">VUESTRO SUPERMERCADO DE LA VIDA</span><h2>¿Qué queréis en vuestro día a día?</h2></div></div>
  <p className="market-intro">Elegid qué queréis tener, cuántas personas lo utilizarán y cuánto vais a gastar. Cada decisión se añade a vuestro presupuesto mensual.</p>
  <p className="market-price-note">Precios ficticios para la actividad. Podéis cambiarlos por precios que investiguéis.</p>
  <p className="market-intro">Elegid las opciones que necesitáis. Comprobad si cada precio es por persona, por vivienda o por uso. Podéis investigar otro precio y guardar su referencia.</p>
  {data.budget===null&&Object.values(data.costs).some(v=>Number(v)>1)&&<p className="market-legacy">Vuestro presupuesto anterior se conserva hasta que elijáis la primera opción de este catálogo.</p>}
  {mobile>data.team.length&&<p className="market-warning" role="alert">Habéis elegido {mobile} líneas móviles para {data.team.length} personas. Revisad cuántas personas usan cada tarifa.</p>}
  <div className="market-layout"><div className="market-sections">
  {budgetSections.map(section=><section className="market-section" key={section.id} aria-labelledby={`market-${section.id}`}>
   <div className="market-section-title"><span>{section.icon}</span><h3 id={`market-${section.id}`}>{section.title}</h3><b>{euro(costs[section.id])} €/mes</b></div>
   {section.id==='food'&&<div className="food-calendar"><p>Para este presupuesto contamos 30 días al mes y una comida principal por persona y día. Comer fuera o pedir a domicilio sustituye esa comida, así que reduce la compra para cocinar en casa.</p><div><b>{30*data.team.length-(budget.eatingOut?.quantity||0)*(budget.eatingOut?.frequency||0)-(budget.delivery?.frequency||0)*data.team.length}</b><span>comidas en casa del equipo</span><b>{(budget.eatingOut?.quantity||0)*(budget.eatingOut?.frequency||0)}</b><span>comidas fuera</span><b>{(budget.delivery?.frequency||0)*data.team.length}</b><span>comidas a domicilio</span></div></div>}<div className="market-options">{section.items.map(item=>{const row=budget[item.id],active=Boolean(row);return <article className={`market-option ${active?'is-selected':''}`} key={item.id}>
    <label className="market-option-choice"><input type="checkbox" checked={active} onChange={()=>toggle(item)}/><span><strong>{item.name}</strong><small>{item.description}</small></span></label>
    <div className="market-price"><b>{euro(active?row.price:item.price)} €</b><span> / {item.unit}</span></div>
    {active&&<div className="market-option-controls">
     {item.id==='custom'&&<label>¿Qué queréis añadir?<input value={row.label||''} maxLength="80" onChange={e=>update(item,{label:e.target.value})} placeholder="Por ejemplo, clases de baile"/></label>}
     <label>Precio por {item.unit.split(' / ')[0]} (€)<input type="number" min="0" max="100000" step="0.01" value={row.price} onChange={e=>update(item,{price:e.target.value})}/></label>
     {!item.shared&&item.id!=='groceries'&&<label>{item.people?'¿Cuántas personas?':'¿Cuántas unidades?'}<select value={row.quantity} onChange={e=>update(item,{quantity:Number(e.target.value)})}>{Array.from({length:item.people?data.team.length:10},(_,i)=><option value={i+1} key={i}>{i+1}</option>)}</select></label>}
     {item.frequency&&item.id!=='groceries'&&<label>{section.id==='food'?'Días al mes':'Veces al mes'}<input type="number" min={item.id==='eatingOut'?0:1} max={item.id==='eatingOut'?30-(budget.delivery?.frequency||0):section.id==='food'?30:60} value={row.frequency} onChange={e=>update(item,{frequency:e.target.value})}/></label>}
     <label className="market-source">Referencia del precio<input value={row.source} maxLength="300" onChange={e=>update(item,{source:e.target.value})} placeholder="Precio de la actividad o fuente consultada"/></label>
     <div className="market-item-total">{row.price} € × {item.id==='groceries'?`${row.mealCount} comidas en casa`:`${row.quantity}${item.frequency?` × ${row.frequency}`:''}`}<strong>{euro(itemTotal(row))} €/mes</strong></div>
    </div>}
   </article>})}</div>
  </section>)}
  </div><aside className="market-basket" aria-label="Vuestra cesta mensual"><span className="eyebrow">VUESTRA CESTA</span><h3>Así queréis vivir</h3>
   {selected.length?<ul>{selected.map(item=><li key={item.id}><span>{item.name}<small>{item.id==='groceries'?`${item.mealCount} comidas en casa`:`${item.quantity} ${item.people?'persona(s)':item.shared?'vivienda':'unidad(es)'}`}</small></span><b>{euro(item.total)} €</b></li>)}</ul>:<p>Vuestra cesta está vacía. Empezad a elegir.</p>}
   <div className="basket-line"><span>Alquiler</span><b>{euro(Number(data.home.rent||0))} €</b></div><div className="basket-line"><span>Gastos mensuales</span><b>{euro(monthly(data))} €</b></div><div className="basket-line"><span>Ingresos del equipo</span><b>{euro(salaries(data))} €</b></div>
   <div className={`basket-balance ${net<0?'over-budget':''}`} aria-live="polite"><span>Os quedan al mes</span><strong>{euro(net)} €</strong></div>
   {net<0&&<p className="market-warning">Con estas decisiones gastáis más de lo que ingresáis. ¿Qué cambiaríais?</p>}
  </aside></div>
  <div className="market-share"><h3>¿Cómo vais a repartir los gastos?</h3><div className="choice-row"><button className={data.share==='equal'?'choice active':''} onClick={()=>edit(['share'],'equal')}>A partes iguales</button><button className={data.share==='income'?'choice active':''} onClick={()=>edit(['share'],'income')}>Según ingresos</button></div><label>Justificad vuestras decisiones<textarea className="why-box" value={data.shareWhy} onChange={e=>edit(['shareWhy'],e.target.value)} placeholder="¿Qué habéis priorizado y por qué habéis elegido este reparto?"/></label></div>
 </section>;
}
