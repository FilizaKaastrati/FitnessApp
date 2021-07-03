import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles,Typography,IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    DialogWrapper:{
        padding:theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    DialogTitle:{
        paddingRight:'0px'
    }
}))

export default function Popup(props){
    const {title, children, openPopup, setPopup}=props;
    const classes = useStyles();
return(
<Dialog open={openPopup} maxWidth="md" classes={{paper: classes.DialogWrapper}}>
    <DialogTitle className={classes.DialogTitle}>
        <div style={{display:'flex'}}>
            <Typography variant="h6" component="div" style={{
                flexGrow:1}}>
                    {title}
            </Typography>
            <IconButton
            onClick = {() =>  {setPopup(false)
            }}>
                <CloseIcon/>
            </IconButton>
        </div>
    </DialogTitle>
    <DialogContent dividers>
        {children}
    </DialogContent>
</Dialog>
)
}