import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import PatientList from "../pages/patientList";

const SearchPage = (props) => {
  const [input, setInput] = useState("");
  const [patientListDefault, setPatientListDefault] = useState();
  const [patientList, setPatientList] = useState();

  const fetchData = async () => {
    return await fetch("https://restpatients.eu/rest/v2/all") //api
      .then((response) => response.json())
      .then((data) => {
        setPatientList(data);
        setPatientListDefault(data);
      });
  };

  const updateInput = async (input) => {
    const filtered = patientListDefault.filter((patient) => {
      return patient.name.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setPatientList(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Patient List</h1>
      <SearchBar input={input} onChange={updateInput} />
      <PatientList patientList={patientList} />
    </>
  );
};

export default SearchPage;