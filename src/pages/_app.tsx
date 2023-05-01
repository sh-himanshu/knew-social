import "@/styles/globals.scss";
import { MantineProvider } from "@mantine/core";
import { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          fontFamily: "var(--font-poppins)",
        }}
      >
        <main className={`${poppins.variable} font-sans`}>
          <Component {...pageProps} />
        </main>
      </MantineProvider>
    </>
  );
}
