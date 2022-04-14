import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

const initialState = {
  baseURL: "",
  searchURL: "",
  agentAddress: {
    value: "",
    type: "phone",
  },
  userId: "",
  cookieEnabled: undefined,
};

export const restoreUserId = () => {
  let userId = "";
  try {
    userId = window.localStorage.getItem("userId");
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return userId;
};

export const restoreCookieEnabled = () => {
  let cookieEnabled = "";
  try {
    cookieEnabled = window.localStorage.getItem("cookieEnabled");
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return cookieEnabled;
};

export const storeUserId = (userId) => {
  window.localStorage.setItem("userId", userId);
};

export const storeCookieEnabled = (enabled) => {
  window.localStorage.setItem("cookieEnabled", enabled);
};

const SearchContext = createContext(initialState);

SearchProvider.propTypes = {
  children: PropTypes.node,
};

function SearchProvider({ children }) {
  const [searchSettings, setSearchSettings] = useState({
    baseURL: initialState.baseURL,
    searchURL: initialState.searchURL,
    agentAddress: initialState.agentAddress,
    userId: initialState.userId,
    cookieEnabled: initialState.cookieEnabled,
  });

  const onChangeUserId = (userId) => {
    setSearchSettings({
      ...searchSettings,
      userId,
    });

    storeUserId(userId);
  };

  const onChangeCookieEnabled = (cookieEnabled) => {
    setSearchSettings({
      ...searchSettings,
      cookieEnabled,
    });

    storeCookieEnabled(cookieEnabled);
  };

  useEffect(() => {
    const userId = restoreUserId();

    if (userId) {
      onChangeUserId(userId);
    }
  }, []);

  useEffect(() => {
    const cookieEnabled = restoreCookieEnabled();

    if (cookieEnabled) {
      onChangeCookieEnabled(cookieEnabled);
    }
  }, []);

  const onChangeSearchURL = (value) => {
    setSearchSettings({
      ...searchSettings,
      searchURL: value,
    });
  };

  const onChangeBaseURL = (value) => {
    setSearchSettings({
      ...searchSettings,
      baseURL: value,
    });
  };

  const onChangeAgentAddress = (value, addressType) => {
    setSearchSettings({
      ...searchSettings,
      agentAddress: {
        value,
        type: addressType,
      },
    });
  };

  return (
    <SearchContext.Provider
      value={{
        ...searchSettings,
        onChangeSearchURL,
        onChangeAgentAddress,
        onChangeBaseURL,
        onChangeUserId,
        onChangeCookieEnabled
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export { SearchProvider, SearchContext };
