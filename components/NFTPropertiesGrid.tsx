import * as R from "ramda";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";
import {ERC1155TokenMetadata} from "../lib/indexer_api";

export default function NFTPropertiesGrid (props:{metadata: ERC1155TokenMetadata | null}) {
    return <>{
        (() => {
            // console.log("yyyRERENDER")
            let attributes = props.metadata?.attributes.map(x => {return{name: x.trait_type, value:x.value}}) || [] ;
            // console.log("yyyattributes", attributes)
            let properties = Object.entries(props.metadata?.properties || {}).flatMap(nv => {return {name:nv[0], value:nv[1]}}) || [] ;
            // console.log("yyyproperties", properties)
            let all = R.uniq(attributes.concat(properties))
            let property_card = (p:{name: string; value: string | number}) =>
                <Card>
                    <Card.Body className="propertiesCard">
                        <Card.Title className="propertyTyp">{p.name}</Card.Title>
                        <Card.Title className="propertyName">{p.value}</Card.Title>
                    </Card.Body>
                </Card>
            return <Row xs={1} sm={2} md={3} className="g-4" style={{maxWidth: "612px"}}>
                {all.map((p, i) => <Col key={`key${i}`} xs={12} sm={6} md={4} style={{paddingLeft: "4px", paddingRight: "4px"}}>{property_card(p)}</Col>)}
            </Row>
        })()
    }</>
}