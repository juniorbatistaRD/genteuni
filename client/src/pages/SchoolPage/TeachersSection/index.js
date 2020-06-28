import React, { useState } from "react";
import Title from "../../../components/common/Title";
import FlexColumn from "../../../components/common/FlexColumn";
import Button from "../../../components/common/Button";
import swal from "@sweetalert/with-react";
import CreateTeacherForm from "./CreateTeacherForm";
import { getSchoolTeachersWithPagination } from "../../../data/queryTeachers";
import useInfiniteScrolling from "../../../hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroller";
import TeacherListItem from "./TeacherListItem";
import { Formik, Form } from "formik";
import { SelectArea } from "../../../components/formikFields";

const TeachersSection = ({ school }) => {
  const [area, setArea] = useState("");
  const { items, count, startFrom, nextPage } = useInfiniteScrolling({
    query: getSchoolTeachersWithPagination,
    queryData: school,
    user: area,
    perPage: 10,
  });

  return (
    <FlexColumn>
      <Title text="Profesores" />
      <Button
        onClick={() =>
          swal({
            content: <CreateTeacherForm school={school} />,
            buttons: false,
          })
        }
        width="200px"
      >
        Crear Profesor Nuevo
      </Button>
      <Formik initialValues={{ area: "" }}>
        <Form
          onChange={(e) => {
            if (e.target.name === "area") setArea(e.target.value);
          }}
        >
          <SelectArea name="area" placeholder="Todos" />
        </Form>
      </Formik>

      <InfiniteScroll hasMore={startFrom < count} loadMore={nextPage}>
        {items.map((item) => (
          <TeacherListItem
            key={item.id}
            id={item.id}
            name={item.attributes.name}
            area={item.attributes.area.attributes.name}
          />
        ))}
      </InfiniteScroll>
    </FlexColumn>
  );
};

export default TeachersSection;
