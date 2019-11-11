import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "../components/pagination.js";
import AddUser from "../components/addUser.js";
import UpdateUser from "../components/updateUser.js";
import DeleteUser from "../components/deleteUser.js";

export const StyledButton = styled.div`
  background-color: #e0e0e0;
  padding: 15px 32px;
  text-align: center;
  margin: 5px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;

  :hover {
    background-color: #c0c2be;
  }
`;

const MotherHolder = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const UserContainer = styled.div`
  margin: 0 auto;
  max-width: 80rem;
  min-width: 320px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const EditUser = styled.div`
  font-size: 1.5rem;
  padding: 0.2rem;
  position: absolute;
  margin-top: -0.5rem;
  z-index: 0;
`;

const ListText = styled.p`
  padding-bottom: 0.2rem;
  pointer-events: none;
  word-wrap: break-word

  height: auto;
  @media (max-width: 330px) {
    font-size: 0.8rem;
  }
    border-bottom: 1px solid lightgray;
`;

const UsersLi = styled.div`
  cursor: pointer;
  min-width: 200px;
  flex: 0 40%;
  background-color: white;
  display: inline-block;
  margin: 2rem;
  border: 1px solid #e0e0e0;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
`;

export default function Users() {
  const [Loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [popUp, setPopUp] = useState(null);
  const [amountOfUsers, setAmountOfUsers] = useState(20);
  const [maxAmountOfUsers, setMaxAmountOfUsers] = useState(null);

  const checkBoxArray = [];

  useEffect(() => {
    let header =
      "Basic " +
      Buffer.from(
        "90316-125:pfX0Y7A2TYAlZ571IKEO7AKoXza6YlvsP8kKvAu3"
      ).toString("base64");

    const url =
      "http://localhost:8088/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users.json?num=" +
      amountOfUsers;

    fetch(url, {
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: header
      }
    })
      .then(e => e.json())
      .then(res => {
        setUsers(res);
        setMaxAmountOfUsers(res.totalcount);
      })
      .then(e => {
        setLoading(false);
      })
      .catch(e => console.log(e));
  }, [amountOfUsers]);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const addMoreUsers = () => setAmountOfUsers(amountOfUsers + 20);

  const closeMenu = () => {
    setPopUp(null);
  };

  const openMenu = ({ target: { id } }) => {
    if (id === "add") setPopUp(<AddUser closeMenu={closeMenu} />);
    if (id === "delete")
      setPopUp(
        <DeleteUser closeMenu={closeMenu} deleteArray={checkBoxArray} />
      );
  };

  const updateUser = ({ target: { id } }) => {
    if (id) {
      const user = users.items.find(user => user.userid === id);
      setPopUp(<UpdateUser closeMenu={closeMenu} UpdatePerson={user} />);
    }
  };

  const handleCheck = e => {
    let id = e.target.value;
    const index = checkBoxArray.findIndex(e => id === e);
    if (index !== -1) {
      checkBoxArray.splice(index, 1);
    } else {
      checkBoxArray.push(id);
    }
  };

  if (Loading) return <div> Loading ..</div>;
  else {
    const indexOfLastPost = currentPage * 6;
    const indexOfFirstPost = indexOfLastPost - 6;
    const currentPosts = users.items.slice(indexOfFirstPost, indexOfLastPost);

    return (
      <MotherHolder>
        {popUp ? popUp : null}
        <Pagination
            totalPosts={users.items.length}
            paginate={paginate}
            currentPage={currentPage}
            addMoreUsers={addMoreUsers}
            noMoreUsers={amountOfUsers >= maxAmountOfUsers ? "X" : "Load More"}
          />
        <UserContainer>
          {currentPosts.map(user => {
            let createDate = new Date(user.datecreated * 1000);
            let dateArr = createDate.toUTCString().split(" ");
            createDate = `${dateArr[1]} ${dateArr[2]} ${dateArr[4]} ${
              dateArr[3]
            } (GMT)`;

            let modifyDate = new Date(user.datemodified * 1000);
            dateArr = modifyDate.toUTCString().split(" ");
            modifyDate = `${dateArr[1]} ${dateArr[2]} ${dateArr[4]} ${
              dateArr[3]
            } (GMT)`;

            return (
              <UsersLi key={user.userid}>
                <ListText>
                  <strong> Name:</strong> {user.namefirst} {user.namelast}
                </ListText>
                <ListText>
                  <strong> Email: </strong>
                  {user.email}
                </ListText>
                <ListText>
                  <strong> Date Created: </strong> {createDate}
                </ListText>
                <ListText>
                  <strong> Date Modified:</strong> {modifyDate}
                </ListText>
                <EditUser id={user.userid} onClick={updateUser}>
                  EDIT
                </EditUser>
                <input
                  type="checkbox"
                  onChange={handleCheck}
                  value={user.userid}
                />
              </UsersLi>
            );
          })}
        </UserContainer>

        <StyledButton id="add" onClick={openMenu}>
          add
        </StyledButton>
        <StyledButton id="delete" onClick={openMenu}>
          delete selected
        </StyledButton>
      </MotherHolder>
    );
  }
}
