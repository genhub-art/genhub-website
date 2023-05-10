import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'next/image';
import {NFT} from "../lib/indexer_api";
import NFTPropertiesGrid from "./NFTPropertiesGrid";

export default function NftDetailsPreview(props: {nft:NFT, loading: boolean}) {
    return (
        <div>
            <Image alt={"nft image"} width={612} height={612}  className="coll_prw_img" src={props?.loading ? "/Loading.gif" : props.nft.metadata.image} />
            <div className="spacer-30" />
            {!props.loading && props.nft.metadata && <NFTPropertiesGrid metadata={props.nft.metadata} />}
            <div className="spacer-60" />
        </div>
    )
}