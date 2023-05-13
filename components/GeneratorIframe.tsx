import {useEffect, useState} from "react";
import {ERCTokenMetadata} from "../lib/indexer_api";


export default function GeneratorIframe(props: {className?:string; height?:number; width?:number; style?:any; url:string; on_iframe_metadata_loaded: (token_metadata: ERCTokenMetadata) => void}) {
    let iframe_metadata : ERCTokenMetadata | null = null
    
    useEffect(() => {
        if (props.url && props.url.startsWith("https://")) {
            console.log("good url")
            //every 1 seconds try to call the metadata() function from inside the generator_iframe and print the result
        window.addEventListener("message", (event) => {
            if (event.data.name) {
                iframe_metadata = (event.data as ERCTokenMetadata)
                // console.log("zzziframe_metadata", iframe_metadata)
                props.on_iframe_metadata_loaded(iframe_metadata)
            }
            
        }, false);
        setInterval(() => {
                // console.log("zzzTRIGGER METADATA IFRAME")
            try {
                // @ts-ignore
                let md = document.getElementById("generator_iframe").contentWindow.postMessage({type: "metadata"}, "*")
                
            }catch (e) {
                // console.log("xxxERROR", e)
            }
            
        }, 1000)
            
        return () => window.removeEventListener("message", (event) => { console.log("xxxRemove event listener") })
        }
    }, [])
    return <iframe className={props.className} height={props.height} width={props.width} id={"generator_iframe"} src={(props.url)} 
                    scrolling="no" style={{...props.style, overflow: "hidden"}}></iframe>
}
