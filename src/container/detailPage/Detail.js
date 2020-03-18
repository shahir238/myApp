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
      .catch(error => console.log(error));
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
            <Jumbotron
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1387bd"
              }}
            >
              <span>
                <Button onClick={this.homeRoute} color="success">
                  Home
                </Button>
              </span>
              <h1
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {e.title}
              </h1>
            </Jumbotron>
            <div key={i}>
              <UncontrolledCarousel items={this.state.images} />
              <p style={{ textAlign: "justify", margin: "2px 10px 0px 10px" }}>
                <h4>
                  Rate: ${e.price}
                  <br></br>
                  Contact: {e.contact}
                </h4>
                <p style={{ lineHeight: "50px" }}>
                  {e.description}
                  "But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness. No one rejects, dislikes,
                  or avoids pleasure itself, because it is pleasure, but because
                  those who do not know how to pursue pleasure rationally
                  encounter consequences that are extremely painful. Nor again
                  is there anyone who loves or pursues or desires to obtain pain
                  of itself, because it is pain, but because occasionally
                  circumstances occur in which toil and pain can procure him
                  some great pleasure. To take a trivial example, which of us
                  ever undertakes laborious physical exercise, except to obtain
                  some advantage from it? But who has any right to find fault
                  with a man who chooses to enjoy a pleasure that has no
                  annoying consequences, or one who avoids a pain that produces
                  no resultant pleasure?"
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
                  @Shaheer & Group
                </Col>
              </Row>
            </CardFooter>
          </>
        ))}
      </div>
    );
  }
}
