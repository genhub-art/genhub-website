import {useEffect} from "react";
import {ERC1155TokenMetadata} from "../lib/indexer_api";

export default function GeneratorIframe(props: {className?:string; height?:number; width?:number; style?:any; url:string; on_iframe_metadata_loaded: (token_metadata: ERC1155TokenMetadata) => void}) {
    useEffect(() => {
        //every 1 seconds try to call the metadata() function from inside the generator_iframe and print the result
        window.addEventListener("message", (event) => {
            if (event.data.name) {
                props.on_iframe_metadata_loaded(event.data)
            }
        }, false);
        setInterval(() => {
            try {
                // @ts-ignore
                if (!iframe_metadata && props.collection_or_nft.metadata?.generator_url) {
                    // @ts-ignore
                    let md = document.getElementById("generator_iframe").contentWindow.postMessage({type: "metadata"}, "*")
                }
            } catch (e) {
                console.log("error", e)
            }
        }, 10000)
    })
    return <iframe className={props.className} height={props.height} width={props.width} id={"generator_iframe"} src={(props.url)} scrolling="no" style={{...props.style, overflow: "hidden"}}></iframe>
}