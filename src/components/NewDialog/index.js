import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSoftUIController } from 'context';
import { PropTypes } from 'prop-types';

export default function NewFormDialog({ open, setOpen, data }) {
    const [controller, dispatch] = useSoftUIController();

    const handleClose = () => {
        data.call();
        setOpen(false);
    };


    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'div',
                    // onSubmit: async (event) => {
                    //     event.preventDefault();
                    //     const formData = new FormData(event.currentTarget);
                    //     console.log(formData.get("rule"));
                    //     data.call(formData);
                    //     handleClose();
                    // },
                }}
            >
                <DialogTitle>{data?.message}</DialogTitle>
                <DialogTitle>{data?.title}</DialogTitle>

                <DialogContent>
                    {data?.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={handleClose}>{data?.action}</Button>
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