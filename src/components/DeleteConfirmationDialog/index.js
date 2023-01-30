

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

const DeleteConfirmationDialog = ({ handleClose, handleSubmit, isOpen }) => {
    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        no
                    </Button>
                    <Button onClick={handleSubmit} color="primary" autoFocus>
                        yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default DeleteConfirmationDialog;