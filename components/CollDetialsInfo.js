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
import CollDetailsPrew from '../components/CollDetailsPrew';
import ProgressBar from "@ramonak/react-progress-bar";
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Form } from 'react-bootstrap';
import MyCard from './MyCard';
// import { AiFillCheckCircle } from "react-icons/fa";
const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
})

const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' }
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    // imageResize: {
    //     parchment: QuillNoSSRWrapper.import('parchment'),
    //     modules: ['Resize', 'DisplaySize']
    //  }
  }
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ]

export default function CollDetailsInfo(props) {

    const refs = {
        ref_copy_1: useRef(null),
        ref_copy_2: useRef(null),
        ref_copy_3: useRef(null)
    }

    const [pub_key, setPubKey] = useState("tz1h7Tek85LYJPBpG8e5xqCZPAvSMu97tenm");
    const [iframe_code, setIframeCode] = useState(`<iframe src='https://lay3rz.xyz/CollectionDetailsIframe?collection=KT1SGYrBDC7ZJhpfT9snZSZc4skjvJtPsUnS&header=false' width='100%' height='1000px' />`);
    const [iframe_url, setIframeUrl] = useState(`https://lay3rz.xyz/CollectionDetailsIframe?collection=KT1SGYrBDC7ZJhpfT9snZSZc4skjvJtPsUnS&header=false`);
    const [add_nft, setAddNFT] = useState(false);
    const [title, setTitle]   = useState("Silver Surver");
    const [desc, setDesc]     = useState("");

    const sleep = (delay) => {
        try{
            return new Promise((resolve) => setTimeout(resolve, delay));
        }
        catch(_){}
    }
    
    let shortening_str = (str, sz_l, sz_r) => (str.substring(0, sz_l) + "..." + str.substring(str.length - sz_r, str.length));

    let copy = async nr => {
        // console.log("Ref", refs[`ref_copy_${nr}`]);
        refs[`ref_copy_${nr}`].current.text = "Copied!";
        await sleep(2000);
        refs[`ref_copy_${nr}`].current.text = "Copy";
    }

    return (
        <>
            <h2 className="details_title">Collection</h2>
            
            <p className="details_p">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            
            <div className="progressLabel" style={{color: "#6a1b9a", marginBottom: "5px"}}><b>{props.coll.get_current_tid} / {props.coll.get_max_tid} minted</b></div>
            <ProgressBar completed={parseInt(props.coll.get_current_tid) / parseInt(props.coll.get_max_tid) * 100} borderRadius={0} labelAlignment={"outside"} customLabel={props.coll.get_current_tid + " / " + props.coll.get_max_tid + " minted"} labelColor={"black"} isLabelVisible={false} labelSize={"14px"} height={"5px"} width={"50%"} />
            <div className='spacer-30' />
            
            <h6 className="index_title" style={{fontSize: "14px"}}>Funding Goal</h6>
            <div className='spacer-10' />
            
            <div className="progressLabel" style={{color: "#6a1b9a", marginBottom: "5px"}}><b>{props.coll.get_mutez_earned} / {props.coll.get_mutez_goal} ꜩ earned</b></div>
            <ProgressBar completed={parseFloat(props.coll.get_mutez_earned) / parseFloat(props.coll.get_mutez_goal) * 100} borderRadius={0} labelAlignment={"outside"} customLabel={props.coll.get_mutez_earned + " / " + props.coll.get_mutez_goal + "ꜩ earned"} labelColor={"black"} isLabelVisible={false} labelSize={"14px"} height={"5px"} width={"50%"} /> 
            <div className='spacer-10' />
            
            {/* <FontAwesomeIcon icon={faCoffee} />
            <FontAwesomeIcon icon={faCircleCheck} /> */}
            {/* <FontAwesomeIcon icon="coffee" /> */}
            {/* <FontAwesomeIcon icon={Icons.faCopyright} size="6x" /> */}
            {/* <AiFillCheckCircle /> */}
            {/* <FontAwesomeIcon icon="fa-solid fa-circle-check" /> */}
            {/* <FontAwesomeIcon icon={solid("circle-check")} /> */}
            <div className="goalMessage"><b><FontAwesomeIcon icon={faCircleCheck} /> Goal met!</b></div>
            
            <h6 style={{marginTop: "20px"}}>
                <a dataBsToggle="tooltip" title="Discover the Revenue Share Smart Contract" target={"_blank"} href={`https://www.google.com`} className="aTag">Revenue Share Smart Contract</a>
            </h6>
            {/* <div className='spacer-10' /> */}
            
            <p className="total_rev_shared_p">Collection Total Revenue Shared: 0 ꜩ</p>
            <div className='spacer-10' />
            
            <a className='my_btn_main' id="apply_dist_btn" href="#!">Apply Distribution</a>  
            <div className='spacer-20' />
            
            <a className='my_btn_main' id="fund_rev_share_btn" href="#!">Fund Rev Share</a>&emsp;
            <input type="text" name="item_title" style={{height: "44px", width: "114px", textAlign: "center", marginTop: "10px"}} 
            placeholder="2.5 (ꜩ)" />
            <div className='spacer-30' />
            
            <h6 className="index_title" style={{fontSize: "14px"}}>Author</h6>
            <div className='spacer-10' />
            
            <Link target={"_blank"} title={pub_key} href={`Profile?account=${pub_key}&account_typ=beacon_pkh`} className="aTag" id="detATag" style={{marginRight: "2.5px"}}>
                {shortening_str(pub_key, 12, 12)}
            </Link>&nbsp;&nbsp;
            <a id="btn_copy" title="Copy Text" onClick={() => {navigator.clipboard.writeText(pub_key); copy(1);}} href="#!" ref={refs.ref_copy_1}>Copy</a>
            <div className='spacer-30' />
            
            <h6 className="index_title" style={{fontSize: "14px"}}>Embed</h6>
            <div className='spacer-10' />
            
            <Link target={"_blank"} title={iframe_code} href="Profile" className="aTag" id="detATag" style={{marginRight: "3.5px"}}>
                {shortening_str(iframe_code, 30, 0)}
            </Link>&nbsp;&nbsp;
            <a id="btn_copy" title="Copy Text" onClick={() => {navigator.clipboard.writeText(iframe_code); copy(2);}} href="#!" ref={refs.ref_copy_2}>Copy</a>
            <div className='spacer-10' />
            <div className='spacer-5' />
            <Link target={"_blank"} title={iframe_url} href="Profile" className="aTag" id="detATag">{shortening_str(iframe_url, 30, 0)}</Link>&nbsp;&nbsp;
            <a id="btn_copy" title="Copy Text" onClick={() => {navigator.clipboard.writeText(iframe_url); copy(3);}} href="#!" ref={refs.ref_copy_3}>Copy</a>
            <div className='spacer-20' />
            
            <Link className='my_btn_main' id="edit_btn" href="EditCollection">Edit</Link>
            <div className='spacer-20' />

            {(add_nft)
                ? <a href='#!' className="my_btn_main" id="add_nft" onClick={() => {setAddNFT(false);}}>
                    Add NFT&nbsp;&nbsp;
                    <Image src="/angle-up.svg" width={15} height={15} style={{position: 'relative', top: "-1px"}} />
                  </a>
                : <a href='#!' className="my_btn_main" id="add_nft" onClick={() => {setAddNFT(true);}}>
                    Add NFT&nbsp;&nbsp;
                    <Image src="/angle-down.svg" width={15} height={15} style={{position: 'relative', top: "-1px"}} />
                  </a>
            }
            {add_nft &&
                <Form>
                    <div className='spacer-30' />
                    <Form.Group>  
                        
                        <Form.Label className="index_title" style={{fontSize: "18px"}}>Upload Folder</Form.Label>
                        <div className="d-create-file">
                            {/* <p ref={refUplLd} style={{display: "none"}}><i className="fa fa-spinner fa-pulse"></i> Uploading...</p> */}
                            <Form.Control /*ref={refUplBr}*/ type="button" id="get_file" bsPrefix="my_btn_main" value="Browse" />
                            {/* <input type="file" id="upload_file" webkitdirectory="true" mozdirectory="true" onChange={upload_generator} /> */}
                        </div>
                    </Form.Group>
                    <div className="spacer-40" />
        
                    <Form.Group>
                        <Form.Label className="index_title" style={{fontSize: "18px"}}>Title</Form.Label>
                        <Form.Control type="text" name="item_title" id="item_title" bsPrefix="form-control my_form_control" placeholder="e.g. 'Crypto Funk" defaultValue="" onChange={e => setTitle(e.target.value)} />
                    </Form.Group>
                    <div className="spacer-40" />
        
                    <Form.Group>
                        <Form.Label className="index_title" style={{fontSize: "18px"}}>Description</Form.Label>
                        <Form.Control type="text" name="item_title" id="item_title" bsPrefix="form-control my_form_control" placeholder="e.g. 'Crypto Funk" defaultValue="" onChange={e => setDesc(e.target.value)} />
                    </Form.Group>    

                    <div className="spacer-40" />
                    <Row>
                        <Col lg={6} sm={6} xs={12}>
                            <h5 className="index_title" style={{fontSize: "18px"}}>Preview Collection Card</h5>
                            <div className="spacer-5" />
                            <MyCard href="#!" title={"Collection 1"} image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08vz0MsFRneW3Gvxp0-7cV6H7QEOQ25ggclc-rtY&s"} 
                                price={0.4} curr_tid={6} max_tid={6} typ={"no buttons"} />
                        </Col>
                    </Row>
                    <div className="spacer-20" />
        
                    <Form.Control disabled={!title || !desc} type="button" id="create_coll_btn" bsPrefix="my_btn_main" value="Mint" />
                    {/* <div className="spacer-40" /> */}

                </Form>
            }
        </>
    )
}