
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { motion } from "framer-motion";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
};

const ChatInput = ({ onSendMessage, isLoading = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSendMessage = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-center gap-2 border-t p-4 relative">
      <div className={`flex-1 rounded-full transition-all duration-300 ${isFocused ? 'bg-primary/5' : 'bg-muted/50'} px-4 py-2 flex items-center`}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask about your EV..."
          className="flex-1 bg-transparent border-0 focus:ring-0 text-sm focus:outline-none"
          disabled={isLoading}
        />
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={handleSendMessage}
            disabled={isLoading || !message.trim()}
            className="h-8 w-8 text-primary hover:bg-primary/10 hover:text-primary liquid-button-effect rounded-full ml-1"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatInput;
