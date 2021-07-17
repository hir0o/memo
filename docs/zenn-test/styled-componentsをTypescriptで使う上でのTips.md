* Source: <https://zenn.dev/nekoniki/articles/f8600d1ab7d908#%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%82%92%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%81%99%E3%82%8B>

# はじめに

今回は`Typescript + React`で`styled-components`を使う場合のTipsを紹介します。  
`style`プロパティで直接記載するよりもスタイルの管理がしやすい+使い回しやすいといったメリットがあるのでおすすめです。

**※普段は`React Native`を扱っていますが、`styled-components`に着目した場合の使用感はほぼ同じといっていいので、サンプルコードは`React`のものになります。**

# そもそも`styled-components`とは

`styled-components`は所謂`CSS in JS`ライブラリの一種になります。  
名前が表す通り、`JS`もしくは`TS`のコード中に`CSS`を記載していく形になります。

[https://styled-components.com](https://styled-components.com/)

デフォルトの`React`プロジェクトだと、コンポーネント自体は`JS`や`TS`で記載しますが、スタイルは`CSS`ファイルのまとまっています。  
それらを **1ファイルにまとめる** ことができるのが最大のメリットです。

スタイルはテンプレートリテラルで記載することを基本とし、作成したコンポーネントのスタイルを継承したり、さらに拡張したりすることができます。

上記の内容だけではピンとこない方も多いと思うので、実際に使ってみましょう。

# 実際に使ってみる

以下、実際に動くサンプルを作ってみる例です。  
`React + Typescript`のプロジェクトは既に作成してあるものとします。

## インストール

```shell
yarn add styled-components
yarn add --dev @types/styled-components
```

## 基本的な書き方

以下に`styled-components`を使って、ラベルの色を赤く、文字を太くした場合のボタンコンポーネントの例を示します。

```tsx
import React from "react";
import styled from "styled-components";

// 基本的なstyled-componentsの使い方
const CustomButton = styled.button`
  color: red;
  font-weight: bold;
`;
```

この`CustomButton`の使い方は、通常の`button`コンポーネントと同じです。

```tsx
<CustomButton>ほげほげ</CustomButton>
```

これは`button`コンポーネントに下記のように`style`を指定したのと同じになります。

```tsx
<button style={{color: "red", fontWeight: "bold"}}>ほげほげ</button>
```

見てわかる通り、より**CSSに近い記法**になっているかと思います。  
このスタイルを指定している箇所は **「テンプレートリテラル」** と呼ばれています。

<https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Template_literals>

対して、上記の`<button>`の例のようなスタイルの指定の記法を **「オブジェクトリテラル」** と呼びます。  
`styled-components`を使用することで、デフォルトのコンポーネントをそのまま`render`するケースが減少するかと思います。

## 独自定義したコンポーネントにも対応している

では、自作のコンポーネントやライブラリから`import`してきたコンポーネントにも`styled-components`でスタイルを適用したい場合はどうでしょうか。  
`styled-components`ではそういったコンポーネントもサポートしています。  
以下に例を示します。

`Hoge`という`<p>`をラップしたシンプルなコンポーネントがあったとします。

```tsx
import React from 'react';
const Hoge: React.VFC = (props) => <p {...props}>Original Component</p>;
```

この`Hoge`に対して`styled-components`でスタイルを指定したい場合は下記のように記載します。

```tsx
import React from "react";
import styled from "styled-components";
const Hoge: React.VFC = (props) => <p {...props}>Original Component</p>;

// Hogeに対してスタイルを適用する
const CustomHoge = styled(Hoge)`
  color: purple;
`
```

外部のライブラリから`import`してきたコンポーネントも同様に扱う事ができます。

## プロパティによって変動するスタイルの定義

`button`コンポーネントでよくあるのが「`disabled`だけスタイルを変更したい」といったケースです。  
`styled-components`では、コンポーネントに渡されるプロパティの値によってスタイルを制御することも可能です。

その場合は以下のように記載します。

```tsx
import React from "react";
import styled from "styled-components";

// props.disabledでcolorを変化させる
const CustomButton = styled.button`
  color: ${(props: React.ButtonHTMLAttributes<HTMLButtonElement>) => props.disabled? 'red': 'blue' };
  font-weight: bold;
`;
```

これで`button`が`disabled`の状態の時のみ文字色が赤くなり、それ以外の時は青くなります。  
ここで使用している`props`は`button`の`props`の型と同じになります。  
従って、`props`は`React.ButtonHTMLAttributes<HTMLButtonElement>`型となります。

## プロパティをカスタムする

上記の`button`の`disabled`のようなプロパティではなく、独自で定義したプロパティを使いたい場合があるかと思います。  
その場合はジェネリクスとして型を渡すことで対応することができます。  
下記のように記載します。

```tsx
import React from "react";
import styled from "styled-components";

// 独自定義のプロパティ
type CustomPayload = {
  hoge?: boolean;
};

const CustomButton = styled.button<CustomPayload>`
  color: ${(props) => props?.hoge? 'red': 'blue'};
`
```

これで`CustomButton`に`hoge`というプロパティを渡すことで文字色を制御できるようになりました。  
こういったケースの場合、カスタムしたプロパティは大概必須ではないと思います。  
その場合はコンポーネントの`defaultProps`を指定して、初期値を決めておきましょう。

```tsx
import React from "react";
import styled from "styled-components";

// 独自定義のプロパティ
type CustomPayload = {
  hoge?: boolean;
};

const CustomButton = styled.button<CustomPayload>`
  color: ${(props) => props?.hoge? 'red': 'blue'};
`

// hogeの初期値をfalseにしておく
CustomButton.defaultProps = {
  hoge: false;
}
```

## ここまでをまとめたサンプル

ここまでの内容をまとめたサンプルコードを以下に記します。

```tsx
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";

// 基本的なstyled-componentsの使い方
const CustomButton = styled.button`
  color: red;
  font-weight: bold;
`;

// Propsの値によってスタイルを制御する例
// ここでは<p>のプロパティの1つであるchildrenを使っている
const CustomParagraph1 = styled.p`
  color: ${(props) =>
    props.children === "someFlg is True" ? "green" : "blue"};
`;

// 独自定義のプロパティ
type CustomPayload = {
  hoge?: boolean;
};

// 継承 + 拡張したプロパティを使う例
const CustomParagraph2 = styled(CustomParagraph1)<CustomPayload>`
  color: ${(props) => (props.hoge ? "pink" : "red")};
`;

// プロパティの初期値を設定することもできる
CustomParagraph2.defaultProps = {
  hoge: false
};

const App: React.FC = () => {
  const [someFlg, setSomeFlg] = useState(false);
  const reverseFlg = useCallback(() => {
    setSomeFlg((flg) => !flg);
  }, []);

  const label = useMemo(() => {
    return someFlg ? "someFlg is True" : "someFlg is False";
  }, [someFlg]);
  return (
    <div className="App">
      <CustomButton onClick={reverseFlg}>フラグ書き換え</CustomButton>
      <CustomParagraph1>{label}</CustomParagraph1>
      <CustomParagraph2 hoge={someFlg}>CustomType Sample</CustomParagraph2>
    </div>
  );
};

export default App;
```

画面上のボタンを押下することで、`state`の値が変化し、それに伴って`styled-components`から動的にスタイルが反映されるのが分かるかと思います。

![sample](https://storage.googleapis.com/zenn-user-upload/16cb15d73a10c39f283e6984.png)

# まとめ

今回は`React + Typescript`の環境下で`styled-components`を扱っていくTips的な内容をまとめました。  
オブジェクトリテラルの記法に慣れていると、最初は取っ付きづらい印象を受けますが、アプリの規模が大きくなるにつれてスタイルの管理がしやすくなるかと思います。

今回の内容が参考になりましたら幸いです。

[![nekoniki](https://storage.googleapis.com/zenn-user-upload/avatar/f58cf33010.jpeg)](https://zenn.dev/nekoniki)

[nekoniki](https://zenn.dev/nekoniki)Follow

静岡で細々とSEやってるフロントエンジニア(28)です。 C#/Javascript/Typescript/GoogleAppScript/React/ReactNative/Python

[ shutoyamada](https://github.com/shutoyamada)[pyoncoin](https://twitter.com/pyoncoin)[nekoniki.com](https://nekoniki.com/)

著者を応援しよう

nekonikiさんの知見への対価としてお金を支払うことができます。

サポートする

![](https://zenn.dev/images/drawing/coinbox-dark.png)
