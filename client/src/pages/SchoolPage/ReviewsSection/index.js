import React from "react";
import Title from "../../../components/common/Title";
import ReviewForm from "./ReviewForm";

const ReviewsSection = ({ school }) => {
  return (
    <div>
      <Title text="Reviews" margin="10px" />
      <ReviewForm school={school} />
    </div>
  );
};

export default ReviewsSection;
