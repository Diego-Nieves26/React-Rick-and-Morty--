import axios from "axios";
import React, { useEffect, useState } from "react";

const CardResident = ({ link }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(link).then((res) => setData(res.data));
  }, [link]);
  return (
    <li>
      <img src={data.image} alt={data.name} />
    </li>
  );
};

export default CardResident;
