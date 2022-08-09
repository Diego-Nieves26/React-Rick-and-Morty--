import { setModalLocation } from "../store/slices/modalLocation.slice";
import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import Pagination from "./Pagination";
import "../styles/Location.css";
import axios from "axios";

const Location = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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
        .get(`https://rickandmortyapi.com/api/location?page=${number}`)
        .then((res) => setData(res.data))
        .finally(() => setTimeout(() => setLoading(false), 3000));
    }
  };

  const getData = () => {
    setLoading(true);
    axios
      .get("https://rickandmortyapi.com/api/location")
      .then((res) => setData(res.data))
      .finally(() => setTimeout(() => setLoading(false), 3000));
  };

  const loader = () => {
    return (
      <div className="location">
        <h2 className="location__h2">Location</h2>
        <section className="locationList">
          {data.results?.map((location) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={location.id}
              onClick={() => dispatch(setModalLocation(location))}
              className="locationList__div"
            >
              <h3 className="locationList__div__h3">
                <Skeleton
                  width={270}
                  height={25}
                  borderRadius={10}
                  baseColor="#232222"
                  highlightColor="#c1324f"
                />
              </h3>
              <ul className="locationList__div__ul">
                <li>
                  <Skeleton
                    width={80}
                    height={25}
                    borderRadius={10}
                    baseColor="#232222"
                    highlightColor="#c1324f"
                  />
                </li>
                <li>
                  <Skeleton
                    width={80}
                    height={25}
                    borderRadius={10}
                    baseColor="#232222"
                    highlightColor="#c1324f"
                  />
                </li>
                <li>
                  <Skeleton
                    width={80}
                    height={25}
                    borderRadius={10}
                    baseColor="#232222"
                    highlightColor="#c1324f"
                  />
                </li>
              </ul>
            </motion.div>
          ))}
        </section>
        <Pagination totalCards={126} getNewData={getNewData} />
      </div>
    );
  };

  if (loading) {
    return loader();
  } else {
    return (
      <div className="location">
        <h2 className="location__h2">Location</h2>
        <section className="locationList">
          {data.results?.map((location) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={location.id}
              onClick={() => dispatch(setModalLocation(location))}
              className="locationList__div"
            >
              <h3 className="locationList__div__h3">{location.name}</h3>
              <ul className="locationList__div__ul">
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
  }
};

export default Location;
