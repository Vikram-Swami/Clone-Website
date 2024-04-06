import * as React from 'react';
import { useSoftUIController } from 'context';
import { PropTypes } from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function NewFormDialog({ open, setOpen, data }) {
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (e) => {
                        console.log(data);
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        data.call(formData);
                    }
                }}
            >
                <DialogTitle>{data?.title}</DialogTitle>
                <DialogContent tabIndex={-1}>

                    <DialogTitle fontSize={14}>{data?.message}</DialogTitle>
                    {data?.children}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {data.action && <Button type="submit">{data?.action}</Button>}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}


NewFormDialog.defaultProps = {
    open: false,
    setOpen: () => { },
    data: [] ?? "",
};

NewFormDialog.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    data: PropTypes.any,
};