import React, { useState, useEffect } from "react";
import { SelectField } from "../index";
import Parse from "parse";

function SelectCountry(props) {
  const [countries, setCountries] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getdata = async () => {
    setIsLoading(true);
    const list = [];
    const queryCountries = new Parse.Query(Parse.Object.extend("Country"));
    const data = await queryCountries.find();
    await data.forEach((country) => {
      list.push({
        name: country.attributes.name,
        value: country.id,
      });
    });
    return list;
  };

  useEffect(() => {
    getdata()
      .then((data) => {
        setCountries(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <SelectField
        options={countries}
        {...props}
        isLoading={isLoading}
      ></SelectField>
    </>
  );
}

export default SelectCountry;
