import { useState, useEffect } from "react";

function getSavedValue(key, initial_value) {
    
    let saved_value = localStorage.getItem(key);
    // if(key === "solidity_pkh") console.log("Saved value and key", key, saved_value);

    try{
        let val = JSON.parse(saved_value);
        saved_value = val;
    }
    catch(_){};
    // if(key === "solidity_pkh") console.log("Saved value and key", key, saved_value);

    if(saved_value) return saved_value;

    if(initial_value instanceof Function) return initial_value();

    return initial_value;
}

export default function useLocalStorage(key, initial_value) {

    const [value, setValue] = useState(initial_value);
    const [bl, setBl] = useState(true);

    useEffect(() => {

        if(bl) {

            setValue(getSavedValue(key, initial_value));
            setBl(false);
            return;

        }
        
        let val = value;

        if(typeof val !== "string") val = JSON.stringify(val);

        localStorage.setItem(key, val);

    }, [value]);

    return [value, setValue];
}
