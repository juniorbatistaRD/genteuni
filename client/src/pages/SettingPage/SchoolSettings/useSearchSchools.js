import { useEffect, useState, useRef } from "react";
import querySchools from "../../../data/querySchools";

const useSearchSchools = () => {
  const [schools, setSchools] = useState([]);
  const [startFrom, setStartFrom] = useState(0);
  const [query, setQuery] = useState(" ");
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const initialRender = useRef(true);

  useEffect(() => {
    const getSchools = async () => {
      setIsLoading(true);

      const schools = await querySchools
        .fullText("name", query)
        .limit(10)
        .include("country")
        .skip(0)
        .withCount()
        .find();

      setSchools(schools.results);
      setCount(schools.count);
    };

    if (initialRender.current === false) {
      getSchools().finally(() => setIsLoading(false));
    }

    initialRender.current = false;
  }, [query]);

  const loadMoreItems = async () => {
    const schoolData = await querySchools
      .fullText("name", query)
      .limit(10)
      .include("country")
      .withCount()
      .skip(startFrom + 10)
      .find();

    setStartFrom(prev => prev + 10);
    setSchools(prev => {
      return [...prev, ...schoolData.results];
    });
  };

  const reset = () => {
    setCount(0);
    setSchools([]);
    setStartFrom(0);
  };

  return {
    startFrom,
    schools,
    query,
    setQuery,
    count,
    isLoading,
    reset,
    loadMoreItems
  };
};

export default useSearchSchools;
