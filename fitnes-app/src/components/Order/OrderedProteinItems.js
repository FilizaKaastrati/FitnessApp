import React from 'react'
import { List,ListItemText, Paper,ListItem,ListItemSecondaryAction,IconButton, Button,ButtonGroup, makeStyles } from '@material-ui/core';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import {roundTo2DecimalPoint} from "../../utils";

const useStyles = makeStyles(theme =>({
    paperRoot:{
        margin: '15px 0px',
       
        '&:hover':{
            cursor:'pointer'
        },
        '&:hover $deleteButton':{
            display:'block'
    }
},
ButtonGroup:{
    backgroundColor:'#F8AFA6',
    borderRadius:8,

    '& .MuiButtonBase-root':{
        border:'none',
        minWidth:'25px',
        padding:'1px'
},
     '& button:nth-chils(2)':{
         fontSize:'1.2em',
         color:'#000'
     }
    },
       deleteButton:{
           display:'none',
           '& .MuiButtonBase-root':{
               color:'#F8AFA6'
       }
    },
        totalPerItem:{
            fontWeight:'bolder',
            fontSize:'1.2em',
            margin:'0px 10px'
        }
}))

export default function OrderedProteinItems(props) {
    const { values, setValues,removeProteinItem}=props;
    const classes = useStyles();

    let orderedProteinItems = values.orderDetails;

    const removeProteinItems = (index, id)=>{
        let x ={...values};
        x.orderDetails = x.orderDetails.filter((_,i)=> i != index);
        if(id != 0)
        x.deletedOrderItemIds +=  + id+ ',';
        setValues({...x});
    }

  const updateQuantity = (idx, value) => {
    let x ={...values};
    let proteinItem =  x.orderDetails[idx];
    if(  proteinItem.quantity + value >0){
        proteinItem.quantity += value;
      setValues({...x});
    }

  }
    return (
        <List>
            {orderedProteinItems.length ==0 ?
            <ListItem>
                <ListItemText 
                primary = "Please Select Protein Items"
                primaryTypographyProps={{
                    style: {
                        textAlign: 'center',
                        fontStyle: 'italic'
                    }
                }}
                />
                
            </ListItem>
             :orderedProteinItems.map((item,idx) =>(
                    <Paper key ={idx} className={classes.paperRoot}>
                        <ListItem>
                            <ListItemText
                            primary = {item.proteinItemName}
                            primaryTypographyProps={{
                                component:'h1',
                            style:{
                                fontWeight:'500',
                                fontSize:'1.2em'    
                                }
                            }}
                            secondary ={
                                <>
                                 <ButtonGroup 
                                  className={classes.buttoGroup}
                                   size="small">
                                       <Button
                                         onClick = {e => updateQuantity(idx,-1)}
                                       >-</Button>
                                       <Button 
                                       disabled
                                       >{item.quantity}</Button>
                                       <Button
                                       onClick = {e => updateQuantity(idx,1)}
                                       >+</Button>  
                                         </ButtonGroup>   
                                         <span  className={classes.totalPerItem}>
                                             {'$' + roundTo2DecimalPoint (item.quantity * item.proteinItemPrice)}
                                         </span>
                                </>
                            }
                            secondaryTypographyProps = {{
                                component:'div'
                            }}
                            />
                            <ListItemSecondaryAction
                             className={classes.deleteButton}>
                                <IconButton
                                disableRipple
                                onClick={e => removeProteinItems(idx, item.orderDetailId)}
                                >
                                    <DeleteTwoToneIcon/>

                                </IconButton>

                            </ListItemSecondaryAction>

                            </ListItem>
                    </Paper>
                ))
            }
        </List>
    )
}
