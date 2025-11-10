import { useState, useEffect, useRef } from "react";
import { ChevronLeft, Bot, Send, Loader2, FileText } from "lucide-react";

interface AITutorProps {
  onBack: () => void;
  moduleId: number;
  selectedFiles: string[];
  courseName: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  references?: string[];
}

type Mode = "chat" | "active-recall";

export default function AITutor({ onBack, moduleId, selectedFiles, courseName }: AITutorProps) {
  const [mode, setMode] = useState<Mode>("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [gradingMode, setGradingMode] = useState<"easy" | "balanced" | "tough">("easy");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questions = [
    "Explain the difference between a stack and a queue, including their key principles.",
    "What is recursion and how does it work?"
  ];

  // Initialize with welcome message
  useEffect(() => {
    setMessages([{
      role: "assistant",
      content: `Ready. I have ${selectedFiles.length} file${selectedFiles.length !== 1 ? 's' : ''} loaded from ${courseName}. Ask your question.`,
      references: []
    }]);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || sending) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setSending(true);

    // Add user message
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    try {
      // Import API dynamically
      const { chatAPI } = await import("../lib/api");
      
      // Send to backend with selected files
      const response = await chatAPI.sendMessage(moduleId, userMessage, selectedFiles);
      
      // Add AI response
      setMessages([...newMessages, {
        role: "assistant",
        content: response.message,
        references: response.references || []
      }]);
    } catch (error: any) {
      console.error("Failed to send message:", error);
      setMessages([...newMessages, {
        role: "assistant",
        content: "Sorry, I encountered an error processing your question. Please try again.",
        references: []
      }]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 px-12 max-w-4xl mx-auto pb-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 h-9 px-3 rounded-lg hover:bg-accent/20 text-foreground transition-colors mb-8"
          >
            <ChevronLeft className="size-4" />
            <span className="text-sm">Back to Selection</span>
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bot className="size-6 text-primary" />
              </div>
              <div>
                <h2 className="text-foreground">AI Tutor</h2>
                <p className="text-muted-foreground text-sm">{courseName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="size-4" />
              <span>{selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="bg-muted rounded-2xl p-1 mb-8 inline-flex">
          <button
            onClick={() => setMode("chat")}
            className={`px-8 h-7 rounded-xl text-sm transition-colors ${
              mode === "chat" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setMode("active-recall")}
            className={`px-8 h-7 rounded-xl text-sm transition-colors ${
              mode === "active-recall" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Active Recall
          </button>
        </div>

        {/* Chat Mode */}
        {mode === "chat" && (
          <div>
            {/* Chat Messages */}
            <div className="bg-card rounded-2xl p-6 border border-border mb-4 min-h-[500px] max-h-[500px] overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary max-w-md"
                        : "bg-muted max-w-lg"
                    }`}>
                      <p className={`text-sm whitespace-pre-wrap ${
                        message.role === "user" ? "text-primary-foreground" : "text-foreground"
                      }`}>
                        {message.content}
                      </p>
                      {message.references && message.references.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-border/50">
                          <p className="text-xs text-muted-foreground">
                            📚 Referenced: {message.references.join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {sending && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <Loader2 className="size-4 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat Input */}
            <div className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3">
              <input
                type="text"
                placeholder="Ask a question..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={sending}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={sending || !inputMessage.trim()}
                className="h-8 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                <span>Send</span>
              </button>
            </div>
          </div>
        )}

        {/* Active Recall Mode */}
        {mode === "active-recall" && (
          <div>
            {/* Grading Mode Selector */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-2">Grading Mode:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setGradingMode("easy")}
                  className={`px-4 h-9 rounded-lg text-sm transition-colors ${
                    gradingMode === "easy"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:bg-accent/20"
                  }`}
                >
                  Easy Grader
                </button>
                <button
                  onClick={() => setGradingMode("balanced")}
                  className={`px-4 h-9 rounded-lg text-sm transition-colors ${
                    gradingMode === "balanced"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:bg-accent/20"
                  }`}
                >
                  Balanced
                </button>
                <button
                  onClick={() => setGradingMode("tough")}
                  className={`px-4 h-9 rounded-lg text-sm transition-colors ${
                    gradingMode === "tough"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:bg-accent/20"
                  }`}
                >
                  Tough Grader
                </button>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-card rounded-2xl p-8 border border-border mb-6">
              <span className="px-3 py-1 rounded-lg bg-muted text-foreground text-xs mb-4 inline-block">
                Question
              </span>
              <h3 className="text-foreground mb-8">{questions[currentQuestion]}</h3>

              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Your Answer:</p>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full h-[120px] bg-muted/50 rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground border border-border outline-none resize-none"
                />
              </div>

              <button className="h-9 px-6 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm">
                Submit Answer
              </button>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 h-9 px-4 rounded-lg bg-card hover:bg-accent/20 border border-border text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <ChevronLeft className="size-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === questions.length - 1}
                className="h-9 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}