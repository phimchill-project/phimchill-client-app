import React, {useEffect, useState} from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import {useNavigate, useParams} from "react-router-dom";
import Card from '../../../components/Card'
import {storage} from '../../../config/firebase'
import {getDownloadURL, ref, uploadBytes, uploadBytesResumable} from 'firebase/storage';
import {v4} from 'uuid';
import publicApi from '../../../api/category/exportCategoryApi';
import adminApi from '../../../api/dashboard/exportAdminApi';
import movieApi from "../../../api/movie/exportMovieApi";
import routes from "../../../router/routes-path";


const regexName = /^[a-zA-Z0-9]+$/;
var categories = [];

function UpdateMovies() {
    const {movieName} = useParams();
    const [movie, setMovie] = useState({
        id: "",
        name: "",
        description: "",
        year: "",
        imdb: "",
        duration : "",
        url : "",
        image: "",
        dateRelease: "",
        categoryList: [],
    });

    const [errorMovie, setErrorMovie] = useState({
        name: false,
        description: false,
        year: false,
        imdb: false,
        duration : false,
        url : false,
        image: false,
        dateRelease: false,
        categoryList: false,
        trailer: false,
        userIdListLiked: false,
        views: false
    })

    const [isClick, setIsClick] = useState(false);

    const [videoUrl, setVideoUrl] = useState()
    const [image, setImage] = useState()
    const [checked, setChecked] = useState(categories);
    const [imageFile, setImageFile] = useState(null);
    const [video, setVideo] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [isNameValid, setIsNameVadid] = useState(true);
    const [isVideoUploadSucces, setIsVideoUploadSuccess] = useState(false);
    const navigate = useNavigate();
    const findByName = async () => {
        const data = await movieApi.findByName(movieName);
        if (data?.statusCode === 404) {
            navigate(routes.error404);
        }
        setMovie(data?.data);
    };

    const handleFieldChange = (fieldName, newValue) => {
        setMovie((prevState) => ({
            ...prevState,
            [fieldName]: newValue,
        }));
    };

    const checkValueAll = () => {
        for (let field in movie) {
            if (field === 'image' || field === 'url' || field === 'trailer' || field === 'userIdListLiked' || field === 'views')
                continue;
            checkValue(field);
        }
    };

    const checkValue = (field) => {
        if (movie[field] === null || movie[field] === '' || movie[field].length === 0 || movie[field] === undefined) {
            setErrorMovie((prevState) => ({
                ...prevState,
                [field]: true
            }))
        }else {
            setErrorMovie((prevState) => ({
                ...prevState,
                [field]: false
            }))
        }
    };

    useEffect(  () => {
        if (isClick && !Object.values(errorMovie).some(value => value === true)){
            updateMovie(movie);
            setIsClick(false);
        }
        async function updateMovie (movie) {
            const data =await movieApi.updateMovies(movie);
            if (data.statusCode === 400){
                navigate(routes.error404);
            } else if (data.statusCode === 200) {
                navigate(routes.allMovies);
            }
        }
    }, [errorMovie, movie, isClick]);

    const handleCheckboxChange = (e, categoryId) => {
        const isChecked = e.target.checked;
        const category = { id: categoryId };

        setMovie(prevState => {
            let newCategoryList = [...prevState.categoryList];

            if (isChecked) {
                if (!newCategoryList.some(item => item.id === categoryId)) {
                    newCategoryList.push(category);
                }
            } else {
                newCategoryList = newCategoryList.filter(item => item.id !== categoryId);
            }

            return { ...prevState, categoryList: newCategoryList };
        });
    };

    const handleChangeImage = (e) => {
        setImageFile(e.target.files[0]);

    }
    const uploadImage = async () => {
        let imageName = imageFile.name + v4();
        const imageRef = ref(storage, `images-movie/${imageName}`);
        await uploadBytes(imageRef, imageFile).then(() => {
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
                setVideoUrl(url);
            })
    }

    const handleSubmit = async () => {
        setIsClick(true)
        checkValueAll();
    }
    const fetchApiAllCategory = async () => {
        const result = await publicApi.getAllCategory();
        setCategoryList(result);
    }

    const handleCancel = () => {
        navigate(routes.allMovies);
    }

    const isIdSelected = (id) => {
        return movie.categoryList.some(category => category.id === id);
    };

    useEffect(() => {
        fetchApiAllCategory();
        findByName();
    }, [movieName])

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
                                                                  defaultValue={movie?.name}
                                                                  onChange={(e) => handleFieldChange('name', e.target.value)}/>
                                                </Form.Group>
                                                {isNameValid ?
                                                    "" :
                                                    <div>Name not consist of speacial characters</div>}

                                                <div className="col-12 form_gallery form-group" style={{marginTop: 10}}>
                                                    <div id="gallery2" htmlFor="form_gallery-upload">Upload Image</div>
                                                    <input data-name="#gallery2" id="form_gallery-upload"
                                                           className="form_gallery-upload"
                                                           type="file" accept=".png, .jpg, .jpeg"
                                                           onChange={handleChangeImage}/>
                                                </div>
                                                <Row className='col-12'>
                                                    <div className='col-12'>
                                                        <div>Choose Categories</div>
                                                        <div sm="6" className="form-group row" style={{marginLeft: 20}}>
                                                            {categoryList?.map((category, index) => (
                                                                <div className="form-check col-sm-4" key={index}>
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        value={category.id}
                                                                        checked={isIdSelected(category.id)}
                                                                        id="flexCheckDefault"
                                                                        onChange={(e) => {handleCheckboxChange(e, category.id)}}
                                                                    />
                                                                    <label className="form-check-label"
                                                                           htmlFor="flexCheckDefault">
                                                                        {category.name}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Row>
                                                <Form.Group className="col-12">
                                                    Description
                                                    <Form.Control as="textarea" id="text" name="text" rows="5"
                                                                  value={movie?.description}
                                                                  placeholder="Description"
                                                                  onChange={(e) => handleFieldChange('description', e.target.value)}>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="7" className="form-group">
                                            <div style={{marginTop: 15}}>
                                                <div>Upload video</div>
                                                <div className="form_video-upload">
                                                    <input type="file" accept="video/mp4,video/x-m4v,video/*"
                                                           onClick={(e) => handleChangeVideo(e)}/>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm="7" className="form-group" style={{marginTop: 10}}>
                                            Release Year
                                            <Form.Control type="text" placeholder="Release year"
                                                          value={movie?.year}
                                                          onChange={(e) => handleFieldChange('year', e.target.value)}/>
                                        </Col>
                                        <Col sm="7" className="form-group" style={{marginTop: -5}}>
                                            Duration (minutes)
                                            <Form.Control type="" placeholder="Movie Duration"
                                                          value={movie?.duration}
                                                          onChange={(e) => handleFieldChange('duration', e.target.value)}/>
                                        </Col>
                                        <Col sm="7" className="form-group" style={{marginTop: -5}}>
                                            Imdb
                                            <Form.Control type="" placeholder="Imdb Point" value={movie?.imdb}
                                                          onChange={(e) => handleFieldChange('imdb', e.target.value)}/>
                                        </Col>
                                        <Col sm="7" className="form-group" style={{marginTop: -5}}>
                                            Date Show
                                            <input type="date" value={movie?.dateRelease}
                                                   onChange={(e) => handleFieldChange('dateRelease', e.target.value)}/>
                                        </Col>
                                        <Form.Group className="col-12">
                                            <Button type="button" variant="primary"
                                                    onClick={handleSubmit}>Submit</Button>{' '}
                                            <Button type="button" variant="btn btn-danger" onClick={handleCancel}>cancel</Button>
                                        </Form.Group>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default UpdateMovies;