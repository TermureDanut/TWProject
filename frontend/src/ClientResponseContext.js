import { createContext, useContext, useState } from 'react';

const ClientResponseContext = createContext();

export function useClientResponse() {
    return useContext(ClientResponseContext);
}

export function ClientResponseProvider({ children }) {
    const [clientResponse, setClientResponse] = useState(null);

    return (
        <ClientResponseContext.Provider value={{ clientResponse, setClientResponse }}>
            {children}
        </ClientResponseContext.Provider>
    );
}
