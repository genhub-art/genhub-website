import IndexPresentation from '../components/IndexPresentation';
import MyCarousel from '../components/MyCarousel';
import MyOwlCarousel from '../components/MyOwlCarousel';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Title(props) {
  return (
    <div className='subheader'>
        <h1 className='title'>{props.title}</h1>
    </div>
  )
}
