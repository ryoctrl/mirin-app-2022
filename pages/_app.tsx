import type { AppProps } from "next/app";

import "@styles/globals.scss";
import { WorksContextProvider } from "hooks/works/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WorksContextProvider>
      <Component {...pageProps} />
    </WorksContextProvider>
  );
}

export default MyApp;
