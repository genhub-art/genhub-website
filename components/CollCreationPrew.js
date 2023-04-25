import MyCard from './MyCard';

export default function CollCreationPrew(props) {
    return (
        <div style={{justifyContent: "center"}}>
            <div className="spacer-60" />
            <h5 className="index_title" style={{fontSize: "18px"}}>Preview Collection Card</h5>
            <div className="spacer-5" />
            <MyCard href="#!" title={props.get_title} image={props.get_image} 
                  price={props.get_price} curr_tid={props.get_curr_tid} max_tid={props.get_max_tid} typ={"no buttons"} />
        </div>
    )
}