import { ToastContainer, toast } from "react-toastify";

import type { AppProps } from "next/app";

import { WorksContextProvider } from "hooks/works/context";
import { ArtistsContextProvider } from "hooks/artists/context";
import { UserContextProvider } from "hooks/users/context";
import { AdminContextProvider } from "hooks/admin/context";
import { ExhibitionsContextProvider } from "hooks/exhibitions/context";
import { initialExhibitionsState } from "hooks/exhibitions/state";
import { initialWorksState } from "hooks/works/state";
import { StoredFileContextProvider } from "hooks/stored-files/context";

import "@styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import "@styles/Home.2023.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const { exhibitionsState, worksState } = pageProps;
  return (
    <UserContextProvider>
      <StoredFileContextProvider>
        <ExhibitionsContextProvider
          initialState={{
            ...initialExhibitionsState,
            ...exhibitionsState,
          }}
        >
          <WorksContextProvider
            initialState={{
              ...initialWorksState,
              ...worksState,
            }}
          >
            <ArtistsContextProvider>
              <AdminContextProvider>
                <Component {...pageProps} />
                <ToastContainer
                  position={toast.POSITION.TOP_CENTER}
                  theme="colored"
                />
              </AdminContextProvider>
            </ArtistsContextProvider>
          </WorksContextProvider>
        </ExhibitionsContextProvider>
      </StoredFileContextProvider>
    </UserContextProvider>
  );
}

export default MyApp;
