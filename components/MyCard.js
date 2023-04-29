import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';

export default function MyCard(props) {
  return (
    <Link className="cardA" href={props.href}>
      <Card className='cardItem'>
        <Image /*variant="top"*/ height={264} width={264} src={props.image} className="cardImg" />
        <Card.Body style={props.typ === "nft" ? {paddingTop: "0px", paddingBottom: "0px"} : {paddingTop: "8px", paddingBottom: "8px"}}>
          <Card.Title className="cardTitle">{props.title}</Card.Title>
          {props.typ !== "nft" &&
            <>
              <Card.Text>
                <span className="cardPrice">{props.price} ꜩ</span>
                <span className="cardTid">{props.curr_tid}/{props.max_tid}</span>
                {/* Some quick example text to build on the card title and make up the
                bulk of the card's content. */}
              </Card.Text>
              {props.typ !== "no buttons" && 
                <>
                  <Button className="cardButton" variant="primary">Mint</Button>
                  <Button className="cardButton" variant="primary">Edit</Button>
                  <Button className="cardButton" variant="primary">View</Button>
                </>
              }
            </>
          }
        </Card.Body>
      </Card>
    </Link>
  );
}
