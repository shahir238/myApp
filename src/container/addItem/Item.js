import React,{useState} from 'react';
import { Button, Label,Input,FormGroup,Form, CardBody,Row,Col,Progress} from 'reactstrap';
import { db } from '../../component/firebase';
import App from '../App';

import './item.css';
import ImageUploader from '../fileUpload/ImageUploader';

const Item= () => {
const [item, setItem] = useState({
    id: Math.floor(Math.random() * 100 / 10),
    title: "",
    description: "",
    link: "",
    url: []
  });
  const [cancel,setCancel]=useState(false);
  //  const [progress,setProgress] = useState(0);
  
  const images = url => {
     setItem({
      id:item.id,
      title: item.title,
      description: item.description,
      link: item.link,
      url:item.url})
    for(var i=0; i<10; i++){
 
console.log("length",url.length)
   
       setItem({
        id:item.id,
        title: item.title,
        description: item.description,
        link: item.link,
        url:[...item.url,url]
      });
    }
  
  
  console.log("images URL",item.url);
  };

  const submit = e => {
    e.preventDefault();
    db.collection("items").add(item);
    
    
    setItem({
      id: Math.floor(Math.random() * 100 / 10),
      title: "",
      description: "",
      link: "",
      url: []
    });
    setCancel(true);
    console.log("Items", item);
    
  }
  // const handleClick=()=>{
  //   setCancel(true);
  //   console.log({cancel})
  // }

 

  return (
    (cancel===false)?
        [
        <div className="itemmain">
         
        <h1 className="header" >
         Add New Item 
        </h1>
        <br></br>
        <CardBody className="itembody">
          <Form onSubmit={submit}>
            <Row>
              <Col md={6} sm={4} lg={12}>
            <FormGroup>
              <Label className="itemlabel" for="title">Title</Label>
              <Input
              className="iteminput"
                type="text"
                value={item.title}
                onChange={e =>
                  setItem({
                    id:item.id,
                    title: e.target.value,
                    description: item.description,
                    link: item.link,
                    url: item.url
                  })
                }
                name="title"
                id="title"
              />
            </FormGroup>
            </Col>
            <Col md={6} sm={4} lg={12}>
            <FormGroup>
              <Label className="itemlabel" for="description">Description</Label>
              <Input
              className="iteminput"
                type="textarea"
                value={item.description}
                onChange={e =>
                  setItem({
                    id:item.id,
                    title: item.title,
                    description: e.target.value,
                    link: item.link,
                    url: item.url
                  })
                }
                name="description"
                id="description"
              />
            </FormGroup>
            </Col>
            <Col md={6} sm={4} lg={12}>
            <FormGroup>
              <Label className="itemlabel" for="link">Link</Label>
              <Input className="iteminput"
                type="text"
                value={item.link}
                onChange={e =>
                  setItem({
                    id:item.id,
                    title: item.title,
                    description: item.description,
                    link: e.target.value,
                    url: item.url
                  })
                }
                name="link"
                id="link"
              />
              
            </FormGroup>
            </Col>
            
            </Row>
            
            {/* Image upload component */}
            <ImageUploader image={images} />
            
            <Row>
              <Col>
              <Button  className="itembutton">Create</Button>
              </Col>
            </Row>
            
          </Form>
        </CardBody>
      
        </div>]:[<App />]
    )
}

export default Item;
