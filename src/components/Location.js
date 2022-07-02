import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setModalLocation } from "../store/slices/modalLocation.slice";
import Pagination from "./Pagination";
import { motion } from "framer-motion";
import "../styles/Location.css";

const Location = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getNewData = (number) => {
    if (number === 1) {
      getData();
    } else {
      axios
        .get(`https://rickandmortyapi.com/api/location?page=${number}`)
        .then((res) => setData(res.data));
    }
  };

  const getData = () => {
    axios
      .get("https://rickandmortyapi.com/api/location")
      .then((res) => setData(res.data));
  };
  return (
    <div className="location">
      <h2>Location</h2>
      <section>
        {data.results?.map((location) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={location.id}
            onClick={() => dispatch(setModalLocation(location))}
          >
            <h3>{location.name}</h3>
            <ul>
              <li>{location.type}</li>
              <li>{location.dimension}</li>
              <li>{location.residents.length}</li>
            </ul>
          </motion.div>
        ))}
      </section>
      <Pagination totalCards={126} getNewData={getNewData} />
    </div>
  );
};

export default Location;
