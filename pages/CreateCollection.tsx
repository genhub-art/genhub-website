import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Title from '../components/Title';
import CollCreationForm from '../components/CollectionCreationForm';
import CollCreationPrew from '../components/CollectionCreationPreview';
import {useEffect, useState} from 'react';
import {Collection} from "../lib/indexer_api";

export default function CreateCollection(props) {


    const [collection, setCollection] = useState<Collection>({
        chain: "bsc_testnet",
        address: "",
        metadata: {
            name: "",
            description: "",
            image: "",
            external_url: "",
            generator_url: ""
        },
        price: 0,
        current_supply: 0,
        max_supply: 0
    });
  useEffect(() => {
      console.log("modified collection", collection)
  }, [collection])
  return (
    <div>
        <Title title="Create Collection" />
        <Container>    
          <Row>
              <Col lg={{span: 7, offset: 1}}>
                  <CollCreationForm collection={collection} handleCollectionModified={setCollection} />
              </Col>
              <Col lg={3} sm={6} xs={12}>
                <CollCreationPrew collection={collection} on_iframe_metadata_loaded={tmd => {console.log("ccchere"); setCollection(collection => {return {...collection, metadata: {...collection.metadata, image:tmd.image}}})} } />  
              </Col>
          </Row>
        </Container>
    </div>
  )
}