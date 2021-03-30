import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Section = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  border-radius: 8px;
  background-color: #dcdcdc;
  padding: 0 2rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  text-align: center;
`;

const Title = styled.div`
  margin: 2rem 0;
  font-size: 2rem;
  font-weight: bold;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 300px;
  margin-bottom: 1rem;
  padding: 16px 8px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border: none;
  outline: none;
  font-size: 16px;
`;

const Btn = styled.button`
  width: 100%;
  border: none;
  background-color: black;
  color: white;
  padding: 16px 0;
  border-radius: 8px;
  margin: 1rem 0;
  font-size: 16px;
  cursor: pointer;
  outline: none;
`;

const SignupBtn = styled.button`
  width: 100%;
  border: none;
  background-color: black;
  color: white;
  padding: 16px 0;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  margin-bottom: 1rem;
`;

const Auth = ({ title, authService }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    switch (title) {
      case "Log In":
        authService.loginEmail(email, password);
        break;
      case "Sign Up":
        authService.signupEmail(email, password);
        break;
      default:
        return;
    }
  };
  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        return;
    }
  };
  return (
    <Section>
      <Container>
        <Title>{title}</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={email}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={password}
          />
          <Btn>{title}</Btn>
        </Form>
        {title === "Log In" && (
          <SignupBtn>
            <Link to="/register">Sign Up</Link>
          </SignupBtn>
        )}
      </Container>
    </Section>
  );
};

export default Auth;
