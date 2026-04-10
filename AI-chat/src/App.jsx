import { useState, useEffect} from 'react';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import ChatPanel from './ChatPanel/ChatPanel';
import { getMessages, createMessage } from './api/messages';

function App() {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [activeConversationID, setActiveConversationID] = useState(1);

    useEffect(() => {
    getMessages(activeConversationID).then(setMessages);
    }, [activeConversationID]);

    async function appendMessage(input) {
    setLoading(true);

    await createMessage(activeConversationID, input);
    const updatedMessages = await getMessages(activeConversationID);
    setMessages(updatedMessages);

    setLoading(false);
    }

    return (
        <>
            <Sidebar activeConversationID={activeConversationID} setActiveConversationID={setActiveConversationID} />
            <ChatPanel messages={messages} appendMessage={appendMessage}loading={loading} />
        </>
    );
}

export default App;