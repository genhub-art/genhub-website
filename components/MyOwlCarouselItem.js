import Image from 'next/image';

export default function MyOwlCarouselItem(props) {

    return (
        <div /*id="myOwlCarousel"*/ className='item owlCarouselItem'>
            <Image width={307} height={307} src={props.image} />
            <h4 className="myOwlCarouselH">{props.name}</h4>
        </div>
    );
}