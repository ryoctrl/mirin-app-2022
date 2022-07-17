import type { AppProps } from "next/app";

import "@styles/globals.scss";
import { OpusContextProvider } from "hooks/opus/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <OpusContextProvider>
      <Component {...pageProps} />
    </OpusContextProvider>
  );
}

export default MyApp;
