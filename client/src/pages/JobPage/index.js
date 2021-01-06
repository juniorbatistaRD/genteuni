import React, { useContext, useState } from "react";
import styles from "./JobPage.module.css";
import FlexColumn from "../../components/common/FlexColumn";
import FlexRow from "../../components/common/FlexRow";
import Title from "../../components/common/Title";
import GoBackButton from "../../components/GoBackButton";
import useInfiniteScrolling from "../../hooks/useInfinteScrolling";
import { getJobsWithPagination } from "../../data/queryJobs";
import JobHeader from "../../components/JobHeader";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../../components/common/Spinner";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { SelectArea, SelectCountry } from "../../components/formikFields";
import Text from "../../components/common/Text";
import { AuthContext } from "../../contexts/AuthContext";

function JobPage() {
  const navigate = useNavigate();
  const [area, setArea] = useState();
  const [country, setCountry] = useState();
  const { currentUser } = useContext(AuthContext);
  const { items, isLoading, nextPage, count, startFrom } = useInfiniteScrolling(
    {
      query: getJobsWithPagination,
      perPage: 10,
      queryData: area,
      user: country,
    }
  );

  return (
    <FlexColumn>
      <FlexRow alignItems="center">
        <GoBackButton />
        <Title text="Trabajos" />
      </FlexRow>
      <FlexRow alignItems="center">
        {currentUser && (
          <Button onClick={() => navigate("/app/job/create")}>
            Publicar Trabajo
          </Button>
        )}
        <Formik initialValues={{ area: "" }}>
          <Form
            onChange={(e) => {
              if (e.target.name === "area") setArea(e.target.value);
              if (e.target.name === "country") setCountry(e.target.value);
            }}
          >
            <FlexRow alignItems="center" margin="10px 10px">
              <p>Area:</p>
              <SelectArea
                name="area"
                placeholder="Todos"
                styles={{ width: "100%" }}
              />
              <p>Pais:</p>
              <SelectCountry
                name="country"
                placeholder="Todos"
                styles={{ width: "100%" }}
              />
            </FlexRow>
          </Form>
        </Formik>
      </FlexRow>

      <InfiniteScroll
        loadMore={nextPage}
        loader={<Spinner />}
        hasMore={startFrom < count}
      >
        {items.map((item) => (
          <JobHeader job={item} listItem={true} key={item.id} />
        ))}
      </InfiniteScroll>

      {!isLoading && count < 1 && <p>No hay trabajos disponibles</p>}
    </FlexColumn>
  );
}

export default JobPage;
