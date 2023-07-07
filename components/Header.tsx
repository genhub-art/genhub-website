import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import style from '../styles/Header.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { tezos, aleph0, solidity } from '../lib/blockchains';
// import useLocalStorage from '../custom_hooks/useLocalStorage';
import { KEYWORDS } from '../pages/_app';
import useScrollPosition from '../custom_hooks/useScrollPosition';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";
import { useNetworkContext } from '../contexts/networkContext';

import {
    bscTestnet,
    fantomTestnet,
    polygonMumbai,
    sepolia,
  } from "wagmi/chains";

export default function Header(props) {

    const [loading, setLoading] = useState(false);
    const { open, isOpen, close, setDefaultChain } = useWeb3Modal();
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const [bridge_modal, setBridgeModal] = useState(false);
    const [wallets_modal, setWalletsModal] = useState(false);
    const [screen_width, setScreenWidth] = useState(993);
    // const [beacon_pkh, setBeaconPKH] = useLocalStorage(KEYWORDS.BEACON_PKH, null);
    // const [aleph0_pkh, setAleph0PKH] = useLocalStorage(KEYWORDS.ALEPH0_PKH ,null);
    // const [solidity_pkh, setSolidityPKH] = useLocalStorage(KEYWORDS.SOLIDITY_PKH ,null);
    // const [network, setNetwork] = useLocalStorage(KEYWORDS.NETWORK, KEYWORDS.TESTNET);
    // const [network, setNetwork] = useState(KEYWORDS.TESTNET);
    let {network, setNetwork} = useNetworkContext();
    const scrollPosition = useScrollPosition();

    async function onOpen() {
        setLoading(true);
        // setDefaultChain(sepolia);
        setDefaultChain(bscTestnet);
        await open();
        setLoading(false);
    }

    function onClick() {
        if (isConnected) {
            disconnect();
        } else {
            onOpen();
        }
    }
    // const [Window, setWindow] = useState(null);
    
    // let beacon_connect = () => {
    //     if(!beacon_pkh){
    //         tezos.connect().then(pkh =>{
    //             // console.log("Button PKH", pkh); 
    //             setBeaconPKH(pkh);
    //         }); 
    //     }
    //     else{
    //         tezos.disconnect().then(res=>{
    //             if(!res) return;
    //             setBeaconPKH(null);
    //         });   
    //     }
    // }

    // let aleph0_connect = () => {
    //     if(!aleph0_pkh){
    //         aleph0.connect().then(pkh =>{
    //             // console.log("Button PKH", pkh);
    //             setAleph0PKH(pkh);
    //         });
    //     }
    //     else {setAleph0PKH(null);}
    // }

    // let solidity_connect = () => {
    //     if(!solidity_pkh){
    //         solidity.connect(window).then(pkh =>{
    //             // console.log("Button PKH", pkh); 
    //             setSolidityPKH(pkh);
    //         });
    //     }
    //     else{setSolidityPKH(null);}
    // }

    useEffect(() => {

        // setBeaconPKH(localStorage.getItem("beacon_pkh"));
        // setAleph0PKH(localStorage.getItem("aleph0_pkh"));
        // setSolidityPKH(localStorage.getItem("solidity_pkh"));
        let handleResize = () => {
            setScreenWidth(window.innerWidth);          
        }
        
        // setWindow(window);
      
        window.addEventListener('resize', handleResize)

        setScreenWidth(window.innerWidth);

    }, []);

    // useEffect(() => {
    //     setWindow(window);
    // }, [window]);

    return(
        <header style={{borderBottom: (scrollPosition > 0 || screen_width < 1200) ? "solid 1px #dddddd" : "solid 1px transparent"}} /*className="borderBottom"*/>
            {/*{console.log("scrollTop", scrollPosition)}*/}
            {/*{console.log("Beacon PKH", beacon_pkh)}*/}
            {/*{console.log("Aleph0 PKH", aleph0_pkh)}*/}
            {/*{console.log("Solidity PKH", solidity_pkh)}*/}
            {/* {console.log("Network Header", network)} */}
            {/* {console.log("Window", Window)} */}
            <Modal scrollable={true} show={bridge_modal} onHide={() => setBridgeModal(false)} backdrop="static" keyboard={false} centered >
                <Modal.Header closeButton>
                    <Modal.Title style={{fontFamily: "Roboto Slab"}}>Bridge powered by Fixed Float!</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{background: "linear-gradient(-190deg,#0c4e7d 0,#021c35 100%)"}}>
                    <iframe style={{width: `${Math.min(460, screen_width - 40)}px`, height: "550px"}} src={`https://widget.fixedfloat.com/?to=XTZ&lockReceive=true&toAmount=10&address=${props.PKH}&lockAddress=true&type=fixed`}></iframe>
                </Modal.Body>
            </Modal>
            {/* <Modal scrollable={true} show={wallets_modal} onHide={() => {console.log("solidity_pkh", solidity_pkh); setWalletsModal(false)}} backdrop="static" keyboard={false} centered >
                <Modal.Header closeButton>
                    <Modal.Title style={{margin: "auto"}}>Connect your wallets</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup bsPrefix="" /*defaultActiveKey="#link1">
                        <ListGroup.Item action>
                            <Row>
                                <Col sm={5} style={(screen_width <= 575) ? {marginBottom: "2px"} : {marginBottom: "0px"}}>
                                    <Image alt={""} src="/MetaMaskWallet.png" width={23} height={23} />&nbsp;&nbsp;
                                    <h5 className="walletName">Metamask</h5>
                                </Col>
                                <Col sm={4} style={(screen_width <= 575) ? {marginBottom: "10px"} : {marginBottom: "0px"}}>
                                    <p className="details_p" style={{margin: "0", position: "relative", top: "2px"}}>
                                        Popular&nbsp;
                                        <OverlayTrigger key="metamask" placement="top"
                                            overlay={
                                                <Tooltip id="metamask_tooltip">
                                                <strong>MetaMask Supports Ethereum, Polygon, Binance</strong>.
                                                </Tooltip>
                                        }>
                                        <Image alt={""} src="/circle-info-solid.svg" width={15} height={15} />
                                    </OverlayTrigger></p>
                                </Col>
                                <Col sm={3} style={(screen_width <= 575) ? {marginBottom: "7px"} : {marginBottom: "0px"}}>
                                    <Button bsPrefix="my_btn_main" id="wallet_connect_btn" onClick={() => solidity_connect()}>
                                        {(!solidity_pkh) ? "Connect" : "Disconnect"}
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item action>
                            <Row>
                                <Col sm={5} style={(screen_width <= 575) ? {marginBottom: "2px"} : {marginBottom: "0px"}}>
                                    <Image alt={""} src="/BeaconWallet.png" width={23} height={23} />&nbsp;&nbsp;
                                    <h5 className="walletName">Beacon</h5>
                                </Col>
                                <Col sm={4} style={(screen_width <= 575) ? {marginBottom: "10px"} : {marginBottom: "0px"}}>
                                    <p className="details_p" style={{margin: "0", position: "relative", top: "2px"}}>Tezos</p>
                                </Col>
                                <Col sm={3} style={(screen_width <= 575) ? {marginBottom: "7px"} : {marginBottom: "0px"}}>
                                    <Button bsPrefix="my_btn_main" id="wallet_connect_btn" onClick={() => beacon_connect()}>
                                        {(!beacon_pkh) ? "Connect" : "Disconnect"}
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item action>
                            <Row>
                                <Col sm={5} style={(screen_width <= 575) ? {marginBottom: "2px"} : {marginBottom: "0px"}}>
                                    <Image alt={""} src="/EverWallet.png" width={23} height={23} />&nbsp;&nbsp;
                                    <h5 className="walletName">Ever</h5>
                                </Col>
                                <Col sm={4} style={(screen_width <= 575) ? {marginBottom: "10px"} : {marginBottom: "0px"}}>
                                    <p className="details_p" style={{margin: "0", position: "relative", top: "2px"}}>Aleph0</p>
                                </Col>
                                <Col sm={3} style={(screen_width <= 575) ? {marginBottom: "7px"} : {marginBottom: "0px"}}>
                                    <Button bsPrefix="my_btn_main" id="wallet_connect_btn" onClick={() => aleph0_connect()}>
                                        {(!aleph0_pkh) ? "Connect" : "Disconnect"}
                                    </Button>
                                </Col>
                            </Row>                            
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
            </Modal> */}
            <Navbar collapseOnSelect expand="lg" variant="light" bsPrefix="my_navbar navbar">
                <Container bsPrefix="my_header_container container">
                    <Navbar.Brand href="/" bsPrefix={style.header_logo}>GENHUB</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>

                        <Link className="menu_element navbar" href="/">Home</Link>
                        <Link className="menu_element navbar" href="AllCollections">Collections</Link>
                        {/* TOADD: Marketplace <Link className="menu_element navbar" href="Marketplace">Marketplace</Link> */}
                        <Link className="menu_element navbar" href="Profile?account=My Account">Profile</Link>
                        {/* {(beacon_pkh || solidity_pkh || aleph0_pkh) && 
                            <Link className="menu_element navbar" href="Profile?account=My Account">Profile</Link>
                        } */}
                        <Link className="menu_element navbar" href="CreateCollection">Create</Link>
                        <Nav.Link href="https://ivan-tsoninski.gitbook.io/genhub.art/" target="_blank" bsPrefix="menu_element navbar">Docs</Nav.Link>
                        {/* TOADD: Bridge <Nav.Link href="#!" bsPrefix="menu_element navbar" onClick={() => setBridgeModal(true)}>Bridge</Nav.Link> */}
                        <NavDropdown title={network === KEYWORDS.MAINNET ? "Mainnet" : "Testnet"} id="basic-nav-dropdown" bsPrefix="menu_element navbar">
                            <NavDropdown.Item href="#!"
                            onClick={() => {network === KEYWORDS.MAINNET ? setNetwork(KEYWORDS.TESTNET) : setNetwork(KEYWORDS.MAINNET)}}>
                                {network === "mainnet" ? "Testnet" : "Mainnet"}</NavDropdown.Item>
                        </NavDropdown>
                        <Button size="sm" variant="dark" bsPrefix="login_button btn" onClick={onClick}>
                            <span className="menu_element">{isConnected ? "Disconnect Wallet" : "Connect Wallet"}</span>
                        </Button>
                        {/* <Button size="sm" variant="dark" bsPrefix="login_button btn" onClick={() => setWalletsModal(true)}><span className="menu_element">Wallets</span></Button> */}
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>           
        </header>
    );
}

