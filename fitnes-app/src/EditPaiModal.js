import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditPaiModal extends Component{
    constructor(props){
        super(props);
        this.state={pess:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photoofpaisje = "./anonymous.png";
    imagesrc = 'http://localhost:37026/api/'+this.photoofpaisje;

    componentDidMount(){
        fetch('http://localhost:37026/api/'+'pesha')
        .then(response=>response.json())
        .then(data=>{
            this.setState({pess:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:37026/api/'+'paisje',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                PaisjeId:event.target.PaisjeId.value,
                PaisjeName:event.target.PaisjeName.value,
                Pesha:event.target.Pesha.value,
                
                PhotoOfPaisje:this.photoofpaisje

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
        this.photoofpaisje=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch('http://localhost:37026/api/'+'Paisje/SaveFile',{
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
            Edit Paisje
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="PaisjeId">
                        <Form.Label>PaisjeId</Form.Label>
                        <Form.Control type="text" name="PaisjeId" required 
                        placeholder="PaisjeId"
                        disabled
                        defaultValue={this.props.paiid}/>
                    </Form.Group>

                    <Form.Group controlId="PaisjeName">
                        <Form.Label>PaisjeName</Form.Label>
                        <Form.Control type="text" name="PaisjeName" required 
                        defaultValue={this.props.painame}
                        placeholder="PaisjeName"/>
                    </Form.Group>

                    <Form.Group controlId="Pesha">
                        <Form.Label>Pesha</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.pes}>
                        {this.state.pess.map(pes=>
                            <option key={pes.PeshaId}>{pes.PeshaName}</option>)}
                        </Form.Control>
                    </Form.Group>

                 

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Paisje
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" 
                src={'http://localhost:37026/Photos/'+this.props.photoofpaisje}/>
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