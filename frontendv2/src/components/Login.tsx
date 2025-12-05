import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { authAPI, tokenManager } from "../lib/api";

interface LoginProps {
  onLogin: () => void;
  onSwitchToSignup: () => void;
}

export default function Login({ onLogin, onSwitchToSignup }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      
      // Store token and user data
      tokenManager.setToken(response.access_token);
      tokenManager.setUser(response.user);
      
      // Store Canvas session status for App.tsx to handle
      // Use explicit boolean conversion to ensure correct string values
      const sessionValid = response.canvas_session_valid === true;
      const hasSession = response.has_canvas_session === true;
      
      // Store in sessionStorage with a flag to trigger prompt check
      sessionStorage.setItem("canvas_session_valid", String(sessionValid));
      sessionStorage.setItem("has_canvas_session", String(hasSession));
      sessionStorage.setItem("check_canvas_session", "true"); // Flag to trigger check
      
      console.log("Login successful - Canvas session status:", { 
        valid: sessionValid, 
        hasSession: hasSession,
        shouldShowPrompt: !sessionValid || !hasSession
      });
      
      // Success! Navigate to dashboard
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 gap-4">
          <div className="size-12 rounded-lg bg-foreground flex items-center justify-center">
            <GraduationCap className="size-6 text-background" />
          </div>
          <h1 className="text-foreground">Canvas Tailored</h1>
          <p className="text-muted-foreground">Welcome! Sign in to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-card rounded-2xl p-8 border border-border">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-foreground">
                Institution Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full h-9 px-3 rounded-lg bg-muted text-foreground placeholder:text-muted-foreground text-sm outline-none border border-border focus:border-primary transition-colors"
                required
              />
              <p className="text-xs text-muted-foreground">
                Use your institution email address (.edu or .ac domain)
              </p>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-9 px-3 rounded-lg bg-muted text-foreground placeholder:text-muted-foreground text-sm outline-none border border-border focus:border-primary transition-colors"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-4 rounded accent-primary"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-sm text-center text-muted-foreground mt-6">
            Don't have an account?{" "}
            <button
              onClick={onSwitchToSignup}
              className="text-foreground hover:text-primary transition-colors"
            >
              Create one
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-xs text-center text-muted-foreground mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
