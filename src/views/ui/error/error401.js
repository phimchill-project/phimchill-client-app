
import {Link} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

// img
import img404 from '../../../assets/ui/images/error/404.png'

function Error401(){
    return (
        <>
            <Container className="pt-5">
                <Row className="no-gutters height-self-center">
                    <Col sm="12" className="text-center align-self-center">
                        <div className="iq-error position-relative">
                            <img src={"https://geekflare.com/wp-content/uploads/2023/07/Common-Reasons-Behind-The-401-Unauthorized-Error.png"} className="img-fluid iq-error-img" alt="" style={{width: "50%", height: "auto"}}/>
                            <h2 className="mb-0 mt-4">Oops! You can access this page.</h2>
                            <Link className="btn btn-primary mt-3" to="/"><i className="ri-home-4-line"></i>Back to Home</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Error401;