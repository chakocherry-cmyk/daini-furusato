# 第二のふるさと 設計書

観光客向けのローカルWebアプリです。サーバ、ログイン、決済、外部APIはありません。体験の参加、第二のふるさと、再訪予定は、このブラウザの localStorage に残ります。

## システム構成

```text
ブラウザ
  画面（React）
  判定（src/logic.js）
  保存（src/storage.js）
  サンプル（src/data.js）
  画像（public/images）
```

起動は Vite の開発サーバです。画面の切り替えは URL ではなく、アプリ内の表示状態で行います。

## 画面

スマホ幅を基準に、中央の幅 430px で表示します。全画面の上にデモ用のバー、下にナビがあります。

デモバー:

- 表示: 「旅の季節: はじまり」または「旅の季節: 3か月後」
- 「3か月進める」: デモ時間を 3 か月加算する
- 「デモを最初から」: 参加履歴、ふるさと登録、デモ時間、招待状、再訪希望を初期状態に戻す

ナビ:

- 探す
- ふるさと
- おかえり（届いている招待状の件数を表示）

画面の役割:

- **体験を探す**: 深緑のヒーローにキャッチコピーと料理写真。希望は2列カードで1つだけ選ぶ。選ぶと「選択中」と出る。体験カードから詳細へ進む
- **体験詳細**: 体験写真、ホストの紹介、体験内容、次に会うときの誘い、参加条件。「参加済みにする」「第二のふるさとに登録する」。誘いには、その体験の `afterMonths` を「参加から○か月後に届きます。」と出す
- **私の第二のふるさと**: 登録した地域は、参加前でも必ず1枚出す。参加した体験は、地域を登録していなくても写真付きのアルバムカードになる。地域名、体験名、サポーター、次に体験できること、招待状までの残り月数、再訪希望の状態を載せる。登録も参加もないときは「体験を探す」へ案内する
- **おかえり**: 期間を満たした招待状を手紙として示す。見出し、本文、写真は体験データから取る。沖縄の料理体験では見出し「また一緒に料理を作ろうね」、前回の体験、次回の沖縄そばの誘いを出す。「また会いに行きたい」で再訪希望を保存する。未参加のときは「体験を探す」へ案内する。参加済みで期間前は、体験ごとに「季節を○か月進めると届きます。」と出す

希望を選んでいないときは、体験5件をすべて出します。「郷土料理を教わりたい」では、「おばぁと作る家庭料理」だけが表示されます。

## データ

マスタは `src/data.js` です。画像は `public/images` に同梱し、外部の写真URLは使っていません。

- `hero-goya-champuru.jpg`: トップのヒーローと、沖縄の料理体験のアルバム、招待状で使う生成写真。1280×720
- `hero.svg` と各体験・人物の SVG: それ以外の体験カードと人物のイラスト

地域:

- `okinawa` 沖縄本島
- `hida` 飛騨高山

人:

- `obaa` おばぁ（沖縄）
- `farm` 農園の健さん（沖縄）
- `hidaPerson` 朝市の佐藤さん（飛騨）

体験の項目: `id`, `regionId`, `supporterId`, `title`, `wishes`, `summary`, `body`, `conditions`, `image`, `albumImage`, `invitation`。一覧カードは `image`、詳細・アルバム・招待状の大きな写真は `albumImage` があればそれを使う。

招待状の項目: `afterMonths`, `message`, `nextTitle`。任意で `headline`, `portrait`, `portraitPosition`。次の体験は別レコードにせず、招待状の見出しとして保存します。画面側で文章や写真を体験idごとに分岐しません。現状、`albumImage`、`headline`、`portrait`、`portraitPosition` を持っているのは `oki-cooking` だけです。ほかの体験は `image` とサポーターの `portrait` を使います。

体験:

- `oki-cooking` おばぁと作る家庭料理。希望は郷土料理と交流。3か月後に「今度は沖縄そばを一緒に作ろうね」。次の見出しは「おばぁと作る沖縄そば」
- `oki-farm` 島野菜の収穫。2か月後
- `oki-sea` 海辺の朝。2か月後
- `hida-market` 朝市の手伝い。2か月後
- `hida-festival` 秋祭りの準備。3か月後

希望の値:

- `relax` のんびり過ごしたい
- `connect` 地域の人と交流したい
- `cooking` 郷土料理を教わりたい
- `farm` 農業や収穫を体験したい
- `festival` 地域のお祭りに参加したい
- `outdoor` 自然やアウトドアを楽しみたい

## 利用者の状態

localStorage のキーは `furusato-state` です。

```js
{
  demoMonth: 0,
  joined: [],
  hometownIds: [],
  wishes: []
}
```

- `joined`: `{ experienceId, atMonth }`
- `hometownIds`: 地域 id
- `wishes`: `{ experienceId, title, atMonth }`

招待状の判定は `src/logic.js` の `invitationsFor` だけが行います。参加記録があり、`demoMonth - atMonth >= afterMonths` のとき届いたとみなします。残り月数は `afterMonths - (demoMonth - atMonth)` です。料理と祭りは 3、収穫・海辺・朝市は 2 です。デモ本線では、参加月 0 の料理体験を 3 か月進めると差が 3 になり、招待状が出ます。

ふるさと一覧は `hometownIds` の地域を必ず含みます。その地域に参加記録がなければ、地域の紹介だけを出します。参加記録がある体験は、地域未登録でもアルバムに残します。

「また会いに行きたい」は、招待状の `nextTitle` を再訪予定として `wishes` に追加します。

リセットは、このキーを削除し、表示中の希望選択と詳細画面も最初の探す画面に戻します。

## ファイル

- `index.html`, `package.json`, `package-lock.json`, `vite.config.js`
- `src/main.jsx`, `src/App.jsx`, `src/data.js`, `src/logic.js`, `src/storage.js`, `src/styles.css`
- `src/screens/Match.jsx`, `Detail.jsx`, `Hometown.jsx`, `Letter.jsx`
- `public/images/` の JPG 1枚と SVG 9枚

## 作っていないもの

ログイン、決済、実メール、実予約、管理画面、地図、外部API、SpotTour連携、希望の複数選択、封書を開く演出、スライドファイル。
