import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import MyCard from '../components/MyCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function MyCardsCollection(props) {
  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {/* {Array.from({ length: 18 }).map((_, idx) => ( */}
        {props?.values?.map(val =>
            <Col>   
                <MyCard href={props.href} title={val.title} image={val.image} 
                  price={val.price} curr_tid={val.curr_tid} max_tid={val.max_tid} typ={val.typ} />
            </Col>
        )}
    </Row>
  );
}
