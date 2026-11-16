// AI Helper — local-only, $0. Gọi Ollama qua proxy /ollama nếu có; fallback quy tắc nếu không.
const OLLAMA_BASE = '/ollama';
const MODEL = 'llama3.2:1b'; // mô hình nhẹ, chạy local

const ruleBased = {
  timeExpressions: {
    'いま':'bây giờ','きのう':'hôm qua','きょう':'hôm nay','あした':'ngày mai',
    'まいにち':'mỗi ngày','まいしゅう':'mỗi tuần'
  },
  particles: {
    'は':'chủ đề','が':'chủ ngữ/nhấn mạnh','を':'tân ngữ trực tiếp',
    'に':'mốc thời gian/đích đến','へ':'hướng đến','de':'phương tiện/địa điểm',
    'と':'người đi cùng','も':'cũng/thêm vào','の':'sở hữu/liên kết','か':'dấu hỏi'
  },
  commonErrors: [
    'Bạn đọc です thành “là” ở mọi chỗ — です là kết quả lịch sự, không phải từ “là”.',
    'Bạn đọc trợ từ へ thành “he” — へ đọc “e”.',
    'Bạn dùng も như chủ đề bất kỳ — mo thay cho は khi cùng thuộc tính đã nêu.'
  ]
};

async function askOllama(prompt, system = '') {
  try {
    const res = await fetch(`${OLLAMA_BASE}/api/generate`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({model: MODEL, prompt, system, stream: false})
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.response || null;
  } catch { return null; }
}

function ruleBasedAnswer(query) {
  const q = query.toLowerCase();
  for (const [k, v] of Object.entries(ruleBased.timeExpressions)) {
    if (q.includes(k) || q.includes(k.charCodeAt(0).toString())) return `“${k}” đọc ${k}, nghĩa: ${v}.`;
  }
  for (const [k, v] of Object.entries(ruleBased.particles)) {
    if (q.includes(k) || q.includes(`trợ từ ${k}`)) return `Trợ từ “${k}”: ${v}.`;
  }
  if (q.includes('lỗi') || q.includes('sai')) {
    return ruleBased.commonErrors.join(' ');
  }
  return null;
}

export async function aiExplain(query, context = '') {
  const ollamaAnswer = await askOllama(
    `Ngữ cảnh: ${context}\nCâu hỏi: ${query}\nTrả lời ngắn gọn, bằng tiếng Việt, dựa trên dữ liệu JLPT N5/N4.`,
    'Bạn là trợ lý giảng dạy tiếng Nhật N5/N4, trả lời bằng tiếng Việt.'
  );
  if (ollamaAnswer) return {source: 'ollama', answer: ollamaAnswer};
  const fallback = ruleBasedAnswer(query);
  if (fallback) return {source: 'rule-based', answer: fallback};
  return {source: 'none', answer: 'Xin lỗi, tôi không có đủ thông tin để trả lời câu hỏi này.'};
}

export async function aiGroundingCheck(question, expectedAnswer) {
  const ollamaAnswer = await askOllama(
    `Câu hỏi: ${question}\nĐáp án kỳ vọng: ${expectedAnswer}\nĐáp án này đúng hay sai? Trả lời “đúng” hoặc “sai” kèm giải thích ngắn.`,
    'Bạn là kiểm tra viên tiếng Nhật N5/N4.'
  );
  if (ollamaAnswer) return {source: 'ollama', answer: ollamaAnswer, grounded: ollamaAnswer.toLowerCase().includes('đúng')};
  const grounded = expectedAnswer.toLowerCase() === question.toLowerCase() || question.includes(expectedAnswer);
  return {source: 'rule-based', answer: grounded ? 'Đúng (quy tắc)' : 'Sai (quy tắc)', grounded};
}

export const aiAvailable = () => {
  // Không thể kiểm tra trước khi gọi; coi là có sẵn nếu Ollama chạy
  return true;
};
