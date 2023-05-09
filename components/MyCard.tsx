import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { mint_nft } from '../lib/solidity_api';
import {Collection, ERC1155TokenMetadata, NFT} from "../lib/indexer_api";
import {ipfs_to_https} from "../lib/utils";
import {useEffect, useState} from "react";
import { cors_fixer } from "../lib/solidity_api";

export default function MyCard(props: { href:string; collection_or_nft: Collection | NFT; type:string; on_iframe_metadata_loaded:(tmd:ERC1155TokenMetadata) => void }) {
    
    const [iframe_metadata, setIframeMetadata] = useState<ERC1155TokenMetadata | null>(null)
    
    console.log("card for ", props.collection_or_nft)
    // @ts-ignore
    let iframe_url = (props.collection_or_nft.metadata?.generator_url || props.collection_or_nft.metadata?.generator_instance_url) + "/"
    iframe_url = iframe_url.startsWith("ipfs://") ? ipfs_to_https(iframe_url) : iframe_url
    console.log("iframe_url", iframe_url)

    useEffect(() => {
        //every 1 seconds try to call the metadata() function from inside the generator_iframe and print the result
        window.addEventListener("message", (event) => {
            if (event.data.name) {
                setIframeMetadata(event.data)
                props.on_iframe_metadata_loaded(event.data)
            }
        }, false);
        setInterval(() => {
            try {
            // @ts-ignore
                if(!iframe_metadata && props.collection_or_nft.metadata?.generator_url) {
                    // @ts-ignore
                    let md = document.getElementById("generator_iframe").contentWindow.postMessage({type: "metadata"}, "*")
                }
            } catch (e) { console.log("error", e) }
        }, 10000)
    })
    return (
      <Card className='cardItem'>
          <iframe id={"generator_iframe"} src={ (cors_fixer + iframe_url )} ></iframe>
        {/*<Link className="cardA" href={props.href}>*/}
            
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
