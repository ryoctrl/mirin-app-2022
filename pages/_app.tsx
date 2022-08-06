import { ToastContainer } from "react-toastify";

import type { AppProps } from "next/app";

import { WorksContextProvider } from "hooks/works/context";
import { ArtistsContextProvider } from "hooks/artists/context";
import { UserContextProvider } from "hooks/users/context";
import { AdminContextProvider } from "hooks/admin/context";

import "@styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <WorksContextProvider>
        <ArtistsContextProvider>
          <AdminContextProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </AdminContextProvider>
        </ArtistsContextProvider>
      </WorksContextProvider>
    </UserContextProvider>
  );
}

export default MyApp;
