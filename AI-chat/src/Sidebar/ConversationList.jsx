import Conversation from './Conversation';

function ConversationList({ conversations, activeConversationID, setActiveConversationID }) {
    const conversationElements = [];
    for (const conversation of conversations) {
        conversationElements.push(
            <Conversation
                key={conversation.id}
                title={conversation.title}
                isActive={activeConversationID === conversation.id}
                setActive={() => setActiveConversationID(conversation.id)}
            />,
        );
    }
    return <>{conversationElements}</>;
}

export default ConversationList;