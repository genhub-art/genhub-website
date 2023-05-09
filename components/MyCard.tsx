import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { mint_nft } from '../lib/solidity_api';
import {Collection, ERC1155TokenMetadata, NFT} from "../lib/indexer_api";
import {ipfs_to_https} from "../lib/utils";
import {useEffect, useState} from "react";
import { cors_fixer } from "../lib/solidity_api";
import GeneratorIframe from "./GeneratorIframe";

export default function MyCard(props: { href:string; collection_or_nft: Collection | NFT; type:string; on_iframe_metadata_loaded:(tmd:ERC1155TokenMetadata) => void }) {
    
    const [iframe_metadata, setIframeMetadata] = useState<ERC1155TokenMetadata | null>(null)
    
    console.log("card for ", props.collection_or_nft)
    // @ts-ignore
    let iframe_url = (props.collection_or_nft.metadata?.generator_url || props.collection_or_nft.metadata?.generator_instance_url) + "/"
    iframe_url = iframe_url.startsWith("ipfs://") ? ipfs_to_https(iframe_url) : iframe_url
    console.log("iframe_url", iframe_url)

    
    return (
      <Card className='cardItem'>
        {/*<Link className="cardA" href={props.href}>*/}
            <GeneratorIframe height={200} url={iframe_url} on_iframe_metadata_loaded={setIframeMetadata} />
          {/*<Image height={264} width={264} src={props.collection_or_nft.metadata.image} className="cardImg" alt={props.type === "nft" ? "Nft" : "Collection"} />*/}
        {/*</Link>*/}
        
        <Card.Body style={props.type === "nft" ? {paddingTop: "0px", paddingBottom: "0px"} : {paddingTop: "8px", paddingBottom: "8px"}}>
          <Link className="cardA" href={props.href}><Card.Title className="cardTitle">{props.collection_or_nft.metadata.name}</Card.Title></Link>
          {(props.collection_or_nft as Collection) &&
            <>
              <Link className="cardA" href={props.href}><Card.Text>
                {/*  @ts-ignore */}
                <span className="cardPrice">{(props.collection_or_nft as Collection).price } ꜩ</span>
                <span className="cardTid">{(props.collection_or_nft as Collection).current_supply}/{(props.collection_or_nft as Collection).max_supply}</span>
                {/* Some quick example text to build on the card title and make up the
                bulk of the card's content. */}
              </Card.Text></Link>
              {props.type !== "no buttons" && 
                <>
                  <Button onClick={() => mint_nft((props.collection_or_nft as Collection).address, (props.collection_or_nft as Collection).price, window)} className="cardButton" variant="primary">Mint</Button>
                  {/* TOADD: Edit button <Button className="cardButton" variant="primary">Edit</Button> */}
                  {/*  @ts-ignore */}
                  <a href={props.href} className="cardButton" variant="primary">View</a>
                </>
              }
            </>
          }
        </Card.Body>
      </Card>
  );
}
