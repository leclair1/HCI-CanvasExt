import { useState } from "react";
import { ChevronLeft, Bot } from "lucide-react";

interface AITutorProps {
  onBack: () => void;
}

type Mode = "chat" | "active-recall";

export default function AITutor({ onBack }: AITutorProps) {
  const [mode, setMode] = useState<Mode>("chat");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [gradingMode, setGradingMode] = useState<"easy" | "balanced" | "tough">("easy");

  const questions = [
    "Explain the difference between a stack and a queue, including their key principles.",
    "What is recursion and how does it work?"
  ];

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

          <div className="flex items-center gap-4">
            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="size-6 text-primary" />
            </div>
            <div>
              <h2 className="text-foreground">AI Tutor</h2>
              <p className="text-muted-foreground text-sm">CS 101 - Introduction to Computer Science</p>
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
                {/* AI Message */}
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3 max-w-md">
                    <p className="text-sm text-foreground">
                      Hello! I'm your AI tutor for CS 101. How can I help you today?
                    </p>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-primary rounded-lg p-3 max-w-md">
                    <p className="text-sm text-primary-foreground">
                      Can you explain the difference between a stack and a queue?
                    </p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3 max-w-lg">
                    <p className="text-sm text-foreground mb-2">
                      Great question! A stack follows the Last-In-First-Out (LIFO) principle, meaning the last element added is the first one removed. Think of it like a stack of plates - you add and remove from the top.
                    </p>
                    <p className="text-sm text-foreground mb-2">
                      A queue follows the First-In-First-Out (FIFO) principle, where the first element added is the first one removed. Think of a line at a store - the first person in line is the first to be served.
                    </p>
                    <p className="text-sm text-foreground">
                      Would you like me to explain any specific operations for these data structures?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3">
              <input
                type="text"
                placeholder="Ask a question..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button className="h-8 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm">
                Send
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