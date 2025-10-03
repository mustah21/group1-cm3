import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


const JobPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const deleteJob = async (id) => {
        try {
            const res = await fetch(`/api/jobs/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to delete job: ${errorText}`);
            }

        } catch (err) {
            console.error('Error deleting job:', err);
        }
    };

    useEffect(() => {
        const fetchJob = async () => {
            try {
                console.log('id: ', id);
                const res = await fetch(`/api/jobs/${id}`, {
                });
                if (!res.ok) {
                    throw new Error('Network response not ok');
                }
                const data = await res.json();
                setJob(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchJob();
    }, [id]);

    const onDeleteClick = (jobId) => {
        const confirm = window.confirm(
            'Are you sure you want to delete this listing?' + jobId
        );
        if (!confirm) return;

        deleteJob(jobId);
        navigate('/');
    }

    const onUpdateClick = (jobId) => {
        navigate(`/edit-job/${jobId}`)
    }

    return (

        <div className='job-preview'>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <h2>{job.title}</h2>
                    <p>Type: {job.type}</p>
                    <p>Description: {job.description}</p>
                    <p>Company: {job.company.name} </p>
                    <p>Email: {job.company.contactEmail}</p>
                    <p>Phone: {job.company.contactPhone}</p>
                    <p>Website: {job.company.website}</p>
                    <p>Size: {job.company.size}</p>
                    <p>Location: {job.location}</p>
                    <p>Salary: {job.salary}€</p>
                    <p>Experience level: {job.experienceLevel}</p>
                    <p>Posted: {job.postedDate}</p>
                    <p>Status: {job.status}</p>
                    <p>Application deadline: {job.applicationDeadline}</p>
                    <p>Requirements: {job.requirements}</p>


                    <>
                        <button onClick={() => onDeleteClick(job._id || job.id)}>Delete</button>
                        <button onClick={() => onUpdateClick(job._id || job.id)}>Edit</button>

                    </>

                </>
            )}

        </div>

    )
}

export default JobPage;