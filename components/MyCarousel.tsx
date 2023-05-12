import Carousel from 'react-bootstrap/Carousel';
import Link from "next/link";
import Image from 'next/image';
import {NFT} from "../lib/indexer_api";

export default function MyCarousel(props: {nfts: NFT[]}) {
    if(props.nfts){
        return (
            <Carousel style={{paddingTop: "28px"}} 
                nextIcon={(props.nfts.length > 0) && <span aria-hidden="true" className="carousel-control-next-icon" style={{backgroundColor: "black"}} />}
                prevIcon={(props.nfts.length > 0) && <span aria-hidden="true" className="carousel-control-prev-icon" style={{backgroundColor: "black"}} />} >
                {
                    props.nfts.map((nft, i) => 
                        <Carousel.Item key={`${i}`}>
                            <Link href={"NFTDetails?token_id=" + nft?.token_id + "&collection=" + nft?.collection + "&chain=" + nft?.chain}>
                                <div style={{width: "636px", height: "636px"}}>
                                    <img src={nft?.metadata?.image} 
                                        style={{height: "auto", width: "auto", maxHeight: "636px", maxWidth: "636px", position: "relative", 
                                                top: "50%",left: "50%",transform: "translate(-50%, -50%)"}} className="d-block w-100" /></div>
                            </Link>
                            <Carousel.Caption bsPrefix="carousel-caption my-carousel-caption">
                                <Link href={"NFTDetails?id=" + nft?.token_id + "&collection=" + nft?.collection + 
                                        "&chain=" + nft?.chain}>
                                    <span className="nft_pic_title" style={{fontFamily: "Roboto Slab"}}>
                                        {nft?.metadata?.name}{/*(nft?.price) && <> - {(nft?.price / 1000000)}&nbsp;&nbsp; 
                                        <Image width={27} height={27} src="/bnb_logo.png" alt="" />&nbsp;BNB</>*/}
                                    </span>
                                </Link>
                                {/* <h3 style={{backgroundColor: ""}}>{collection.get_title}</h3> */}
                            </Carousel.Caption>
                        </Carousel.Item>

                )}
            </Carousel>
        );
    }
    else{
        return <></>
    }
}