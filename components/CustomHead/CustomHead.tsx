import Head from "next/head";

function CustomHead() {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Rick and Morty potral info" />
        <link rel="icon" href="./favicon/favicon.ico" />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="57x57"
          href="./favicon/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="114x114"
          href="./favicon/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="72x72"
          href="./favicon/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="144x144"
          href="./favicon/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="60x60"
          href="./favicon/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="120x120"
          href="./favicon/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="76x76"
          href="./favicon/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="152x152"
          href="./favicon/apple-touch-icon-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="./favicon/favicon-196x196.png"
          sizes="196x196"
        />
        <link
          rel="icon"
          type="image/png"
          href="./favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="./favicon/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="./favicon/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="./favicon/favicon-128.png"
          sizes="128x128"
        />
        <meta
          name="msapplication-TileImage"
          content="./favicon/mstile-144x144.png"
        />
        <meta
          name="msapplication-square70x70logo"
          content="./favicon/mstile-70x70.png"
        />
        <meta
          name="msapplication-square150x150logo"
          content="./favicon/mstile-150x150.png"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="./favicon/mstile-310x150.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="./favicon/mstile-310x310.png"
        />
        <title>Rick and Morty</title>
      </Head>
      <Head>
        <meta property="og:title" content="My new title" key="title" />
      </Head>
      <p>Hello world!</p>
    </div>
  );
}

export default CustomHead;
