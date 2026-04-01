const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const AFFILIATE_ID = 'hiroposo02-22';
const API_KEY = process.env.ANTHROPIC_API_KEY;

function callAnthropicAPI(title) {
  return new Promise((resolve, reject) => {
    if (!API_KEY) {
      return reject(new Error('ANTHROPIC_API_KEY が設定されていません'));
    }

    const body = JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: `「${title}」という本の読者ターゲットを表す短いフレーズを3つ、スラッシュ区切りの1行で出力してください。\n条件：\n- 1フレーズは15文字以内\n- 箇条書き・改行・説明文は一切不要\n- 「フレーズ1 / フレーズ2 / フレーズ3」の形式のみ出力\n例：長期投資の軸を作りたい / 暴落でブレたくない / 仕組みで資産を増やしたい`,
        },
      ],
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) return reject(new Error(json.error.message));
          resolve(json.content[0].text);
        } catch (e) {
          reject(new Error('APIレスポンスのパースに失敗しました'));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const server = http.createServer(async (req, res) => {
  // GET / → index.html
  if (req.method === 'GET' && req.url === '/') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('index.html が見つかりません');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(content);
    });
    return;
  }

  // POST /generate-target → AI生成
  if (req.method === 'POST' && req.url === '/generate-target') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const { title } = JSON.parse(body);
        if (!title || !title.trim()) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'title が空です' }));
          return;
        }
        const text = await callAnthropicAPI(title.trim());
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ text }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`サーバー起動中: http://localhost:${PORT}`);
  console.log(`ANTHROPIC_API_KEY: ${API_KEY ? '設定済み ✓' : '未設定 ✗'}`);
});
