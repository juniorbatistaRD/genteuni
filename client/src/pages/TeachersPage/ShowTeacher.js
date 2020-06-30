import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import FlexColumn from "../../components/common/FlexColumn";
import FlexRow from "../../components/common/FlexRow";
import Title from "../../components/common/Title";
import GoBackButton from "../../components/GoBackButton";
import { getTeacherById } from "../../data/queryTeachers";
import { ReactComponent as SchoolIcon } from "../../assets/icons/school.svg";
import { ReactComponent as FlaskIcon } from "../../assets/icons/flask.svg";
import ReviewAvgTeacher from "./components/ReviewAvgTeacher";
import ReviewTeacherForm from "./components/ReviewTeacherForm";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../../components/common/Button";
import useInfiniteScrolling from "../../hooks/useInfinteScrolling";
import { getTeacherReviewsWithPagination } from "../../data/queryTeachersReviews";
import InfiniteScroll from "react-infinite-scroller";
import Review from "../../components/Review";

const ShowTeacher = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const {
    items,
    startFrom,
    count,
    reloadData,
    nextPage,
  } = useInfiniteScrolling({
    query: getTeacherReviewsWithPagination,
    queryData: teacher,
    perPage: 10,
  });

  useEffect(() => {
    const getData = async () => {
      const result = await getTeacherById(id);

      setTeacher(result);
      setIsLoading(false);
    };

    getData();
  }, [id]);

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
              <Link
                to={`/app/school/${teacher.attributes.school.id}/`}
                style={{ textDecoration: "none" }}
              >
                <Title
                  margin="0px 0px 0px 10px"
                  text={teacher.attributes.school.attributes.name}
                  typeStyle="secondary"
                />
              </Link>
            </FlexRow>
            <FlexRow>
              <FlaskIcon width="20px" height="20px" />
              <Title
                margin="0px 0px 0px 10px"
                text={teacher.attributes.area.attributes.name}
                typeStyle="secondary"
              />
            </FlexRow>
            <ReviewAvgTeacher teacher={teacher} />
            {currentUser ? (
              <ReviewTeacherForm teacher={teacher} reloadData={reloadData} />
            ) : (
              <FlexRow>
                <Button onClick={() => navigate("/")}>
                  Inicia Sesion para dejar tu opinion
                </Button>
              </FlexRow>
            )}

            <InfiniteScroll
              hasMore={startFrom < count}
              loadMore={nextPage}
              loader={"Cargando..."}
            >
              {items.map((item) => (
                <Review
                  date={item.attributes.createdAt}
                  rating={item.attributes.rating}
                  user={item.attributes.createdBy}
                />
              ))}
            </InfiniteScroll>
          </FlexColumn>
        </>
      )}
    </FlexColumn>
  );
};

export default ShowTeacher;
