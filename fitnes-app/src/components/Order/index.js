import { Grid,removeProteinItem ,Typography} from '@material-ui/core';
import React from 'react'
import useForm from '../../hooks/useForm';
import OrderForm from './OrderForm';
import SearchProteinItems from './SearchProteinItems';
import OrderedProteinItems from './OrderedProteinItems';
//import { useForm } from '../..useForm/hooks/useForm';

const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

const getFreshModelObject = () =>({
 orderMasterId:0,
 orderNumber: generateOrderNumber(),
 customerId:0,
 pMethod: 'none',
 gTotal: 0,
 deletedOrderItemIds:'',
 orderDetails: []

})

export default function Order() {
   
    const{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls 
      } = useForm(getFreshModelObject);

 
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <OrderForm
                {...{values, 
                    setValues,
                    errors,
                    setErrors,
                    handleInputChange,
                    resetFormControls
                }}
                />
            </Grid>
      
            <Grid item xs={6}>
                <SearchProteinItems 
                {...{
                    values,
                    setValues}}
                />
            </Grid> 

            <Grid item xs={6}>
                <OrderedProteinItems 
                {...{ 
                    values,
                    setValues
                }}
                />
            </Grid>
        </Grid>
        
    )
}
