import Parse from "parse";

const JobApplication = Parse.Object.extend("JobApplication");
export const query = new Parse.Query(JobApplication);

export const saveJobApplication = ({ text, job }) => {
  const jobApplication = new JobApplication();
  jobApplication.set("text", text);
  jobApplication.set("job", job);
  return jobApplication.save();
};

export const getApplicationsWithPagination = async ({
  startFrom,
  queryData,
  perPage,
}) => {
  const query = new Parse.Query(JobApplication);
  query.equalTo("job", queryData);
  query.skip(startFrom);
  query.includeAll();
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export const chackIfUserApplied = async (job, user) => {
  const query = new Parse.Query(JobApplication);
  query.equalTo("createdBy", user);
  query.equalTo("job", job);
  const result = await query.count();

  return result > 0 ? true : false;
};
