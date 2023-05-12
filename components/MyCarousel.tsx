import Carousel from 'react-bootstrap/Carousel';
import Link from "next/link";
import Image from 'next/image';

export default function MyCarousel(props) {
    if(props.nfts){
        return (
            <Carousel style={{paddingTop: "28px"}} 
                nextIcon={(props.nfts.length > 0) && <span aria-hidden="true" className="carousel-control-next-icon" style={{backgroundColor: "black"}} />}
                prevIcon={(props.nfts.length > 0) && <span aria-hidden="true" className="carousel-control-prev-icon" style={{backgroundColor: "black"}} />} >
                {
                    props.nfts.map((nft, i) => 
                        <Carousel.Item key={`${i}`}>
                            <Link href={"NFTDetails?token_id=" + nft?.token_id + "&collection=" + nft?.collection + "&chain=" + nft?.chain}>
                                <Image alt={"NFT"} height={636} width={636} className="d-block w-100" src={nft?.metadata?.image} />
                            </Link>
                            <Carousel.Caption bsPrefix="carousel-caption my-carousel-caption">
                                <Link href={"NFTDetails?id=" + nft?.id + "&address=" + nft?.address}><span className="nft_pic_title"  style={{fontFamily: "Roboto Slab"}}>{nft?.metadata?.name} - {(nft?.price) && <>{(nft?.price / 1000000)} BNB</>}</span></Link>
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