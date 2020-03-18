import React, { Component } from "react";
import { Button, Input, Label, FormGroup, Row, Col } from "reactstrap";
import "./imageUpload.css";
export class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: []
      // urls: [],
      // progress: 0,
      // load: false
    };
    // console.log("progress", this.state.progress);
    // console.log("spinner", this.state.image);
  }

  componentDidUpdate() {
    console.log("Images", this.state.image);
    // console.log("shaheer Url",this.state.urls);
  }

  handleChange = e => {
    const { image } = this.state;

    const images = e.target.files;
    this.setState({ image: [...image, ...images] });
    console.log({ images });
    console.log(this.state.image);
    this.props.myImg(images);
  };

  imageDelete = i => {
    let image = this.state.image;
    image.splice(i, 1);
    this.setState({ image });
  };

  render() {
    return (
      <FormGroup>
        <Label>Upload Image</Label>
        <Input type="file" multiple onChange={this.handleChange} />

        <Row>
          {this.state.image.length !== 0
            ? [
                this.state.image.map((e, i) => (
                  <Col key={i} md={4} sm={2} lg={4}>
                    <span>
                      <Button
                        style={{ backgroundColor: "red" }}
                        onClick={() => this.imageDelete(i)}
                      >
                        Delete
                      </Button>
                      <img
                        onClick={() => this.imageDelete(i)}
                        alt="myImages"
                        width="150"
                        height="150"
                        src={URL.createObjectURL(e)}
                      />
                    </span>
                  </Col>
                ))
              ]
            : [<img key={this.props} alt="demo" src="http://placehold.it/150x150" />]}
        </Row>
      </FormGroup>
    );
  }
}

export default ImageUploader;
