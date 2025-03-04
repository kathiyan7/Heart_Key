import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { toast } from "sonner";

type Message = {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
};

const createChatbotResponse = (query: string): Promise<string> => {
  // Mock responses based on query keywords
  return new Promise((resolve) => {
    setTimeout(() => {
      const query_lower = query.toLowerCase();
      let response = "I'm not sure how to answer that. Can you ask something about your EV?";

      if (query_lower.includes("battery") && query_lower.includes("health")) {
        response = "Your battery health is currently at 92%, which is excellent. To maintain good battery health, avoid frequent fast charging and extreme temperatures.";
      } else if (query_lower.includes("charging") && query_lower.includes("station")) {
        response = "I found 3 charging stations near you. The closest one is EcoCharge at 2.3 miles away, with 4 available slots.";
      } else if (query_lower.includes("range") || (query_lower.includes("make it") && query_lower.includes("destination"))) {
        response = "Based on your current charge (78%) and driving habits, your estimated range is 210 miles. Your planned destination is within range.";
      } else if (query_lower.includes("service") || query_lower.includes("maintenance")) {
        response = "Your next scheduled maintenance is due in 2 months or 3,000 miles. Would you like me to book an appointment for you?";
      } else if (query_lower.includes("energy") || query_lower.includes("efficient")) {
        response = "To drive more efficiently, use regenerative braking when possible, maintain a steady speed, and pre-condition your vehicle while it's still plugged in.";
      } else if (query_lower.includes("carbon") || query_lower.includes("footprint")) {
        response = "This month, you've saved approximately 180 kg of CO2 emissions compared to a gas vehicle. That's equivalent to planting 8 trees!";
      } else if (query_lower.includes("hello") || query_lower.includes("hi") || query_lower.includes("hey")) {
        response = "Hello! I'm your EV Assistant. How can I help you today?";
      }

      resolve(response);
    }, 1000);
  });
};

const Chatbot = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! I'm your EV Assistant. Ask me anything about your electric vehicle.",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get chatbot response
      const response = await createChatbotResponse(message);
      
      // Add bot message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast.error("Sorry, I couldn't process your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Button
              onClick={() => setIsExpanded(true)}
              size="icon"
              className={cn(
                "h-14 w-14 rounded-full shadow-lg bg-primary text-primary-foreground",
                isHovering && "scale-110"
              )}
            >
              <Bot size={24} />
            </Button>
            {isHovering && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-16 right-0 bg-popover text-popover-foreground py-2 px-4 rounded-lg shadow-md whitespace-nowrap"
              >
                EV Assistant
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ width: 60, height: 60, borderRadius: 30, opacity: 0 }}
            animate={{ width: 360, height: 480, borderRadius: 12, opacity: 1 }}
            exit={{ width: 60, height: 60, borderRadius: 30, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full h-full flex flex-col overflow-hidden shadow-lg border">
              <div className="flex items-center justify-between p-4 border-b bg-primary/5">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-primary/20 flex items-center justify-center text-primary">
                    <Bot className="h-4 w-4" />
                  </Avatar>
                  <h3 className="font-medium">EV Assistant</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(false)}
                  className="h-8 w-8 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-2">
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg.text}
                    isBot={msg.isBot}
                    timestamp={msg.timestamp}
                  />
                ))}
                <div ref={messagesEndRef} />
                
                {isLoading && (
                  <div className="flex justify-start p-4">
                    <div className="bg-muted rounded-full px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
