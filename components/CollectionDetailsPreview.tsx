import Image from 'next/image';
import { FaSpinner } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import {Collection, ERC1155TokenMetadata} from "../lib/indexer_api";
import GeneratorIframe from "./GeneratorIframe";
import { Col } from 'react-bootstrap';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

export default function CollectionDetailsPreview(props: {collection: Collection | null; loading: boolean}) {

    console.log("collecction details preview props", props);
    const [iframe_url, setIframeUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [iframe_metadata, setIframeMetadata] = useState<ERC1155TokenMetadata | null>(null);
    
    let generate_variation = () => {
        setLoading(true);
        setIframeUrl(props.collection.metadata.generator_url + `/?seed=${uuidv4()}`);
    }
    useEffect(() => {
        if(props.collection?.metadata?.generator_url) {
            setIframeUrl(props.collection.metadata.generator_url + `/?seed=${uuidv4()}`);
        }
    }, [props.collection]);
    useEffect(() => {
        
        setLoading(false);

    }, [iframe_url]);

    return (
        <div>
            {iframe_url !== ""  
                ? <GeneratorIframe width={612} height={612} style={{height: "612px"}} className="coll_prw_img" url={iframe_url} on_iframe_metadata_loaded={setIframeMetadata} />
                : <Image alt={"Loading..."} width={612} height={612} style={{height: "612px"}} className="coll_prw_img" 
                    src={props?.loading ? "/Loading.gif" : props.collection.metadata.image} />  
            }
            <div className="spacer-30" />
            <div style={{justifyContent: "center", display: "grid"}}>
                <a className='my_btn_main' id="variations_btn" href="#!" onClick={() => generate_variation()} 
                    style={(props?.loading || loading) ? {pointerEvents: "none", backgroundColor: "#D3D3D7"} : {}}>
                    {(props?.loading || loading) ? <><FaSpinner className="spinner" />&nbsp;&nbsp;Loading...</> : <>Variations</>}
                </a>
                <div className="spacer-40" />
                {/* TOADD: Properties
                <h6 className="index_title" style={{fontSize: "16px"}}>Properties</h6> */}
            </div>
            {/*/!* TOADD: Properties*/}
            {
                (() => {
                    console.log("iframe_metadata", iframe_metadata)
                    let attributes = iframe_metadata?.attributes.map(x => {return{name: x.trait_type, value:x.value}}) || [] ;
                    console.log("attributes", attributes)
                    let properties = Object.entries(iframe_metadata?.properties || {}).flatMap(ps => ps.map(nv => {return {name:nv[0], value:nv[1]}})) || [] ;
                    console.log("properties", properties)
                    let all = attributes.concat(properties);
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
            }
            {/*<Row xs={1} sm={2} md={3} className="g-4" style={{maxWidth: "612px"}}>*/}
            {/*    <Col xs={12} sm={6} md={4} style={{paddingLeft: "4px", paddingRight: "4px"}}>*/}
            {/*        <Card>*/}
            {/*            <Card.Body className="propertiesCard">*/}
            {/*                <Card.Title className="propertyTyp">Background</Card.Title>*/}
            {/*                <Card.Title className="propertyName">Yellow Gradient</Card.Title>*/}
            {/*                <Card.Text className="propertyChance">*/}
            {/*                    8% chance*/}
            {/*                </Card.Text>*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*    <Col xs={12} sm={6} md={4} style={{paddingLeft: "4px", paddingRight: "4px"}}>*/}
            {/*        <Card>*/}
            {/*            <Card.Body className="propertiesCard">*/}
            {/*                <Card.Title className="propertyTyp">Body</Card.Title>*/}
            {/*                <Card.Title className="propertyName">Green Droid</Card.Title>*/}
            {/*                <Card.Text className="propertyChance">*/}
            {/*                    50% chance*/}
            {/*                </Card.Text>*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*    <Col xs={12} sm={6} md={4} style={{paddingLeft: "4px", paddingRight: "4px"}}>*/}
            {/*        <Card>*/}
            {/*            <Card.Body className="propertiesCard">*/}
            {/*                <Card.Title className="propertyTyp">Face</Card.Title>*/}
            {/*                <Card.Title className="propertyName">Pink</Card.Title>*/}
            {/*                <Card.Text className="propertyChance">*/}
            {/*                    28% chance*/}
            {/*                </Card.Text>*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*    <Col xs={12} sm={6} md={4} style={{paddingLeft: "4px", paddingRight: "4px"}}>*/}
            {/*        <Card>*/}
            {/*            <Card.Body className="propertiesCard">*/}
            {/*                <Card.Title className="propertyTyp">Eyes</Card.Title>*/}
            {/*                <Card.Title className="propertyName">Closed</Card.Title>*/}
            {/*                <Card.Text className="propertyChance">*/}
            {/*                    21% chance*/}
            {/*                </Card.Text>*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*    <Col xs={12} sm={6} md={4} style={{paddingLeft: "4px", paddingRight: "4px"}}>*/}
            {/*        <Card>*/}
            {/*            <Card.Body className="propertiesCard">*/}
            {/*                <Card.Title className="propertyTyp">Antennae</Card.Title>*/}
            {/*                <Card.Title className="propertyName">Yellow Antennae</Card.Title>*/}
            {/*                <Card.Text className="propertyChance">*/}
            {/*                    33% chance*/}
            {/*                </Card.Text>*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*    <Col xs={12} sm={6} md={4} style={{paddingLeft: "4px", paddingRight: "4px"}}>*/}
            {/*        <Card>*/}
            {/*            <Card.Body className="propertiesCard">*/}
            {/*                <Card.Title className="propertyTyp">Mouth</Card.Title>*/}
            {/*                <Card.Title className="propertyName">Happy</Card.Title>*/}
            {/*                <Card.Text className="propertyChance">*/}
            {/*                    12% chance*/}
            {/*                </Card.Text>*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/**!/*/}
        </div>
    )
}