import React, { useState, useEffect } from "react";
// import axios from "axios";
import { GoogleLogin } from 'react-google-login';
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { login, googleSignin } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";
import "./LoginScreen.css";

function LoginScreen({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState({
  //   email: "",
  //   password: "",
  // });

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/courses");
    }
  }, [history, userInfo]);

  // const handleChange = (e) => {
  //   setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // } 

  const submitHandler = (e) => {
    e.preventDefault();
    // setUser({
    //   email: "",
    //   password: "",
    // });
    dispatch(login(email,password) || googleSignin());
    // dispatch(googleSignin());
  };

  // const googleSignin = () =>{
  //   (window.location.href = "http://localhost:5000/api/users/google");
  // }

  // const responseGoogle = async (response) => {
  //   try {
  //       const res = await axios.post('/user/google_login', {tokenId: response.tokenId})

  //       setUser({...user, error:'', success: res.data.msg})
  //       localStorage.setItem('firstLogin', true)

  //       dispatch(login())
  //       history.push('/')
  //   } catch (err) {
  //       err.response.data.msg && 
  //       setUser({...user, err: err.response.data.msg, success: ''})
  //   }
  // }

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              // onChange = {handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              // onChange = {handleChange}
            />
          </Form.Group>

          <button type="submit">
            Submit
          </button>
          <Row className="py-3">
            <Col>
            <div className="hr">Or Login With</div>
            <div className="social">
                <GoogleLogin
                    clientId="522691258935-pb39b7654oj0t45qo7na4u296g35qkc9.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={googleSignin}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
            </Col>
            <Col>
              New here ? <Link to="/register">Signup</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </MainScreen>
  );
}

export default LoginScreen;
