import React, { useState, useEffect } from "react";
import { SelectField } from "../index";
import Parse from "parse";

function SelectArea(props) {
  const [areas, setAreas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getdata = async () => {
    setIsLoading(true);
    const list = [];
    const queryAreas = new Parse.Query(Parse.Object.extend("Area"));
    const data = await queryAreas.find();
    await data.forEach((area) => {
      list.push({
        name: area.attributes.name,
        value: area.id,
      });
    });
    return list;
  };

  useEffect(() => {
    getdata()
      .then((data) => {
        setAreas(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <SelectField
        options={areas}
        {...props}
        isLoading={isLoading}
      ></SelectField>
    </>
  );
}

export default SelectArea;
