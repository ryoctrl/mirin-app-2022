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

function MyApp({ Component, pageProps }: AppProps) {
  const { exhibitionsState, worksState } = pageProps;
  return (
    <UserContextProvider>
      <StoredFileContextProvider>
        <WorksContextProvider
          initialState={{
            ...initialWorksState,
            ...worksState,
          }}
        >
          <ArtistsContextProvider>
            <ExhibitionsContextProvider
              initialState={{
                ...initialExhibitionsState,
                ...exhibitionsState,
              }}
            >
              <AdminContextProvider>
                <Component {...pageProps} />
                <ToastContainer
                  position={toast.POSITION.TOP_CENTER}
                  theme="colored"
                />
              </AdminContextProvider>
            </ExhibitionsContextProvider>
          </ArtistsContextProvider>
        </WorksContextProvider>
      </StoredFileContextProvider>
    </UserContextProvider>
  );
}

export default MyApp;
