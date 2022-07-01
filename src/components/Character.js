import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { setModal } from "../store/slices/modal.slice";
import Pagination from "./Pagination";
import "../styles/Characters.css";

const Character = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getNewData = (number) => {
    if (number === 1) {
      getData();
    } else {
      axios
        .get(`https://rickandmortyapi.com/api/character?page=${number}`)
        .then((res) => setData(res.data));
    }
  };

  const getData = () => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((res) => setData(res.data));
  };

  return (
    <div className="character">
      <h2>Personajes</h2>
      <ul>
        {data.results?.map((character) => (
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={character.id}
            onClick={() => dispatch(setModal(character))}
          >
            <img src={character.image} alt={character.name} />
          </motion.li>
        ))}
      </ul>
      <Pagination totalCards={826} getNewData={getNewData} />
    </div>
  );
};

export default Character;
