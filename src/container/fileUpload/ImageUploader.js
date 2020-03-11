import React, { Component } from 'react'
import { storage } from '../../component/firebase';
import { Progress, Button, Input, Label, FormGroup,Row,Col } from "reactstrap";
import './imageUpload.css'
export class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
          image: [],
          urls: [],
          progress: 0,
          load: false
        };
        console.log("progress", this.state.progress);
        console.log("spinner", this.state.image);
      }
  
      componentDidUpdate(){
    console.log("Images", this.state.image);
        console.log("shaheer Url",this.state.urls);
        
        
      }
    
      handleChange = e => {
        const { image } = this.state;

        // if (e.target.files[0]) {
          const images = e.target.files;
        //   console.log({images})
          this.setState({image:[...image,...images]});
        // }

      };
    
      handleUpload =async () => {
        const { image } = this.state;
        for(var i=0; i<image.length; i++){
            console.log(image[i])
            await  storage.ref(`images/${image[i].name}`).put(image[i]).then((snapshot)=> {
                snapshot.ref.getDownloadURL().then(url => {
                    // console.log('File available at', downloadURL);
                    let {urls} =this.state;
                    this.setState({urls:[...urls,url]});
                    this.props.image(url);
               
                // this.props.progress(progress);
                    // console.log("Url",url)
                  });
                        // progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  this.setState({ progress });
              });
        }
    }
        
      
    render() {
        return (
            <FormGroup>
            <Label>Upload Image</Label>
            <Input type="file" multiple onChange={this.handleChange} />
            <Row>
              <Col md={2} lg={2}>
            <Button
              style={{ float: "left", marginTop: "15px" }}
              onClick={this.handleUpload}
              className="waves-effect waves-light mybtn"
            >
              Upload
            </Button></Col>
            <Col><Progress
            value={this.state.progress}
            max="100"
            className="myprogress"
          /></Col>

          </Row>
          <Row>
            
          {this.state.progress!==0 ?
             [this.state.urls.map(e =>(<Col key={e}  md={4} sm={2} lg={4}><img alt="myImages" width="150" height="150" src={e} /></Col>))]: [<img src="http://placehold.it/150x150" />]
          }
          </Row>
            </FormGroup>
        )
    }
}

export default ImageUploader
