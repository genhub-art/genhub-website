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
        console.log("invalid text input: " + str);
    }
    return hex;
};

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