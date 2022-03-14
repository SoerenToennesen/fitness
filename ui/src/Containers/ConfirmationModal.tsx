import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core';

export default function ConfirmationModal(props: any) {

    const { confirmModal, setConfirmModal } = props;

    return (
        <Dialog
            open={confirmModal.isOpen}
            onClose={() =>
                setConfirmModal({...confirmModal, isOpen: false})
            }
        >
            <DialogTitle>

            </DialogTitle>
            <DialogContent>
                <Typography variant={'h6'} style={{textAlign: "center"}}>
                    {confirmModal.title}
                </Typography>
            </DialogContent>
                <Typography variant={'subtitle2'} style={{textAlign: "center"}}>
                    {confirmModal.subTitle}
                </Typography>
            <DialogActions>
                <button
                    type="button"
                    className="btn btn-secondary m-2 float-end"
                    onClick={() =>
                        setConfirmModal({...confirmModal, isOpen: false})
                    }
                >
                    No
                </button>
                <button
                    type="button"
                    className="btn btn-danger m-2 float-end"
                    onClick={confirmModal.onConfirm}
                >
                    Yes
                </button>
            </DialogActions>
        </Dialog>
    );
}