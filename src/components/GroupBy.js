import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ListIcon from "@material-ui/icons/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";
import Axios from "axios";

function GroupByComponent(props) {
  let [open, setOpen] = useState(false);
  let [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      const response = await Axios.get("/api/companies");
      setCompanies(response.data.companies);
    }
    getCompanies();
  }, []);

  let handleClick = () => {
    setOpen(!open);
  };

  let getAllUsers = async () => {
    const response = await Axios.get("/api/users");
    props.changeUserList(response.data.users);
    console.log(props);
  };

  let getUsersByCompany = async (id) => {
    const response = await Axios.get(`/api/company/${id}/users`);
    props.changeUserList(response.data.users);
  };

  return (
    <div className="group-container">
      <List style={{ width: `250px` }}>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Group by Company" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {companies.map((company) => (
              <ListItem
                button
                key={company.id}
                onClick={() => getUsersByCompany(company.id)}
              >
                <ListItemText primary={company.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: `10px` }}
          onClick={getAllUsers}
        >
          Show all users
        </Button>
      </div>
    </div>
  );
}

export default GroupByComponent;
