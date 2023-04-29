import { useEffect, useState, useRef } from 'react';
import IndexPresentation from '../components/IndexPresentation';
import MyCarousel from '../components/MyCarousel';
import MyOwlCarousel from '../components/MyOwlCarousel';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Title from '../components/Title';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MyCardsCollection from '../components/MyCardsCollection';
import ProfilePublicKeys from '../components/ProfilePublicKeys';
import useLocalStorage from '../custom_hooks/useLocalStorage';
import { KEYWORDS } from '../pages/_app';
import { useRouter } from 'next/router';

export default function Profile(props) {

  const router = useRouter();

  const [tabs_key, setTabsKey] = useState('nfts');
  const [collections, setCollections] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [creations, setCreations] = useState([]);
  const [beacon_pkh, setBeaconPKH] = useLocalStorage(KEYWORDS.BEACON_PKH, null);
  const [aleph0_pkh, setAleph0PKH] = useLocalStorage(KEYWORDS.ALEPH0_PKH ,null);
  const [solidity_pkh, setSolidityPKH] = useLocalStorage(KEYWORDS.SOLIDITY_PKH ,null);
  const [account, setAccount] = useState("");
  const [account_typ, setAccountTyp] = useState("no");

  useEffect(() => {

    if(!router.isReady) return;
    if(props.ready === false) return;

    let acc = router.query.account;
    setAccount(acc);
    if(acc !== "My Account") setAccountTyp(router.query.account_typ);
    else setAccountTyp(null);

  }, [router.isReady, router.query]);

  useEffect(() => {
    const fetch = async _ => {
      const colls = await tezos.get_all_collections();
      console.log("Collections", colls)
      setCollections(colls);
    }
    setCollections([{get_image: "/preview.jpg",
                    get_title: "Collection 1", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 2", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 3", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 4", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 5", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 6", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 7", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 1", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 2", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 3", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 4", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 5", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 6", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 7", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Collection 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6}])
                    
                    setCreations([{get_image: "/preview.jpg",
                    get_title: "Creation 1", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Creation 2", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Creation 3", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Creation 4", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Creation 5", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Creation 6", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Creation 7", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Creation 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Creation 1", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Creation 2", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Creation 3", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Creation 4", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Creation 5", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Creation 6", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Creation 7", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Creation 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6},
                    {get_image: "/preview.jpg",
                    get_title: "Creation 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6}])
                    
                    setNfts([{get_image: "/preview.jpg",
                    get_title: "NFT 1", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "/preview.jpg",
                    get_title: "NFT 2", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "/preview.jpg",
                    get_title: "NFT 3", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "/preview.jpg",
                    get_title: "NFT 4", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "/preview.jpg",
                    get_title: "NFT 5", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "/preview.jpg",
                    get_title: "NFT 6", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "/preview.jpg",
                    get_title: "NFT 7", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "/preview.jpg",
                    get_title: "NFT 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "/preview.jpg",
                    get_title: "NFT 1", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "/preview.jpg",
                    get_title: "NFT 2", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "/preview.jpg",
                    get_title: "NFT 3", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "/preview.jpg",
                    get_title: "NFT 4", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "/preview.jpg",
                    get_title: "NFT 5", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "/preview.jpg",
                    get_title: "NFT 6", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "/preview.jpg",
                    get_title: "NFT 7", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "/preview.jpg",
                    get_title: "NFT 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"},
                    {get_image: "/preview.jpg",
                    get_title: "NFT 8", get_price: 0.4, get_curr_tid: 6, get_max_tid: 6, typ: "nft"}])
    // fetch();

  }, [])
  
  return (
    <div>
        <Title title="Profile" />
        <div className="spacer-60"></div>
        <div className="spacer-20"></div>
        <Container>    
          <ProfilePublicKeys beacon_pkh={beacon_pkh} solidity_pkh={solidity_pkh} aleph0_pkh={aleph0_pkh} account={account} account_typ={account_typ} />
          <Tabs id="controlled-tab-example" activeKey={tabs_key} onSelect={(k) => setTabsKey(k)} className="mb-3">
            <Tab tabClassName="tabText" eventKey="nfts" title="NFTs">
                <MyCardsCollection values={nfts} href={"NFTDetails"} />
            </Tab>
            <Tab tabClassName="tabText" eventKey="collections" title="Collections">
                <MyCardsCollection values={collections} href={"CollectionDetails"} />
            </Tab>
            <Tab tabClassName="tabText" eventKey="creations" title="Creations">
                <MyCardsCollection values={creations} href={"CollectionDetails"} />
            </Tab>
          </Tabs>
          {/* <div className="spacer-60" />
          <div className="spacer-30" /> */}
          <div className="spacer-30" />
        </Container>
    </div>
  )
}