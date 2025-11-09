import { useState } from "react";
import { ChevronLeft, Save, Sparkles } from "lucide-react";
import svgPaths from "../imports/svg-lf8pijpzil";
import imgAiTutorLogo from "figma:asset/831d76f506f1dc02aaa78fa1316452543accee12.png";

interface QuizProps {
  onBack: () => void;
  onComplete: (score: number, total: number, answers: QuizAnswer[]) => void;
  onStartStudying: () => void;
  onNavigateToAITutor: () => void;
  onSaveQuiz?: (questions: QuizQuestion[], answers: QuizAnswer[]) => void;
  onGenerateNewQuiz?: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizAnswer {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which data structure uses LIFO (Last In, First Out)?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: "Stack"
  }
];

export default function Quiz({ onBack, onComplete, onStartStudying, onNavigateToAITutor, onSaveQuiz, onGenerateNewQuiz }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const answeredCount = answers.length;

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const newAnswer: QuizAnswer = {
      question: question.question,
      userAnswer: selectedAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect: selectedAnswer === question.correctAnswer
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    const score = updatedAnswers.filter(a => a.isCorrect).length;
    onComplete(score, quizQuestions.length, updatedAnswers);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
    }
  };

  const handleSaveQuiz = () => {
    if (onSaveQuiz) {
      onSaveQuiz(quizQuestions, answers);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
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

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <svg className="size-6" fill="none" viewBox="0 0 24 24">
                  <path d="M12 18V5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p11c39380} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p2e947480} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p3d7a0320} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p2c99ddc0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p1d3ae070} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p157a9000} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d={svgPaths.p25258198} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <h1 className="text-foreground">Smart Study Tools</h1>
                <p className="text-muted-foreground text-sm">CS 101 - Introduction to Computer Science</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Save Quiz Button */}
              <button
                onClick={handleSaveQuiz}
                className={`h-9 px-4 rounded-lg transition-all text-sm flex items-center gap-2 ${
                  isSaved
                    ? "bg-accent text-primary-foreground"
                    : "bg-card hover:bg-accent/20 border border-border text-foreground"
                }`}
              >
                <Save className="size-4" />
                {isSaved ? "Saved!" : "Save Quiz"}
              </button>

              {/* Generate New Button */}
              <button
                onClick={onGenerateNewQuiz}
                className="h-9 px-4 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 hover:from-accent/20 hover:to-primary/20 border border-accent/30 text-foreground transition-all text-sm flex items-center gap-2"
              >
                <Sparkles className="size-4" />
                Generate New
              </button>

              {/* AI Tutor Badge */}
              <button
                onClick={onNavigateToAITutor}
                className="flex items-center gap-3 px-4 h-9 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/30 hover:from-accent/20 hover:to-primary/20 transition-all"
              >
                <img src={imgAiTutorLogo} alt="AI Tutor" className="size-5" />
                <span className="text-foreground text-sm">AI tutor</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="bg-muted rounded-2xl p-1 mb-16 inline-flex">
          <button 
            onClick={onStartStudying}
            className="px-8 h-7 rounded-xl text-sm text-muted-foreground hover:text-foreground"
          >
            Flashcards
          </button>
          <button className="px-8 h-7 rounded-xl text-sm bg-card text-foreground shadow-sm">
            Practice Quiz
          </button>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span className="text-muted-foreground">{answeredCount} / {quizQuestions.length} Answered</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <div className="mb-12">
            <span className="px-3 py-1 rounded-lg bg-primary text-primary-foreground text-xs">
              Question {currentQuestion + 1}
            </span>
            <h3 className="text-foreground mt-4">{question.question}</h3>
          </div>

          <div className="space-y-2">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedAnswer(option)}
                className={`w-full rounded-lg p-4 text-left border-2 transition-all ${
                  selectedAnswer === option
                    ? "border-accent bg-accent/10"
                    : "border-border hover:border-accent/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`size-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedAnswer === option
                        ? "border-accent bg-accent"
                        : "border-muted-foreground"
                    }`}
                  >
                    {selectedAnswer === option && (
                      <div className="size-2 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                  <span className="text-foreground">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 h-9 px-4 rounded-lg bg-card hover:bg-accent/20 border border-border text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <ChevronLeft className="size-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="h-9 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Submit Quiz
          </button>
        </div>
      </main>
    </div>
  );
}
