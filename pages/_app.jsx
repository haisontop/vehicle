import React, { useContext } from "react";
import TagManager from "react-gtm-module";
import ThemeConfig from "../src/theme";
import Layout from "../src/components/Layout";
import { SettingsProvider } from "../src/contexts/SettingsContext";
import { SearchProvider } from "../src/contexts/SearchContext";
import ThemePrimaryColor from "../src/components/ThemePrimaryColor";
import "react-image-gallery/styles/css/image-gallery.css";
import { useRouter } from "next/router";
import { CssBaseline } from "@mui/material";

const MyApp = ({ Component, pageProps }) => {
  React.useEffect(() => {
    TagManager.initialize({
      gtmId: process.env.GOOGLE_TAG,
      events: {
        searchFieldsClick: "searchFieldsClick",
      },
    });
  }, []);

  return (
    <div>
      <SearchProvider>
        <SettingsProvider>
          <ThemeConfig>
            <ThemePrimaryColor>
              <CssBaseline />
              <Layout {...pageProps}>
                <Component {...pageProps} />
              </Layout>
            </ThemePrimaryColor>
          </ThemeConfig>
        </SettingsProvider>
      </SearchProvider>
    </div>
  );
};

export default MyApp;
