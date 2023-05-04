import MyCard from './MyCard';

export default function CollectionCreationPrew(props) {
    return (
        <div style={{justifyContent: "center"}}>
            <div className="spacer-60" />
            <h5 className="index_title" style={{fontSize: "18px"}}>Preview Collection Card</h5>
            <div className="spacer-5" />
            <MyCard href="#!" name={props.title} image={props.image} 
                  price={props.price} current_supply={props.curr_tid} max_supply={props.max_tid} typ={"no buttons"} />
        </div>
    )
}