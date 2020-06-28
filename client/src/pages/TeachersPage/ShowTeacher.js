import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FlexColumn from "../../components/common/FlexColumn";
import FlexRow from "../../components/common/FlexRow";
import Title from "../../components/common/Title";
import GoBackButton from "../../components/GoBackButton";
import { getTeacherById } from "../../data/queryTeachers";
import Text from "../../components/common/Text";
import { ReactComponent as SchoolIcon } from "../../assets/icons/school.svg";
import { ReactComponent as FlaskIcon } from "../../assets/icons/flask.svg";

const ShowTeacher = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await getTeacherById(id);

      setTeacher(result);
      setIsLoading(false);
    };

    getData();
  }, []);

  !isLoading && console.log(teacher.attributes.area);
  return (
    <FlexColumn>
      {!isLoading && (
        <>
          <FlexRow alignItems="center">
            <GoBackButton />

            <FlexColumn>
              <Title text={teacher.attributes.name} />
            </FlexColumn>
          </FlexRow>
          <FlexColumn>
            <FlexRow>
              <SchoolIcon width="25px" height="25px" />
              <Title
                margin="0px 0px 0px 10px"
                text={teacher.attributes.school.attributes.name}
                typeStyle="secondary"
              />
            </FlexRow>
            <FlexRow>
              <FlaskIcon width="20px" height="20px" />
              <Title
                margin="0px 0px 0px 10px"
                text={teacher.attributes.area.attributes.name}
                typeStyle="secondary"
              />
            </FlexRow>
          </FlexColumn>
        </>
      )}
    </FlexColumn>
  );
};

export default ShowTeacher;
