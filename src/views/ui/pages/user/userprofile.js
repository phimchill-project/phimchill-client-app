import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import user from "../../../../assets/images/user/user.jpg";
import { useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const token = localStorage.getItem("token");
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [password, setPassword] = useState('**********');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('example@gmail.com');
    const [newEmail, setNewEmail] = useState();
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const handlePasswordChange = () => {
      setIsEditingPassword(true);
    };
  
    const handleSavePassword = () => {
      // Gửi request API để lưu thay đổi password
      // Sau khi gửi request thành công, cập nhật state password và kết thúc việc chỉnh sửa
      setPassword(newPassword);
      setIsEditingPassword(false);
      // Nếu cần, thực hiện các bước cần thiết để lưu thay đổi password lên server (gửi request API)
    };
  
    const handleCancelPasswordChange = () => {
      // Hủy bỏ việc chỉnh sửa password và reset giá trị mới
      setIsEditingPassword(false);
      setNewPassword('');
    };

    const handleEmailChange = () => {
        setIsEditingEmail(true);
    };

    const handleCancelEmailChange = () => {
        setIsEditingEmail(false);
        setNewEmail('');
    };

   const handleSaveEmail = () => {
  const token = localStorage.getItem("token");

  axios.put(
    `/api/users/edit-email`,
    { newEmail },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => {
      console.log('Email updated successfully:', response.data);
      setEmail(newEmail);
      setIsEditingEmail(false);
      setNewEmail('');
    })
    .catch(error => {
      console.error('Error updating email:', error);
    });
};

    
  return (
    <>
      <section className="m-profile setting-wrapper">
        <Container>
          <h4 className="main-title mb-4">Account Setting</h4>
          <Row>
            <Col lg="4" className="mb-3">
              <div className="sign-user_card text-center">
                <img
                  src={user}
                  className="rounded-circle img-fluid d-block mx-auto mb-3"
                  alt="user"
                />
                <h4 className="mb-3">John Doe</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>
                <Link to="#" className="edit-icon text-primary">
                  Edit
                </Link>
              </div>
            </Col>
            <Col lg="8">
              <div className="sign-user_card">
                <h5 className="mb-3 pb-3 a-border">Personal Details</h5>
                <Row className="row align-items-center justify-content-between mb-3">
                <Col md="8">
                    <span className="text-light font-size-13">Email</span>
                    {isEditingEmail ? (
                        <input
                            type="text"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="Enter new email"
                        />
                    ) : (
                        <p className="mb-0">{email}</p>
                    )}
                </Col>
                <Col md="4" className="text-md-right text-left">
                    {isEditingEmail ? (
                        <div>
                            <button onClick={handleSaveEmail}>Save</button>
                            <button onClick={handleCancelEmailChange}>Cancel</button>
                        </div>
                    ) : (
                        <button onClick={handleEmailChange} className="text-primary">Change</button>
                    )}
                </Col>
            </Row>
            <Row className="align-items-center justify-content-between mb-3">
        <Col md="8">
          <span className="text-light font-size-13">Password</span>
          {isEditingPassword ? (
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          ) : (
            <p className="mb-0">{password}</p>
          )}
        </Col>
        <Col md="4" className="text-md-right text-left">
          {isEditingPassword ? (
            <div>
              <button onClick={handleSavePassword}>Save</button>
              <button onClick={handleCancelPasswordChange}>Cancel</button>
            </div>
          ) : (
            <button onClick={handlePasswordChange} className="text-primary">Change</button>
          )}
        </Col>
      </Row>
                <Row className="align-items-center justify-content-between mb-3">
                  <Col md="8">
                    <span className="text-light font-size-13">
                      Date of Birth
                    </span>
                    <p className="mb-0">08-03-1995</p>
                  </Col>
                  <Col md="4" className="text-md-right text-left">
                    <Link to="#" className="text-primary">
                      Change
                    </Link>
                  </Col>
                </Row>
                <Row className="align-items-center justify-content-between">
                  <Col md="8">
                    <span className="text-light font-size-13">Language</span>
                    <p className="mb-0">English</p>
                  </Col>
                  <Col md="4" className="text-md-right text-left">
                    <Link to="#" className="text-primary">
                      Change
                    </Link>
                  </Col>
                </Row>
                <h5 className="mb-3 mt-4 pb-3 a-border">Billing Details</h5>
                <Row className="justify-content-between mb-3">
                  <Col md="8" className="r-mb-15">
                    <p>Your next billing date is 19 September 2020.</p>
                    <Link to="#" className="btn btn-hover">
                      Cancel Membership
                    </Link>
                  </Col>
                  <div className="col-md-4 text-md-right text-left">
                    <Link to="#" className="text-primary">
                      Update Payment info
                    </Link>
                  </div>
                </Row>
                <h5 className="mb-3 mt-4 pb-3 a-border">Plan Details</h5>
                <Row className="justify-content-between mb-3">
                  <Col md="8">
                    <p>Premium</p>
                  </Col>
                  <Col md="4" className="text-md-right text-left">
                    <Link to="#" className="text-primary">
                      Change Plan
                    </Link>
                  </Col>
                </Row>
                <h5 className="mb-3 pb-3 mt-4 a-border">Setting</h5>
                <Row>
                  <div className="col-12 setting">
                    <Link to="#" className="text-body d-block mb-1">
                      Recent device streaming activity
                    </Link>
                    <Link to="#" className="text-body d-block mb-1">
                      Sign out of all devices{" "}
                    </Link>
                    <Link to="#" className="text-body d-block">
                      Download your person information
                    </Link>
                  </div>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default UserProfile;
