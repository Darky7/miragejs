import React, { useState, useEffect } from "react";
import Axios from "axios";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { red } from "@material-ui/core/colors";

function UserListComponent(props) {
  let [userList, setUserList] = useState([]);
  let deleteUser = async (id) => {
    try {
      await Axios.delete(`/api/user/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUserList([...props.users]);
  }, [props.users]);

  return (
    <div className="user-list">
      <GridList cellHeight={180} style={{ width: `100%`, height: `auto` }}>
        <GridListTile key="Subheader" cols={2} style={{ height: `auto` }}>
          <ListSubheader component="div">Users</ListSubheader>
        </GridListTile>
        {userList.map((user) => (
          <GridListTile key={user.id}>
            <img src={require("../images/user.png").default} alt="user-cover" />

            <GridListTileBar
              title={user.name}
              actionIcon={
                <IconButton
                  aria-label="delete-user"
                  onClick={() => deleteUser(user.id)}
                >
                  <DeleteIcon style={{ color: red[500] }} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default UserListComponent;
