import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddTraModal} from './AddTraModal';
import {EditTraModal} from './EditTraModal';

export class Trainer extends Component{

    constructor(props){
        super(props);
        this.state={tras:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:37026/api/'+'trainer')
        .then(response=>response.json())
        .then(data=>{
            this.setState({tras:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        // this.refreshList();
    }

    deleteTra(traid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:37026/api/'+'trainer/'+traid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            }).then(() => {
                this.refreshList();
            })
        }
    }
    render(){
        const {tras, traid,traname,fit,photofilename,doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>TrainerId</th>
                        <th>TrainerName</th>
                        <th>Fitnes</th>
                        <th>DateOfJoining</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tras.map(tra=>
                            <tr key={tra.TrainerId}>
                                <td>{tra.TrainerId}</td>
                                <td>{tra.TrainerName}</td>
                                <td>{tra.Fitnes}</td>
                                <td>{tra.DateOfJoining}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        traid:tra.TrainerId,traname:tra.TrainerName,fit:tra.Fitnes,
        photofilename:tra.PhotoFileName,doj:tra.DateOfJoining})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteTra(tra.TrainerId)}>
            Delete
        </Button>

        <EditTraModal show={this.state.editModalShow}
        onHide={editModalClose}
        traid={traid}
        traname={traname}
        fit={fit}
        photofilename={photofilename}
        doj={doj}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Trainer</Button>

                    <AddTraModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}