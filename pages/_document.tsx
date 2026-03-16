import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="zh-CN" suppressHydrationWarning>
      <Head />
      <title>SPGA</title>
      <body className="antialiased" suppressHydrationWarning>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
