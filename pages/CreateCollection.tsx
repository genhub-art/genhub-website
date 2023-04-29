import IndexPresentation from '../components/IndexPresentation';
import MyCarousel from '../components/MyCarousel';
import MyOwlCarousel from '../components/MyOwlCarousel';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Title from '../components/Title';
import CollCreationForm from '../components/CollectionCreationForm';
import CollCreationPrew from '../components/CollectionCreationPreview';
import { useState } from 'react';

export default function Home(props) {
    
  const [preview_props, setPreviewProps] = useState({
    image: "/preview.jpg",
    title: "Silver Surver",
    max_tid: 20,
    price: 0.08,
  });
    
  
  return (
    <div>
        <Title title="Create Collection" />
        <Container>    
          <Row>
              <Col lg={{span: 7, offset: 1}}>
                  <CollCreationForm preview_props={preview_props} setPreviewProps={setPreviewProps} />
              </Col>
              <Col lg={3} sm={6} xs={12}>
                <CollCreationPrew image={preview_props.image} title={preview_props.title} price={preview_props.price} 
                                  curr_tid={0} max_tid={preview_props.max_tid} />  
              </Col>
          </Row>
        </Container>
    </div>
  )
}