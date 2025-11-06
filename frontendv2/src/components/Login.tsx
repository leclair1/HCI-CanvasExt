import { useState } from "react";
import { GraduationCap } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
  onSwitchToSignup: () => void;
}

export default function Login({ onLogin, onSwitchToSignup }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    onLogin();
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
              className="w-full h-11 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Sign In
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
