import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import * as catalogService from "../services/catalogServices";

export const CakesContext = createContext();

export const CakesProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    catalogService.getAll().then((result) => setCakes(result));
    setLoading(false);
  }, []);

  const selectedCake = (cakeId) => {
    return cakes.find((x) => x._id === cakeId) || {};
  };

  return (
    <CakesContext.Provider
      value={{
        cakes,
        selectedCake,
        isLoading,
      }}
    >
      {children}
    </CakesContext.Provider>
  );
};
