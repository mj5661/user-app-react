import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteUser } from "../../redux/slices/userSlice";
import "./users.css";
import { Delete, Edit } from "@mui/icons-material";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";
import { useState } from "react";

const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px',
    },
});

const Users = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const userList = useSelector((state) => state.user.users);
    const [isDeleteDialogOpen, setIsDeleteDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    const onDelete = () => {
        dispatch(DeleteUser(selectedUser.id));
        setIsDeleteDialog(false);
        setSelectedUser({});
    };

    const handleDeleteAction = (user) => {
        setIsDeleteDialog(true);
        setSelectedUser(user);
    };

    const handleCancelOfDeleteAction = () => {
        setIsDeleteDialog(false);
        setSelectedUser({});
    };

    return (
        <div className="App">   
            <Typography sx={{marginTop: '20px', marginBottom: '20px', fontSize: 30}}>{"Users List"}</Typography>
            <TableContainer component={Paper} sx={{margin: 5, width: '95%'}}>
                <Table className={classes.table} aria-label="user list">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Password</TableCell>
                            <TableCell align="right">Mobile</TableCell>
                            <TableCell align="right">Role</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((user) => (
                            <TableRow key={user.name}>
                                <TableCell component="th" scope="row">
                                {user.name}
                                </TableCell>
                                <TableCell align="right">{user.username}</TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">{user.password}</TableCell>
                                <TableCell align="right">{user.mobile}</TableCell>
                                <TableCell align="right">{user.roleKey}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => navigate('/editUser', { state: { user } })}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="primary" onClick={() => handleDeleteAction(user)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.root}>
                <Button onClick={() => navigate('/addUser')}>{"Add New User"}</Button>
                <Button onClick={() => navigate('/addRole')}>{"Add New Role"}</Button>  
                <Button onClick={() => navigate('/roles')}>{"Role List"}</Button>   
            </div>
            <DeleteConfirmationDialog
                isOpen={isDeleteDialogOpen}
                handleClose={handleCancelOfDeleteAction}
                handleSubmit={onDelete}    
            />
        </div>
    );
}

export default Users;
