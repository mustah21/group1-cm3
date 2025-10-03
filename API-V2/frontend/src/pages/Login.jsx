import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom"

const Login = ({setIsAuthenticated}) => {
    const navigate = useNavigate();
    const username = useField("text");
    const password = useField("password");

    const { login, error } = useLogin("/api/users/login");

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        await login({
            username: username.value,
            password: password.value
        });
        if (!error) {
            console.log("success");
            setIsAuthenticated(true);
            navigate("/")
        } 
    }

    return (
        <div className="create">
            <h2>Login</h2>
            <form>
                <label>Username:</label>
                <input {...username} />
                <label>Password:</label>
                <input {...password} />
                <button onClick={(e) => handleSubmitForm(e)}>Login</button>
            </form>
        </div>
    );
};

export default Login