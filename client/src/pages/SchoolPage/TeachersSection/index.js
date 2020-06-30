import React, { useState, useContext } from "react";
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
import Text from "../../../components/common/Text";
import FlexRow from "../../../components/common/FlexRow";
import { ReactComponent as EmptyIlustration } from "../../../assets/images/empty.svg";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const TeachersSection = ({ school }) => {
  const [area, setArea] = useState("");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    items,
    count,
    startFrom,
    nextPage,
    isLoading,
    reloadData,
  } = useInfiniteScrolling({
    query: getSchoolTeachersWithPagination,
    queryData: school,
    user: area,
    perPage: 10,
  });

  return (
    <FlexColumn>
      <Title text="Profesores" />
      {currentUser ? (
        <Button
          onClick={() =>
            swal({
              content: (
                <CreateTeacherForm school={school} reloadData={reloadData} />
              ),
              buttons: false,
            })
          }
          width="200px"
        >
          Crear Profesor Nuevo
        </Button>
      ) : (
        <FlexRow>
          <Button onClick={() => navigate("/")}>
            Inicia sesion para agregar profesores
          </Button>
        </FlexRow>
      )}

      <Formik initialValues={{ area: "" }}>
        <Form
          onChange={(e) => {
            if (e.target.name === "area") setArea(e.target.value);
          }}
        >
          <FlexRow alignItems="center" margin="10px 10px">
            <Text text="Area:" />
            <SelectArea name="area" placeholder="Todos" />
          </FlexRow>
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

      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="auto">
          <Title text="No se encontro ningun profesor" fontSize="16px" />
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default TeachersSection;
