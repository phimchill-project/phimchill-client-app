import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import tvshowApi from "../../../api/tvshow/exportMovieApi";
import routes from "../../../router/routes-path";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Card from "../../../components/Card";
import clsx from "clsx";
import styles from "./AddTvSeries.module.scss";
import publicApi from "../../../api/category/exportCategoryApi";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../../config/firebase";
import Loading from "../../../components/common/Loading";
import adminApi from "../../../api/dashboard/exportAdminApi";
import {fetchNewTvSeries, fetchUpdateTvSeries} from "../../../api/dashboard/adminApi";


function UpdateTvSeries(){

    let navigate = useNavigate();
    const { name } = useParams();

    const [image, setImage] = useState();

    const [categoryList, setCategoryList] = useState([]);

    const [isClick, setIsClick] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const [tvSeries, setTvSeries] = useState({
        id: "",
        name: "",
        description: "",
        year: "",
        imdb: "",
        image: "",
        dateRelease: "",
        categoryList: [],
    })

    const [errorTvSeries, setErrorTvSeries] = useState({
        name: false,
        description: false,
        year: false,
        imdb: false,
        image: false,
        dateRelease: false,
        categoryList: false,
    })

    const [focusTvSeries, setFocusTvSeries] = useState({
        name: false,
        description: false,
        year: false,
        imdb: false,
        dateRelease: false,
        categoryList: false,
    })

    const handleFieldChange = (fieldName, newValue) => {
        setTvSeries((prevState) => ({
            ...prevState,
            [fieldName]: newValue,
        }));
    };

    const handleFocusChange = (fieldName, newValue) => {
        setFocusTvSeries((prevState) => ({
            ...prevState,
            [fieldName]: newValue,
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const fetchApiAllCategory = async () => {
        const result = await publicApi.getAllCategory();
        if (result !== null)
            setCategoryList(result);
    }

    useEffect(() => {
        findByName();
        fetchApiAllCategory();
    }, [name]);

    useEffect(() => {
        for (let field in focusTvSeries) {
            if (focusTvSeries[field]) {
                checkValue(field);
            }
        }
    }, [focusTvSeries, tvSeries]);

    useEffect(  () => {
        if (isClick && !Object.values(errorTvSeries).some(value => value === true)){
            console.log(tvSeries)
            newTvSeries(tvSeries);
            setIsClick(false);
        }
        async function newTvSeries (tvSeries) {
            const data =await adminApi.fetchUpdateTvSeries(tvSeries);
            console.log(data)
            if (data.statusCode === 400){
                navigate(routes.error404);
            } else if (data.statusCode === 200) {
                navigate(routes.showListTVSeries);
            }
        }
    }, [errorTvSeries, tvSeries]);

    const findByName = async () => {
        const data = await tvshowApi.findByName(name);
        if (data.statusCode === 404){
            navigate(routes.error404);
        }else if (data.statusCode === 200){
            if (data.data === null || data.data === undefined)
                navigate(routes.error404);
            setTvSeries(data.data);
            setIsLoading(false);
        }
    };

    const uploadImage = async () => {
        if (image === null || image === '' || image === undefined) {
            console.log('aaa')
            checkValue('image')
            return;
        }
        const imageRef = ref(storage, `images-movie/${tvSeries.name}/${tvSeries.name} - Avatar`);
        await uploadBytes(imageRef, image).then(() => {
        })
        await getDownloadURL(ref(storage, `images-movie/${tvSeries.name}/${tvSeries.name} - Avatar`))
            .then((url) => {
                handleFieldChange('image', url);
            })
    }

    const checkValueAll = () => {
        for (let field in tvSeries) {
            if (field !== 'image')
                checkValue(field);
        }
    };

    const checkValue = (field) => {
        if (tvSeries[field] === null || tvSeries[field] === '' || tvSeries[field].length === 0 || tvSeries[field] === undefined) {
            setErrorTvSeries((prevState) => ({
                ...prevState,
                [field]: true
            }))
        }else {
            setErrorTvSeries((prevState) => ({
                ...prevState,
                [field]: false
            }))
        }
    };

    const isIdSelected = (id) => {
        return tvSeries.categoryList.some(category => category.id === id);
    };

    const handleCheckboxChange = (e, categoryId) => {
        const isChecked = e.target.checked;
        const category = { id: categoryId };

        setTvSeries(prevState => {
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

    const handleSubmit = async () => {
        setIsClick(true)
        await uploadImage();
        checkValueAll();
    }

    const handleCancel = () => {
        navigate(routes.showListTVSeries);
    }

    return(
        <>
            {isLoading ? (
                <Loading></Loading>
            ) : (
                <>
                    <Container fluid>
                        <Row  className="d-flex justify-content-between">
                            <Col sm="12" lg={{ span: 8, offset: 2 }}>
                                <Card>
                                    <Card.Header  className="d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="card-title">Add TvSeries</h4>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Form.Group className="form-group">
                                                <Form.Label>Name TvSeries</Form.Label>
                                                <Form.Control onChange={(e) => handleFieldChange('name', e.target.value)} type="text" value={tvSeries.name}
                                                              onBlur={(e) => handleFocusChange('name', true)}
                                                              className={clsx(styles.main)} placeholder="Enter name"/>
                                                <div hidden={!errorTvSeries.name} style={{color: '#e87c03'}}>Please enter correct Email.</div>
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label>Upload image</Form.Label>
                                                <div className="custom-file">
                                                    <Form.Control onChange={handleImageChange} type="file" className="custom-file-input"/>
                                                    <Form.Label className={clsx("custom-file-label", styles.main)}>Choose file</Form.Label>
                                                    <div hidden={!errorTvSeries.image} style={{color: '#e87c03'}}>Please upload image before submit.</div>
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label>Choose Categories</Form.Label>
                                                <Row className='col-12'>
                                                    <div className='col-12'>
                                                        <div sm="6" className="form-group row" style={{ marginLeft: 20 }}>
                                                            {categoryList?.map((category, index) => (
                                                                <div className="form-check col-sm-4" key={index}>
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        value={category.id}
                                                                        checked={isIdSelected(category.id)}
                                                                        onChange={(e) => {handleCheckboxChange(e, category.id)}}
                                                                    />
                                                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                        {category.name}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Row>
                                                <div hidden={!errorTvSeries.categoryList} style={{color: '#e87c03'}}>Please select at least 1 category.</div>
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control onChange={(e) => handleFieldChange('description', e.target.value)}
                                                              onBlur={(e) => handleFocusChange('description', true)}
                                                              className={clsx(styles.main)} value={tvSeries.description} as="textarea" rows="3" placeholder="Enter Description"/>
                                                <div hidden={!errorTvSeries.description} style={{color: '#e87c03'}}>Please enter correct Description.</div>
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label>Release Year</Form.Label>
                                                <Form.Control onChange={(e) => handleFieldChange('year', e.target.value)}
                                                              onBlur={(e) => handleFocusChange('year', true)}
                                                              className={clsx(styles.main)} value={tvSeries.year} type="text" placeholder="Enter year"/>
                                                <div hidden={!errorTvSeries.year} style={{color: '#e87c03'}}>Please enter correct Year.</div>
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label>Imdb</Form.Label>
                                                <Form.Control onChange={(e) => handleFieldChange('imdb', e.target.value)}
                                                              onBlur={(e) => handleFocusChange('imdb', true)}
                                                              className={clsx(styles.main)} value={tvSeries.imdb} type="text" placeholder="Enter point"/>
                                                <div hidden={!errorTvSeries.imdb} style={{color: '#e87c03'}}>Please enter correct Imdb.</div>
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label>Release Date</Form.Label>
                                                <Form.Control onChange={(e) => handleFieldChange('dateRelease', e.target.value)}
                                                              onBlur={(e) => handleFocusChange('dateRelease', true)}
                                                              className={clsx(styles.main)} value={tvSeries.dateRelease} type="date" placeholder="yyyy-MM-dd"/>
                                                <div hidden={!errorTvSeries.dateRelease} style={{color: '#e87c03'}}>Please enter correct Date.</div>
                                            </Form.Group>
                                            <Button type="button" variant="btn btn-primary" onClick={handleSubmit}>Submit</Button>{' '}
                                            <Button type="button" variant="btn btn-danger" onClick={handleCancel}>cancel</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
        </>
    )
}

export default UpdateTvSeries;