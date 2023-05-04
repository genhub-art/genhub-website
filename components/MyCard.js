import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import { mint_nft } from '../lib/solidity_api';

export default function MyCard(props) {
  return (
      <Card className='cardItem'>
        {console.log("DNG Href", props.href, props.price, typeof props.price)}
        <Link className="cardA" href={props.href}>
          <Image /*variant="top"*/ height={264} width={264} src={props.image} className="cardImg" 
                alt={props.typ === "nft" ? "Nft" : "Collection"} />
        </Link>
        
        <Card.Body style={props.typ === "nft" ? {paddingTop: "0px", paddingBottom: "0px"} : {paddingTop: "8px", paddingBottom: "8px"}}>
          <Link className="cardA" href={props.href}><Card.Title className="cardTitle">{props.name}</Card.Title></Link>
          {props.typ !== "nft" &&
            <>
              <Link className="cardA" href={props.href}><Card.Text>
                <span className="cardPrice">{props.price} ꜩ</span>
                <span className="cardTid">{props.current_supply}/{props.max_supply}</span>
                {/* Some quick example text to build on the card title and make up the
                bulk of the card's content. */}
              </Card.Text></Link>
              {props.typ !== "no buttons" && 
                <>
                  <Button onClick={() => mint_nft(props.address, props.price, window)} className="cardButton" variant="primary">Mint</Button>
                  <Button className="cardButton" variant="primary">Edit</Button>
                  <a href={props.href} className="cardButton" variant="primary">View</a>
                </>
              }
            </>
          }
        </Card.Body>
      </Card>
  );
}
