import Carousel from 'react-bootstrap/Carousel';
import Link from "next/link";

export default function MyCarousel(props) {
    if(props.nfts){
        return (
            <Carousel style={{paddingTop: "28px"}} 
                nextIcon={(props.nfts.length > 0) && <span aria-hidden="true" className="carousel-control-next-icon" style={{backgroundColor: "black"}} />}
                prevIcon={(props.nfts.length > 0) && <span aria-hidden="true" className="carousel-control-prev-icon" style={{backgroundColor: "black"}} />} >
                {
                    props.nfts.map(nft => 
                        <Carousel.Item>
                            <Link href={"NFTDetails?id=" + nft.id + "&address=" + nft.address}><img className="d-block w-100" src={nft.image} /></Link>
                            <Carousel.Caption bsPrefix="carousel-caption my-carousel-caption">
                                <Link href={"NFTDetails?id=" + nft.id + "&address=" + nft.address}><span className="nft_pic_title"  style={{fontFamily: "Roboto Slab"}}>{nft.name} - {(typeof nft.price !== "undefined") && <>{(nft.price / 1000000)} ꜩ</>}</span></Link>
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