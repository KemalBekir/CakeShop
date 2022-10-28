import { useCallback, useEffect, useState } from "react";
import * as catalogService from "../../services/catalogServices";
import "./Catalog.css";

const Catalog = () => {
  const [cake, setCake] = useState([]);

  const data = useCallback(() => {
    setCake(catalogService.getAll);
  }, []);
  useEffect(() => {
    data();
  }, [data]);
};

export default Catalog;
