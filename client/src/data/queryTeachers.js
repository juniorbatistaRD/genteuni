import Parse from "parse";

const Teacher = Parse.Object.extend("Teacher");
const Area = Parse.Object.extend("Area");
const query = new Parse.Query(Teacher);

export const saveTeacher = async ({ name, area, school }) => {
  const teacher = new Teacher();
  const queryArea = new Parse.Query(Area);

  const fetchedArea = await queryArea.get(area);

  teacher.set("name", name);
  teacher.set("area", fetchedArea);
  teacher.set("school", school);

  return await teacher.save();
};

export const getTeacherById = async (id) => {
  const query = new Parse.Query(Teacher);
  query.include("school");
  query.include("area");

  const result = await query.get(id);

  return result;
};

export const getSchoolTeachersWithPagination = async ({
  startFrom,
  queryData,
  perPage,
  user,
}) => {
  const query = new Parse.Query(Teacher);
  const queryArea = new Parse.Query("Area");

  if (user) {
    const areaResult = await queryArea.get(user);
    query.equalTo("area", areaResult);
  }

  query.equalTo("school", queryData);
  query.skip(startFrom);
  query.include("area");
  query.include("createdBy");
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export default query;
