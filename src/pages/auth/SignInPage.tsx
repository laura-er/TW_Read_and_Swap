import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function SignInPage() {
  return (
    <div>
      {/* Heading */}
      <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)] mb-1">
        Welcome back
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        Sign in to your Read & Swap account
      </p>

      {/* Form: email, password, forgot password link, submit button */}

      {/* Divider + social login (optional) */}

      <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
        Don't have an account?{' '}
        <Link to="/sign-up" className="text-[var(--color-accent)] hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}
