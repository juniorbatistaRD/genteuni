import React from "react";
import FlexColumn from "../../../components/common/FlexColumn";
import ApplyForJobForm from "./ApplyForJobForm";

const ApplicationsSection = ({ job }) => {
  return (
    <FlexColumn>
      <ApplyForJobForm job={job} />
    </FlexColumn>
  );
};

export default ApplicationsSection;
