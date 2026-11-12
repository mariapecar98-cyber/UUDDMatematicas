import React, { useEffect, useRef, useState } from 'react';

export default function ResetDialog({ download, cancel, confirm }) {
  const dialog = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { dialog.current.showModal(); }, []);
  const save = async () => {
    setDownloading(true);
    setError('');
    try {
      await download();
      setDownloaded(true);
    } catch {
      setError('No se pudo descargar el progreso. Inténtalo de nuevo antes de reiniciar.');
    } finally { setDownloading(false); }
  };
  return <dialog ref={dialog} className="reset-dialog" aria-labelledby="reset-title" aria-describedby="reset-description" onCancel={event => { event.preventDefault(); if (!downloading) cancel(); }}>
    <span className="eyebrow">NUEVA PARTIDA</span>
    <h2 id="reset-title">¿Reiniciar partida?</h2>
    <p id="reset-description">Se borrarán los datos y las respuestas de este equipo. Antes de confirmar, descarga el progreso en PDF para poder recuperarlo más adelante.</p>
    <button type="button" className="button button-yellow" onClick={save} disabled={downloading}>{downloading ? 'Preparando PDF…' : downloaded ? 'Volver a descargar progreso' : 'Descargar progreso PDF'}</button>
    {downloaded && <p role="status">Descarga iniciada. Comprueba que tienes el PDF antes de confirmar.</p>}
    {error && <p role="alert">{error}</p>}
    <div className="reset-actions">
      <button type="button" className="button" onClick={cancel} disabled={downloading} autoFocus>Cancelar</button>
      <button type="button" className="button button-dark" disabled={!downloaded || downloading} onClick={() => { if (downloaded && !downloading) confirm(); }}>Confirmar reinicio</button>
    </div>
  </dialog>;
}
