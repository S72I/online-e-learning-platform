'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import CustomLoading from './CustomLoading';

interface CommonDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    content: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    confirmColor?: 'primary' | 'secondary' | 'error' | 'success';
    backdropSx?: object;
}

const CustomDialog: React.FC<CommonDialogProps> = ({
    open,
    onClose,
    onConfirm,
    title,
    content,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isLoading = false,
    confirmColor = 'primary',
    backdropSx = {},
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            slotProps={{
                backdrop: {
                    sx: backdropSx,
                },
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isLoading}>
                    {cancelText}
                </Button>
                <Button
                    onClick={onConfirm}
                    color={confirmColor}
                    disabled={isLoading}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minWidth: 100,
                    }}
                >
                    {isLoading ? <CustomLoading sx={{ mt: 5, display: 'block', mx: 'auto' }} />
                        : confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomDialog;
