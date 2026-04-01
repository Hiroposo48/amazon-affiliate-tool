# 📚 Amazon アフィリエイト HTML生成ツール

AmazonのASINを入力するだけで、アフィリエイトリンク付きのHTMLカードを自動生成するローカルWebツールです。  
Claude AIが「こんな人に」のテキストも自動で考えてくれます。

---

## 🖼️ 完成イメージ

書籍の表紙画像・タイトル・「こんな人に」・購入ボタン（書籍／Kindle／Audible）が1クリックで生成されます。

---

## ✅ 必要なもの

- [Node.js](https://nodejs.org/) （インストール済みであること）
- [Anthropic APIキー](https://console.anthropic.com/) （AI生成機能を使う場合）
- Amazon アソシエイトID

---

## 🚀 セットアップ

### 1. リポジトリをクローン

```bash
git clone https://github.com/yourname/amazon-affiliate-tool.git
cd amazon-affiliate-tool
```

### 2. APIキーを環境変数に登録

**Windows（PowerShell）**
```powershell
setx ANTHROPIC_API_KEY "sk-ant-xxxxxxxx"
```

**Mac / Linux**
```bash
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxx"
```

### 3. アフィリエイトIDを変更

`server.js` の以下の行を自分のIDに書き換えてください。

```js
const AFFILIATE_ID = 'あなたのID-22';
```

### 4. サーバーを起動

```bash
node server.js
```

ブラウザで `http://localhost:3000` を開きます。

---

## 📖 使い方

1. **本のタイトル**を入力
2. **書籍ASIN**（必須）・**Kindle ASIN**・**Audible ASIN**を入力
3. **「AI生成」ボタン**を押すと「こんな人に」が自動入力される
4. **「HTMLを生成」ボタン**を押す
5. 生成されたHTMLをコピーしてブログに貼り付ける

> ASINはAmazonの商品URLの `amazon.co.jp/dp/★ここ★/` の10桁です。

---

## 📁 ファイル構成

```
amazon-affiliate-tool/
├── server.js      # サーバー本体（Node.js）
├── index.html     # UI
└── README.md
```

---

## ⚙️ 仕様

| 項目 | 内容 |
|------|------|
| 使用言語 | Node.js |
| 外部パッケージ | 不要（標準モジュールのみ） |
| ポート | 3000 |
| AI | Anthropic Claude API |
| 対応OS | Windows / Mac / Linux |

---

## 🤖 AI生成について

Anthropic APIキーが設定されていない場合、「こんな人に」は手動入力になります。  
APIキーは [Anthropic Console](https://console.anthropic.com/) で取得できます（従量課金）。

---

## 📝 ライセンス

MIT License

このツールはClaude Codeを使って作成しました。  
自由に使用・改変・再配布してください。

---

## 🙏 クレジット

- AI：[Anthropic Claude](https://www.anthropic.com/)
- 作成支援：[Claude Code](https://www.anthropic.com/claude-code)
