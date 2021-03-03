import React, { useState } from "react";
import {
  Container,
  Row,
  Form,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

export function Register() {
  const { push } = useHistory();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const register = async (event) => {
    event.preventDefault();
    const { data: { user, success } = {} } = await axios({
      method: "POST",
      url: "https://stark-garden-96861.herokuapp.com/auth/create",
      data: {
        username,
        firstName,
        lastName,
        password,
      },
    });
    if (user && success) {
      push("/login");
    } else {
      setUsername("");
      setPassword("");
      setFirstName("");
      setLastName("");
    }
  };

  return (
    <div className="bg-info h-100">
      <Container className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <Container className="bg-white rounded mt-2 mb-2 px-0">
              <Row className="justify-content-center align-items-center pt-3">
                <h1>
                  <strong>Зареєструватись</strong>
                </h1>
              </Row>
              <div className="pt-3 pb-3">
                <Form className="form-horizontal">
                  <FormGroup className="row justify-content-center px-3">
                    <div className="col-9 px-0">
                      <FormControl
                        type="text"
                        placeholder="Ім'я"
                        className="border-info"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                      />
                    </div>
                  </FormGroup>
                  <FormGroup className="row justify-content-center px-3">
                    <div className="col-9 px-0">
                      <FormControl
                        type="text"
                        placeholder="Прізвище"
                        className="border-info"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                      />
                    </div>
                  </FormGroup>
                  <FormGroup className="row justify-content-center px-3">
                    <div className="col-9 px-0">
                      <FormControl
                        type="text"
                        placeholder="Ім'я користувача"
                        className="border-info"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                      />
                    </div>
                  </FormGroup>
                  <FormGroup className="row justify-content-center px-3">
                    <div className="col-9 px-0">
                      <FormControl
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        className="border-info"
                      />
                    </div>
                  </FormGroup>
                  <FormGroup className="row justify-content-center px-3">
                    <div className="col-3 col-sm-12 px-3">
                      <Button
                        type="submit"
                        className="btn-block btn-info"
                        onClick={register}
                      >
                        Створити акаунт
                      </Button>
                    </div>
                  </FormGroup>
                </Form>
              </div>
            </Container>
          </div>
        </Row>
      </Container>
    </div>
  );
}
