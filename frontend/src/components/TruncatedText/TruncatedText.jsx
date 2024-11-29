import React, { useEffect, useState } from "react";

const TruncatedText = ({ text, limit }) => {
  const [truncate, settruncate] = useState("");

  useEffect(() => {
    text.length > limit
      ? settruncate(text.substring(0, limit) + "...")
      : settruncate(text);
  }, [text]);

  const handleclick = (e) => {
    settruncate(text);
  };

  return (
    <p onClick={handleclick} style={{ cursor: "pointer" }}>
      {truncate}
    </p>
  );
};

export default TruncatedText;
