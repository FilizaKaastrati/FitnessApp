import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddKliModal} from './AddKliModal';
import {EditKliModal} from './EditKliModal';

export class Klienti extends Component{

    constructor(props){
        super(props);
        this.state={klis:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:37026/api/'+'klienti')
        .then(response=>response.json())
        .then(data=>{
            this.setState({klis:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        // this.refreshList();
    }

    deleteKli(kliid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:37026/api/'+'klienti/'+ kliid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            }).then(() => {
                this.refreshList();
            })
        }
    }
    render(){
        const {klis, kliid,kliname,tra,photofilename,doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>KlientId</th>
                        <th>KlientName</th>
                        <th>Trainer</th>
                        <th>DateOfJoining</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {klis.map(kli=>
                            <tr key={kli.KlientId}>
                                <td>{kli.KlientId}</td>
                                <td>{kli.KlientName}</td>
                                <td>{kli.Trainer}</td>
                                <td>{kli.DateOfJoining}</td>
                                <td>
<ButtonToolbar>
<Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        kliid:kli.KlientId,kliname:kli.KlientName,tra:kli.Trainer,
        photofilename:kli.PhotoFileName,doj:kli.DateOfJoining})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteKli(kli.KlientId)}>
            Delete
        </Button>

        <EditKliModal show={this.state.editModalShow}
        onHide={editModalClose}
        kliid={kliid}
        kliname={kliname}
        tra={tra}
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
                    Add Klient</Button>

                    <AddKliModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}