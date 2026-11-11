# シミケア専門店 Areum 吉祥寺店

公開LP: https://lime2002-esthetic.github.io/areum-pages/

住所: 東京都武蔵野市吉祥寺本町２-18-15　武蔵野カントリーハイツ113号
アクセス: 吉祥寺駅徒歩3分

## 計測の設定

LPにはGTM経由のGA4計測に対応するコードを実装済みです。GTM・GA4のIDが未設定のため、Googleへの計測送信はまだ始まっていません。

1. GA4のウェブストリームURLに公開LPのURLを入力します。
2. GTMのウェブコンテナを作り、GTM-…のIDを assets/js/analytics-config.js の gtmContainerId に設定します。
3. GA4のG-…のIDはGTM側へ設定します。
4. 詳細は [計測設定手順](docs/計測設定手順.md) を参照してください。

予約先URLは指定されたものをそのまま設定しています。画像は assets/images に格納しています。ビルド・サーバー・有料計測サービスは不要です。
