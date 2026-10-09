import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Disable caching for development environment
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.use(express.json());

// API: AI Stylist Review (Gemini API Integration with Smart Fallback)
app.post('/api/stylist-review', async (req, res) => {
  const { items, eventTheme, gender, isConflict, conflictDetails } = req.body || {};
  const itemNames = Array.isArray(items) && items.length > 0
    ? items.map(i => i.name || i).join(', ')
    : 'Áo Tấc Ngũ Thân kết hợp phụ kiện đương đại';

  let eventName = 'Đi Lễ Chùa / Lễ Hội';
  if (eventTheme === 'sang_trong' || eventTheme === 'datiec') eventName = 'Dạ Tiệc Đương Đại';
  if (eventTheme === 'pha_cach' || eventTheme === 'daopho') eventName = 'Dạo Phố Neon';

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const prompt = `Đóng vai một chuyên gia văn hóa và thời trang Gen Z của nền tảng Gấm Vóc Phồn Hoa.
Hãy viết 2 câu nhận xét ngắn gọn, ấn tượng và truyền cảm hứng (tối đa 50 từ) về bản phối gồm [${itemNames}] cho sự kiện [${eventName}].
${isConflict ? 'Lưu ý: Bộ trang phục có yếu tố phá cách/xung đột điển chế lịch sử (' + (conflictDetails || '') + '), hãy nhắc nhở tinh tế về sự kỳ dị thời gian và ranh giới sáng tạo.' : 'Đánh giá vẻ đẹp giao thoa giữa di sản Đại Việt và hơi thở hiện đại.'}
Chỉ trả về trực tiếp đoạn nhận xét, không thêm lời chào hay định dạng markdown rườm rà.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 150
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (text) {
          return res.json({ review: text, source: 'gemini' });
        }
      }
    } catch (err) {
      console.warn('[Gemini API Proxy] Fallback to local cultural engine:', err.message);
    }
  }

  // Fallback: Local Cultural Engine Analysis
  let reviewText = '';
  if (isConflict) {
    reviewText = `Tần số văn hóa đang biến đổi! Bạn vừa tạo ra một điểm kỳ dị thời gian khi ghép [${itemNames}] tại [${eventName}]. Sự va đập giữa tính quy phạm cổ xưa và phong cách nổi loạn đường phố mở ra ranh giới mới cho thời trang số.`;
  } else if (eventTheme === 'trang_nghiem' || eventTheme === 'lehoi') {
    reviewText = `Bản phối [${itemNames}] toát lên phong thái trang trọng, đĩnh đạc đúng chuẩn mực tiền nhân khi tham dự [${eventName}]. Từng đường nét cổ phục như được đánh thức nguyên vẹn giữa kỷ nguyên số.`;
  } else if (eventTheme === 'sang_trong' || eventTheme === 'datiec') {
    reviewText = `Một diện mạo lộng lẫy đầy quyền lực tại [${eventName}]! Sự kết hợp giữa [${itemNames}] tạo nên bản hòa tấu sang trọng, nâng tầm gấm vóc ngàn năm thành tác phẩm Haute Couture độc bản.`;
  } else {
    reviewText = `Sự giao thoa giữa [${itemNames}] trong không gian [${eventName}] tạo ra sự tương phản thị giác bùng nổ. Di sản Đại Việt đã thực sự hòa mình vào nhịp sống đường phố của thế hệ mới.`;
  }

  return res.json({ review: reviewText, source: 'cultural_engine' });
});

// Serve static assets with correct MIME types
app.use(express.static(__dirname, {
  extensions: ['html', 'htm']
}));

// Return 404 for missing static assets under /assets, /css, /js, /data so they never fall back to index.html
app.use(['/assets', '/css', '/js', '/data'], (req, res) => {
  res.status(404).end();
});

// Fallback to index.html for SPA routing if needed
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Gấm Vóc Phồn Hoa] Vanilla Server listening on http://0.0.0.0:${PORT}`);
});
