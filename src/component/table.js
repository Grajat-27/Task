import * as React from "react";
import { Suspense } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setUsers } from "../redux/slice/user";
import Usermodal from "./Usermodal";
import Usercreate from "./UserCreate";
import Loader from "./Loader";

function UserTable() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [createModal, setCreateModal] = React.useState(false);
  const [modalData, setModalData] = React.useState({});

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  //// Delete Functionality
  const handleDelete = (id) => {
    setModalOpen(true);
    setModalData({ delete: true, id: id });
  };

  const handleDataDelete = (id) => {
    const res = state.user.data.filter((data) => data.id != id);
    dispatch(setUsers(res));
  };

  //// edit functionality
  const handelEdit = (rowData) => {
    setModalOpen(true);
    setModalData(rowData);
  };

  const handleEditData = (data) => {
    const newData = state.user.data.map((item) =>
      item.id === data.id ? { ...item, ...data } : item
    );
    dispatch(setUsers(newData));
  };

  //// Adding new user Functionality
  const handleAddUser = () => {
    setCreateModal(true);
    setModalData({});
  };

  const submitHandle = (data) => {
    data.id = state.user.recordLength + 1;
    const newData = [...state.user.data, data];
    dispatch(setUsers(newData));
  };

  if(state.user.isLoading) {
    return <Loader />
  }

  return (
    <Suspense
      fallback={
        <div>
          loading...
        </div>
      }
    >
      <AddCircleIcon
        style={{ height: 40, width: 40, marginRight:'auto' }}
        onClick={handleAddUser}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">City</TableCell>
              <TableCell align="center">Zip code</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.user.data?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.address.city}</TableCell>
                <TableCell align="center">{row.address.zipcode}</TableCell>
                <TableCell align="center">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <DeleteIcon
                      style={{ color: "red" }}
                      onClick={() => handleDelete(row.id)}
                    />
                    <EditIcon
                      style={{ color: "blue" }}
                      onClick={() => handelEdit(row)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {modalOpen && (
        <Usermodal
          open={modalOpen}
          data={modalData}
          modalClose={() => {
            setModalOpen(false);
          }}
          deleteData={(id) => handleDataDelete(id)}
          editData={(data) => handleEditData(data)}
        />
      )}

      <Usercreate
        open={createModal}
        modalClose={() => {
          setCreateModal(false);
        }}
        submit={(data) => submitHandle(data)}
      />
    </Suspense>
  );
}

export default UserTable;
