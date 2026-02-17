import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function SignUpPage() {
  return (
    <div>
      {/* Heading */}
      <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)] mb-1">
        Create account
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        Join Read & Swap and start sharing books
      </p>

      {/* Form: name, username, email, password, confirm password, submit button */}

      {/* Terms & privacy notice */}

      <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
        Already have an account?{' '}
        <Link to="/sign-in" className="text-[var(--color-accent)] hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
