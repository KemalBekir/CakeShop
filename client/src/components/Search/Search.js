import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Search.css";
import * as catalogService from "../../services/catalogServices";
import CatalogCard from "../CatalogCard/CatalogCard";

const Search = () => {
  const [cakes, setCakes] = useState([]);
  const [isSearching, setSearching] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const query = searchParams.get("name") || "";

  const handleSearchTerm = (e) => {
    e.preventDefault();
    const name = e.target.value;

    if (name) {
      setSearchParams({ name });
      setSearchTerm(name);
    } else {
      setSearchParams({});
      setSearchTerm("");
      setSearching(false);
    }
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (query) {
      setTimeout(() => {
        catalogService.search(searchTerm).then((result) => setCakes(result));
        setSearching(true);
      }, 600);
      //   setLoading(false);
    } else if (searchTerm.length === 0) {
      catalogService.getAll().then((result) => setCakes(result));
    }
  };
  return (
    <>
      <section className="search-section">
        <div className="search-container">
          <form
            className="search-search-container"
            method="get"
            onSubmit={submitSearch}
          >
            <input
              className="search-search"
              type="text"
              placeholder="Search by Name or Type"
              name="text"
              value={searchTerm}
              onChange={handleSearchTerm}
            ></input>
            <button className="search-search-btn">Search</button>
          </form>
          {isSearching ? (
            <div className="search-result-container">
              <h2 className="search-title">Search Results</h2>
              {cakes.length > 0 ? (
                cakes.map((x) => <CatalogCard key={x._id} cake={x} />)
              ) : (
                <h3
                  style={{
                    color: "black",
                    textAlign: "center",
                    width: "100%",
                    fontSize: "2rem",
                  }}
                >
                  No results found
                </h3>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default Search;
