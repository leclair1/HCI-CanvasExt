import { useState } from "react";
import { GraduationCap, ExternalLink } from "lucide-react";
import { authAPI, tokenManager } from "../lib/api";

interface SignupProps {
  onSignup: () => void;
  onSwitchToLogin: () => void;
}

export default function Signup({ onSignup, onSwitchToLogin }: SignupProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [canvasApiKey, setCanvasApiKey] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    if (!agreeToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    setLoading(true);

    try {
      const signupData = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        ...(canvasApiKey && {
          canvas_api_key: canvasApiKey,
          canvas_instance_url: "https://canvas.instructure.com",
        }),
      };

      const response = await authAPI.signup(signupData);
      
      // Store token and user data
      tokenManager.setToken(response.access_token);
      tokenManager.setUser(response.user);
      
      // Success! Navigate to dashboard
      onSignup();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 gap-4">
          <div className="size-12 rounded-lg bg-foreground flex items-center justify-center">
            <GraduationCap className="size-6 text-background" />
          </div>
          <h1 className="text-foreground">Create Your Account</h1>
          <p className="text-muted-foreground">Join Canvas Tailored with your institution email</p>
        </div>

        {/* Signup Form */}
        <div className="bg-card rounded-2xl p-8 border border-border">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm text-foreground">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="w-full h-9 px-3 rounded-lg bg-muted text-foreground placeholder:text-muted-foreground text-sm outline-none border border-border focus:border-primary transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm text-foreground">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="w-full h-9 px-3 rounded-lg bg-muted text-foreground placeholder:text-muted-foreground text-sm outline-none border border-border focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

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
                Must be a valid institution email (.edu or .ac domain)
              </p>
            </div>

            {/* Canvas API Key (Optional) */}
            <div className="space-y-2">
              <label htmlFor="canvasApiKey" className="text-sm text-foreground">
                Canvas API Key <span className="text-muted-foreground">(Optional)</span>
              </label>
              <input
                id="canvasApiKey"
                type="text"
                value={canvasApiKey}
                onChange={(e) => setCanvasApiKey(e.target.value)}
                placeholder="Enter your Canvas API key (optional)"
                className="w-full h-9 px-3 rounded-lg bg-muted text-foreground placeholder:text-muted-foreground text-sm outline-none border border-border focus:border-primary transition-colors"
              />
              <p className="text-xs text-muted-foreground">
                You can add this later to sync your Canvas courses
              </p>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-foreground">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full h-9 px-3 rounded-lg bg-muted text-foreground placeholder:text-muted-foreground text-sm outline-none border border-border focus:border-primary transition-colors"
                  required
                  minLength={8}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm text-foreground">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full h-9 px-3 rounded-lg bg-muted text-foreground placeholder:text-muted-foreground text-sm outline-none border border-border focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            {/* Terms Agreement */}
            <label className="flex items-start gap-2 text-sm text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="size-4 mt-0.5 rounded accent-primary"
              />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-sm text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-foreground hover:text-primary transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-xs text-center text-muted-foreground mt-8">
          Canvas Tailored is designed exclusively for students with institutional email addresses
        </p>
      </div>
    </div>
  );
}
