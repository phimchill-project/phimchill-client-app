import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import Card from '../../../components/Card'
import { storage } from '../../../config/firebase'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import publicApi from '../../../api/category/exportCategoryApi';
import adminApi from '../../../api/dashboard/exportAdminApi';


const regexName = /^[a-zA-Z0-9]+$/;
var categories = [];
function AddMovie() {
      const [name, setName] = useState();
      const [image, setImage] = useState();
      const [description, setDescription] = useState();
      const [videoUrl, setVideoaUrl] = useState();
      const [year, setYear] = useState();
      const [duration, setDuration] = useState();
      const [imdb, setImdb] = useState();
      const [dateShow, setDateShow] = useState();
      const [checked, setChecked] = useState(categories);
      const [imageFile, setImageFile] = useState(null);
      const [video, setVideo] = useState(null);
      const [categoryList, setCategoryList] = useState([]);
      const [isNameValid, setIsNameVadid] = useState(true);
      const [isVideoUploadSucces, setIsVideoUploadSuccess] = useState(false);
      const navigate = useNavigate();
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
            setImageFile(e.target.files[0]);

      }
      const uploadImage = async () => {
            let imageName = imageFile.name + v4();
            const imageRef = ref(storage, `images-movie/${imageName}`);
            await uploadBytes(imageRef, imageFile).then(() => {
                  console.log("upload image success");
            })
            await getDownloadURL(ref(storage, `images-movie/${imageName}`))
                  .then((url) => {
                        setImage(url);
                  })

      }
      const handleChangeVideo = (e) => {
            const file = e.target.files[0];
            setVideo(file);

      }
      const uploadMovie = async () => {
            const videoName = video?.name + v4();
            const videoRef = ref(storage, `videos-movie/${videoName}`)
            await uploadBytesResumable(videoRef, video);

            await getDownloadURL(ref(storage, `videos-movie/${videoName}`))
                  .then((url) => {
                        setVideoaUrl(url);
                  })
      }
      const handleChecked = (id) => {
            const isChecked = categories.includes(id);
            if (isChecked) {
                  categories.map(() => {
                        for (let index = 0; index < categories.length; index++) {
                              if (categories[index] === id) {
                                    categories.splice(index, 1);
                              }
                        }
                  })
                  setChecked(categories);
            } else {
                  categories.push(id);
                  setChecked(categories);
            }
      }
      const handleSubmit = async () => {
            const newMovie = {
                  name: name,
                  description: description,
                  duration: duration,
                  year: year,
                  imdb: imdb,
                  image: image,
                  url: videoUrl,
                  dateRelease: dateShow,
                  categoryList: categories,
            }
            console.log(newMovie);
            if (videoUrl != null) {
                  const isCreateSuccess = await adminApi.fetchCreateNewMoive(newMovie);
                  if (isCreateSuccess) {
                        alert("Create Movie Success");
                        navigate("/add-movie")
                  } else {
                        alert("Create Movie Fail. Back to add again in 1s");
                        setTimeout(() => {
                              navigate("/add-movie")
                        }, 1000);
                  }
            }else{
                  alert("Movie not upload finish");
            }

      }
      const fetchApiAllCategory = async () => {
            const result = await publicApi.getAllCategory();
            setCategoryList(result);
      }
      useEffect(() => {
            fetchApiAllCategory();
      }, [])
      useEffect(() => {
            if (video != null) {
                  uploadMovie();
                  setVideo(null);
            }
            if (imageFile != null) {
                  uploadImage();
                  setImageFile(null);
            }
      }, [video, imageFile])
      console.log("video" + videoUrl);
      console.log("image" + image);
      return (
            <>
                  <Container fluid>
                        <Row className="d-flex justify-content-between">
                              <Col sm="12" lg={{ span: 8, offset: 2 }}>
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
                                                                                    <div sm="6" className="form-group row" style={{ marginLeft: 20 }}>
                                                                                          {categoryList?.map((category, index) => (
                                                                                                <div className="form-check col-sm-4" key={index}>
                                                                                                      <input
                                                                                                            className="form-check-input"
                                                                                                            type="checkbox"
                                                                                                            defaultValue={category.id}
                                                                                                            id="flexCheckDefault"
                                                                                                            onChange={() => handleChecked(category.id)}
                                                                                                      />
                                                                                                      <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                                                            {category.name}
                                                                                                      </label>
                                                                                                </div>
                                                                                          ))}
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
                                                                                    onChange={(e) => handleChangeVideo(e)} />
                                                                        </div>
                                                                        {/* {isVideoUploadSucces ? <div>Video Upload Success</div> : ""}
                                                                        <Button type="button" variant="primary" onClick={handleSubmitVideo}>Upload</Button> */}
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