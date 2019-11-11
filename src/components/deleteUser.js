import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { StyledButton } from "../styles/styles.js";

const MotherContainer = styled.div`
position: absolute;
top: 50%;  
left: 50%
transform: translate(-50%, -50%); 
background: lightgray;
width: 25rem;
height: 25rem;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
z-index: 1;
`;

export default function DeleteUser({ deleteArray, closeMenu }) {
  const [count, setCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  let header =
    "Basic " +
    Buffer.from("90316-125:pfX0Y7A2TYAlZ571IKEO7AKoXza6YlvsP8kKvAu3").toString(
      "base64"
    );
  const base = "https://api-sandbox.mysitoo.com/v2/accounts/90316/";
  const proxy = "http://localhost:8088/";

  useEffect(() => {
    if (count > 0) deleteUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const deleteUsers = () => {
    if (deleteArray.length === 0) {
      setErrorMessage("Error: No users chosen");
    } else {
      if (count !== deleteArray.length) {
        fetch(proxy + base + "sites/1/users/" + deleteArray[count] + ".json", {
          credentials: "same-origin",
          method: "DELETE",
          dataType: "json",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: header
          }
        })
          .then(res => {
            console.log(res, "this is ref");
            if (res.ok) setCount(count + 1);
            if (res.status === 404) setErrorMessage(<div> ERROR: User could not be found </div>);
            if (res.status === 401) setErrorMessage(<div> Wrong login credentials. Not authorized.</div>);
            if (res.status === 400) setErrorMessage( <div> Could not add. Double check input fields. (400) </div>);
            if (res.status === 429) setErrorMessage( <div> Too many requests. Try again later. (429) </div>);
            if (res.status === 500) setErrorMessage( <div> Server error. Try again later. (500) </div>);
          })
          .catch(e => {
            setErrorMessage(<div> an error has occured, try again </div>);
          });
      } else {
        setErrorMessage("Users succesfully deleted");
      }
    }
  };

  return (
    <MotherContainer>
      Are you sure you want to delete the selected people? <br />
      <StyledButton onClick={closeMenu}> Cancel </StyledButton>
      {errorMessage ? (
        <>
          <div>{errorMessage} </div>
          <StyledButton onClick={closeMenu}> Ok </StyledButton>
        </>
      ) : (
        <StyledButton onClick={deleteUsers}> Delete </StyledButton>
      )}
    </MotherContainer>
  );
}
