import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalLocation } from "../store/slices/modalLocation.slice";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/ModalLocation.css";
import CardResident from "./CardResident";

const ModalLocation = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.modalLocation);

  return (
    <AnimatePresence>
      {data !== null && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
            }}
            className="modal-backdrop-location"
          />
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              scale: 0,
            }}
            className="modal-content-wrapper-location"
          >
            <motion.div
              initial={{
                x: 100,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  delay: 0.2,
                  duration: 0.3,
                },
              }}
              exit={{
                x: 100,
                opacity: 0,
              }}
              className="modal-content-location"
            >
              <button
                className="btn"
                onClick={() => dispatch(setModalLocation(null))}
              >
                <i className="bx bx-x"></i>
              </button>
              <div className="modal-info-location">
                <h2>{data.name}</h2>
                <ul>
                  <li>Tipo de ubicacion: {data.type}</li>
                  <li>Dimension: {data.dimension}</li>
                  <li>Cantidad de residentes: {data.residents.length}</li>
                </ul>
              </div>
              <ul className="modal-data-img-residents">
                {data.residents.length === 0 ? (
                  <>
                    <img
                      src="http://assets.stickpng.com/images/58f37726a4fa116215a92410.png"
                      alt="Rick"
                      className="location-empty"
                    />
                    <h4>Esta ubicacion no tiene residentes</h4>
                  </>
                ) : (
                  data.residents?.map((resident) => (
                    <CardResident link={resident} key={resident} />
                  ))
                )}
              </ul>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalLocation;
