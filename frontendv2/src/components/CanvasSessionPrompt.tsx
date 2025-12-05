import { useState, useEffect } from "react";
import { X, AlertCircle, Info } from "lucide-react";
import { authAPI, tokenManager } from "../lib/api";

interface CanvasSessionPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CanvasSessionPrompt({
  isOpen,
  onClose,
  onSuccess,
}: CanvasSessionPromptProps) {
  const [sessionCookie, setSessionCookie] = useState("");
  const [canvasUrl, setCanvasUrl] = useState("https://usflearn.instructure.com");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log("CanvasSessionPrompt isOpen changed to:", isOpen);
    if (isOpen) {
      console.log("CanvasSessionPrompt SHOULD BE VISIBLE!");
    }
  }, [isOpen]);
  
  // Always render the component structure, but conditionally show content
  // This ensures the component is mounted and can receive updates
  if (!isOpen) {
    return null;
  }
  
  console.log("CanvasSessionPrompt rendering content with isOpen:", isOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = tokenManager.getToken();
      if (!token) {
        throw new Error("Not authenticated");
      }

      await authAPI.updateCanvasSession(token, sessionCookie, canvasUrl);
      
      // Success!
      onSuccess();
      setSessionCookie("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update Canvas session");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    setSessionCookie("");
    setError("");
    onClose();
  };

  console.log("CanvasSessionPrompt render - isOpen:", isOpen);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      {/* Glossy Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={handleSkip}
      />
      
      {/* Modal */}
      <div className="relative bg-card rounded-2xl border border-border shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
              <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Canvas Session Expired
            </h2>
          </div>
          <button
            onClick={handleSkip}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-sm text-foreground">
              Your Canvas session has expired. To continue using AI-powered features like 
              flashcard generation and the AI tutor, please provide a new Canvas session cookie.
            </p>
          </div>

          {/* Instructions Toggle */}
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center gap-2 text-primary hover:underline text-sm"
          >
            <Info className="w-4 h-4" />
            {showInstructions ? "Hide" : "Show"} instructions on how to get your Canvas session cookie
          </button>

          {/* Instructions */}
          {showInstructions && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-foreground">
                How to Get Your Canvas Session Cookie:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Open Canvas in your browser and log in</li>
                <li>Press <kbd className="px-2 py-1 bg-muted border border-border rounded text-foreground">F12</kbd> or right-click → Inspect</li>
                <li>Navigate to the <strong>Application</strong> tab (Chrome) or <strong>Storage</strong> tab (Firefox)</li>
                <li>In the sidebar, expand <strong>Cookies</strong> and click on your Canvas URL</li>
                <li>Find the cookie named <code className="bg-muted px-1 rounded text-foreground">canvas_session</code></li>
                <li>Double-click the <strong>Value</strong> column and copy the entire value</li>
                <li>Paste it in the field below</li>
              </ol>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="canvasUrl"
                className="block text-sm text-foreground"
              >
                Canvas Instance URL
              </label>
              <input
                type="text"
                id="canvasUrl"
                value={canvasUrl}
                onChange={(e) => setCanvasUrl(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-muted text-foreground placeholder:text-muted-foreground text-sm outline-none border border-border focus:border-primary transition-colors"
                placeholder="https://usflearn.instructure.com"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sessionCookie"
                className="block text-sm text-foreground"
              >
                Canvas Session Cookie <span className="text-destructive">*</span>
              </label>
              <textarea
                id="sessionCookie"
                value={sessionCookie}
                onChange={(e) => setSessionCookie(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-muted text-foreground placeholder:text-muted-foreground text-sm outline-none border border-border focus:border-primary transition-colors font-mono resize-none"
                placeholder="Paste your canvas_session cookie value here..."
                rows={4}
                required
              />
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading || !sessionCookie}
                className="flex-1 h-11 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Validating..." : "Update Canvas Session"}
              </button>
              <button
                type="button"
                onClick={handleSkip}
                className="px-6 h-11 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium"
              >
                Skip for Now
              </button>
            </div>
          </form>

          <div className="text-xs text-muted-foreground">
            <p>
              <strong>Note:</strong> Your Canvas session cookie is encrypted and stored securely. 
              You can skip this step, but AI features requiring Canvas data won't work until you provide a valid session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

