import React, { useState } from "react";
import AddUserComponent from "./AddUsers";
import UserListComponent from "./UserList";
import GroupByComponent from "./GroupBy.js";

function MainComponent() {
  let [users, setUsers] = useState([]);

  let changeUserList = (userList) => {
    setUsers(userList);
  };

  return (
    <div className="main">
      <header>
        <h2>Users</h2>
      </header>
      <AddUserComponent />
      <GroupByComponent changeUserList={changeUserList} />
      <UserListComponent users={users} />
    </div>
  );
}

export default MainComponent;
