import Link from "next/link";

export default function IndexPresentation() {
    return(
        <div id="index_presenation">
            <div className="spacer-single"></div>
            <h6 className="index_title" style={{fontSize: "1rem", marginTop: "60px"}}>LAY3RZ</h6>
            <div className="spacer-10"></div>
            <h1 className="index_title">Create. Mint. Collect.</h1>
            <p>The most powerful no-code platform for the creation of generative layered PFP NFT collections.</p>
            <div className="spacer-10"></div>
            <Link className='my_btn_main' href="AllCollections">Collections</Link>  
            <div className="spacer-single"></div>
            <p>Join us on:</p>
            <div className="spacer-single"></div>
            <div>
                <a href="https://twitter.com/LAY3RZ_XYZ" rel={"noreferrer"} target={"_blank"}><img className='opacity_hover' src='512x512-logo-27157.png' style={{height: "40px"}}></img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://discord.gg/f9eaNt4qX4" rel={"noreferrer"} target={"_blank"}><img className='opacity_hover' src='discord-logo-png-7616.png' style={{height: "50px"}}></img></a>
            </div>                              
        </div>
    );
}