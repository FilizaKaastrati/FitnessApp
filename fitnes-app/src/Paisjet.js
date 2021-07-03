import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddPaiModal} from './AddPaiModal';
import {EditPaiModal} from './EditPaiModal';

export class Paisjet extends Component{

    constructor(props){
        super(props);
        this.state={pais:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:37026/api/'+'paisjet')
        .then(response=>response.json())
        .then(data=>{
            this.setState({pais:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        // this.refreshList();
    }

    deletePai(paiid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:37026/api/'+'paisjet/'+ paiid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            }).then(() => {
                this.refreshList();
            })
        }
    }
    render(){
        const {pais, paiid,painame,pes}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>PaisjetId</th>
                        <th>PaisjetName</th>
                        <th>Pesha</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pais.map(pai=>
                            <tr key={pai.PaisjetId}>
                                <td>{pai.PaisjetId}</td>
                                <td>{pai.PaisjetName}</td>
                                <td>{pai.Pesha}</td>
                                <td>
<ButtonToolbar>
<Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        paiid:pai.PaisjetId,painame:pai.PaisjetName,pes:pai.Pesha,
       })}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deletePes(pai.PaisjetId)}>
            Delete
        </Button>

        <EditPaiModal show={this.state.editModalShow}
        onHide={editModalClose}
        paiid={paiid}
        painame={painame}
        pes={pes}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Paisjet</Button>

                    <AddPaiModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}