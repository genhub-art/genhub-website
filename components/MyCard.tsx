import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { mint_nft } from '../lib/solidity_api';
import {Collection, ERC1155TokenMetadata, NFT} from "../lib/indexer_api";
import {ipfs_to_https} from "../lib/utils";
import {useEffect, useState} from "react";
import { cors_fixer } from "../lib/solidity_api";
import GeneratorIframe from "./GeneratorIframe";
import Image from "next/image";
import NFTPropertiesGrid from "./NFTPropertiesGrid";

import { v4 as uuidv4 } from 'uuid';
export default function MyCard(props: { href:string; display_randomize?:boolean; collection_or_nft: Collection | NFT; type:string; display_iframe: boolean; on_iframe_metadata_loaded:(tmd:ERC1155TokenMetadata) => void }) {
    
    const [iframe_metadata, setIframeMetadata] = useState<ERC1155TokenMetadata | null>(null)
    const [preview_seed, setPreviewSeed] = useState<string>("x")
    const [preview_token_id, setPreviewTokenId] = useState<number>(1)
    // console.log("card for ", props.collection_or_nft)
    // @ts-ignore
    let iframe_url = (props.collection_or_nft.metadata?.generator_url || props.collection_or_nft.metadata?.generator_instance_url) + "/" + `?seed=${preview_seed}&token_id=${preview_token_id}`
    iframe_url = iframe_url.startsWith("ipfs://") ? ipfs_to_https(iframe_url) : iframe_url
    // console.log("iframe_url", iframe_url)

    return (
      <Card className='cardItem'>
          {props.display_iframe && iframe_url.startsWith("https://") 
              ?  <GeneratorIframe height={200} url={iframe_url} on_iframe_metadata_loaded={x => {setIframeMetadata(x); props.on_iframe_metadata_loaded(x)}} />
              :<> 
                  <div style={{width: "100%", height: "264px"}}>
                  <Link className="cardA" href={props.href}>
                  
                    <img  src={props.collection_or_nft.metadata.image} className="cardImg" alt={props.type === "nft" ? "Nft" : "Collection"} />
                  </Link></div></>
          }
        
        <Card.Body style={props.type === "nft" ? {paddingTop: "0px", paddingBottom: "0px"} : {paddingTop: "8px", paddingBottom: "8px"}}>
          <Link className="cardA" href={props.href}><Card.Title className="cardTitle">{props.collection_or_nft.metadata.name}</Card.Title></Link>
          {(props.collection_or_nft as Collection) &&
            <>
              <Link className="cardA" href={props.href}><Card.Text>
                {/*  @ts-ignore */}
                {(props.type !== "nft") && 
                  <>
                    <span className="cardPrice">{(props.collection_or_nft as Collection).price } ꜩ</span>
                    <span className="cardTid">{(props.collection_or_nft as Collection).current_supply}/{(props.collection_or_nft as Collection).max_supply}</span>
                  </>
                }
                {/* {props.type === "nft" && <div className="spacer-10" />} */}
                {/* Some quick example text to build on the card title and make up the
                bulk of the card's content. */}
              </Card.Text></Link>
              {props.type !== "no buttons" && 
                <>
                  {props.type !== "nft" &&
                    <Button onClick={() => mint_nft((props.collection_or_nft as Collection).address, (props.collection_or_nft as Collection).price, window)} className="cardButton" variant="primary">Mint</Button>
                  }
                  {/* TOADD: Edit button <Button className="cardButton" variant="primary">Edit</Button> */}
                  {/*  @ts-ignore */}
                  <a href={props.href} className="cardButton" variant="primary" style={props.type === "nft" ? {marginTop: "8px"} : {}}>View</a>
                </>
              }
            </>
          }
            {/*{console.log("zzziframemeta", iframe_metadata)}*/}
            { props.display_randomize && <Button onClick={() => {
                setPreviewSeed(uuidv4())
                setPreviewTokenId(Math.floor(Math.random() * 1000))
            }} className="cardButton" variant="primary">Randomize</Button>}
            { iframe_metadata && <NFTPropertiesGrid metadata={iframe_metadata} />}
        </Card.Body>
      </Card>
  );
}
