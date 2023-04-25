export default function MyOwlCarouselItem(props) {

    return (
        <div /*id="myOwlCarousel"*/ className='item owlCarouselItem'>
            <img src={props.image} />
            <h4 className="myOwlCarouselH">{props.title}</h4>
        </div>
    );
}