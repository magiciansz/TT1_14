import "../App.css";
import "../index.js";
import { useState } from "react";
import { Form, Button, FormGroup, FormControl, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userLogin } from "../api/user.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await userLogin(username, password);
      console.log("ADS", res);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="d-grid">
            {/* <Button type="submit"><Link to="/home" style={{textDecoration: 'none', color: 'white'}}>Login</Link></Button> */}
            <Link to="/home">
              <Button type="submit" onClick={handleLogin}>
                Login
              </Button>
            </Link>
          </Form.Group>
        </form>
      </header>
    </div>
  );
}

export default Login;
