import { ListItem, List, ListItemText,Paper,InputBase,IconButton, makeStyles,setProteinItems,ListItemSecondaryAction} from '@material-ui/core';
import React ,{useState, useEffect}from 'react'
import { createAPIEndpoint, ENDPIONTS } from '../../api';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles (theme => ({
    searchPaper:{
        padding:'2px 4px',
        display: 'flex',
        alignItems:'center',
    },
    searchInput:{
        marginLeft:theme.spacing(1.5),
        flex:1,
    },
    listRoot:{
        marginTop: theme.spacing(1),
        maxHeight:450,
        overflow:'auto',
        '& li:hover':{
            cursor:'pointer',
            backgroundColor:'#F8AFA6'
        },
        '& li:hover .MuiButtonBase-root':{
            display:'block',
            color:'#000',
        },
        '& .MuiButtonBase-root':{
            display:'none'
        },
        '& .MuiButtonBase-root:hover':{
            backgroundColor:'transparent'
        }
    }
}))

export default function SearchProteinItems(props) {

    const {  values, setValues } = props;

    let orderedProteinItems = values.orderDetails;

    const [proteinItems, setProteinItems] = useState([]);
    const [searchList,setSearchList]= useState([]);
    const [searchKey, setSearchKey]= useState('');
    const classes = useStyles();

    useEffect(()=>{
        createAPIEndpoint(ENDPIONTS.PROTEINITEM).fetchAll()
        .then(res => {
            setProteinItems(res.data);
            setSearchList(res.data);
        })
        .catch(err => console.log(err))
    },[])

    useEffect(()=>{

        let x = [...proteinItems];
        x=x.filter(y=>{
            return y.proteinItemName.toLowerCase().includes(searchKey.toLowerCase())
            && orderedProteinItems.every(item => item.proteinItemId != y.proteinItemId)
        });
        setSearchList(x);

    },[searchKey, orderedProteinItems])

    const addProteinItem= proteinItem => {
        let x ={
        //  orderMasterId: values.orderMasterId,
          orderDetailId:0,
          proteinItemId:proteinItem.proteinItemId,
          quantity:1,
          proteinItemPrice:proteinItem.price,
          proteinItemName: proteinItem.proteinItemName,

        }
        setValues({
            ...values,
            orderDetails:[...values.orderDetails, x]

        })
    }
 
    
    return (
        <>
        <Paper className = {classes.searchPaper}>
            <InputBase
            className={classes.searchInput}
            value={searchKey}
            onChange={e=> setSearchKey(e.target.value)}
            placeholder = "Search protein items"/>
            <IconButton>
            <SearchTwoToneIcon/>
            </IconButton>
        </Paper>
       <List className={classes.listRoot}> 
           {
               searchList.map((item,idx)=>(
                   <ListItem
                   key={idx}
                        onClick={ e =>addProteinItem(item)}>
                       <ListItemText
                       primary={item.proteinItemName }
                       secondary={'$'+item.price} />
                       <ListItemSecondaryAction>
                           <IconButton onClick={ e =>addProteinItem(item)}>
                         <PlusOneIcon/>
                         <ArrowForwardIosIcon/>
                           </IconButton>
                       </ListItemSecondaryAction>
                   </ListItem>
               ))
           }
       </List>
       </>
    )
}
