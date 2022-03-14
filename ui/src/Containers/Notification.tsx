import React from 'react';
import { Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    root: {
        top: theme.spacing(10),
        "& .MuiPaper-root": {
            border:'1px solid green',
            borderRadius: '10px',
        }
    },
}))

export default function Notification(props: any) {
    const { notify, setNotify } = props;
    const classes = useStyles();
    const handleClose = () => {
        setNotify({
            ...notify,
            isOpen: false,
        })
    }
    return (
        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            onClose={handleClose}
        >
            <Alert
                severity={notify.type}
                onClose={handleClose}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    );
}