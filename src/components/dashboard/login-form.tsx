import { useState } from 'react';
import { useAuth } from '@/lib/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { LockKeyhole } from 'lucide-react';

export function LoginForm() {
  const { signIn, signUp, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const validateForm = () => {
    if (!email) {
      toast.error('Please enter your email address');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!isForgotPassword && (!password || password.length < 6)) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (isForgotPassword) {
        await resetPassword(email);
        setIsForgotPassword(false);
      } else if (isRegistering) {
        await signUp(email, password);
        toast.success('Registration successful! Please sign in.');
        setIsRegistering(false);
      } else {
        await signIn(email, password);
        toast.success('Welcome back!');
      }
    } catch (error) {
      // Error is handled in auth provider
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-sm space-y-6 rounded-xl border bg-card p-6 shadow-lg">
        <div className="flex flex-col space-y-2 text-center">
          <LockKeyhole className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to Hunter Master Ops
          </h1>
          <p className="text-sm text-muted-foreground">
            {isForgotPassword
              ? 'Enter your email to reset your password'
              : isRegistering
              ? 'Create an account to get started'
              : 'Enter your credentials to access the dashboard'}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="bg-background"
            />
          </div>
          {!isForgotPassword && (
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="bg-background"
              />
            </div>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? isForgotPassword
                ? 'Sending reset email...'
                : isRegistering
                ? 'Creating account...'
                : 'Signing in...'
              : isForgotPassword
              ? 'Send reset email'
              : isRegistering
              ? 'Create account'
              : 'Sign In'}
          </Button>
        </form>
        <div className="space-y-2 text-center text-sm">
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={() => {
              setIsForgotPassword(false);
              setIsRegistering(!isRegistering);
            }}
            disabled={loading}
          >
            {isRegistering
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
          {!isRegistering && !isForgotPassword && (
            <div>
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => setIsForgotPassword(true)}
                disabled={loading}
              >
                Forgot your password?
              </button>
            </div>
          )}
          {isForgotPassword && (
            <div>
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => setIsForgotPassword(false)}
                disabled={loading}
              >
                Back to sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}