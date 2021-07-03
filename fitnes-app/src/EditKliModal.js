import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditKliModal extends Component{
    constructor(props){
        super(props);
        this.state={tras:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "./anonymous.png";
    imagesrc = 'http://localhost:37026/api/'+this.photofilename;

    componentDidMount(){
        fetch('http://localhost:37026/api/'+'trainer')
        .then(response=>response.json())
        .then(data=>{
            this.setState({tras:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:37026/api/'+'klienti',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                KlientId:event.target.KlientId.value,
                KlientName:event.target.KlientName.value,
                Trainer:event.target.Trainer.value,
                DateOfJoining:event.target.DateOfJoining.value,
                PhotoFileName:this.photofilename

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }


    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch('http://localhost:37026/api/'+'Klienti/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc='http://localhost:37026/Photos/'+result;
        },
        (error)=>{
            alert('Failed');
        })
        
    }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Klienti
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="KlientId">
                        <Form.Label>KlientId</Form.Label>
                        <Form.Control type="text" name="KlientId" required 
                        placeholder="KlientId"
                        disabled
                        defaultValue={this.props.kliid}/>
                    </Form.Group>

                    <Form.Group controlId="KlientName">
                        <Form.Label>KlientName</Form.Label>
                        <Form.Control type="text" name="KlientName" required 
                        defaultValue={this.props.kliname}
                        placeholder="KlientName"/>
                    </Form.Group>

                    <Form.Group controlId="Trainer">
                        <Form.Label>Trainer</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.fit}>
                        {this.state.tras.map(tra=>
                            <option key={tra.TrainerId}>{tra.TrainerName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="DateOfJoining">
                        <Form.Label>DateOfJoining</Form.Label>
                        <Form.Control 
                        type="date"
                        name="DateOfJoining"
                        required
                        placeholder="DateOfJoining"
                        defaultValue={this.props.doj}
                        />
                       
                        
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Klienti
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" 
                src={'http://localhost:37026/Photos/'+this.props.photofilename}/>
                <input onChange={this.handleFileSelected} type="File"/>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}