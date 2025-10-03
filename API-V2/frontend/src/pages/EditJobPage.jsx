import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
    const [job, setJob] = useState(null); // Initialize job state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const { id } = useParams();

    // Variables for the form
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [website, setWebsite] = useState('');
    const [size, setSize] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('Entry');
    const [postedDate, setPostedDate] = useState('');
    const [status, setStatus] = useState('open');
    const [applicationDeadline, setApplicationDeadLine] = useState(''); 
    const [requirements, setRequirements] = useState('');

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

    const updateJob = async (job) => {
        try {
            const response = await fetch(`/api/jobs/${job.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(job),
            });
            if (!response.ok) throw new Error("Failed to update job");
            return response.ok;
        } catch (error) {
            console.error("Error updating job: ", error);
            return false;
        }
    };

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`/api/jobs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Response not OK")
                }
                const data = await response.json();
                setJob(data)

                setTitle(data.title)
                setType(data.type);
                setDescription(data.description);
                setCompanyName(data.company.name);
                setContactEmail(data.company.contactEmail);
                setContactPhone(data.company.contactPhone);
                setWebsite(data.company.website)
                setSize(data.company.size)
                setLocation(data.location)
                setSalary(data.salary)
                setExperienceLevel(data.experienceLevel)
                setPostedDate(data.postedDate)
                setStatus(data.status)
                setApplicationDeadLine(data.applicationDeadline)
                setRequirements(data.requirements)
            } catch (err) {
                console.error("Failed to fetch job: ", err)
                setError(error.message)
            } finally {
                setLoading(false);
            }

        }

        fetchJob();
    }, [id])


    // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();

    const updatedJob = {
      id,
      title,
      type,
      description,
      company: {
        name: companyName,
        contactEmail,
        contactPhone,
        website,
        size
      },
      location,
      salary,
      experienceLevel,
      postedDate,
      status, 
      applicationDeadline,
      requirements
    };

    const success = await updateJob(updatedJob);
    if (success) {
      alert("Job updated!")
      navigate(`/jobs/${id}`);
    } else {
      alert("Update failed!")
    }
  };

  return(
    <div className="create">
        <h2>Update Job</h2>
        {loading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>{error}</p>
        ) : (
            <form onSubmit={submitForm}>
                <label>Job title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                <label>Job type:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                </select>
                <label>Job Description:</label>
                <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <label>Company Name:</label>
                <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <label>Contact Email:</label>
                <input
                    type="text"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                />
                <label>Contact Phone:</label>
                <input
                    type="text"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                />
                <label>Company website:</label>
        <input
          type="text"
          required
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <label>Company size:</label>
        <input
          type="number"
          required
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <label>Location:</label>
        <input
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label>Salary:</label>
        <input
          type="text"
          required
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <label>Experience level:</label>
        <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}>
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
        <label>Posted date:</label>
        <input
          type="date"
          required
          value={postedDate}
          onChange={(e) => setPostedDate(e.target.value)}
        />
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <label>Application deadline:</label>
        <input
          type="date"
          required
          value={applicationDeadline}
          onChange={(e) => setApplicationDeadLine(e.target.value)}
        />
        <label>Requirements:</label>
        <input
          type="text"
          required
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />
                <button>Update Job</button>
            </form>
        )}
    </div>
  )

}

export default EditJobPage;