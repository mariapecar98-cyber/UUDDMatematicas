import React from 'react';
import { activityHints, hintKey } from '../lib/hints.js';

export default function Hint({id,edit}) {
  return <details className="division-hint" onToggle={e=>{if(e.currentTarget.open)edit(['algebra',hintKey(id)],'used')}}>
    <summary>Pista</summary><p>{activityHints[id][1]}</p>
  </details>;
}
