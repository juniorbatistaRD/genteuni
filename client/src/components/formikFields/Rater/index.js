import React from "react";
import Rate from "react-rater";
import "react-rater/lib/react-rater.css";
import Star from "./Star";

const Rater = ({ name, setValue, value, ...props }) => {
  return (
    <div>
      <Rate
        onRate={({ rating }) => setValue(name, rating)}
        total={5}
        rating={value}
      >
        <Star />
      </Rate>
    </div>
  );
};

export default Rater;
