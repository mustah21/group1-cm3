import { Link } from "react-router-dom";

const Navbar = () => {
  const handleClick = (e) => {
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>React Jobs</h1>
      </Link>
      <div className="links">
        <div>
          <Link to="/add-job">Add Job</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;