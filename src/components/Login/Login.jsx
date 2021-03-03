import React, { useState } from "react";
import {
  Container,
  Row,
  Form,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useHistory();

  const handleFacebookLoginClick = () => {
    
    window.open(
      "https://stark-garden-96861.herokuapp.com/auth/facebook",
      "_self"
    );
  };

  const handleLocalLoginClick = async (event) => {
    event.preventDefault();
    try {
      const { data, status } = await axios({
        method: "POST",
        url: `https://stark-garden-96861.herokuapp.com/auth/local`,
        data: {
          email,
          password,
        },
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      if (data.user && status === 200) {
        push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  return (
    <div className="bg-info h-100">
      <Container className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <Container className="bg-white rounded mt-2 mb-2 px-0">
              <Row className="justify-content-center align-items-center pt-3">
                <h1>
                  <strong>Вхід</strong>
                </h1>
              </Row>
              <div className="pt-3 pb-3">
                <Form className="form-horizontal">
                  <FormGroup className="row justify-content-center px-3">
                    <div className="col-9 px-0">
                      <FormControl
                        type="text"
                        onChange={handleEmailChange}
                        placeholder="Ім'я користувача"
                        className="border-info"
                      />
                    </div>
                  </FormGroup>
                  <FormGroup className="row justify-content-center px-3">
                    <div className="col-9 px-0">
                      <FormControl
                        onChange={handlePasswordChange}
                        type="password"
                        className="border-info"
                      />
                    </div>
                  </FormGroup>
                  <FormGroup className="row justify-content-center px-3">
                    <div className="col-md-4 col-sm-12 px-3">
                      <Button
                        onClick={handleLocalLoginClick}
                        type="submit"
                        className="btn-block btn-info"
                      >
                        Увійти
                      </Button>
                    </div>
                  </FormGroup>
                </Form>
              </div>
              <div className="mx-0 px-0 bg-light">
                <div className="pt-4">
                  <Row className="justify-content-center">
                    <h5>Або увійти за допомогою</h5>
                  </Row>
                  <Row className="justify-content-center">
                    <div className="col-10">
                      <Row className="justify-content-center">
                        <div className="col-7 col-sm-4 px-1 pb-1">
                          <Button
                            onClick={handleFacebookLoginClick}
                            className="btn btn-block btn-social btn-facebook"
                          >
                            Facebook
                            <span className="ml-2">
                              <FontAwesomeIcon
                                icon={faFacebookF}
                                color="#fff"
                              />
                            </span>
                          </Button>
                        </div>
                      </Row>
                    </div>
                  </Row>
                </div>
                <div className="px-4 pt-3">
                  <hr />
                  <div className="pt-2">
                    <Row className="justify-content-center">
                      <h5>У тебе немає ще акаунту?</h5>
                    </Row>
                    <div className="row justify-content-center align-items-center pt-2 pb-5">
                      <div className="col-md-4 col-sm-12">
                        <Link to="/register" className="btn btn-block btn-info">
                          Створити
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </Row>
      </Container>
    </div>
  );
}
