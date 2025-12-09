
import { useState, useEffect } from "react";
import { Bot, MessageCircle, X, Minimize, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([
    {
      sender: "ai",
      text: "Hello! I'm your DeckWise assistant. How can I help you today?",
    },
  ]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to conversation
    setConversation([...conversation, { sender: "user", text: message }]);

    // Simulate AI response
    setTimeout(() => {
      let response = "";
      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes("material") || lowerMessage.includes("lumber")) {
        response = "Based on your current projects, you'll need to order more cedar lumber in the next 2 weeks to stay on schedule.";
      } else if (lowerMessage.includes("schedule") || lowerMessage.includes("delay")) {
        response = "I've analyzed your schedule. The Smith project is 2 days behind, mainly due to recent weather conditions. I recommend allocating an extra crew member this week.";
      } else if (lowerMessage.includes("budget") || lowerMessage.includes("cost")) {
        response = "Your active projects are currently 2.5% under budget overall. The Johnson project has the highest material efficiency at 97%.";
      } else if (lowerMessage.includes("client") || lowerMessage.includes("customer")) {
        response = "You have 2 client communications waiting for response. The Adams project client has asked for a status update on their pergola materials.";
      } else {
        response = "I can help with material estimates, schedule analysis, budget forecasts, and client insights. What would you like to know?";
      }

      setConversation([...conversation, { sender: "user", text: message }, { sender: "ai", text: response }]);
      setMessage("");
    }, 1000);

    setMessage("");
  };

  return (
    <>
      {isOpen && (
        <Card className={`fixed transition-all duration-300 shadow-xl z-50 ${
          isMinimized 
            ? 'bottom-16 right-4 w-auto h-auto md:bottom-4' 
            : 'bottom-16 right-4 w-80 max-h-[500px] flex flex-col md:bottom-4'
        }`}>
          {isMinimized ? (
            <Button
              onClick={toggleMinimize}
              className="rounded-md w-auto p-2 bg-primary text-primary-foreground flex items-center gap-2"
            >
              <Bot className="h-5 w-5" />
              <span>DeckWise Assistant</span>
            </Button>
          ) : (
            <>
              <CardHeader className="p-3 flex flex-row items-center justify-between bg-primary text-primary-foreground">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <span className="font-medium">DeckWise Assistant</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-primary-foreground hover:text-primary-foreground hover:bg-primary/90"
                    onClick={toggleMinimize}
                  >
                    <Minimize className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-primary-foreground hover:text-primary-foreground hover:bg-primary/90"
                    onClick={toggleOpen}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-3 overflow-y-auto flex-1 flex flex-col gap-3">
                {conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`${
                      msg.sender === "ai" 
                        ? "bg-muted self-start" 
                        : "bg-primary text-primary-foreground self-end"
                    } rounded-lg p-2 max-w-[85%]`}
                  >
                    {msg.text}
                  </div>
                ))}
              </CardContent>
              <CardFooter className="p-3 pt-0">
                <form onSubmit={handleSendMessage} className="w-full flex gap-2">
                  <Input
                    placeholder="Ask something..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm" type="submit">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default AIAssistant;
