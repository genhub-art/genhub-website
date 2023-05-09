import {useEffect, useState} from "react";
import {ERC1155TokenMetadata} from "../lib/indexer_api";


export default function GeneratorIframe(props: {className?:string; height?:number; width?:number; style?:any; url:string; on_iframe_metadata_loaded: (token_metadata: ERC1155TokenMetadata) => void}) {
    let iframe_metadata : ERC1155TokenMetadata | null = null
    let get_iframe_metadata = () => {
        // console.log("get_iframe_metadata", iframe_metadata?.name, iframe_metadata === null)
        return iframe_metadata
    }

    useEffect(() => {
        //every 1 seconds try to call the metadata() function from inside the generator_iframe and print the result
        window.addEventListener("message", (event) => {
            if (event.data.name) {
                console.log("LOADED", (event.data as ERC1155TokenMetadata).name)
                iframe_metadata = (event.data as ERC1155TokenMetadata)
                props.on_iframe_metadata_loaded(iframe_metadata)
            }
            
        }, false);
        // setInterval(() => {
            console.log("interval", props.url)
            try {
                // console.log("trying to get metadata from iframe", props.collection_or_nft?.metadata?.generator_url)
                // @ts-ignore
                if (props.url) {
                    console.log("TRIGGER METADATA IFRAME")
                    // @ts-ignore
                    let md = document.getElementById("generator_iframe").contentWindow.postMessage({type: "metadata"}, "*")
                }
            } catch (e) {
                console.log("error", e)
            }
        // }, 1000)
    }, [])
    return <iframe className={props.className} height={props.height} width={props.width} id={"generator_iframe"} src={(props.url)} scrolling="no" style={{...props.style, overflow: "hidden"}}></iframe>
}
