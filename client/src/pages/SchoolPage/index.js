import React, { useEffect, useState } from "react";
import { useParams, Route, Routes } from "react-router";
import { getSchoolById } from "../../data/querySchools";
import FlexColumn from "../../components/common/FlexColumn";
import Spinner from "../../components/common/Spinner";
import HeaderSchool from "./components/HeaderSchool";
import TabsMenu from "../../components/common/TabsMenu";
import styles from "./index.module.css";
import Text from "../../components/common/Text";
import { ReactComponent as PinIcon } from "../../assets/icons/pin.svg";
import FlexRow from "../../components/common/FlexRow";
import { ReactComponent as StudentIcon } from "../../assets/icons/student.svg";
import { ReactComponent as ChainIcon } from "../../assets/icons/chain.svg";
import ReviewsSection from "./ReviewsSection";
import MemebersSection from "./MembersSection";
import TeachersSection from "./TeachersSection";
import QuestionsSection from "./QuestionsSection";

const SchoolPage = () => {
  const { id } = useParams();
  const [school, setSchool] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await getSchoolById(id);
      setSchool(result);
      setIsLoading(false);
    };

    getData();
  }, [id]);

  return (
    <FlexColumn>
      {isLoading ? (
        <Spinner />
      ) : (
        <FlexColumn>
          <FlexColumn className={styles.headerContainer}>
            <HeaderSchool text={school.attributes.name} />
            <ul className={styles.infoList}>
              <li>
                <FlexRow alignItems="center">
                  <StudentIcon className={styles.icon} />
                  <Text
                    text={
                      school.attributes.isHighSchool
                        ? "Secundaria"
                        : "Universidad"
                    }
                  />
                </FlexRow>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={school.attributes.website}
                  style={{ textDecoration: "none" }}
                >
                  <FlexRow alignItems="center">
                    <ChainIcon className={styles.icon} />
                    <Text
                      text={school.attributes.website.replace(
                        /(http:\/\/|https:\/\/)/i,
                        ""
                      )}
                    />
                  </FlexRow>
                </a>
              </li>
              <li>
                <FlexRow alignItems="center">
                  <PinIcon className={styles.icon} />
                  <Text text={school.attributes.country.attributes.name} />
                </FlexRow>
              </li>
            </ul>
            <TabsMenu
              options={[
                { link: "./", name: "Inicio" },
                { link: "./reviews", name: "Reviews" },
                { link: "./teachers", name: "Profesores" },
                { link: "./questions", name: "Preguntas" },
                { link: "./members", name: "Miembros" },
                { link: "./crushes", name: "UniCrush" },
              ]}
            />
          </FlexColumn>
          <Routes>
            <Route
              path="reviews"
              element={<ReviewsSection school={school} />}
            />
            <Route
              path="members"
              element={<MemebersSection school={school} />}
            />
            <Route
              path="teachers"
              element={<TeachersSection school={school} />}
            />
            
            <Route
              path="questions"
              element={<QuestionsSection school={school} />}
            />
          </Routes>
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default SchoolPage;
