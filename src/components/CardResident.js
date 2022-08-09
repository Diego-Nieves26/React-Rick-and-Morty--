import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

const CardResident = ({ link }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(link).then((res) => setData(res.data));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [link]);

  const loader = () => {
    return (
      <li>
        <Skeleton
          width={120}
          height={120}
          borderRadius={10}
          baseColor="#232222"
          highlightColor="#c1324f"
        />
      </li>
    );
  };

  if (loading) {
    return loader();
  } else {
    return (
      <li>
        <img src={data.image} alt={data.name} />
      </li>
    );
  }
};

export default CardResident;
