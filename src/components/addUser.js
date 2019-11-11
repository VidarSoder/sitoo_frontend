import React, { useState } from "react";
import styled from "styled-components";
import {
  StyledButton,
  StyledInput,
  StyledInputField
} from "../styles/styles.js";

const MotherContainer = styled.div`
position: fixed;
top: 50%;  
left: 50%
background: lightgray;
transform: translate(-50%, -50%);

width: 25rem;
height: 25rem;
z-index: 1;
display:flex;
flex-direction: center;
justify-content: center;
align-items: center;
text-align: center;
`;

export default function AddUser(props) {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [addedUser, setAddedUser] = useState(null);

  let header =
    "Basic " +
    Buffer.from("90316-125:pfX0Y7A2TYAlZ571IKEO7AKoXza6YlvsP8kKvAu3").toString(
      "base64"
    );

  const base = "https://api-sandbox.mysitoo.com/v2/accounts/90316/";
  const proxy = "http://localhost:8088/";

  const submitForm = e => {
    e.preventDefault();
    const data = {
      email: userEmail,
      namefirst: userFirstName,
      namelast: userLastName
    };


    fetch(proxy + base + "sites/1/users.json", {
      credentials: "same-origin",
      method: "POST",
      dataType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: header
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        console.log(res);
        setUserLastName("")
        setUserFirstName("")
        setUserEmail("")
        if (res.ok) setAddedUser(true);
        if (res.status === 400) setErrorMessage( <div> Could not add. Double check input fields. (400) </div>);
        if (res.status === 401) setErrorMessage( <div> Unauthorized. Are you logged in? (401) </div>);
        if (res.status === 404) setErrorMessage( <div> Cant find the link. Try again later. (404) </div>);
        if (res.status === 429) setErrorMessage( <div> Too many requests. Try again later. (429) </div>);
        if (res.status === 500) setErrorMessage( <div> Server error. Try again later. (500) </div>);

      })
      .catch(e => console.log(e));
  };

  return (
    <MotherContainer>
      <form onSubmit={submitForm}>
        <strong> First Name: </strong>
        <br />
        <StyledInputField
          type="text"
          required
          onChange={e => setUserFirstName(e.target.value)}
          value={userFirstName}
        />
        <br />
        <strong> Last name:</strong>
        <br />
        <StyledInputField
          type="text"
          value={userLastName}
          required
          onChange={e => setUserLastName(e.target.value)}
        />
        <br />
        <strong> Email: </strong>
        <br />
        <StyledInputField
          type="email"
          required
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
        />
        <br />
        <StyledInput type="submit" value={"Submit"} />
        {errorMessage ? <div>{errorMessage} </div> : null}
        {addedUser ? (
          <>
            <StyledButton onClick={props.closeMenu}> Ok </StyledButton>
            <div> User was added </div>
          </>
        ) : <StyledButton onClick={props.closeMenu}> Cancel </StyledButton>
      }
      </form>
    </MotherContainer>
  );
}
