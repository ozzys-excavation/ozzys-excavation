import { useEffect } from "react";
import ChatWidget from "./ChatWidget";
import { setupChatNavigationHelpers } from "../utils/navigation";
export default function ElevenLabsChatBubble() {
  useEffect(() => {
    setupChatNavigationHelpers();
    return () => {};
  }, []);
  return <ChatWidget />;
}
