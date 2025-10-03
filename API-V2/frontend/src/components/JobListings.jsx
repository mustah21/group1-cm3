import JobListing from "./JobListing";
import { useState, useEffect } from "react";


const JobListings = () => {

  const [jobs, setJobs] = useState([])
  

  
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : null;

    const fetchJobs = async () => {
        console.log("fetched")
        try{
          const response = await fetch('/api/jobs',{
            headers: {
              Authorization: `Bearer ${token}`
            }}
          );
          if(!response.ok){
            throw new Error('Counld not fetch jobs');
          }
          const data = await response.json();
          //setIsPending(false);
          setJobs(data);
          //setError(null);
        }catch(err){
          //setIsPending(false);
          console.error(err)
          //setError(err.message);
        }
        // setTimeout(() => {
        //   fetchJobs()
        // }, 1000);
        
      }
  useEffect(()=> {
      
    fetchJobs();
  }, []);
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobListing key={job.id} job={job}/>

      ))}
      
    </div>
  );
};

export default JobListings;
