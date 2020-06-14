import React from "react";
import Rate from "react-rater";
import "react-rater/lib/react-rater.css";
import Star from "./Star";

const Rater = ({ name, setValue, value, interactive, size, ...props }) => {
  return (
    <div>
      <Rate
        interactive={interactive}
        onRate={({ rating }) => setValue(name, rating)}
        total={5}
        rating={value}
      >
        <Star size={size} />
      </Rate>
    </div>
  );
};

Rater.defaultProps = {
  interactive: true,
};

export default Rater;
