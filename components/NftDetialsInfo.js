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
import ProgressBar from "@ramonak/react-progress-bar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
// import { AiFillCheckCircle } from "react-icons/fa";



export default function NftDetialsInfo(props) {

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

            {/* TOADD: Add Revenue Share 
            <h6 className="index_title" style={{fontSize: "14px"}}>Revenue Share for this NFT</h6>
            <div className='spacer-10' />
            <a className='my_btn_main' id="claim_rev_btn" href="#!">Claim 0.693 ꜩ</a>&emsp;
            <div className='spacer-30' /> */}
            
            {/* TOADD: Actions 
            <h6 className="index_title" style={{fontSize: "14px"}}>Actions</h6>
            <div className='spacer-10' />
            
            <a className='my_btn_main' id="start_sale_btn" href="#!">Start Sale</a>&emsp;
            <input type="text" name="item_title" style={{height: "44px", width: "100px", textAlign: "center"}} placeholder="2.5 (ꜩ)" />
            <div className='spacer-20' />
            
            <a className='my_btn_main' id="trigger_btn" href="EditCollection">Trigger 1 ꜩ</a>   */}
        </>
    )
}