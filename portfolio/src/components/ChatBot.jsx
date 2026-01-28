import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChatbubbleEllipses, IoClose, IoSend } from "react-icons/io5";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi! I'm Mit's personal AI assistant. How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Chat API Error:", errorData);
                throw new Error(errorData.error || "Failed to connect to AI");
            }

            const data = await response.json();
            // Using data.reply to match updated controller
            setMessages((prev) => [...prev, { role: "assistant", content: data.reply || data.content }]);
        } catch (error) {
            console.error("Chatbot frontend error:", error);
            setMessages((prev) => [...prev, { role: "assistant", content: "I'm having a little trouble connecting. Please check if the server is running and the API key is valid." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-blue-600 dark:bg-blue-500 text-white rounded-full shadow-2xl transition-all duration-300"
            >
                {isOpen ? <IoClose size={30} /> : <IoChatbubbleEllipses size={30} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
                    >
                        {/* Header */}
                        <div className="p-4 bg-blue-600 dark:bg-blue-500 text-white flex justify-between items-center">
                            <div>
                                <h3 className="font-bold">Mit's Assistant</h3>
                                <p className="text-xs opacity-80">Online | Powered by Gemini</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto max-h-[400px] min-h-[300px] flex flex-col space-y-4">
                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === "user"
                                            ? "bg-blue-600 text-white rounded-tr-none"
                                            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none"
                                            }`}
                                    >
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start italic text-xs text-gray-500 dark:text-gray-400">
                                    Thinking...
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex space-x-2">
                            <input
                                type="text"
                                value={input}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-gray-50 dark:bg-gray-900 border-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 text-sm outline-none"
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading}
                                className="p-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 transition-opacity"
                            >
                                <IoSend size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;
