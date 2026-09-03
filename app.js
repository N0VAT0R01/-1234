const list = document.getElementById('songs');
const empty = document.getElementById('emptyState');
const search = document.getElementById('search');
const clearSearch = document.getElementById('clearSearch');
const resultCount = document.getElementById('resultCount');
const expandAll = document.getElementById('expandAll');
const loadErrors = new Set();

function normalize(value) {
  return String(value ?? '')
    .toLocaleLowerCase('ru-RU')
    .replaceAll('ё', 'е')
    .replace(/[–—]/g, '-')
    .trim();
}

function plural(n, forms) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatLyrics(text) {
  const clean = String(text ?? '').replace(/^\uFEFF/, '').trim();
  if (!clean) return '';

  // Empty lines become paragraph breaks. Ordinary line breaks are preserved.
  return clean
    .split(/\n\s*\n/)
    .map(block => `<p>${escapeHtml(block).replaceAll('\n', '<br>')}</p>`)
    .join('');
}

async function loadLyrics(song) {
  if (!song.lyricsFile) return '';

  try {
    const response = await fetch(`lyrics/${encodeURIComponent(song.lyricsFile)}`, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } catch (error) {
    loadErrors.add(song.lyricsFile);
    console.warn(`Не удалось загрузить lyrics/${song.lyricsFile}`, error);
    return '';
  }
}

function createSongRow(song, index, lyricsText) {
  const row = document.createElement('article');
  row.className = 'song';

  const hasLyrics = Boolean(String(lyricsText ?? '').trim());
  const lyricHtml = hasLyrics
    ? formatLyrics(lyricsText)
    : `<div class="lyrics-note">
         ${loadErrors.has(song.lyricsFile)
           ? `Не удалось загрузить файл <code>lyrics/${escapeHtml(song.lyricsFile)}</code>. Проверьте, что он загружен на GitHub вместе с сайтом.`
           : `Текст пока не добавлен. Откройте файл <code>lyrics/${escapeHtml(song.lyricsFile)}</code> и вставьте текст обычным способом.`}
       </div>`;

  row.innerHTML = `
    <button class="song-head" type="button" aria-expanded="false">
      <span class="song-num">${String(index + 1).padStart(2, '0')}</span>
      <span class="song-main">
        <span class="song-title">${escapeHtml(song.title)}</span>
        <span class="song-artist">${escapeHtml(song.artist)}</span>
      </span>
      <span class="song-status">${hasLyrics ? 'текст' : 'добавить текст'}</span>
      <span class="chevron" aria-hidden="true">⌄</span>
    </button>
    <div class="lyrics"><div class="lyrics-inner">${lyricHtml}</div></div>
  `;

  row.querySelector('.song-head').addEventListener('click', () => {
    const open = row.classList.toggle('open');
    row.querySelector('.song-head').setAttribute('aria-expanded', String(open));
  });

  return row;
}

async function render(query = '') {
  const q = normalize(query);
  const filtered = songs
    .map((song, index) => ({ song, index }))
    .filter(({ song }) => !q || normalize(`${song.title} ${song.artist}`).includes(q));

  resultCount.textContent = `${filtered.length} ${plural(filtered.length, ['песня', 'песни', 'песен'])}`;
  list.innerHTML = '';
  empty.hidden = filtered.length !== 0;

  if (!filtered.length) return;

  // Загружаем тексты параллельно, чтобы сайт не зависал на одной песне.
  const texts = await Promise.all(filtered.map(({ song }) => loadLyrics(song)));

  filtered.forEach(({ song, index }, position) => {
    list.appendChild(createSongRow(song, index, texts[position]));
  });
}

search.addEventListener('input', () => render(search.value));

clearSearch.addEventListener('click', () => {
  search.value = '';
  search.focus();
  render('');
});

expandAll.addEventListener('click', () => {
  const rows = [...document.querySelectorAll('.song')];
  const shouldOpen = rows.some(row => !row.classList.contains('open'));
  rows.forEach(row => {
    row.classList.toggle('open', shouldOpen);
    row.querySelector('.song-head').setAttribute('aria-expanded', String(shouldOpen));
  });
  expandAll.textContent = shouldOpen ? 'Свернуть все' : 'Раскрыть все';
});

render();
