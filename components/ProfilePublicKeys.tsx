import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

export default function ProfilePublicKeys(props) {

    const [beacon_pkh, setBeaconPKH] = useState(null);
    const [aleph0_pkh, setAleph0PKH] = useState(null);
    const [solidity_pkh, setSolidityPKH] = useState(null);

    const refs = {
        ref_copy_1: useRef(null),
        ref_copy_2: useRef(null),
        ref_copy_3: useRef(null)
    }

    const sleep = (delay) => {
        try{
            return new Promise((resolve) => setTimeout(resolve, delay));
        }
        catch(_){}
    }

    let shortening_str = (str, sz_l, sz_r) => (!str) ? "" : (str.substring(0, sz_l) + "..." + str.substring(str.length - sz_r, str.length));

    let copy = async nr => {
        // console.log("Ref", refs[`ref_copy_${nr}`]);
        refs[`ref_copy_${nr}`].current.text = "Copied!";
        await sleep(2000);
        refs[`ref_copy_${nr}`].current.text = "Copy";
    }

    useEffect(() => {

        // console.log("Props changed", props);

        if(props.solidity_pkh && props.account === "My Account") setSolidityPKH(props.solidity_pkh);

        if(props.account_typ === "solidity_pkh") {setSolidityPKH(props.account); setAleph0PKH(null); setBeaconPKH(null);}

        if(props.beacon_pkh && props.account === "My Account") setBeaconPKH(props.beacon_pkh);

        if(props.account_typ === "beacon_pkh") {setBeaconPKH(props.account); setAleph0PKH(null); setSolidityPKH(null);}

        if(props.aleph0_pkh && props.account === "My Account") setAleph0PKH(props.aleph0_pkh);

        if(props.account_typ === "aleph0_pkh") {setAleph0PKH(props.account); setBeaconPKH(null); setSolidityPKH(null);}
    
      }, [props]);
   
    return (
        <>
            <h6 className="index_title" style={{fontSize: "18px"}}>Pub Key:</h6>
            {(solidity_pkh) &&
                <>
                    <Link title={solidity_pkh} href={`Profile?account=${solidity_pkh}&account_typ=solidity_pkh`} className="aTag" id="detATag">
                        {shortening_str(solidity_pkh, 12, 12)}
                        {/* {props.solidity_pkh.substring(0, 12) + "..." + props.solidity_pkh.substring(props.solidity_pkh.length - 12, props.solidity_pkh.length)} */}
                    </Link>&nbsp;&nbsp;
                    <a id="btn_copy" title="Copy Text" onClick={() => {navigator.clipboard.writeText(solidity_pkh); copy(1);}} href="#!" ref={refs.ref_copy_1}>Copy</a>
                    <div className="spacer-60"></div>
                </>
            }
            {/* {console.log("Profile Pub Keys: ", props)} */}
            {/* <h6 className="index_title" style={{fontSize: "18px"}}>Pub Keys:</h6>
            {(solidity_pkh) &&
                <>
                    <Image alt={""} src="/MetaMaskWallet.png" width={20} height={20} />&nbsp;&nbsp;
                    <h5 className="walletName">Metamask</h5>&nbsp;&nbsp;
                    <Link title={solidity_pkh} href={`Profile?account=${solidity_pkh}&account_typ=solidity_pkh`} className="aTag" id="detATag">
                        {shortening_str(solidity_pkh, 12, 12)}
                        {/* {props.solidity_pkh.substring(0, 12) + "..." + props.solidity_pkh.substring(props.solidity_pkh.length - 12, props.solidity_pkh.length)}
                    </Link>&nbsp;&nbsp;
                    <a id="btn_copy" title="Copy Text" onClick={() => {navigator.clipboard.writeText(solidity_pkh); copy(1);}} href="#!" ref={refs.ref_copy_1}>Copy</a>
                    <div className="spacer-10"></div>
                </>
            }
            {(beacon_pkh) &&
                <>
                    <Image alt={""} src="/BeaconWallet.png" width={20} height={20} />&nbsp;&nbsp;
                    <h5 className="walletName" style={{width: "102.1px", display: "inline-block"}}>Beacon</h5>&nbsp;&nbsp;
                    <Link title={beacon_pkh} href={`Profile?account=${beacon_pkh}&account_typ=beacon_pkh`} className="aTag" id="detATag" style={{marginRight: "1px"}}>
                        {shortening_str(beacon_pkh, 11, 11)}
                    </Link>&nbsp;&nbsp;
                    <a id="btn_copy" title="Copy Text" onClick={() => {navigator.clipboard.writeText(beacon_pkh); copy(2);}} href="#!" ref={refs.ref_copy_2}>Copy</a>
                    <div className="spacer-10"></div>
                </>
            }
            {(aleph0_pkh) &&
                <>
                    <Image alt={""} src="/EverWallet.png" width={20} height={20} />&nbsp;&nbsp;
                    <h5 className="walletName" style={{width: "102.1px", display: "inline-block"}}>Ever</h5>&nbsp;&nbsp;
                    <Link title={aleph0_pkh} href={`Profile?account=${aleph0_pkh}&account_typ=aleph0_pkh`} className="aTag" id="detATag" style={{marginRight: "2.5px"}}>
                        {shortening_str(aleph0_pkh, 11, 12)}
                    </Link>&nbsp;&nbsp;
                    <a id="btn_copy" title="Copy Text" onClick={() => {navigator.clipboard.writeText(aleph0_pkh); copy(3);}} href="#!" ref={refs.ref_copy_3}>Copy</a>
                </>
            }
            <div className="spacer-60" />
            <div className="spacer-5" /> */}
        </>
    )
}