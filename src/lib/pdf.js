const MARKER = '%MATES-PROGRESO-V1:';

let logoPromise;
function loadLogo() {
  if (!logoPromise) logoPromise = fetch(`${import.meta.env.BASE_URL}logo-mates-transparente.png`).then(response => {
    if (!response.ok) throw new Error('No se pudo cargar el logo');
    return response.arrayBuffer();
  }).then(buffer => new Uint8Array(buffer)).catch(error => { logoPromise = undefined; throw error; });
  return logoPromise;
}
export async function createStyledPdf(title, lines) {
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF();
  const logo = await loadLogo();
  let y;
  const page = () => {
    pdf.setFillColor('#f7f4ec'); pdf.rect(0, 0, 210, 297, 'F');
    pdf.addImage(logo, 'PNG', 13, 5, 47, 31.33, 'brand-logo');
    pdf.setTextColor('#22201f'); pdf.setFont('helvetica', 'bold');
    pdf.setDrawColor('#dcd8cd'); pdf.line(16, 36, 194, 36);
    pdf.setTextColor('#593be0'); pdf.setFontSize(10);
    pdf.text('UNIDAD 01 / EL POLINOMIO DE LA VIDA', 16, 46);
    pdf.setTextColor('#22201f'); pdf.setFontSize(22); pdf.text(title, 16, 58);
    pdf.setFontSize(8); pdf.setFont('helvetica', 'normal');
    pdf.text(`Mates para la vida · ${pdf.getNumberOfPages()}`, 16, 286);
    y = 72;
  };
  page();
  for (const value of lines) {
    const line = String(value).replaceAll('→', '>').replaceAll('×', 'x');
    if (!line) { y += 4; continue; }
    const heading = line === line.toUpperCase() && /[A-ZÁÉÍÓÚ]/.test(line) && line.length < 60;
    pdf.setFont('helvetica', heading ? 'bold' : 'normal');
    pdf.setFontSize(heading ? 12 : 10);
    const wrapped = pdf.splitTextToSize(line, 172);
    for (const row of wrapped) {
      if (y > 270) { pdf.addPage(); page(); pdf.setFont('helvetica', heading ? 'bold' : 'normal'); pdf.setFontSize(heading ? 12 : 10); }
      if (heading) { pdf.setFillColor('#f6cb39'); pdf.rect(16, y - 5, 178, 8, 'F'); }
      pdf.setTextColor('#22201f'); pdf.text(row, 19, y); y += 6;
    }
    y += heading ? 4 : 2;
  }
  return pdf;
}

export async function progressPdfBlob(data, missions) {
  const pdf = await createStyledPdf('Progreso del equipo', [
    'EQUIPO', ...data.team.map((p, i) => `${p.alias || `Integrante ${i + 1}`} · ${p.job || 'Profesión pendiente'}`),
    '', 'ESTADO DE LA PARTIDA', `Misión actual: ${missions[data.active]?.title || missions[0].title}`,
    `Misiones completadas: ${data.completed.length}/${missions.length}`,
    ...missions.map((m, i) => `${data.completed.includes(i) ? 'Completada' : 'Pendiente'} · ${m.title}`),
    '', 'CONTINUAR LA ACTIVIDAD', 'Carga este PDF desde «Cargar progreso» para recuperar todos los datos del equipo y sus respuestas.'
  ]);
  const bytes = new TextEncoder().encode(JSON.stringify({ version: 1, data }));
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  // PDF comments preserve the complete save without requiring a PDF parser or network service.
  const output = pdf.output();
  const position = output.lastIndexOf('%%EOF');
  const encoded = output.slice(0, position) + MARKER + btoa(binary) + '\n' + output.slice(position);
  return new Blob([Uint8Array.from(encoded, c => c.charCodeAt(0))], { type: 'application/pdf' });
}

export async function saveProgressPdf(data, missions) {
  const url = URL.createObjectURL(await progressPdfBlob(data, missions));
  const link = document.createElement('a'); link.href = url; link.download = 'mates-progreso.pdf'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function readProgressPdf(file) {
  if (file.size > 20 * 1024 * 1024) throw new Error('PDF demasiado grande');
  const text = await file.text();
  if (!text.startsWith('%PDF-')) throw new Error('Formato inválido');
  const match = text.match(/%MATES-PROGRESO-V1:([A-Za-z0-9+/=]+)\r?\n/);
  if (!match) throw new Error('Este PDF no contiene una partida');
  const bytes = Uint8Array.from(atob(match[1]), c => c.charCodeAt(0));
  return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
}
