
export let tezos = {
    get_all_collections: async _ => {return []},
    connect: async _ => {
        try{
            console.log("Clicked");
            let pkh = await import('./tezos_wallet').then( async (module) => {
                try{
                    console.log("Here 1");
                    let pkh = (await module.connectWallet("mainnet")).wallet;
                    console.log("Here 2", pkh);
                    let cnct = !(pkh === "" && props.PKH === "");
                    let newPkh;
                    if(pkh !== "") {
                        newPkh = pkh;
                    }
                    return pkh;
                }
                catch(err){
                    console.log("Err", err);
                    return null;
                }
            })
            return pkh;
        }
        catch(err){
            console.log("Err", err);
            return null;
        }
    },
    disconnect: async _ => {
        try{
            let res = await import('./tezos_wallet').then( async (module) => {
                try{
                    console.log("Here 1");
                    let res = (await module.disconnectWallet("mainnet")).success;
                    console.log("Here 2", res);
                    return res;
                }
                catch(_){
                    console.log("Err", err);
                    return false;
                }
            })
            return res;
        }
        catch(err){
            console.log("Err", err);
            return false;
        }
    } 
}

export let aleph0 = {
    connect: async _ => {
        try{
            console.log("Clicked");
            let pkh = await import('./aleph0_wallet').then( async (module) => {
                try{
                    console.log("Here 1");
                    let pkh = (await module.connectWallet("mainnet")).address;
                    console.log("Here 2", pkh);
                    return pkh;
                }
                catch(err){
                    console.log("Err", err);
                    return null;
                }
            })
            return pkh;
        }
        catch(err){
            console.log("Err", err);
            return null;
        }
    }
}

export let solidity = {
    connect: async (window) => {
        try {
            const { ethereum } = window;
    
            if (!ethereum) {
            console.log("Metamask not detected");
            return;
            }
            
            const accounts = await ethereum.request({
            method: "eth_requestAccounts",
            });

            return accounts[0];
    
            // setclient({
            // isConnected: true,
            // address: accounts[0],
            // });
        } catch (error) {
            console.log("Error connecting to metamask", error);
            return null;
        }
    },
    disconnect: async(window) => {
        try {

            const { ethereum } = window;
            if (!ethereum) {
                console.log("Metamask not detected");
                return;
            }
            await ethereum.disconnect();
        } catch (error) {
            console.log("Error connecting to metamask", error);
            return null;
        }
    }
}

// export let solidity = {
//     connect: async _ => {
//         try{
//             console.log("Here 1");
//             let pkh = await solidity_connect();
//             console.log("Here 2", pkh);
//             return pkh;
//         }
//         catch(err){
//             console.log("Error", err);
//             return null;
//         }
//     }
// }
