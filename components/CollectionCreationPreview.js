import MyCard from './MyCard';

export default function CollectionCreationPrew(props) {
    return (
        <div style={{justifyContent: "center"}}>
            <div className="spacer-60" />
            <h5 className="index_title" style={{fontSize: "18px"}}>Preview Collection Card</h5>
            <div className="spacer-5" />
            <MyCard href="#!" title={props.title} image={props.image} 
                  price={props.price} curr_tid={props.curr_tid} max_tid={props.max_tid} typ={"no buttons"} />
        </div>
    )
}