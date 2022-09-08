import Table from "react-bootstrap/Table";
import { Button, Box } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { toastStyle } from "../../utility/helper";
import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {useNavigate} from "react-router-dom"

function PostS() {
    let navigate=useNavigate()
  const [data, setData] = useState({
    id: "",
    title: "",
    desc: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [items, setItems] = useState([]);
  const handle = (e) => {
    data.id = items.length + 1;
    if (data.title === "" || data.desc === "") {
      toast.error("Fields cannot be Empty", { ...toastStyle.error });
      return;
    }
    setItems([...items, data]);
    setData({
      title: "",
      desc: "",
    });
    toast.success("New Row Added Successfully", { ...toastStyle.success });
  };
  const EditHandle = () => {
    const title_e = data.title;
    const desc_e = data.desc;
    items[data.id - 1].title = title_e;
    items[data.id - 1].desc = desc_e;
    if (data.title === "" || data.desc === "") {
        toast.error("Fields cannot be Empty", { ...toastStyle.error });
        return;
      }
    setItems(items);
    setData({
      title: "",
      desc: "",
    });
    setEditMode(false);
    toast.success("Row Updated Successfully", { ...toastStyle.success });
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };
  const handleItemDeleted = (o) => {
    setItems(
      items.filter(function (l) {
        return l.id !== o;
      })
    );
    toast.error("Row Deleted Successfully", { ...toastStyle.error });
  };
  const edit = (i) => {
    setEditMode(true);
    setData(items[i]);
  };
  const logout=()=>{
    localStorage.removeItem("email_id")
    localStorage.removeItem("password")
    navigate('/login')
    toast.success("Logged Out Successfully", { ...toastStyle.success });
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              GIVA Assessment Test
            </Typography>
            <Button color="inherit" onClick={()=>{logout()}}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        component="form"
        noValidate
        sx={{ width: "500px", mx: "auto", mt: 1, textAlign: "center", mb: 10 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          label="Title"
          autoFocus
          name="title"
          placeholder="Title"
          value={data.title}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Description"
          name="desc"
          rows="3"
          value={data.desc}
          onChange={handleChange}
        />
        {editMode === true ? (
          <Button variant="contained" onClick={EditHandle}>
            Edit
          </Button>
        ) : (
          <Button variant="contained" onClick={handle}>
            Add
          </Button>
        )}
      </Box>
      <h2 className="text-center"> Table </h2>
      <TableContainer
        component={Paper}
        sx={{ width: 550, mx: "auto", mt: "2" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(function (p, i) {
              return (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="right">{p.title}</TableCell>
                  <TableCell align="right">{p.desc}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => {
                        edit(i);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        handleItemDeleted(p.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default PostS;
