import Image from 'next/image';
import Link from 'next/link';

export default function MyOwlCarouselItem(props) {

    return (
        <div /*id="myOwlCarousel"*/ className='item owlCarouselItem'>
            <Link href={"CollectionDetails?address=" + props?.address + "&chain=" + props?.chain} style={{textDecoration: "none"}}>
                <Image width={307} height={307} src={props.image} />
                <h4 className="myOwlCarouselH">{props.name}</h4>
            </Link>
        </div>
    );
}