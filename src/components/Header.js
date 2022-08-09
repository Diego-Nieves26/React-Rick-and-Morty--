import { setModalLocation } from "../store/slices/modalLocation.slice";
import { setIsLocation } from "../store/slices/typeData.slice";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../store/slices/modal.slice";
import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/Header.css";
import axios from "axios";

const Header = () => {
  const [suggestionSearch, setSuggestionSearch] = useState([]);
  const typeData = useSelector((state) => state.typeData);
  const [inputSearch, setInputSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [searchId, setSearchId] = useState(1);
  const dispatch = useDispatch();

  const search = (e) => {
    setInputSearch(e.target.value);
    if (e.target.value === "") return setSuggestionSearch([]);
    if (typeData === "character") {
      axios
        .get(
          `https://rickandmortyapi.com/api/character/?name=${e.target.value}`
        )
        .then((res) => setSuggestionSearch(res.data.results.slice(0, 6)));
    } else {
      axios
        .get(`https://rickandmortyapi.com/api/location/?name=${e.target.value}`)
        .then((res) => setSuggestionSearch(res.data.results.slice(0, 6)));
    }
  };

  const selectedSearch = (suggestion) => {
    setSuggestionSearch([]);
    setInputSearch(suggestion.name);
    setSearchId(suggestion.id);
  };

  const searchById = (e) => {
    e.preventDefault();
    setOpenMenu(false);
    if (typeData === "character") {
      axios
        .get(`https://rickandmortyapi.com/api/character/${searchId}`)
        .then((res) => dispatch(setModal(res.data)));
    } else {
      axios
        .get(`https://rickandmortyapi.com/api/location/${searchId}`)
        .then((res) => dispatch(setModalLocation(res.data)));
    }
    setInputSearch("");
  };

  return (
    <header className="header">
      <div className="header__div">
        <h1>Rick and Morty</h1>
      </div>
      <nav className="nav">
        <button
          className="btn nav__button--menu"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <i className={`bx ${openMenu ? "bx-x" : "bx-menu"}`}></i>
        </button>
        <div className={`nav__div ${openMenu ? "open-menu" : "close-menu"}`}>
          <select
            className="nav__div__select"
            onChange={(e) => dispatch(setIsLocation(e.target.value))}
          >
            <option value="character">Personajes</option>
            <option value="location">Ubicaciones</option>
          </select>
          <div className="nav__div__div">
            <form className="navForm" onSubmit={searchById}>
              <input
                type="text"
                placeholder="Buscar"
                onChange={(e) => search(e)}
                value={inputSearch}
                className="navForm__input"
              />
              <button className="btn navForm__button">
                <i className="bx bx-search bx-tada"></i>
              </button>
            </form>
            <section className="nav__div__div--section">
              {suggestionSearch?.map((suggestion) => (
                <motion.h6
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                  key={suggestion.id}
                  onClick={() => selectedSearch(suggestion)}
                >
                  {suggestion.name}
                </motion.h6>
              ))}
            </section>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
