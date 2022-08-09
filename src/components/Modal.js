import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../store/slices/modal.slice";
import "../styles/Modal.css";
import React from "react";

const Modal = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.modal);
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
            className="modalBackdrop"
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
            className="modalBackdrop__content"
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
              className="modal__content"
            >
              <button className="btn" onClick={() => dispatch(setModal(null))}>
                <i className="bx bx-x"></i>
              </button>
              <div className="modal-info">
                <div>
                  <h2>{data.name}</h2>
                  <span>
                    <span></span>
                    {data.status + "-" + data.species}
                  </span>
                </div>
                <img src={data.image} alt="" />
              </div>
              <div className="modal-data-character">
                <h5>Origen:</h5>
                <p>{data.origin.name}</p>
                <h5>Ultima ubicacion conocida:</h5>
                <p>{data.location.name}</p>
                <h5>Episodios donde aparece:</h5>
                <p>{data.episode.length}</p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
