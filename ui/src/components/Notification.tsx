import React from 'react';
import { Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default function Notification(props: any) {
    const useStyles = makeStyles(theme => ({
        root: {
            top: theme.spacing(10),
            "& .MuiPaper-root": {
                border: `1px solid ${borderColor}`,
                borderRadius: '10px',
            }
        },
    }))
    const { notify, setNotify } = props;
    var borderColor = '';
    switch (notify.type) {
        case 'success':
            borderColor = 'green';
            break;
        case 'warning':
            borderColor = 'orange';
            break;
        case 'error':
            borderColor = 'Coral';
            break;
        case 'info':
            borderColor = 'DeepSkyBlue';
            break;
        default:
            borderColor = 'black';
    }
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