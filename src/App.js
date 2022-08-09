import {
  Header,
  Character,
  Location,
  Modal,
  ModalLocation,
} from "./components";
import { useSelector } from "react-redux";
import "./styles/App.css";

function App() {
  const typeData = useSelector((state) => state.typeData);

  return (
    <>
      <Modal />
      <ModalLocation />
      <Header />
      <main>{typeData === "character" ? <Character /> : <Location />}</main>
    </>
  );
}

export default App;
