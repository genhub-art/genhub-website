import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {Collection, NFT} from "../lib/indexer_api";
// import { AiFillCheckCircle } from "react-icons/fa";



export default function NftDetialsInfo(props: {nft: NFT, collection: Collection}) {

    const refs = {
        ref_copy_1: useRef(null),
    }

    const sleep = (delay) => {
        try{
            return new Promise((resolve) => setTimeout(resolve, delay));
        }
        catch(_){}
    }
    
    let shortening_str = (str, sz_l, sz_r) => (str?.substring(0, sz_l) + "..." + str?.substring(str.length - sz_r, str.length));

    let copy = async nr => {
        // console.log("Ref", refs[`ref_copy_${nr}`]);
        refs[`ref_copy_${nr}`].current.text = "Copied!";
        await sleep(2000);
        refs[`ref_copy_${nr}`].current.text = "Copy";
    }

    return (
        <>
            <h2 className="details_title">{props?.nft?.metadata?.name}</h2>
            <div className='spacer-30' />

            <h6 className="index_title" style={{fontSize: "14px"}}>Owner</h6>
            <Link target={"_blank"} title={props?.nft?.owner} href={`Profile?account=${props?.nft?.owner}&account_typ=solidity_pkh`}
                    className="aTag" id="detATag">
                {shortening_str(props?.nft?.owner, 12, 12)}
            </Link>&nbsp;&nbsp;
            <a id="btn_copy" title="Copy Text" onClick={() => navigator.clipboard.writeText(props?.nft?.owner)} href="#!" 
                ref={refs.ref_copy_1}>Copy</a>
            <div className='spacer-30' />
            
            <h6 className="index_title" style={{fontSize: "14px"}}>Collection</h6>
            <Link target={"_blank"} href={`CollectionDetails?address=${props?.collection?.address}&chain=${props?.collection?.chain}`} 
                className="aTag" id="detATag">
                {props?.collection?.metadata?.name}
            </Link>
            <div className='spacer-30' />
            
            <h6 className="index_title" style={{fontSize: "14px"}}>Token Id:&nbsp;&nbsp;{props?.nft?.token_id}</h6>  
            <div className='spacer-30' />
            
            <h6 className="index_title" style={{fontSize: "14px"}}>Description:</h6>
            <p className="index_text" style={{fontSize: "14px"}}>{props.nft.metadata.description}</p>
        </>
    )
}