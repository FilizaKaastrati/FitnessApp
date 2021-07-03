import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import "./index.css";
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddFitModal} from './AddFitModal';
import {EditFitModal} from './EditFitModal';

export class Fitnes extends Component{

    constructor(props){
        super(props);
        this.state={fits:[], addModalShow:false, editModalShow:false};
    }
    
    refreshList(){
        fetch('http://localhost:37026/api/'+ 'fitnes')
        .then(Response => Response.json())
        .then(data => {
            this.setState({fits:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
    componentDidUpdate(){
        //this.refreshList();
    }
    deleteFit(fitid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:37026/api/'+ 'fitnes/'+fitid, {
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
        })
    }
}

    render(){
        const {fits, fitid,fitname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped hover size="sm">
                    <thead>
                        <tr>
                        <th>FitnesId</th>
                        <th>FitnesName</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fits.map(fit=>
                            <tr key={fit.FitnesId}>
                                <td>{fit.FitnesId}</td>
                                <td>{fit.FitnesName}</td>
                               <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,fitid:fit.FitnesId,fitname:fit.FitnesName})}>
        Edit
    </Button>

    <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteFit(fit.FitnesId)}>
        Delete
    </Button>

    <EditFitModal show={this.state.editModalShow}
        onHide={editModalClose}
        fitid={fitid}
        fitname={fitname}/>
       
</ButtonToolbar>

                               </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Fitnes
                    </Button>
                    <AddFitModal show={this.state.addModalShow}
                    onHide={addModalClose}>

                    </AddFitModal>
                </ButtonToolbar>
            </div>
        )
    }
}
