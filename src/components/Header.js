import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setIsLocation } from "../store/slices/typeData.slice";
import { setModal } from "../store/slices/modal.slice";
import "../styles/Header.css";
import axios from "axios";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

const Header = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const typeData = useSelector((state) => state.typeData);

  const [suggestionSearch, setSuggestionSearch] = useState([]);

  const search = (e) => {
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

  const selectedSearch = (id) => {
    setOpenMenu(false);
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => dispatch(setModal(res.data)));
  };

  return (
    <header>
      <div>
        <h1>Rick and Morty</h1>
      </div>
      <nav>
        <button
          className="btn btnOpenMenu"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <i className={`bx ${openMenu ? "bx-x" : "bx-menu"}`}></i>
        </button>
        <motion.div
          animate={openMenu ? "open" : "closed"}
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <select onChange={(e) => dispatch(setIsLocation(e.target.value))}>
            <option value="character">Personajes</option>
            <option value="location">Ubicaciones</option>
          </select>
          <form>
            <input
              type="text"
              placeholder="Buscar"
              onChange={(e) => search(e)}
            />
            <button className="btn btnSearch">
              <i className="bx bx-search bx-tada"></i>
            </button>
          </form>
          <section>
            {suggestionSearch?.map((suggestion) => (
              <motion.h6
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                key={suggestion.id}
                onClick={() => selectedSearch(suggestion.id)}
              >
                {suggestion.name}
              </motion.h6>
            ))}
          </section>
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;
