import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { useHistory } from "react-router-dom";

import axios from "axios";

const initialForm = {
  name: "",
  surname: "",
  email: "",
  password: "",
  terms: false,
};

const errorMessages = {
  name: "Name must be at least 3 characters long",
  surname: "Surname must be at least 3 characters long",
  email: "Please enter a valid email address",
  password: "Password must be at least 4 characters long",
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState();
  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
    terms: false,
  });

  const history = useHistory();

  useEffect(() => {
    const newIsValid =
      form.name.trim().length >= 3 && form.surname.trim().length >= 3;
    validateEmail(form.email) && form.password.trim().length >= 4 && form.terms;
    setIsValid(newIsValid);
  }, [form]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleChange = (event) => {
    let { name, value, type, checked } = event.target;
    value = type === "checkbox" ? event.target.checked : value;
    setForm({ ...form, [name]: value });

    if (name === "name") {
      const isNameValid = value.trim().length >= 3;
      setErrors({ ...errors, name: !isNameValid });
    }

    if (name === "surname") {
      const isNameValid = value.trim().length >= 3;
      setErrors({ ...errors, surname: !isNameValid });
    }

    if (name == "email") {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    if (name == "password") {
      if (value.trim().length >= 4) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    if (name == "terms") {
      if (value) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValid) {
      axios
        .post("https://reqres.in/api/users", form)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => console.log(error))
        .finally(setForm(initialForm));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {data && <h1>ID: {data.id}</h1>}

      <FormGroup>
        <Label for="exampleName" className="cy-name">
          Name
        </Label>
        <Input
          id="exampleName"
          name="name"
          placeholder="Enter your name"
          type="text"
          onChange={handleChange}
          value={form.name}
          invalid={errors.name}
        />
        {errors.name && <FormFeedback>{errorMessages.name}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="exampleSurname" className="cy-surname">
          Surname
        </Label>
        <Input
          id="exampleSurname"
          name="surname"
          placeholder="Enter your surname"
          type="text"
          onChange={handleChange}
          value={form.surname}
          invalid={errors.surname}
        />
        {errors.surname && <FormFeedback>{errorMessages.surname}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail" className="cy-email">
          Email
        </Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={errors.email}
        />
        {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword" className="cy-password">
          Password
        </Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={errors.password}
        />
        {errors.password && (
          <FormFeedback>{errorMessages.password}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={errors.terms}
        />{" "}
        <Label htmlFor="terms" className="cy-terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid} className="cyBtn">
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
