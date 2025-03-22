import { db } from "./firebaseConfig";
import { doc, query, collection, addDoc, serverTimestamp, orderBy, onSnapshot } from "firebase/firestore";

const sendMessage = async (chatId, senderId, recieverId, messageText) => {
    try {
     
     const messagesRef = collection(db, "chats", chatId.toString(), "messages");
    
      const newMessage = {
        chatId: chatId,
        senderId: senderId,
        recieverId: recieverId,
        message: messageText,
        timestamp: serverTimestamp(),
      };
  
      await addDoc(messagesRef, newMessage);
      console.log("Message sent successfully!");
      return true
    } catch (error) {
      console.error("Error sending message:", error);
      return false
    }
  };
  

const listenForMessages = (chatId, setMessages) => {
    const messagesRef = collection(db, "chats", chatId.toString(), "messages");
    const q = query(messagesRef, orderBy("timestamp"));
  
    onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => doc.data());
      setMessages(messages);
    });
  };

export { sendMessage, listenForMessages };
