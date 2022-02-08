import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>Test Vorat - Bayu Permana Putra</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
