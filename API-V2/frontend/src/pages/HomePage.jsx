import JobListings from "../components/JobListings";


const Home = () => {

  return (
    <div className="home">
      {/* {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>} */}
      <JobListings />
    </div>
  );
};

export default Home;
