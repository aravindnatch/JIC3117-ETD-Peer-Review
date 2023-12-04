import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DataProvider } from "@contexts/data-context";
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
      <Toaster />
    </>
  );
}

export default MyApp;
