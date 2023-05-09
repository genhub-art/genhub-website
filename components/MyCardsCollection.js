import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import MyCard from '../components/MyCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function MyCardsCollection(props) {

  let get_href = val => {
    let href = props.href;
    
    if(props?.typ == "collection" && val?.address && val?.chain)
        href += `?address=${val?.address}&chain=${val?.chain}`;

    if(props?.typ === "nft" && val?.collection && val?.token_id && val?.chain)
        href += `?collection=${val?.collection}&token_id=${val?.token_id}&chain=${val?.chain}`;

    return href;
  }
  
  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {console.log("Href", props.href)}
        {/* {Array.from({ length: 18 }).map((_, idx) => ( */}
        {props?.values?.map((val, i) =>
            <Col key={`${i}`}>   
                <MyCard href={get_href(val)} collection_or_nft={val} on_iframe_metadata_loaded={_ => {}} />
            </Col>
        )}
    </Row>
  );
}
