'use client';
import { createContext, useContext } from 'react';
import { useState, useEffect } from "react";
import useLocalStorage from '../custom_hooks/useLocalStorage';

const NetworkContext = createContext();

export function NetworkContextProvider({ children }) {
  let [network, setNetwork] = useLocalStorage('network', 'mainnet');
  
  return (
    <NetworkContext.Provider value={{network, setNetwork}}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetworkContext() {
  return useContext(NetworkContext);
}