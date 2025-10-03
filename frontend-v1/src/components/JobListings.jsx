import JobListing from "./JobListing";
import { useState, useEffect } from "react";


const JobListings = () => {

  const [jobs, setJobs] = useState([])

  const fetchJobs = async () => {
    console.log("fetched")
    try {
      const response = await fetch('/api/jobs', {
      }
      );
      if (!response.ok) {
        throw new Error('Counld not fetch jobs');
      }
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      console.error(err)
    }

  }
  useEffect(() => {

    fetchJobs();
  }, []);
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobListing key={job.id} job={job} />

      ))}

    </div>
  );
};

export default JobListings;