import Link from "next/link";

export default function IndexPresentation() {
    return(
        <div id="index_presenation">
            <div className="spacer-single"></div>
            <h6 className="index_title" style={{fontSize: "1rem", marginTop: "60px"}}>GENHUB</h6>
            <div className="spacer-10"></div>
            <h1 className="index_title">Create. Mint. Collect.</h1>
            <p>An open platform for the creation of generative art NFT collections.</p>
            <div className="spacer-10"></div>
            <Link className='my_btn_main' href="AllCollections">Collections</Link>  
            <div className="spacer-single"></div>
        </div>
    );
}