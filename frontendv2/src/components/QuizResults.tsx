import { ChevronLeft, X, Check } from "lucide-react";
import svgPaths from "../imports/svg-a7ff9vv867";
import imgAiTutorLogo from "figma:asset/831d76f506f1dc02aaa78fa1316452543accee12.png";

interface QuizAnswer {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface QuizResultsProps {
  score: number;
  total: number;
  answers: QuizAnswer[];
  onRetake: () => void;
  onBack: () => void;
  onNavigateToAITutor: () => void;
}

export default function QuizResults({ score, total, answers, onRetake, onBack, onNavigateToAITutor }: QuizResultsProps) {
  const percentage = Math.round((score / total) * 100);

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
            
            {/* AI Tutor Badge */}
            <button
              onClick={onNavigateToAITutor}
              className="flex items-center gap-3 px-5 h-12 bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl border border-accent/30 hover:from-accent/20 hover:to-primary/20 transition-all"
            >
              <img src={imgAiTutorLogo} alt="AI Tutor" className="size-6" />
              <span className="text-foreground">AI tutor</span>
            </button>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="bg-muted rounded-2xl p-1 mb-16 inline-flex">
          <button className="px-8 h-7 rounded-xl text-sm text-muted-foreground hover:text-foreground">
            Flashcards
          </button>
          <button className="px-8 h-7 rounded-xl text-sm bg-card text-foreground shadow-sm">
            Practice Quiz
          </button>
        </div>

        {/* Results Card */}
        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          {/* Score Circle */}
          <div className="flex flex-col items-center mb-12">
            <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-6">
              <span className="text-foreground text-2xl">{percentage}%</span>
            </div>
            <h2 className="text-foreground mb-2">Quiz Complete!</h2>
            <p className="text-muted-foreground text-sm">You got {score} out of {total} correct</p>
          </div>

          {/* Answer Review */}
          <div className="space-y-4">
            {answers.map((answer, index) => (
              <div
                key={index}
                className="rounded-lg p-4 border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className={`size-6 rounded-full flex items-center justify-center shrink-0 ${
                    answer.isCorrect ? "bg-[#009689]" : "bg-destructive"
                  }`}>
                    {answer.isCorrect ? (
                      <Check className="size-4 text-white" strokeWidth={3} />
                    ) : (
                      <X className="size-4 text-white" strokeWidth={3} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground text-sm mb-2">{answer.question}</p>
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-xs">
                        Your answer: <span className={answer.isCorrect ? "text-[#009689]" : "text-destructive"}>{answer.userAnswer}</span>
                      </p>
                      {!answer.isCorrect && (
                        <p className="text-muted-foreground text-xs">
                          Correct answer: <span className="text-[#009689]">{answer.correctAnswer}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onRetake}
            className="flex-1 h-9 rounded-lg bg-card hover:bg-accent/20 border border-border text-foreground transition-colors text-sm"
          >
            Retake Quiz
          </button>
          <button
            onClick={onBack}
            className="flex-1 h-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm"
          >
            Back to Selection
          </button>
        </div>
      </main>
    </div>
  );
}
