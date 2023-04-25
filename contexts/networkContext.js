'use client';
import { createContext, useContext } from 'react';

const NetworkContext = createContext();

export function NetworkContextProvider({ children }) {
  let sharedState = "context works!!!";

  return (
    <NetworkContext.Provider value={sharedState}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetworkContext() {
  return useContext(NetworkContext);
}