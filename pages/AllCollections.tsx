import Container from 'react-bootstrap/Container';
import Title from '../components/Title';
import MyCardsCollection from '../components/MyCardsCollection';
import { useEffect, useState } from 'react';
import { get_collections, Collection, database_awake } from '../lib/indexer_api';


export default function AllCollections(props) {
  
  const loading_collection:Collection = {chain: "", address: "", metadata: {name: "Loading...", description: "", image: "/Loading.gif",
                                         external_url: "", generator_url: ""}, price: 0, max_supply: 0, current_supply: 0};

  const [collections, setCollections] = useState(Array(8).fill(loading_collection));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      await database_awake();
      let res = await get_collections([], [], []);
      console.log("RES", res);
      setCollections(res);
      setLoading(false);
    }
    fetch();

  }, [])
  return (
    <div>
        <Title title="Collections" />
        <div className="spacer-60"></div>
        <Container>
          {loading 
            ? <MyCardsCollection values={collections} href={"CollectionDetails"} type="nft" />
            : <MyCardsCollection values={collections} href={"CollectionDetails"} type="collection" />
          }
        </Container>
    </div>
  )
}
