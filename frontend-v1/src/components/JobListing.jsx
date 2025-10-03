import { Link } from "react-router-dom";

const JobListing = ({job}) => {

  
  return (
    <div className="job-preview">
      <Link to={`/jobs/${job.id}`}>
        <h2>{job.title}</h2>
      </Link>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company.name}</p>
      <p>Type: {job.company.contactEmail}</p>
      <p>Type: {job.company.contactPhone}</p>
      <p>Type: {job.company.website}</p>
      <p>Size: {job.company.size}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}</p>
      <p>Experience level: {job.experienceLevel}</p>
      <p>Posted: {job.postedDate}</p>
      <p>Status: {job.status}</p>
      <p>Application deadline: {job.applicationDeadline}</p>
      <p>Requirements: {job.requirements}</p>
    </div>
  );
};

export default JobListing;