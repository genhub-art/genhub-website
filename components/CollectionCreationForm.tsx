import Card from 'react-bootstrap/Card';
import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import dynamic from 'next/dynamic';
import '../node_modules/react-quill/dist/quill.snow.css';
// import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker';
import Image from 'next/image';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';
import { upload_generator, upload_metadata, ipfs_to_https } from '../lib/utils';
import { FaSpinner } from 'react-icons/fa';
import { create_collection } from '../lib/solidity_api';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
// import useLocalStorage from '../custom_hooks/useLocalStorage';
import { KEYWORDS } from '../pages/_app';
import {Collection} from "../lib/indexer_api";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect  } from "wagmi";
import {
    bscTestnet,
    fantomTestnet,
    polygonMumbai,
    sepolia,
  } from "wagmi/chains";
// import { DateTimeField } from 'react-bootstrap-datetimepicker';
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

export default function CollectionCreationForm(props: { collection:Collection; handleCollectionModified: any; }) {

    const { open, isOpen, close, setDefaultChain } = useWeb3Modal();
    let acc = useAccount({onConnect: ({address, connector}) => setAccount({address, connector}), 
                            onDisconnect: () => setAccount({address: null, connector: null})});
    const [account, setAccount] = useState({address: acc.address, connector: acc.connector});
    const inputRef = useRef(null);
    const [uploading_folder, setUploadingFolder] = useState(false);
    const [creating_collection, setCreatingCollection] = useState(false);
    // const [network, setNetwork] = useLocalStorage(KEYWORDS.NETWORK, KEYWORDS.MAINNET);
    let setCollection = props.handleCollectionModified;
    
    let call_create_collection = async () => {
        setCreatingCollection(true);
        if(!account.connector){
            setDefaultChain(bscTestnet);
            await open();
            return;
        }
        await account.connector.connect({chainId: bscTestnet.id});
        await create_collection(props.collection, window);
        setCreatingCollection(false);
    }
    
    let not_ready_to_mint = () => (!props.collection.metadata.name || !props.collection.metadata.description || !props.collection.price || !props.collection.max_supply || !props.collection.metadata.generator_url/* TOADD: chain || chain === "Choose a chain"*/);

    // useEffect(() => {
    //     console.log("Collection", collection);
    // }, [collection]);
    
    let handle_upload = () => {
        // console.log("YES", inputRef);
        inputRef.current?.click();
    }

    let call_upload_metadata = async metadata => {
        try{
            return await upload_metadata(metadata);
        }
        catch(err){
            // console.log("Err", err);
            return "";
        }
    }

    let call_upload_generator = e => {
        setUploadingFolder(true);
        try{
            upload_generator(e).then(r => {
                let generator_src = ipfs_to_https(r);
                setUploadingFolder(false);
                setCollection(collection => {return {...collection, ...{metadata: {...collection.metadata, ...{generator_url: r}}}}})
                inputRef.current.value = null;
            });
        }
        catch(err){
            // console.log("Err", err);
            setUploadingFolder(false);
        }
    }
    
    useEffect(() => {
        
        if(!account.connector) return;
        let fetch = async () => {
            await call_create_collection();
        };
        if(creating_collection) fetch();

    }, [account.address]);
    
    // @ts-ignore
    return (
        // @ts-ignore
        <Form>
            {/* {console.log("Network", network)} */}
            {/* {console.log("Network KEYWORDS", KEYWORDS.NETWORK, KEYWORDS.MAINNET, KEYWORDS.TESTNET)} */}
            <div className="spacer-60" />
            {/*@ts-ignore*/}
            <a dataBsToggle="tooltip" title="Instructions on how to create a collection" target={"_blank"} rel={"noreferrer"} href={`https://docs.genhub.art/launch-your-collection`} className="instructionsATag">Instructions</a>
            <div className="spacer-40" />
            <Form.Group>  
                
                <Form.Label className="index_title" style={{fontSize: "18px"}}>Upload Folder</Form.Label>
                <div className="d-create-file">
                    {/* <p ref={refUplLd} style={{display: "none"}}><i className="fa fa-spinner fa-pulse"></i> Uploading...</p> */}
                    <Button id="get_file" bsPrefix="my_btn_main" onClick={() => handle_upload()} disabled={uploading_folder}
                      style={uploading_folder ? {pointerEvents: "none", backgroundColor: "#D3D3D7"} : {}}>
                        {uploading_folder ? <><FaSpinner className="spinner" /> Uploading...</> : <>Browse</>}
                    </Button>
                    {/*@ts-ignore*/}
                    <input ref={inputRef} type="file" id="upload_file" webkitdirectory="true" mozdirectory="true" onChange={call_upload_generator} style={{display: "none"}} />
                </div>
            </Form.Group>
            <div className="spacer-40" />

            <Form.Group>
                <Form.Label className="index_title" style={{fontSize: "18px"}}>Title</Form.Label>
                <Form.Control type="text" name="item_title" id="item_title" bsPrefix="form-control my_form_control" 
                              placeholder="e.g. 'Crypto Funk" defaultValue="" onChange={e => {setCollection(collection => {return {...collection, ...{metadata: {...collection.metadata, ...{name: e.target.value}}}}}) }} />
            </Form.Group>
            <div className="spacer-40" />

            <Form.Group>
                <Form.Label className="index_title" style={{fontSize: "18px"}}>Description</Form.Label>
                <QuillNoSSRWrapper placeholder="e.g. 'This is very limited collection!'" onChange={content => setCollection(collection => {return {...collection, ...{metadata: {...collection.metadata, ...{description: content}}}}})} 
                                   modules={modules} formats={formats} theme="snow" />
            </Form.Group>    
            <div className="spacer-40" />

            <Form.Group>
                <Form.Label className="index_title" style={{fontSize: "18px"}}>External URL (Optional)</Form.Label>
                <Form.Control type="text" name="item_royalties" id="item_royalties" bsPrefix="form-control my_form_control" 
                              placeholder="E.g. www.google.com" defaultValue="" onChange={e => setCollection(collection => {return {...collection, ...{metadata: {...collection.metadata, ...{external_url: e.target.value}}}}})} /> 
            </Form.Group> 
            <div className="spacer-40" />

            <Form.Group>
                <Form.Label className="index_title" style={{fontSize: "18px"}}>Price Per Token</Form.Label>
                <InputGroup>
                    <Form.Control type="number" name="item_royalties" id="item_royalties" bsPrefix="form-control my_form_control" 
                                placeholder="E.g. 2.5" defaultValue="" onChange={e => setCollection(collection => {return {...collection, price: parseFloat(e.target.value)}})} />
                    <InputGroup.Text>
                        <Image width={27} height={27} src="/bnb_logo.png" alt="" />&nbsp;BNB
                    </InputGroup.Text>
                 </InputGroup>
                <div className="spacer-40" />
            </Form.Group>

            <Form.Group>
                <Form.Label className="index_title" style={{fontSize: "18px"}}>Max Supply</Form.Label>
                <Form.Control type="number" name="item_royalties" id="item_royalties" bsPrefix="form-control my_form_control" 
                              placeholder="E.g. 25" defaultValue="" onChange={e => setCollection(collection => {return {...collection, max_supply: parseInt(e.target.value)}})} />
            </Form.Group>
            <div className="spacer-40" />


            {/* TOADD: Sale Start Time, Set Funding Goal, Enabled, Chose Chain and Network
            
            <Form.Group>
                <Form.Label className="index_title" style={{fontSize: "18px"}}>Sale Start Time</Form.Label>&nbsp;&nbsp;
                <DateTimePicker onChange={setDateTime} value={date_time} />
                {/* <DateTimeField />
            </Form.Group>
            <div className="spacer-30" />

            <Form.Group>
                {(has_goal === false)
                    ? <a className='my_btn_main' onClick={() => setHasGoal(true)} href="#!">
                        Set Goal&nbsp;&nbsp;
                        <Image src="/angle-down.svg" width={15} height={15} style={{position: 'relative', top: "-1px"}} />
                      </a>
                    : 
                        <>
                            <Form.Label className="index_title" style={{fontSize: "18px"}}>Goal</Form.Label>
                            <Form.Control type="text" name="item_royalties" id="item_royalties"  bsPrefix="form-control my_form_control" placeholder="E.g. 100.5 ꜩ" defaultValue="" onChange={e => setFundGoal(e.target.value)} />
                            <div className="spacer-30" />
                            <Form.Label className="index_title" style={{fontSize: "18px"}}>Deadline</Form.Label>&nbsp;&nbsp;
                            <DateTimePicker onChange={setFundDeadline} value={fund_deadline} />
                            <div className="spacer-single"></div>
                            <a className='my_btn_main' onClick={() => setHasGoal(false)} href="#!" style={{paddingLeft: "24px", paddingRight: "24px"}}>
                                Remove Goal&nbsp;&nbsp;
                                <Image src="/angle-up.svg" width={15} height={15} style={{position: 'relative', top: "-1px"}} />
                            </a>
                        </>
                }
            </Form.Group>

            <div className="spacer-40" />

            
            <Form.Group>
                <Form.Label className="index_title" style={{fontSize: "18px"}}>Enabled</Form.Label>&nbsp;&nbsp;
                <Form.Check inline checked={checked} type="checkbox" id="my_checkbox" /*bsPrefix="form-check my_checkbox_class" onChange={x => {setChecked(!checked);}} /*label="Enabled" />
                {/* <Form.Control id="my_checkbox" type="checkbox" onChange={x => {setChecked(!checked);}} />
            </Form.Group>    
            <div className="spacer-30" />
            <DropdownButton id="chose_chain_btn" bsPrefix="my_btn_main custom-dropdown-menu" className="d-inline-block" title={chain}>
                <Dropdown.Item href="#!" onClick={() => setChain("Ethereum")}>Ethereum</Dropdown.Item>
                <Dropdown.Item href="#!" onClick={() => setChain("Binance")}>Binance</Dropdown.Item>
                <Dropdown.Item href="#!" onClick={() => setChain("Polygon")}>Polygon</Dropdown.Item>
                <Dropdown.Item href="#!" onClick={() => setChain("Tezos")}>Tezos</Dropdown.Item>
                <Dropdown.Item href="#!" onClick={() => setChain("Aleph0")}>Aleph0</Dropdown.Item>
            </DropdownButton>
            &nbsp;&nbsp;&nbsp;
            <DropdownButton id="chose_chain_btn" bsPrefix="my_btn_main custom-dropdown-menu" className="d-inline-block" 
             title={network === "mainnet" ? "Mainnet" : "Testnet"}>
                <Dropdown.Item href="#!" onClick={() => {network === "mainnet" ? setNetwork("testnet") : setNetwork("mainnet")}}>
                    {network === "mainnet" ? "Testnet" : "Mainnet"}
                </Dropdown.Item>
            </DropdownButton>
            <div className="spacer-30" /> */}
            <Button id="create_coll_btn" bsPrefix="my_btn_main" onClick={async () => call_create_collection()} 
                    style={creating_collection || not_ready_to_mint() ? {pointerEvents: "none", backgroundColor: "#D3D3D7"} : {}}>
                {creating_collection ? <><FaSpinner className="spinner" /> Creating...</> : <>Create Collection</>}
            </Button>
            <div className="spacer-40" />
        </Form>
    )
}