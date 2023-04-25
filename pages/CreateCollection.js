import IndexPresentation from '../components/IndexPresentation';
import MyCarousel from '../components/MyCarousel';
import MyOwlCarousel from '../components/MyOwlCarousel';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Title from '../components/Title';
import CollCreationForm from '../components/CollCreationForm';
import CollCreationPrew from '../components/CollCreationPrew';

export default function Home(props) {
  return (
    <div>
        <Title title="Create Collection" />
        <Container>    
          <Row>
              <Col lg={{span: 7, offset: 1}}>
                  <CollCreationForm />
              </Col>
              <Col lg={3} sm={6} xs={12}>
                <CollCreationPrew get_image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s"} 
                get_title={"Collection 1"} get_price={0.4} get_curr_tid={6} get_max_tid={6} />  
              </Col>
          </Row>
        </Container>
    </div>
  )
}