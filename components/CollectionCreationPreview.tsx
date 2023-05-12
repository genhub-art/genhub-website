import MyCard from './MyCard';
import {useState} from "react";
import {Collection, ERC1155TokenMetadata} from "../lib/indexer_api";

export default function CollectionCreationPrew(props: {collection: Collection, on_iframe_metadata_loaded: (token_metadata: ERC1155TokenMetadata) => void}) {
    return (
        <div style={{justifyContent: "center"}}>
            <div className="spacer-60" />
            <h5 className="index_title" style={{fontSize: "18px"}}>Preview Collection Card</h5>
            <div className="spacer-5" />
            <MyCard display_iframe={true} display_randomize={true} collection_or_nft={props.collection} type={"collection"}
                    display_buttons={false} href={'#'} on_iframe_metadata_loaded={props.on_iframe_metadata_loaded}/>
        </div>
    )
}