import Image from 'next/image';
import { FaSpinner } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import {Collection, ERC1155TokenMetadata} from "../lib/indexer_api";
import GeneratorIframe from "./GeneratorIframe";
import { Col } from 'react-bootstrap';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import * as R from "ramda";
import NFTPropertiesGrid from "./NFTPropertiesGrid";

export default function CollectionDetailsPreview(props: {collection: Collection | null; loading: boolean}) {
    let dbg = (x:any) => { console.log("xxx"); return x}
    // console.log("collecction details preview props", props);
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
            {iframe_url && iframe_url.includes("https://") && loading === false
                ? dbg(<GeneratorIframe width={612} height={612} style={{height: "612px"}} className="coll_prw_img" url={iframe_url} on_iframe_metadata_loaded={setIframeMetadata} />)
                : <Image alt={"Loading..."} width={612} height={612} style={{height: "612px"}} className="coll_prw_img" 
                    src={props?.loading ? "/Loading.gif" : props.collection?.metadata?.image} />  
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
           <NFTPropertiesGrid metadata={iframe_metadata} />
            
        </div>
    )
}