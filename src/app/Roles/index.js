import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";
import { DeleteRole } from "../../redux/slices/roleSlice";

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

const Roles = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const roleList = useSelector((state) => state.role.roles);
    const [isDeleteDialogOpen, setIsDeleteDialog] = useState(false);
    const [selectedRole, setSelectedRole] = useState({});

    const onDelete = () => {
        dispatch(DeleteRole(selectedRole.key));
        setIsDeleteDialog(false);
        setSelectedRole({});
    };

    const handleDeleteAction = (user) => {
        setIsDeleteDialog(true);
        setSelectedRole(user);
    };

    const handleCancelOfDeleteAction = () => {
        setIsDeleteDialog(false);
        setSelectedRole({});
    };

    return (
        <div className="App">   
            <Typography sx={{marginTop: '20px', marginBottom: '20px', fontSize: 30}}>{"Role List"}</Typography>
            <TableContainer component={Paper} sx={{margin: 5, width: '95%'}}>
                <Table className={classes.table} aria-label="role list">
                    <TableHead>
                        <TableRow>
                            <TableCell>Key</TableCell>
                            <TableCell align="right">Value</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roleList.map((role) => (
                            <TableRow key={role.key}>
                                <TableCell component="th" scope="row">
                                    {role.key}
                                </TableCell>
                                <TableCell align="right">{role.label}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => navigate('/editRole', { state: { role } })}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="primary" onClick={() => handleDeleteAction(role)}>
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
                <Button onClick={() => navigate('/')}>{"User List"}</Button>   
            </div>
            <DeleteConfirmationDialog
                isOpen={isDeleteDialogOpen}
                handleClose={handleCancelOfDeleteAction}
                handleSubmit={onDelete}    
            />
        </div>
    );
}

export default Roles;
