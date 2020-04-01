import React, { Component } from "react";
import {
  Jumbotron,
  UncontrolledCarousel,
  Button,
  CardFooter,
  Row,
  Col
} from "reactstrap";
import { db } from "../../component/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";

export default class Detail extends Component {
  state = {
    Item: [],
    images: [],
    linkItem: []
  };

  componentDidMount() {
    console.log(this.state.Item);
    console.log(this.state.images);
    console.log(this.state.linkItem);
    db.collection("items")
      .get()
      .then(snapshot => {
        let Item = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          Item.push(data);
        });

        this.setState({
          Item
        });
        const linkItem = this.state.Item.filter(
          ite => ite.id == this.props.match.params.id
        );
        let tempImages = [];
        linkItem &&
          linkItem[0].url.map((e, i) =>
            tempImages.push({
              src: e,
              altText: "Slide" + i,
              caption: "Slide" + i
            })
          );
        this.setState({ linkItem, images: tempImages });
        console.log("link item", this.state.linkItem);
        console.log("ITem props", this.props.match.params.id);
      })
      .catch(error => console.log({ error }));
  }

  homeRoute = () => {
    console.log("Home props", this.props);
    this.props.history.push("/");
  };
  render() {
    console.log(this.props);
    return (
      <div>
        {this.state.linkItem.map((e, i) => (
          <>
          <Jumbotron style={{backgroundColor:'#1387bd'}} className="jumbotron" fluid>
      {/* <Navbar className="myBar" light  expand="sm">
        <Nav className="mr-auto" navbar> */}
          {/* <NavItem> */}
      <h2 className="head2">{e.title}</h2>
      {/* </NavItem>
      </Nav>
      </Navbar> */}
     <Button className="home" color='success'  onClick={this.homeRoute} >Home</Button>
      </Jumbotron>
            <div key={i}>

              <UncontrolledCarousel width="100px" items={this.state.images} />
              <p style={{ textAlign: "justify", margin: "2px 10px 0px 10px" }}>
                <h4>
                  Rate: ${e.price}
                  <br></br>
                  Contact: {e.contact}
                </h4>
                <p style={{ lineHeight: "50px" }}>
                
                  {e.description}
                 
                </p>
              </p>
            </div>

            <CardFooter style={{ backgroundColor: "#9aa3a6", height: "150px" }}>
              <Row>
                <Col sm={4} md={6} lg={12}>
                  <FontAwesomeIcon
                    style={{ marginLeft: "20%" }}
                    className="fa-2x"
                    icon={faFacebookF}
                  />
                  <FontAwesomeIcon
                    className="fa-2x"
                    style={{ marginLeft: "15%" }}
                    icon={faTwitter}
                  />
                  <FontAwesomeIcon
                    className="fa-2x"
                    style={{ marginLeft: "15%" }}
                    icon={faLinkedinIn}
                  />
                  <FontAwesomeIcon
                    className="fa-2x"
                    style={{ marginLeft: "15%" }}
                    icon={faYoutube}
                  />{" "}
                </Col>
              </Row>
              <Row>
                <Col style={{ paddingLeft: "400px" }} sm={1} md={6} lg={6}>
                  Site by DigitalLeap Creative.
                </Col>
                <Col sm={1} md={6} lg={6}>
                  All Rights Reserved{" "}
                </Col>
              </Row>
              <Row>
                <Col style={{ paddingLeft: "43%" }} sm={1} md={12} lg={12}>
                  @Shaheer and Group
                </Col>
              </Row>
            </CardFooter>
          </>
        ))}
      </div>
    );
  }
}
