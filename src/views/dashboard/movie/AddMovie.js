import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
import { storage } from '../../../config/firebase'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';


const regexName = /^[a-zA-Z0-9]+$/;


function AddMovie() {
      const [name, setName] = useState();
      const [imageUrl, setImageUrl] = useState();
      const [categories, setCategories] = useState();
      const [description, setDescription] = useState();
      const [videoUrl, setVideoaUrl] = useState();
      const [year, setYear] = useState();
      const [duration, setDuration] = useState();
      const [imdb, setImdb] = useState();
      const [dateShow, setDateShow] = useState();

      const [image, setImage] = useState(null);
      const [video, setVideo] = useState(null);
      const [categoryList, setCategoryList] = useState([]);
      const [isNameValid, setIsNameVadid] = useState(true);
      const [isVideoUploadSucces, setIsVideoUploadSuccess] = useState(false);
      const handleChangeName = (e) => {
            const value = e.target.value;
            setName(value);
            if (regexName.test(value)) {
                  setIsNameVadid(true);
            } else {
                  setIsNameVadid(false);
            }
      }
      const handleChangeImage = (e) => {
            setImage(e.target.files[0]);
      }
      const uploadImage = async () => {
            if (image === null) {
                  return;
            }
            let imageName = image.name + v4();
            const imageRef = ref(storage, `images-movie/${imageName}`);
            await uploadBytes(imageRef, image).then(() => {
                  console.log("upload image success");
            })
            await getDownloadURL(ref(storage, `images-movie/${imageName}`))
                  .then((url) => {
                        setImageUrl(url);
                  })

      }
      const handleChangeVideo = (e) => {
            const file = e.target.files[0];
            setVideo(file);
      }
      const handleSubmitVideo = () => {
            if (video === null) {
                  return;
            }
            const videoRef = ref(storage, `videos-movie/${video?.name + v4()}`)
            const uploadTask = uploadBytesResumable(videoRef, video)

            uploadTask.on('state_changed', (snapshot) => {
                  let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  console.log(progress)
            }, (error) => {
                  console.log("error " + error)
            }, () => {
                   getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                        setVideoaUrl(downloadURL);
                        setIsVideoUploadSuccess(true);
                        console.log(downloadURL);
                  }
                  )
            })
      }
      const handleSubmit = (e) => {
            uploadImage();
            const newMovie = {
                  name: name,
                  description: description,
                  duration: duration,
                  year: year,
                  imdb: imdb,
                  imageUrl: imageUrl,
                  url: videoUrl,
                  dateRelease: dateShow,
                  categoryList: categories,
            }
            console.log(newMovie);
      }
      console.log(video);
      return (
            <>
                  <Container fluid>
                        <Row>
                              <Col sm="12">
                                    <Card>
                                          <Card.Header className="d-flex justify-content-between">
                                                <Card.Header.Title>
                                                      <h4 className="card-title">Add Movie</h4>
                                                </Card.Header.Title>
                                          </Card.Header>
                                          <Card.Body>
                                                <Form>
                                                      <Row>
                                                            <Col lg="7">
                                                                  <Row>
                                                                        <Form.Group className="col-12">
                                                                              Name
                                                                              <Form.Control type="text" placeholder="Title"
                                                                                    onChange={handleChangeName} />
                                                                        </Form.Group>
                                                                        {isNameValid ?
                                                                              "" :
                                                                              <div>Name not consist of speacial characters</div>}

                                                                        <div className="col-12 form_gallery form-group" style={{ marginTop: 10 }}>
                                                                              <div id="gallery2" htmlFor="form_gallery-upload">Upload Image</div>
                                                                              <input data-name="#gallery2" id="form_gallery-upload" className="form_gallery-upload"
                                                                                    type="file" accept=".png, .jpg, .jpeg"
                                                                                    onChange={handleChangeImage} />
                                                                        </div>
                                                                        <Row className='col-12'>
                                                                              <div className='col-12'>
                                                                                    <div>Choose Categories</div>
                                                                                    <div sm="6" className="form-group" style={{ marginLeft: 20 }}>
                                                                                          <div className="form-check">
                                                                                                <input
                                                                                                      className="form-check-input"
                                                                                                      type="checkbox"
                                                                                                      defaultValue={1}
                                                                                                      id="flexCheckDefault"
                                                                                                />
                                                                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                                                      1
                                                                                                </label>
                                                                                          </div>
                                                                                          <div className="form-check">
                                                                                                <input
                                                                                                      className="form-check-input"
                                                                                                      type="checkbox"
                                                                                                      defaultValue={2}
                                                                                                      id="flexCheckDefault"
                                                                                                />
                                                                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                                                      2
                                                                                                </label>
                                                                                          </div>
                                                                                          <div className="form-check">
                                                                                                <input
                                                                                                      className="form-check-input"
                                                                                                      type="checkbox"
                                                                                                      defaultValue={3}
                                                                                                      id="flexCheckDefault"
                                                                                                />
                                                                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                                                      3
                                                                                                </label>
                                                                                          </div>
                                                                                          <div className="form-check">
                                                                                                <input
                                                                                                      className="form-check-input"
                                                                                                      type="checkbox"
                                                                                                      defaultValue={4}
                                                                                                      id="flexCheckDefault"
                                                                                                />
                                                                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                                                      4
                                                                                                </label>
                                                                                          </div>
                                                                                          <div className="form-check">
                                                                                                <input
                                                                                                      className="form-check-input"
                                                                                                      type="checkbox"
                                                                                                      defaultValue={5}
                                                                                                      id="flexCheckDefault"
                                                                                                />
                                                                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                                                      5
                                                                                                </label>
                                                                                          </div>
                                                                                    </div>
                                                                              </div>
                                                                        </Row>
                                                                        <Form.Group className="col-12" >
                                                                              Description
                                                                              <Form.Control as="textarea" id="text" name="text" rows="5"
                                                                                    placeholder="Description" onChange={(e) => {
                                                                                          setDescription(e.target.value)
                                                                                    }}></Form.Control>
                                                                        </Form.Group>
                                                                  </Row>
                                                            </Col>
                                                      </Row>
                                                      <Row>
                                                            <Col sm="7" className="form-group" >
                                                                  <div style={{ marginTop: 15 }}>
                                                                        <div>Upload video</div>
                                                                        <div className="form_video-upload">
                                                                              <input type="file" accept="video/mp4,video/x-m4v,video/*"
                                                                                    onClick={(e) => handleChangeVideo(e)} />
                                                                        </div>
                                                                        {isVideoUploadSucces ? <div>Video Upload Success</div> : ""}
                                                                        <Button type="button" variant="primary" onClick={handleSubmitVideo}>Upload</Button>
                                                                  </div>
                                                            </Col>
                                                            <Col sm="7" className="form-group" style={{ marginTop: 10 }}>
                                                                  Release Year
                                                                  <Form.Control type="text" placeholder="Release year" onChange={(e) => {
                                                                        setYear(e.target.value);
                                                                  }} />
                                                            </Col>
                                                            <Col sm="7" className="form-group" style={{ marginTop: -5 }}>
                                                                  Duration
                                                                  <Form.Control type="" placeholder="Movie Duration" onChange={(e) => {
                                                                        setDuration(e.target.value);
                                                                  }} />
                                                            </Col>
                                                            <Col sm="7" className="form-group" style={{ marginTop: -5 }}>
                                                                  Imdb
                                                                  <Form.Control type="" placeholder="Imdb Point" onChange={(e) => {
                                                                        setImdb(e.target.value);
                                                                  }} />
                                                            </Col>
                                                            <Col sm="7" className="form-group" style={{ marginTop: -5 }}>
                                                                  Date Show
                                                                  <input type="date" onChange={(e) => {
                                                                        setDateShow(e.target.value);
                                                                  }} />
                                                            </Col>
                                                            <Form.Group className="col-12">
                                                                  <Button type="button" variant="primary" onClick={handleSubmit}>Submit</Button>{' '}
                                                                  <Button type="reset" variant="danger">Cancel</Button>
                                                            </Form.Group>
                                                      </Row>
                                                </Form>
                                          </Card.Body>
                                    </Card>
                              </Col>
                        </Row >
                  </Container >
            </>
      )
}

export default AddMovie;