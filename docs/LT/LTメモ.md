## 自己流OSS発展

- 最初の一歩
  - OSS関連の記事を読む
  - goot first issueを検索
- コツ
  - リポジトリの局所的な理解でも解決できるissueがある
- good first issueが難しい
  - ドキュメント整理
    - リンク切れとか、テーブルに直すとか程度でもいい。
  - テストが不足してるOSSが結構ある
    - start100~のリポジトリを検索
  - TypeScriptのanyを消していく
- 継続的に関わりたい


## gRPC
 
 - gRPCが使える環境 
   - 多言語でサービス開発
   - 大規模でモジュールの分離度が高い環境


## Webアクセシビリティ

- Abema漫画 
  - CLSを改善して読書数が3倍増加
- Web Vitals
  - Code wv が検索順位に影響する
  - LPC
    - メインとなるコンテンツが表示されるまでの時間
  - FID
    - クリックとかタップして反応するまでの時間
  - CLS
    - 読み込み開始から完了までの表示崩れ
- どこからやっていくか?
  - ボトルネックを見つける（全部やろうとしない）
- 計測ツール
  - Lab
    - 1つの端末でページ読み込みをシミュレーション
    - 端末の性能とか環境に依存しちゃう
    - Lighthouseとか、PageSpeed Insight
  - Fields
    - ユーザーの端末から送られてくる匿名のパフォーマンスデータ
    - Serch Console
      - Page Speed Instight見れる
    - Chrome UX Report
    - PageSpeed Insight
    - GA
 - 無駄なレンダリングをなくす
   - whyDidyYouRender
 - パーフォーマンス向上の目的
   - ✖︎ 検索順位の上位にくる
   - ● UXをよくする


https://www.youtube.com/watch?v=sZW7KCCB8OU