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
import useLocalStorage from '../custom_hooks/useLocalStorage';
import { KEYWORDS } from '../pages/_app';
import useScrollPosition from '../custom_hooks/useScrollPosition';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header(props) {

    const [bridge_modal, setBridgeModal] = useState(false);
    const [wallets_modal, setWalletsModal] = useState(false);
    const [screen_width, setScreenWidth] = useState(993);
    const [beacon_pkh, setBeaconPKH] = useLocalStorage(KEYWORDS.BEACON_PKH, null);
    const [aleph0_pkh, setAleph0PKH] = useLocalStorage(KEYWORDS.ALEPH0_PKH ,null);
    const [solidity_pkh, setSolidityPKH] = useLocalStorage(KEYWORDS.SOLIDITY_PKH ,null);
    const [network, setNetwork] = useLocalStorage(KEYWORDS.NETWORK, KEYWORDS.MAINNET)
    const scrollPosition = useScrollPosition();
    // const [Window, setWindow] = useState(null);
    
    let beacon_connect = _ => {
        if(!beacon_pkh){
            tezos.connect().then(pkh =>{
                console.log("Button PKH", pkh); 
                setBeaconPKH(pkh);
            }); 
        }
        else{
            tezos.disconnect().then(res=>{
                if(!res) return;
                setBeaconPKH(null);
            });   
        }
    }

    let aleph0_connect = _ => {
        if(!aleph0_pkh){
            aleph0.connect().then(pkh =>{
                console.log("Button PKH", pkh);
                setAleph0PKH(pkh);
            });
        }
        else {setAleph0PKH(null);}
    }

    let solidity_connect = _ => {
        if(!solidity_pkh){
            solidity.connect(window).then(pkh =>{
                console.log("Button PKH", pkh); 
                setSolidityPKH(pkh);
            });
        }
        else{setSolidityPKH(null);}
    }

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
            {console.log("scrollTop", scrollPosition)}
            {console.log("Beacon PKH", beacon_pkh)}
            {console.log("Aleph0 PKH", aleph0_pkh)}
            {console.log("Solidity PKH", solidity_pkh)}
            {/* {console.log("Window", Window)} */}
            <Modal scrollable={true} show={bridge_modal} onHide={() => setBridgeModal(false)} backdrop="static" keyboard={false} centered >
                <Modal.Header closeButton>
                    <Modal.Title style={{fontFamily: "Roboto Slab"}}>Bridge powered by Fixed Float!</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{background: "linear-gradient(-190deg,#0c4e7d 0,#021c35 100%)"}}>
                    <iframe style={{width: `${Math.min(460, screen_width - 40)}px`, height: "550px"}} src={`https://widget.fixedfloat.com/?to=XTZ&lockReceive=true&toAmount=10&address=${props.PKH}&lockAddress=true&type=fixed`}></iframe>
                </Modal.Body>
            </Modal>
            <Modal scrollable={true} show={wallets_modal} onHide={() => {console.log("solidity_pkh", solidity_pkh); setWalletsModal(false)}} backdrop="static" keyboard={false} centered >
                <Modal.Header closeButton>
                    <Modal.Title style={{margin: "auto"}}>Connect your wallets</Modal.Title>
                    {/* <Modal.Title>My Wallets</Modal.Title> */}
                    {/* <ListGroup.Item action>
                        <Image src="/EverWallet.png" width={30} height={30} />
                        <h1>Ever Wallet (Aleph0) - {(!aleph0_pkh) ? "not connected" : "connected"}</h1>
                        <Button onClick={() => aleph0_connect()}>{(!aleph0_pkh) ? "Connect" : "Disconnect"}</Button>
                    </ListGroup.Item>
                    <ListGroup.Item action>
                        <Image src="/MetaMaskWallet.png" width={30} height={30} />
                        <h1>Metamask Wallet (Ethereum, Binance, Polygon) - {(!solidity_pkh) ? "not connected" : "connected"}</h1>
                        <Button onClick={() => solidity_connect()}>{(!solidity_pkh) ? "Connect" : "Disconnect"}</Button>
                    </ListGroup.Item> */}
                </Modal.Header>
                <Modal.Body>
                    <ListGroup bsPrefix="" /*defaultActiveKey="#link1"*/>
                        <ListGroup.Item action>
                            <Row>
                                <Col sm={5} style={(screen_width <= 575) ? {marginBottom: "2px"} : {marginBottom: "0px"}}>
                                    <Image src="/MetaMaskWallet.png" width={23} height={23} />&nbsp;&nbsp;
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
                                        <Image src="/circle-info-solid.svg" width={15} height={15} />
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
                                    <Image src="/BeaconWallet.png" width={23} height={23} />&nbsp;&nbsp;
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
                                    <Image src="/EverWallet.png" width={23} height={23} />&nbsp;&nbsp;
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
                    {/* <h1>Beacon Wallet (Tezos) - {(!beacon_pkh) ? "not connected" : "connected"}</h1>
                    <Button onClick={() => beacon_connect()}>{(!beacon_pkh) ? "Connect" : "Disconnect"}</Button>
                    <h1>Ever Wallet (Aleph0) - {(!aleph0_pkh) ? "not connected" : "connected"}</h1>
                    <Button onClick={() => aleph0_connect()}>{(!aleph0_pkh) ? "Connect" : "Disconnect"}</Button>
                    {console.log("solidity_pkh", solidity_pkh, (!solidity_pkh), typeof solidity_pkh)}
                    <h1>Metamask (Ethereum, Binance, Polygon) - {(!solidity_pkh) ? "not connected" : "connected"}</h1>
                    <Button onClick={() => solidity_connect()}>{(!solidity_pkh) ? "Connect" : "Disconnect"}</Button> */}
                </Modal.Body>
            </Modal>
            <Navbar collapseOnSelect expand="lg" variant="light" bsPrefix="my_navbar navbar">
                <Container bsPrefix="my_header_container container">
                    <Navbar.Brand href="/" bsPrefix={style.header_logo}>LAY3RZ</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>

                        {/* <Nav.Link bsPrefix="menu_element navbar"><Link className="menu_element" style={{margin: 0}} href="/">Home</Link></Nav.Link>
                        <Nav.Link bsPrefix="menu_element navbar"><Link className="menu_element" style={{margin: 0}} href="AllCollections">Collections</Link></Nav.Link>
                        <Nav.Link bsPrefix="menu_element navbar"><Link className="menu_element" style={{margin: 0}} href="Marketplace">Marketplace</Link></Nav.Link>
                        {(beacon_pkh || solidity_pkh || aleph0_pkh) && 
                            <Nav.Link bsPrefix="menu_element navbar"><Link className="menu_element" style={{margin: 0}} href="Profile?account=My Account">Profile</Link></Nav.Link>
                        }
                        <Nav.Link bsPrefix="menu_element navbar"><Link className="menu_element" style={{margin: 0}} href="CreateCollection">Create</Link></Nav.Link> */}

                        {/* <Nav.Link href="/" bsPrefix="menu_element navbar">Home</Nav.Link>
                        <Nav.Link href="AllCollections" bsPrefix="menu_element navbar">Collections</Nav.Link>
                        <Nav.Link href="Marketplace" bsPrefix="menu_element navbar">Marketplace</Nav.Link>
                        {(beacon_pkh || solidity_pkh || aleph0_pkh) && 
                            <Nav.Link href="Profile?account=My Account" bsPrefix="menu_element navbar">Profile</Nav.Link>
                        }
                        <Nav.Link href="CreateCollection" bsPrefix="menu_element navbar">Create</Nav.Link> */}

                        <Link className="menu_element navbar" href="/">Home</Link>
                        <Link className="menu_element navbar" href="AllCollections">Collections</Link>
                        <Link className="menu_element navbar" href="Marketplace">Marketplace</Link>
                        {(beacon_pkh || solidity_pkh || aleph0_pkh) && 
                            <Link className="menu_element navbar" href="Profile?account=My Account">Profile</Link>
                        }
                        <Link className="menu_element navbar" href="CreateCollection">Create</Link>
                        <Nav.Link href="https://docs.lay3rz.xyz/" target="_blank" bsPrefix="menu_element navbar">Docs</Nav.Link>
                        <Nav.Link href="#!" bsPrefix="menu_element navbar" onClick={() => setBridgeModal(true)}>Bridge</Nav.Link>
                        <Nav.Link href="https://twitter.com/LAY3RZ_XYZ" target="_blank" bsPrefix="menu_element navbar"><img className='opacity_hover' src='512x512-logo-27157.png' style={{height: "20px"}}></img></Nav.Link>
                        <Nav.Link href="https://discord.com/invite/f9eaNt4qX4" target="_blank" bsPrefix="menu_element navbar"><img className='opacity_hover' src='discord-logo-png-7616.png' style={{height: "25px"}}></img></Nav.Link>
                        <NavDropdown title={network === KEYWORDS.MAINNET ? "Mainnet" : "Testnet"} id="basic-nav-dropdown" bsPrefix="menu_element navbar">
                            <NavDropdown.Item href="#!" 
                            onClick={() => {network === KEYWORDS.MAINNET ? setNetwork(KEYWORDS.TESTNET) : setNetwork(KEYWORDS.MAINNET)}}>
                                {network === "mainnet" ? "Testnet" : "Mainnet"}</NavDropdown.Item>
                        </NavDropdown>
                        <Button size="sm" variant="dark" bsPrefix="login_button btn" onClick={() => setWalletsModal(true)}><span className="menu_element">Wallets</span></Button>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>           
        </header>
    );
}


// import Link from "next/link";
// export default function Header(props) {
//     return(
//         <header className="transparent header-light scroll-light">
            
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-12">
//                         <div className="de-flex sm-pt10">
//                             <div className="de-flex-col" style={{marginTop: "20px"}}>
//                                 <div className="de-flex-col header-col-mid">
//                                 <h2><span className="text-uppercase id-color-2"><Link href="/">Lay3rz<span></span></Link></span></h2>
//                                 </div>
//                             </div>
//                             <div className="de-flex-col header-col-mid">
//                                 <ul id="mainmenu" style={{paddingLeft: "0"}}>
//                                     <li>
//                                         <Link href="/">Home<span></span></Link>
//                                     </li>
//                                     <li>
//                                         <Link href="AllCollections">Collections<span></span></Link>
//                                     </li>
//                                     <li>
//                                         <Link href="Marketplace">Marketplace<span></span></Link>
//                                     </li>
//                                     <li>
//                                         <Link href="Profile?account=My Account">Profile<span></span></Link>
//                                     </li>
//                                     <li>
//                                         <Link href="CreateCollection">Create<span></span></Link>
//                                     </li>
//                                     <li>
//                                         <a href="https://docs.lay3rz.xyz/" target={"_blank"}>Docs<span></span></a>                                    
//                                     </li>
//                                     <li>
//                                         <a href="#!" onClick={() => setBridgeModal(true)}>Bridge<span></span></a>                                    
//                                     </li>
//                                     <li><a href="https://twitter.com/LAY3RZ_XYZ" target={"_blank"}><img className='opacity_hover' src='512x512-logo-27157.png' style={{height: "20px"}}></img></a></li>
//                                     <li><a href="https://discord.gg/f9eaNt4qX4" target={"_blank"}><img className='opacity_hover' src='discord-logo-png-7616.png' style={{height: "25px"}}></img></a></li>
//                                     <li>
//                                         <a href="#!">{props.network === "mainnet" ? "Mainnet" : "Testnet"}<span></span></a>
//                                             <ul>
//                                                 <li><a id="mainnet_button" style={{pointerEvents: "none", backgroundColor: "#D3D3D7", color: "white"}} href="#!" onClick={() => {props.onChange(props.connected, props.PKH, ((props.network === "mainnet") ? "testnet" : "mainnet"));(screen_width < 993) && $('#menu-btn').click()}}>{props.network === "mainnet" ? "Testnet" : "Mainnet"}</a></li>
//                                             </ul>
//                                     </li>
//                                     </ul>
//                                     <div className="menu_side_area">
//                                         {
//                                             (props.connected)
//                                             ? <a href="#!" className="btn-main btn-wallet" onClick={() => Logout()} style={{paddingLeft: "15px", paddingRight: "15px"}}><i className="fa fa-sign-out"></i><span>Beacon Logout</span></a>
//                                             : <a href="#!" className="btn-main btn-wallet" onClick={() => Login()}><i className="icon_wallet_alt"></i><span>Beacon Login</span></a>
//                                         }
//                                         <span id="menu-btn" onClick={() => {console.log("Clicked!");if(bl) $('#mainmenu').show(); setBl(false);}}></span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </header>
//     );
// }