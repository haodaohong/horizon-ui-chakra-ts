import { createContext, useState } from 'react';
import * as React from "react";

export const SidebarContext = createContext();

export const ItemContext = createContext();

export const ItemProvider = ({children}) => {
    const [sharedItem, setSharedItem] = useState(null);
    const [showEditStory, setShowEditStory] = useState(false);
    const [showEditTask, setShowEditTask] = useState(false);
    const [showEditTestCase, setShowEditTestCase] = useState(false);
    const [showNewStory, setShowNewStory] = useState(false)
    const [showGenerateForm,setShowGenerateForm] = useState(true)
    const [storyId, setStoryId] = useState(0);
    const [allUserStories,setAllUserStories] = useState([]);
    const shareItem = (item) => {
        setSharedItem(item);
    }

    const clearItem = () => {
        setSharedItem(null);
    }

    return (<ItemContext.Provider value={{allUserStories,setAllUserStories,showGenerateForm,setShowGenerateForm,storyId,showNewStory, setShowNewStory, setStoryId,setShowEditTask,setShowEditTestCase,showEditTask, showEditTestCase, showEditStory, sharedItem, shareItem, clearItem, setShowEditStory}}>{children}</ItemContext.Provider>);

}
