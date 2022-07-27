import type { AppProps } from "next/app";

import "@styles/globals.scss";
import { WorksContextProvider } from "hooks/works/context";
import { ArtistsContextProvider } from "hooks/artists/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WorksContextProvider>
      <ArtistsContextProvider>
        <Component {...pageProps} />
      </ArtistsContextProvider>
    </WorksContextProvider>
  );
}

export default MyApp;
