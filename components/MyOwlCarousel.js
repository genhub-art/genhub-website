// import OwlCarousel from 'react-owl-carousel';
import dynamic from "next/dynamic";
import MyOwlCarouselItem from "./MyOwlCarouselItem";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const OwlCarousel = dynamic(
  () => {
    return import('react-owl-carousel');
  },
  { ssr: false }
);

let responsive_obj =  {0:{items:1},500:{items:2}, 800:{items:3},1200:{items:4}};

export default function MyOwlCarousel(props) {

    return (
        <>
            <h1 className="owl_carousel_title">Hot Collections</h1>
            <div className="spacer-60"></div>
            <OwlCarousel className='owl-theme' responsive={responsive_obj} loop items={4} margin={20} nav>
                {props?.collections?.map(collection => 
                    <MyOwlCarouselItem name={collection?.metadata?.name} image={collection?.metadata?.image} 
                                       address={collection?.address} chain={collection?.chain} />
                )}
            </OwlCarousel>
        </>
    );
}