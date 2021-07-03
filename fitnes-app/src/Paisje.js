import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddPaiModal} from './AddPaiModal';
import {EditPaiModal} from './EditPaiModal';

export class Paisje extends Component{

    constructor(props){
        super(props);
        this.state={pais:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:37026/api/'+'paisje')
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
            fetch('http://localhost:37026/api/'+'paisje/'+paiid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            }).then(() => {
                this.refreshList();
            })
        }
    }
    render(){
        const {pais, paiid,painame,pes,photoofpaisje}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>PaisjeId</th>
                        <th>PaisjeName</th>
                        <th>Pesha</th>
                       
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pais.map(pai=>
                            <tr key={pai.PaisjeId}>
                                <td>{pai.PaisjeId}</td>
                                <td>{pai.PaisjeName}</td>
                                <td>{pai.Pesha}</td>
                          
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
       paiid:pai.PaisjeId,painame:pai.PaisjeName,pes:pai.Pesha,
        photoofpaisje:pai.PhotoOfPaisje})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deletePai(pai.PaisjeId)}>
            Delete
        </Button>

        <EditPaiModal show={this.state.editModalShow}
        onHide={editModalClose}
        paiid={paiid}
        painame={painame}
        pes={pes}
        photoofpaisje={photoofpaisje}
        
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Paisje</Button>

                    <AddPaiModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}