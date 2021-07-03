import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditPasModal extends Component{
    constructor(props){
        super(props);
        this.state={fits:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "./anonymous.png";
    imagesrc = 'http://localhost:37026/api/'+this.photofilename;

    componentDidMount(){
        fetch('http://localhost:37026/api/'+'fitnes')
        .then(response=>response.json())
        .then(data=>{
            this.setState({fits:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:37026/api/'+'pastruesi',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
               PastruesId:event.target.PastruesId.value,
                PastruesName:event.target.PastruesName.value,
                Fitnes:event.target.Fitnes.value,
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

        fetch('http://localhost:37026/api/'+'Pastruesi/SaveFile',{
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
            Edit Pastruesi
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="PastruesId">
                        <Form.Label>PastruesId</Form.Label>
                        <Form.Control type="text" name="PastruesId" required 
                        placeholder="PastruesId"
                        disabled
                        defaultValue={this.props.pasid}/>
                    </Form.Group>

                    <Form.Group controlId="PastruesName">
                        <Form.Label>PastruesName</Form.Label>
                        <Form.Control type="text" name="PastruesName" required 
                        defaultValue={this.props.pasname}
                        placeholder="PastruesName"/>
                    </Form.Group>

                    <Form.Group controlId="Fitnes">
                        <Form.Label>Fitnes</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.fit}>
                        {this.state.fits.map(fit=>
                            <option key={fit.FitnesId}>{fit.FitnesName}</option>)}
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
                            Update Pastruesi
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