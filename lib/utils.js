
export let get_api_url = "https://api.genhub.art";

export const http_get = async (url) => await fetch(url).then(r => r.json());
export const http_post = async (url, data) => await fetch(url, {method: 'POST', headers:{'Content-Type': 'application/json'}, body: JSON.stringify(data)}).then(r => r.json());

export const save_youtube_videos = (str) => {
    let bgn = '<iframe class="ql-video" allowfullscreen="true" src="https://www.youtube.com/embed/';
    let end = '?showinfo=0" frameborder="0"></iframe>';
    let spl = str.split(bgn);
    spl = spl.slice(1, spl.length);
    let yt_videos = spl.map(el => el.split(end)[0]).filter(el => onlyLettersAndNumbers(el)).map(el => bgn + el + end);
    // // console.log("SPL", spl);
    for(let i = 0; i < yt_videos.length; i ++){
        str = str.replaceAll(yt_videos[i], `<p>This is WYSIWYG YT Video ${i} saved during sanitize</p>`);
    }
    return [str, yt_videos];
}

export const add_back_youtube_videos = (str, yt_videos) => {
    let bgn = "<p>This is WYSIWYG YT Video ";
    let end = " saved during sanitize</p>";
    for(let i = 0; i < yt_videos.length; i ++){
        str = str.replaceAll(bgn + `${i}` + end, yt_videos[i]);
    }
    return str;
}

export let toHex = (str) => {
    let hex;
    try {
        hex = unescape(encodeURIComponent(str))
        .split("")
        .map((v) => {
            return v.charCodeAt(0).toString(16);
        })
        .join("");
    } catch (e) {
        // console.log("invalid text input: " + str);
    }
    return hex;
};
let dbg = (str) => {return str;};
export const ipfs_to_https = ((ipfs_url) => (ipfs_url) ? `https://gateway.moralisipfs.com/ipfs/${dbg(ipfs_url).replace("ipfs://", "")}` : "");

export let upload_to_ipfs = abi =>
    fetch("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", {method: 'POST', headers:{'Content-Type': 'application/json', 'X-API-Key': 'J8VPvA8kK0Q5BEfbOXRoetIX0yWr6SJU2MgYUZDHJBciNuMui7cxhor7HXJL0WON', 'accept': 'application/json'}, body: JSON.stringify(abi)})
    .then(r => r.json())

export let readAsDataURL = f => {
    var reader = new FileReader()
    return new Promise(function (resolve, reject) {
      reader.onload = event => resolve(event.target.result.replace('data:', '').replace(/^.+,/, ''))
      reader.readAsDataURL(f)
    })
}

export let upload_generator = e => {
    try{
        let folder_name = e.target.files[0].webkitRelativePath.split("/")[0]
        return Promise.all(
        Array.from(e.target.files)
        .map(f => 
        readAsDataURL(f)
        .then(durl => ({path: f.webkitRelativePath, content: durl}))))
        .then(upload_to_ipfs)
        .then(r => "ipfs://" + r[0].path.split(folder_name)[0].split("/").reverse()[1] + "/" + folder_name )   
    }
    catch(err){
        throw err;
    }
}

export let upload_metadata = metadata => {
    try{
        return upload_to_ipfs([{path:"collection_metadata.json", content:btoa(JSON.stringify(metadata))}])
        .then(r => `ipfs://${r[0].path.split("/ipfs/")[1]}`);
    }
    catch(err){
        throw err;
    }
}