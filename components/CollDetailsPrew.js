import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function CollDetailsPrew(props) {
    return (
        <div>
            <img className="coll_prw_img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s" />
            <div className="spacer-30" />
            <div style={{justifyContent: "center", display: "grid"}}>
                <a className='my_btn_main' id="variations_btn" href="#!">Variations</a>
                <div className="spacer-40" />
                <h6 className="index_title" style={{fontSize: "16px"}}>Properties</h6>
            </div>
            <Row xs={1} sm={2} md={3} className="g-4" style={{maxWidth: "612px"}}>
                <Col xs={12} sm={6} md={4} style={{paddingLeft: "4px", paddingRight: "4px"}}>
                    <Card>
                        <Card.Body className="propertiesCard">
                            <Card.Title className="propertyTyp">Background</Card.Title>
                            <Card.Title className="propertyName">Yellow Gradient</Card.Title>
                            <Card.Text className="propertyChance">
                                8% chance
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={4} style={{paddingLeft: "4px", paddingRight: "4px"}}>
                    <Card>
                        <Card.Body className="propertiesCard">
                            <Card.Title className="propertyTyp">Body</Card.Title>
                            <Card.Title className="propertyName">Green Droid</Card.Title>
                            <Card.Text className="propertyChance">
                                50% chance
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={4} style={{paddingLeft: "4px", paddingRight: "4px"}}>
                    <Card>
                        <Card.Body className="propertiesCard">
                            <Card.Title className="propertyTyp">Face</Card.Title>
                            <Card.Title className="propertyName">Pink</Card.Title>
                            <Card.Text className="propertyChance">
                                28% chance
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={4} style={{paddingLeft: "4px", paddingRight: "4px"}}>
                    <Card>
                        <Card.Body className="propertiesCard">
                            <Card.Title className="propertyTyp">Eyes</Card.Title>
                            <Card.Title className="propertyName">Closed</Card.Title>
                            <Card.Text className="propertyChance">
                                21% chance
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={4} style={{paddingLeft: "4px", paddingRight: "4px"}}>
                    <Card>
                        <Card.Body className="propertiesCard">
                            <Card.Title className="propertyTyp">Antennae</Card.Title>
                            <Card.Title className="propertyName">Yellow Antennae</Card.Title>
                            <Card.Text className="propertyChance">
                                33% chance
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={4} style={{paddingLeft: "4px", paddingRight: "4px"}}>
                    <Card>
                        <Card.Body className="propertiesCard">
                            <Card.Title className="propertyTyp">Mouth</Card.Title>
                            <Card.Title className="propertyName">Happy</Card.Title>
                            <Card.Text className="propertyChance">
                                12% chance
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}