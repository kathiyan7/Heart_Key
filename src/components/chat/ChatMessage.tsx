
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";

type ChatMessageProps = {
  message: string;
  isBot: boolean;
  timestamp: Date;
};

const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full gap-3 p-4",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <Avatar className="h-8 w-8 bg-primary/10 flex items-center justify-center text-primary ring-2 ring-primary/20">
          <Bot className="h-4 w-4" />
        </Avatar>
      )}
      <div
        className={cn(
          "flex flex-col max-w-[80%]",
          isBot ? "items-start" : "items-end"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2 text-sm card-3d",
            isBot
              ? "bg-muted text-foreground"
              : "bg-gradient-to-r from-primary to-blue-500 text-primary-foreground"
          )}
        >
          {message}
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      {!isBot && (
        <Avatar className="h-8 w-8 bg-primary flex items-center justify-center text-primary-foreground ring-2 ring-primary/30">
          <User className="h-4 w-4" />
        </Avatar>
      )}
    </motion.div>
  );
};

export default ChatMessage;
