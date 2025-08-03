import React, { useState } from "react";
import { Container, Content } from "./styles";
import Anchor from "@/components/atoms/Anchor";
import useForm from "@/hooks/useForm";
import { Form } from "@/styles/Form";

interface Signup {
  name: string;
  email: string;
  gender: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC = () => {
  const [signup, setSignup] = useState<Signup>({
    name: "",
    email: "",
    gender: "M",
    password: "",
    confirmPassword: "",
  });

  const { handleFormFieldChange } = useForm({ setState: setSignup });

  const doSignup = () => {
    if (signup.password !== signup.confirmPassword) {
      alert("Passwords must match !");
      return;
    }

    alert("Gonna login");

    console.log("Signups is ", signup);
  };

  return (
    <Container>
      <Content>
        <h1>Create a new account</h1>
        <Form>
          <fieldset>
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={handleFormFieldChange}
              value={signup.name}
            />
          </fieldset>

          <fieldset>
            <label>Gender</label>
            <select
              name="gender"
              onChange={handleFormFieldChange}
              value={signup.gender}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </fieldset>

          <fieldset>
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={handleFormFieldChange}
              value={signup.email}
            />
          </fieldset>

          <fieldset>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleFormFieldChange}
              value={signup.password}
            />
          </fieldset>

          <fieldset>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleFormFieldChange}
              value={signup.confirmPassword}
            />
          </fieldset>

          <button type="button" onClick={doSignup}>
            Sign Up
          </button>
        </Form>
        <Anchor href="/login">Already have an account ? Sign In</Anchor>
      </Content>
    </Container>
  );
};

export default SignupForm;
