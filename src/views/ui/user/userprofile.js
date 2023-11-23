import React from 'react'
import { Container ,Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import user from '../../../assets/images/user/user.jpg'


const UserProfile = () => {
    // const [date, setDate] = useState(new Date());
    // const handleChange3 = date => setDate(date);
    // // const states = [
    // //     { value: 'S' },
    // //     { value: 'M' },
    // //     { value: 'F' }
    // //   ] 
    // const options1 = [
    //     {
    //         value: 1,
    //         label: 'Female'
    //     },
    //     {
    //         value: 2,
    //         label: 'Male'
    //     }
    // ];
    // const data2 = [
    //     {
    //       value: 1,
    //       label: "English"
    //     },
    //     {
    //       value: 2,
    //       label: "Hindi"
    //     },
    //     {
    //       value: 3,
    //       label: "Gujarati"
    //     },
    //     {
    //       value: 4,
    //       label: "Bengali"
    //     },
    //     {
    //       value: 5,
    //       label: "Marathi"
    //     },
    //     {
    //       value: 6,
    //       label: "Tamil"
    //     },
    //     {
    //       value: 7,
    //       label: "Kannada"
    //     }
    // ]
    // // set value for default selection
    // const [selectedValue, setSelectedValue] = useState([]);

    // // handle onChange event of the dropdown
    // const handleChange = (e) => {
    //     setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
    // }      
    // return (
    //     <>
    //         <section className="m-profile manage-p">
    //             <Container>
    //                 <Row className="row align-items-center justify-content-center h-100">
    //                     <Col lg="10">
    //                         <div className="sign-user_card">
    //                             <Row>
    //                                 <Col lg="2">
    //                                     <div className="upload_profile d-inline-block">
    //                                         <img src={user} className="profile-pic avatar-130 rounded-circle img-fluid" alt="user"/>
    //                                         <div className="p-image">
    //                                             <i className="ri-pencil-line upload-button"></i>
    //                                             <input className="file-upload" type="file" accept="image/*"/>
    //                                         </div>
    //                                     </div>
    //                                   </Col>
    //                                 <Col lg="10" className="device-margin">
    //                                     <div className="profile-from">
    //                                         <h4 className="mb-3">Manage Profile</h4>
    //                                         <Form className="mt-4" action="#">
    //                                             <Form.Group className="form-group">
    //                                                 <Form.Label>Name</Form.Label>
    //                                                 <Form.Control type="text" className="form-control mb-0" id="exampleInputl2"
    //                                                     placeholder="Enter Your Name" autoComplete="off" required/>
    //                                             </Form.Group>
    //                                             <Form.Group className="form-group">
    //                                                 <Form.Label>Date of Birth</Form.Label>
    //                                                 <DatePicker selected={date}  dateFormat="yyyy/MM/dd" onChange={handleChange3} />
    //                                             </Form.Group>
    //                                             <Form.Group className="form-group d-flex flex-md-row flex-column">
    //                                                 <div className="iq-custom-select mr-2 mb-2">
    //                                                     <Select className="iq-size" id="f1" options={options1} />
    //                                                 </div>        
    //                                                 <div className="w-50 form1">
    //                                                     <Select
    //                                                         className="bgcollor "
    //                                                         placeholder="Language Preference"
    //                                                         value={data2.filter(obj => selectedValue.includes(obj.value))} // set selected values
    //                                                         options={data2} // set list of the data
    //                                                         onChange={handleChange} // assign onChange function
    //                                                         isMulti
    //                                                         isClearable
    //                                                     />
    //                                                 </div>
    //                                             </Form.Group>
    //                                             <div className="d-flex">
    //                                                 <Link to="#" className="btn btn-hover">Save</Link>
    //                                                 <Link to="#" className="btn btn-link">Cancel</Link>
    //                                             </div>
    //                                         </Form>
    //                                     </div>
    //                                 </Col>
    //                             </Row>
    //                         </div>
    //                     </Col>
    //                 </Row>
    //             </Container>          
    //         </section>
    //     </>
    // )
    return (
        <>
           <section className="m-profile setting-wrapper">        
              <Container>
                 <h4 className="main-title mb-4">Account Setting</h4>
                    <Row>
                       <Col lg="4" className="mb-3">
                          <div className="sign-user_card text-center">
                             <img src={user} className="rounded-circle img-fluid d-block mx-auto mb-3" alt="user"/>
                             <h4 className="mb-3">John Doe</h4>
                             <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                             <Link to="#" className="edit-icon text-primary">Edit</Link>
                          </div>
                       </Col>
                       <Col lg="8">
                          <div className="sign-user_card">
                             <h5 className="mb-3 pb-3 a-border">Personal Details</h5>
                             <Row className="row align-items-center justify-content-between mb-3">
                                <Col md="8">
                                   <span className="text-light font-size-13">Email</span>
                                   <p className="mb-0">example@gmail.com</p>
                                </Col>   
                                <Col md="4" className="text-md-right text-left">                      
                                   <Link to="#" className="text-primary">Change</Link>
                                </Col>
                             </Row>
                             <Row className="align-items-center justify-content-between mb-3">
                                <Col md="8">
                                   <span className="text-light font-size-13">Password</span>
                                   <p className="mb-0">**********</p>
                                </Col>
                                <Col md="4" className="text-md-right text-left">
                                   <Link to="#" className="text-primary">Change</Link>
                                </Col>
                             </Row>
                             <Row className="align-items-center justify-content-between mb-3">
                                <Col md="8">
                                   <span className="text-light font-size-13">Date of Birth</span>
                                   <p className="mb-0">08-03-1995</p>
                                </Col>
                                <Col md="4" className="text-md-right text-left">
                                   <Link to="#" className="text-primary">Change</Link>
                                </Col>
                             </Row>
                             <Row className="align-items-center justify-content-between">
                                <Col md="8">
                                   <span className="text-light font-size-13">Language</span>
                                   <p className="mb-0">English</p>
                                </Col>
                                <Col md="4" className="text-md-right text-left">
                                   <Link to="#" className="text-primary">Change</Link>
                                </Col>
                             </Row>
                             <h5 className="mb-3 mt-4 pb-3 a-border">Billing Details</h5>
                             <Row className="justify-content-between mb-3">
                                <Col md="8" className="r-mb-15">
                                   <p>Your next billing date is 19 September 2020.</p>
                                   <Link to="#" className="btn btn-hover">Cancel Membership</Link>
                                </Col>
                                <div className="col-md-4 text-md-right text-left">
                                   <Link to="#" className="text-primary">Update Payment info</Link>
                                </div>
                             </Row>
                             <h5 className="mb-3 mt-4 pb-3 a-border">Plan Details</h5>
                             <Row className="justify-content-between mb-3">
                                <Col md="8">
                                   <p>Premium</p>                                
                                </Col>
                                <Col md="4" className="text-md-right text-left">
                                   <Link to="#" className="text-primary">Change Plan</Link>
                                </Col>
                             </Row>
                             <h5 className="mb-3 pb-3 mt-4 a-border">Setting</h5>
                             <Row>
                                <div className="col-12 setting">
                                   <Link to="#" className="text-body d-block mb-1">Recent device streaming activity</Link>
                                   <Link to="#" className="text-body d-block mb-1">Sign out of all devices </Link>
                                   <Link to="#" className="text-body d-block">Download your person information</Link>
                                </div>                            
                             </Row>
                          </div>
                       </Col>
                    </Row>
              </Container>
           </section>
        </>
     )
  }


export default UserProfile;