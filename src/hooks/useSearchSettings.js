import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

const useSearchSettings = () => useContext(SearchContext);

export default useSearchSettings;
