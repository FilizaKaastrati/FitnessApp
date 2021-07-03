import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class AddPaiModal extends Component{
    constructor(props){
        super(props);
        this.state={pais:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photoofpaisje = "./anonymous.png";
    imagesrc = 'http://localhost:37026/Photos/'+this.photoofpaisje;

    componentDidMount(){
        fetch('http://localhost:37026/api/'+'pesha')
        .then(response=>response.json())
        .then(data=>{
            this.setState({pais:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:37026/api/'+'paisje',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
               Id:null,
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
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Paisje
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="PaisjeName">
                        <Form.Label>PaisjeName</Form.Label>
                        <Form.Control type="text" name="PaisjeName" required 
                        placeholder="PaisjeName"/>
                    </Form.Group>

                    <Form.Group controlId="Pesha">
                        <Form.Label>Pesha</Form.Label>
                        <Form.Control as="select">
                        {this.state.pais.map(pes=>
                            <option key={pes.PeshaId}>{pes.PeshaName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    
                       
                        
                 

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Paisje
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" src={this.imagesrc}/>
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