import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import Title from "../../../components/common/Title";
import { TextField, ErrorMessage } from "../../../components/formikFields";
import Button from "../../../components/common/Button";
import SchoolItem from "./SchoolItem";
import * as Yup from "yup";
import "./custom.css";
import useSearchSchool from "./useSearchSchools";
import Spinner from "../../../components/common/Spinner";
import { ReactComponent as MoonIlustration } from "../../../assets/images/moon.svg";
import { ReactComponent as EmptyIlustration } from "../../../assets/images/empty.svg";
import { useNavigate } from "react-router-dom";
import FlexRow from "../../../components/common/FlexRow";
import GoBackButton from "../../../components/GoBackButton";

function SchoolSettings() {
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();
  const {
    count,
    startFrom,
    query,
    setQuery,
    isLoading,
    schools,
    reset,
    loadMoreItems,
  } = useSearchSchool();

  const onSubmit = (values) => {
    //avoid rerendering and refetching if query is the same
    if (values.search !== query) {
      reset();
      setTouched(true);
      setQuery(() => values.search);
    }
  };

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className={styles.container}
    >
      <FlexRow>
        <GoBackButton />
        <Title text="Escuela" className={styles.title} />
      </FlexRow>
      <Formik
        initialValues={{
          search: "",
        }}
        onSubmit={onSubmit}
        validationSchema={Yup.object({
          search: Yup.string()
            .min("1")
            .required("Necesitas especificar el nombre"),
        })}
      >
        <Form className={styles.form}>
          <div className={styles.input}>
            <TextField
              name="search"
              width="200px"
              placeholder="Busca tu escuela"
            />
            <ErrorMessage name="search" />
          </div>
          <Button type="submit" margin="0px 0px 0px 10px">
            Buscar
          </Button>
        </Form>
      </Formik>

      <div className={styles.results}>
        {schools.length > 0 ? (
          <InfiniteScroll
            className={styles.infiniteScroller}
            pageStart={startFrom}
            loadMore={loadMoreItems}
            hasMore={startFrom + 10 < count}
            loader={
              <div className="loader" key={0}>
                Cargando ...
              </div>
            }
          >
            {schools.map((school, index) => (
              <SchoolItem key={index} school={school} />
            ))}

            {!(startFrom + 10 < count) && (
              <div className={styles.addSchoolCallToAction}>
                No encontraste tu escuela? Agregala!
                <Button onClick={() => navigate("add")}>Agregar Escuela</Button>
              </div>
            )}
          </InfiniteScroll>
        ) : (
          <div className={styles.noResults}>
            {isLoading ? (
              <div>
                <Title
                  text="Cargando..."
                  typeStyle="secondary"
                  fontSize="16px"
                />
                <Spinner />
              </div>
            ) : touched ? (
              <div className={styles.initialBox}>
                <Title text="No pudimos encontrar nada :(" fontSize="16px" />
                <Title text="Intenta con otras palabras" fontSize="16px" />
                <EmptyIlustration width="200px" height="200px" />
                <Button onClick={() => navigate("add")}>Agregar Escuela</Button>
              </div>
            ) : (
              <div className={styles.initialBox}>
                <Title text="Vamos a buscar!" fontSize="16px" />
                <MoonIlustration width="200px" height="200px" />
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default SchoolSettings;
