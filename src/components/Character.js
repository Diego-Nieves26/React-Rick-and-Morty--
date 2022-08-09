import { setModal } from "../store/slices/modal.slice";
import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import Pagination from "./Pagination";
import "../styles/Characters.css";
import axios from "axios";

const Character = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const getNewData = (number) => {
    setLoading(true);
    if (number === 1) {
      getData();
    } else {
      axios
        .get(`https://rickandmortyapi.com/api/character?page=${number}`)
        .then((res) => setData(res.data))
        .finally(() => setTimeout(() => setLoading(false), 3000));
    }
  };

  const getData = () => {
    setLoading(true);
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((res) => setData(res.data))
      .finally(() => setTimeout(() => setLoading(false), 3000));
  };

  const loader = () => {
    return (
      <div className="character">
        <h2 className="character__h2">Personajes</h2>
        <ul className="characterList">
          {data.results?.map((character) => (
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={character.id}
              onClick={() => dispatch(setModal(character))}
              className="characterList__li"
            >
              <Skeleton
                width={150}
                height={150}
                borderRadius={10}
                baseColor="#232222"
                highlightColor="#c1324f"
              />
            </motion.li>
          ))}
        </ul>
        <Pagination totalCards={826} getNewData={getNewData} />
      </div>
    );
  };

  if (loading) {
    return loader();
  } else {
    return (
      <div className="character">
        <h2 className="character__h2">Personajes</h2>
        <ul className="characterList">
          {data.results?.map((character) => (
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={character.id}
              onClick={() => dispatch(setModal(character))}
              className="characterList__li"
            >
              <img
                className="characterList__li--img"
                src={character.image}
                alt={character.name}
              />
            </motion.li>
          ))}
        </ul>
        <Pagination totalCards={826} getNewData={getNewData} />
      </div>
    );
  }
};

export default Character;
