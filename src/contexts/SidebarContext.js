import { createContext, useState } from 'react';

export const SidebarContext = createContext();

export const ItemContext = createContext();

export const ItemProvider = ({children}) => {
    const [sharedItem, setSharedItem] = useState(null);
    const shareItem = (item) => {
        setSharedItem(item);
    }

    const clearItem = () => {
        setSharedItem(null);
    }

    return (<ItemContext.Provider value={{sharedItem, shareItem, clearItem}}>{children}</ItemContext.Provider>);

}
