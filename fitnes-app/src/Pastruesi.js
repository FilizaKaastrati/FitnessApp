import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddPasModal} from './AddPasModal';
import {EditPasModal} from './EditPasModal';

export class Pastruesi extends Component{

    constructor(props){
        super(props);
        this.state={pass:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:37026/api/'+'pastruesi')
        .then(response=>response.json())
        .then(data=>{
            this.setState({pass:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        // this.refreshList();
    }

    deletePas(pasid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:37026/api/'+'pastruesi/'+pasid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            }).then(() => {
                this.refreshList();
            })
        }
    }
    render(){
        const {pass, pasid,pasname,fit,photofilename,doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>PastruesId</th>
                        <th>PastruesName</th>
                        <th>Fitnes</th>
                        <th>DateOfJoining</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pass.map(pas=>
                            <tr key={pas.PastruesId}>
                                <td>{pas.PastruesId}</td>
                                <td>{pas.PastruesName}</td>
                                <td>{pas.Fitnes}</td>
                                <td>{pas.DateOfJoining}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        pasid:pas.PastruesId,pasname:pas.PastruesName,fit:pas.Fitnes,
        photofilename:pas.PhotoFileName,doj:pas.DateOfJoining})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deletePas(pas.PastruesId)}>
            Delete
        </Button>

        <EditPasModal show={this.state.editModalShow}
        onHide={editModalClose}
        pasid={pasid}
        pasname={pasname}
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
                    Add Pastrusi</Button>

                    <AddPasModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}