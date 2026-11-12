import React, { useEffect, useMemo, useState } from 'react';
import KanjiPad from './KanjiPad.jsx';
import KanjiReference from './KanjiReference.jsx';
import './kanji-library.css';

async function loadJson(path, signal) {
  const response = await fetch(path, { signal });
  if (!response.ok) throw Error(`Không tải được dữ liệu thư viện (${response.status}).`);
  return response.json();
}

export default function KanjiLibrary({ state, setState }) {
  const [mode, setMode] = useState('kanji');
  const [library, setLibrary] = useState(null);
  const [radicalData, setRadicalData] = useState(null);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState('');
  const [selectedRadical, setSelectedRadical] = useState(1);
  const pageSize = 30;

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      loadJson('/library/kanji.json', controller.signal),
      loadJson('/library/radicals.json', controller.signal)
    ]).then(([kanji, radicals]) => {
      if (!Array.isArray(kanji.items) || kanji.items.length < 2500) {
        throw Error('Danh mục Kanji chưa đạt ngưỡng dữ liệu đã công bố.');
      }
      if (!Array.isArray(radicals.items) || radicals.items.length !== 214) {
        throw Error('Danh mục bộ thủ chưa đủ 214 mục.');
      }
      setLibrary(kanji);
      setRadicalData(radicals);
    }).catch(loadError => {
      if (loadError.name !== 'AbortError') setError(loadError.message);
    });
    return () => controller.abort();
  }, []);

  const chars = library?.items || [];
  const radicals = radicalData?.items || [];
  const filteredChars = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return chars.filter(item => {
      const categoryMatch = category === 'all' || item.category === category;
      const text = [
        item.char,
        item.meanings?.join(' '),
        item.on?.join(' '),
        item.kun?.join(' '),
        item.hanViet?.join(' '),
        item.contexts?.map(context => `${context.wordKey || ''} ${context.meaning || ''}`).join(' ')
      ].join(' ').toLocaleLowerCase();
      return categoryMatch && (!needle || text.includes(needle));
    });
  }, [category, chars, query]);
  const selectedItem = chars.find(item => item.char === selected) || filteredChars[0];
  const selectedRadicalItem = radicals.find(item => item.number === selectedRadical);
  const pageCount = Math.ceil(filteredChars.length / pageSize);

  useEffect(() => setPage(0), [category, query, mode]);
  useEffect(() => {
    if (selectedItem && mode === 'kanji' && selectedItem.char !== selected) {
      setSelected(selectedItem.char);
    }
  }, [mode, selected, selectedItem]);

  return <section className="card kanji-library">
    <div className="page-heading">
      <span className="eyebrow">TRA CỨU · KHÔNG ĐỒNG NGHĨA ĐÃ ĐƯỢC DẠY</span>
      <h2>Thư viện Kanji và bộ thủ</h2>
      <p>Tra cứu độc lập với lộ trình học. Mở chữ ở đây không tự đánh dấu đã học hay hoàn thành bài.</p>
    </div>
    <div className="actions" role="group" aria-label="Chọn thư viện">
      <button className={mode === 'kanji' ? 'primary' : 'secondary'} onClick={() => setMode('kanji')}>
        Kanji ({library?.manifest.kanji ?? '…'})
      </button>
      <button className={mode === 'radicals' ? 'primary' : 'secondary'} onClick={() => setMode('radicals')}>
        Bộ thủ Khang Hy ({radicalData?.manifest.radicals ?? '…'})
      </button>
    </div>
    {error && <p role="alert">{error}</p>}
    {!library && !error && <p role="status">Đang tải dữ liệu tra cứu…</p>}
    {library && mode === 'kanji' && <>
      <p className="verification-label">
        {library.manifest.joyo} chữ Jōyō theo danh sách Cơ quan Văn hóa Nhật Bản;
        {' '}{library.manifest.nameOnly} chữ ngoài Jōyō theo metadata KANJIDIC2 9/10;
        {' '}chữ trong bài học được đánh dấu riêng. Thư viện tra cứu không phải danh sách N4 cần học.
      </p>
      <div className="kanji-library-controls">
        <label>Tìm chữ, nghĩa nguồn, âm hoặc từ ví dụ
          <input value={query} onChange={event => setQuery(event.target.value)} />
        </label>
        <label>Nhóm
          <select value={category} onChange={event => setCategory(event.target.value)}>
            <option value="all">Tất cả</option>
            <option value="joyo">Jōyō</option>
            <option value="name-source">Ngoài Jōyō · KANJIDIC2 9/10</option>
          </select>
        </label>
      </div>
      <div className="tools-layout">
        <section>
          <div className="tool-result-list kanji-library-results">
            {filteredChars.slice(page * pageSize, (page + 1) * pageSize).map(item =>
              <button
                className="tool-result"
                key={item.char}
                aria-pressed={selectedItem?.char === item.char}
                onClick={() => setSelected(item.char)}
              >
                <strong lang="ja">{item.char} · {item.hanViet?.join('/') || 'Chưa có Hán Việt'}</strong>
                <small>{item.category === 'joyo' ? 'Jōyō' : 'KANJIDIC2 grade 9/10'} · {item.taught ? `Có bài: ${item.lessonIds.join(', ')}` : 'Tra cứu, chưa dạy'}</small>
              </button>
            )}
            {!filteredChars.length && <p>Không có kết quả phù hợp.</p>}
          </div>
          <div className="actions">
            <button className="secondary" disabled={page === 0} onClick={() => setPage(value => value - 1)}>Trang trước</button>
            <span>{pageCount ? page + 1 : 0} / {pageCount}</span>
            <button className="secondary" disabled={page + 1 >= pageCount} onClick={() => setPage(value => value + 1)}>Trang sau</button>
          </div>
        </section>
        {selectedItem && <div>
          <section className="card kanji-library-detail">
            <h3 lang="ja">{selectedItem.char}</h3>
            <p>{selectedItem.category === 'joyo' ? 'Jōyō · danh sách chính thức' : 'Ngoài Jōyō · phân loại tra cứu KANJIDIC2 9/10'}</p>
            <p>{selectedItem.taught ? `Có mục học trong: ${selectedItem.lessonIds.join(', ')}` : 'Chỉ có dữ liệu tra cứu; chưa được tính là đã dạy.'}</p>
            <p>Nghĩa theo nguồn (tiếng Anh): {selectedItem.meanings?.join('; ') || 'Chưa có'}.</p>
            <p>Âm On: {selectedItem.on?.join(' · ') || 'Chưa có'} · Âm Kun: {selectedItem.kun?.join(' · ') || 'Chưa có'}.</p>
            <p>Hán Việt theo nguồn: {selectedItem.hanViet?.join(' · ') || 'Chưa có'}.</p>
            <KanjiReference char={selectedItem.char} />
          </section>
          <KanjiPad
            key={selectedItem.char}
            item={{
              char: selectedItem.char,
              meaning: selectedItem.meanings?.join('; ') || 'Chưa có nghĩa theo nguồn',
              hanViet: selectedItem.hanViet?.join(' · '),
              inWord: selectedItem.contexts?.[0]?.wordKey || 'Chữ trong thư viện tra cứu'
            }}
            state={state}
            setState={setState}
          />
        </div>}
      </div>
    </>}
    {library && radicalData && mode === 'radicals' && <>
      <p className="verification-label">
        Số thứ tự, hình bộ và tên tiếng Anh lấy từ Unicode; nghĩa/Hán Việt/nét là dữ liệu tra cứu của chữ tương đương trong KANJIDIC2.
        Không suy diễn lịch sử cấu tạo chữ. Biến thể Unicode được liệt kê riêng.
      </p>
      <div className="kanji-library-controls">
        <label>Tìm số bộ, hình, tên hoặc nghĩa
          <input value={query} onChange={event => setQuery(event.target.value)} />
        </label>
      </div>
      <div className="tools-layout">
        <div className="tool-result-list kanji-library-results">
          {radicals.filter(item => `${item.number} ${item.glyph} ${item.ideograph} ${item.nameEnglish} ${item.hanViet?.join(' ')} ${item.meanings?.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase())).map(item =>
            <button className="tool-result" key={item.number} aria-pressed={selectedRadicalItem?.number === item.number} onClick={() => setSelectedRadical(item.number)}>
              <strong lang="ja">{item.number}. {item.glyph} · {item.ideograph}</strong>
              <small>{item.nameEnglish} · {item.hanViet?.join('/') || 'Chưa có Hán Việt'}</small>
            </button>
          )}
        </div>
        {selectedRadicalItem && <section className="card kanji-library-detail">
          <h3>{selectedRadicalItem.number}. <span lang="ja">{selectedRadicalItem.glyph}</span></h3>
          <p>Tên Unicode: {selectedRadicalItem.nameEnglish.replaceAll('_', ' ').toLowerCase()}.</p>
          <p>Chữ tương đương: <span lang="ja">{selectedRadicalItem.ideograph}</span>{selectedRadicalItem.dictionaryEquivalent && ` (dữ liệu tra cứu dùng ${selectedRadicalItem.dictionaryEquivalent})`}.</p>
          <p>Nghĩa theo KANJIDIC2 (tiếng Anh): {selectedRadicalItem.meanings.join('; ') || 'Chưa có'}.</p>
          <p>Hán Việt: {selectedRadicalItem.hanViet.join(' · ') || 'Chưa có'} · Số nét chữ tương đương: {selectedRadicalItem.strokes}.</p>
          {selectedRadicalItem.variants.length > 0 && <p>Biến thể trong Unicode CJKRadicals: {selectedRadicalItem.variants.map(item => `${item.glyph} (${item.ideograph})`).join(' · ')}.</p>}
          <h4>Ví dụ Kanji Jōyō cùng bộ (tra cứu, không phải lộ trình dạy)</h4>
          <div className="actions">
            {selectedRadicalItem.examples.map(char =>
              <button className="secondary" key={char} onClick={() => {
                setSelected(char);
                setCategory('all');
                setMode('kanji');
              }}>{char}</button>
            )}
          </div>
          <small>{selectedRadicalItem.source} Chưa có duyệt học thuật độc lập.</small>
        </section>}
      </div>
    </>}
  </section>;
}
