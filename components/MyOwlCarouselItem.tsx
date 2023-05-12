import Image from 'next/image';
import Link from 'next/link';

export default function MyOwlCarouselItem(props) {

    return (
        <div /*id="myOwlCarousel"*/ className='item owlCarouselItem'>
            <Link href={"CollectionDetails?address=" + props?.address + "&chain=" + props?.chain} style={{textDecoration: "none"}}>
            <div style={{width: "307px", height: "307px"}}>
                                    <img src={props.image} 
                                        style={{height: "auto", width: "auto", maxHeight: "305px", maxWidth: "305px", position: "relative", 
                                                top: "50%",left: "50%",transform: "translate(-50%, -50%)"}} className="d-block w-100" /></div>
                <h4 className="myOwlCarouselH">{props.name}</h4>
            </Link>
        </div>
    );
}