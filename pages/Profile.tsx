import { useEffect, useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Title from '../components/Title';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MyCardsCollection from '../components/MyCardsCollection';
import ProfilePublicKeys from '../components/ProfilePublicKeys';
// import useLocalStorage from '../custom_hooks/useLocalStorage';
import { KEYWORDS } from '../pages/_app';
import { useRouter } from 'next/router';
import { get_collections, get_nfts, Collection, NFT, database_awake } from '../lib/indexer_api';
import { useAccount, useDisconnect } from "wagmi";

export default function Profile(props) {

  const router = useRouter();

  const loading_collection = {chain: "", address: "", metadata: {name: "Loading...", description: "", image: "/Loading.gif",
                                         external_url: "", generator_url: ""}, price: 0, max_supply: 0, current_supply: 0};
  let acc = useAccount({onConnect: ({address, connector}) => setMyAccount({address, connector}), 
                        onDisconnect: () => setMyAccount({address: null, connector: null})});
  const [my_account, setMyAccount] = useState({address: acc.address, connector: acc.connector});
  const [tabs_key, setTabsKey] = useState('nfts');
  const [collections, setCollections] = useState(Array(8).fill(loading_collection));
  const [nfts, setNfts] = useState(Array(8).fill(loading_collection));
  const [creations, setCreations] = useState(Array(8).fill(loading_collection));
  // const [beacon_pkh, setBeaconPKH] = useLocalStorage(KEYWORDS.BEACON_PKH, null);
  // const [aleph0_pkh, setAleph0PKH] = useLocalStorage(KEYWORDS.ALEPH0_PKH ,null);
  // const [solidity_pkh, setSolidityPKH] = useLocalStorage(KEYWORDS.SOLIDITY_PKH ,null);
  const [account, setAccount] = useState("");
  const [account_typ, setAccountTyp] = useState("no");
  const [loading, setLoading] = useState(true);

  let replaceAt = (str, index, replacement) => str.substring(0, index) + replacement + str.substring(index + replacement.length);

  useEffect(() => {

    if(!router.isReady) return;
    if(props.ready === false) return;
    
    let acc = router.query.account as string;
    let owner = "";
    
    if(my_account.address && acc === "My Account") owner = my_account.address;

    if(acc !== "My Account" && router.query.account_typ === "solidity_pkh") owner = acc;

    setAccount(acc);
    if(acc !== "My Account") setAccountTyp(router.query.account_typ as string);
    else setAccountTyp(null);

    let owner_LowerCase = replaceAt(owner.toLowerCase(), 1, 'x');
    let owner_UpperCase = replaceAt(owner.toUpperCase(), 1, 'x');

    let fetch = async () => {
      await database_awake();
      let curr_nfts = await get_nfts([], [], [], [owner_LowerCase, owner_UpperCase, owner]);
      setNfts(curr_nfts);
      let curr_collections = [];
      // @ts-ignore
      if([...new Set(curr_nfts.map(nft => nft.collection))].length){
        // @ts-ignore
        curr_collections = await get_collections([], [...new Set(curr_nfts.map(nft => nft.collection))], []);
      }
      setCollections(curr_collections);
      setCreations(curr_collections);
      setCreations(await get_collections([], [], [owner_LowerCase, owner_UpperCase, owner]));
      setLoading(false);
    }

    fetch();

  }, [router.isReady, router.query, my_account.address]);
  
  return (
    <div>
        <Title title="Profile" />
        <div className="spacer-60"></div>
        <div className="spacer-20"></div>
        <Container>    
          <ProfilePublicKeys /*beacon_pkh={beacon_pkh}*/ solidity_pkh={my_account.address?.toLocaleLowerCase()} /*aleph0_pkh={aleph0_pkh}*/ account={account} account_typ={account_typ} />
          <Tabs id="controlled-tab-example" activeKey={tabs_key} onSelect={(k) => setTabsKey(k)} className="mb-3">
            <Tab tabClassName="tabText" eventKey="nfts" title="NFTs">
                <MyCardsCollection values={nfts} href={"NFTDetails"} type="nft" />
            </Tab>
            <Tab tabClassName="tabText" eventKey="collections" title="Collections">
                <MyCardsCollection values={collections} href={"CollectionDetails"} type="collection" />
            </Tab>
            <Tab tabClassName="tabText" eventKey="creations" title="Creations">
                <MyCardsCollection values={creations} href={"CollectionDetails"} type="collection" />
            </Tab>
          </Tabs>
          {/* <div className="spacer-60" />
          <div className="spacer-30" /> */}
          <div className="spacer-30" />
        </Container>
    </div>
  )
}