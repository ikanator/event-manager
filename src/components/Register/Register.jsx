import React from "react";
import {
  Container,
  Row,
  Form,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const REQUIRED_MESSAGE = "Це поле необхідне";
const INITIAL_VALUES = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
};

export function Register() {
  const { push } = useHistory();
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
    defaultValues: INITIAL_VALUES,
  });

  const onSubmit = async (values) => {
    const { data: { user, success } = {} } = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/auth/create`,
      data: values,
    });
    if (user && success) {
      push("/login");
    } else {
      reset(INITIAL_VALUES);
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
                <Form
                  className="form-horizontal"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <FormGroup className="row justify-content-center px-3">
                    <div className="col-9 px-0">
                      <FormControl
                        ref={register({
                          required: {
                            value: true,
                            message: REQUIRED_MESSAGE,
                          },
                          validate: (value) => {
                            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            return re.test(String(value).toLowerCase());
                          },
                        })}
                        name="email"
                        type="email"
                        placeholder="Email"
                        className={
                          errors?.email || errors?.email?.message
                            ? "is-invalid"
                            : "border-info"
                        }
                      />
                      <p className="text-danger mb-0">
                        {errors?.email?.message || errors?.email?.validate
                          ? "Введіть правильний email"
                          : ""}
                      </p>
                    </div>
                  </FormGroup>
                  <FormGroup className="row justify-content-center px-3">
                    <div className="col-9 px-0">
                      <FormControl
                        ref={register({
                          required: {
                            value: true,
                            message: REQUIRED_MESSAGE,
                          },
                        })}
                        name="firstName"
                        type="text"
                        placeholder="Ім'я"
                        className="border-info"
                      />
                      <p className="text-danger mb-0">
                        {errors?.firstName?.message}
                      </p>
                    </div>
                  </FormGroup>
                  <FormGroup className="row justify-content-center px-3">
                    <div className="col-9 px-0">
                      <FormControl
                        ref={register({
                          required: {
                            value: true,
                            message: REQUIRED_MESSAGE,
                          },
                        })}
                        name="lastName"
                        type="text"
                        placeholder="Прізвище"
                        className="border-info"
                      />
                      <p className="text-danger mb-0">
                        {errors?.lastName?.message}
                      </p>
                    </div>
                  </FormGroup>
                  <FormGroup className="row justify-content-center px-3">
                    <div className="col-9 px-0">
                      <FormControl
                        ref={register({
                          required: { value: true, message: REQUIRED_MESSAGE },
                        })}
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        className="border-info"
                      />
                      <p className="text-danger mb-0">
                        {errors?.password?.message}
                      </p>
                    </div>
                  </FormGroup>
                  <FormGroup className="row justify-content-center px-3">
                    <div className="col-3 col-sm-12 px-3">
                      <Button
                        type="submit"
                        className="btn-block btn-info"
                        onClick={handleSubmit(onSubmit)}
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
