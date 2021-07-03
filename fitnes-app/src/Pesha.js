import React,{Component} from 'react';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import {AddPesModal} from './AddPesModal';
import {EditPesModal} from './EditPesModal';


export class Pesha extends Component{

    constructor(props){
        super(props);
        this.state={pess:[], addModalShow:false, editModalShow:false};
    }
    
    refreshList(){
        fetch('http://localhost:37026/api/'+ 'pesha')
        .then(Response => Response.json())
        .then(data => {
            this.setState({pess:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
    componentDidUpdate(){
        //this.refreshList();
    }
    deletePes(pesid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:37026/api/'+ 'pesha/'+pesid, {
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
        })
    }
}

    render(){
        const {pess, pesid,pesname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped hover size="sm">
                    <thead>
                        <tr>
                        <th>PeshaId</th>
                        <th>KG</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pess.map(pes=>
                            <tr key={pes.PeshaId}>
                                <td>{pes.PeshaId}</td>
                                <td>{pes.PeshaName}</td>
                               <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,pesid:pes.PeshaId,pesname:pes.PeshaName})}>
        Edit
    </Button>

    <Button className="mr-2" variant="danger"
    onClick={()=>this.deletePes(pes.PeshaId)}>
        Delete
    </Button>

    <EditPesModal show={this.state.editModalShow}
        onHide={editModalClose}
        pesid={pesid}
        pesname={pesname}/>
       
</ButtonToolbar>

                               </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Pesha
                    </Button>
                    <AddPesModal show={this.state.addModalShow}
                    onHide={addModalClose}>

                    </AddPesModal>
                </ButtonToolbar>
            </div>
        )
    }
}