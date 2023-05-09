import MyCard from './MyCard';

export default function CollectionCreationPrew(props) {
    return (
        <div style={{justifyContent: "center"}}>
            <div className="spacer-60" />
            <h5 className="index_title" style={{fontSize: "18px"}}>Preview Collection Card</h5>
            <div className="spacer-5" />
            <MyCard collection_or_nft={props.collection} type={"no buttons"} href={'#'} on_iframe_metadata_loaded={_ => {} }/>
        </div>
    )
}