import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'next/image';
import {NFT} from "../lib/indexer_api";
import NFTPropertiesGrid from "./NFTPropertiesGrid";
import GeneratorIframe from './GeneratorIframe';

export default function NftDetailsPreview(props: {nft:NFT, loading: boolean}) {
    return (
        <div>
            {props?.nft?.metadata?.generator_instance_url && props?.nft?.metadata?.generator_instance_url.includes("https://") && props?.loading === false
                ? <GeneratorIframe width={612} height={612} style={{height: "612px"}} className="coll_prw_img" url={props?.nft?.metadata?.generator_instance_url} on_iframe_metadata_loaded={() => {}} />
                : <Image alt={"nft image"} width={612} height={612}  className="coll_prw_img" src={props?.loading ? "/Loading.gif" : props?.nft?.metadata?.image} />  
            }
            
            <div className="spacer-30" />
            {!props.loading && props.nft.metadata && <NFTPropertiesGrid metadata={props.nft.metadata} />}
            <div className="spacer-60" />
        </div>
    )
}