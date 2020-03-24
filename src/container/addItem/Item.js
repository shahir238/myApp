import React, { useState,useEffect } from "react";
// import { AuthContext } from "../../component/Auth";
import firebase from "../../component/firebase"
import {
  Button,
  Label,
  Input,
  FormGroup,
  Form,
  CardBody,
  Row,
  Col,
  Progress
} from "reactstrap";
import { db, storage } from "../../component/firebase";
import { withRouter } from "react-router-dom";

import "./item.css";
import ImageUploader from "../fileUpload/ImageUploader";

const Item = props => {
  const [currentUser,setCurrentUser] = useState(null)
  // const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser)
  }, [props])
  console.log({ jjj: props });
  const [item, setItem] = useState({
    id: Math.random() * 100 + 1,
    title: "",
    description: "",
    price: "",
    contact: "",
    url: []
  });
  const [myImages, setMyImages] = useState([]);
  const img = image => {
    console.log({ image });
    for (var i = 0; i < image.length; i++) {
      setMyImages({
        myImages: image
      });
      console.log("Arsalan Images", myImages);
    }
  };
  const [progress, setProgress] = useState(0);

  const submit = async e => {
    e.preventDefault();
    let Url = [];
    let pro = 0;
    for (var i = 0; i < myImages.myImages.length; i++) {
      await storage
        .ref(`images/${myImages.myImages[i].name}`)
        .put(myImages.myImages[i])
        .then(async snapshot => {
          await snapshot.ref.getDownloadURL().then(url => {
            // console.log('File available at', downloadURL);
            Url.push(url);
          });
          console.log(
            "bytes.......",
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          pro = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(pro);
        });
    }

    console.log({
      abc: {
        id: item.id,
        description: item.description,
        title: item.title,
        price: item.price,
        contact: item.contact,
        url: Url,
        uid: currentUser.uid
      }
    });

    const chk = {
      id: item.id,
      description: item.description,
      title: item.title,
      price: item.price,
      contact: item.contact,
      url: Url,
      uid: currentUser.uid
    };
    await db.collection("items").add(chk);

    setItem({
      id: "",
      title: "",
      description: "",
      price: "",
      contact: "",
      url: []
    });

    console.log("Items", item);

    pro === 100 && props.history.push("/");
  };

  return (
    <div className="itemmain">
      <h1 style={{ color: "#8c0ad1" }} className="header">
        Add New Item
      </h1>
      <br></br>
      <CardBody className="itembody">
        <Form onSubmit={submit}>
          <Row>
            <Col md={6} sm={4} lg={12}>
              <FormGroup>
                <Label className="itemlabel" for="title">
                  Title
                </Label>
                <Input
                  required
                  className="iteminput"
                  type="text"
                  value={item.title}
                  onChange={e =>
                    setItem({
                      id: item.id,
                      title: e.target.value,
                      description: item.description,
                      price: item.price,
                      contact: item.contact,
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
                <Label className="itemlabel" for="description">
                  Description
                </Label>
                <Input
                  required
                  className="iteminput"
                  type="textarea"
                  value={item.description}
                  onChange={e =>
                    setItem({
                      id: item.id,
                      title: item.title,
                      description: e.target.value,
                      price: item.price,
                      contact: item.contact,
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
                <Label className="itemlabel" for="price">
                  Price
                </Label>
                <Input
                  required
                  className="iteminput"
                  type="number"
                  value={item.price}
                  onChange={e =>
                    setItem({
                      id: item.id,
                      title: item.title,
                      description: item.description,
                      price: e.target.value,
                      contact: item.contact,
                      url: item.url
                    })
                  }
                  name="price"
                  id="price"
                />
              </FormGroup>
            </Col>

            <Col md={6} sm={4} lg={12}>
              <FormGroup>
                <Label className="itemlabel" for="contact">
                  contact
                </Label>
                <Input
                  required
                  className="iteminput"
                  type="number"
                  value={item.contact}
                  onChange={e =>
                    setItem({
                      id: item.id,
                      title: item.title,
                      description: item.description,
                      price: item.price,
                      contact: e.target.value,
                      url: item.url
                    })
                  }
                  name="contact"
                  id="contact"
                />
              </FormGroup>
            </Col>
          </Row>

          {/* Image upload component */}
          <ImageUploader myImg={img} />
          <Col>
            <Progress value={progress} max="100" className="myprogress" />
          </Col>
          <Row>
            {/* <Col><Progress
            value={progress}
            max="200"
            className="myprogress"
          /></Col> */}
            <Col>
              <Button className="itembutton">Create</Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </div>
  );
};

export default withRouter(Item);
