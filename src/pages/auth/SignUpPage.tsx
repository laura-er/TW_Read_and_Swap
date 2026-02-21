import { AuthFormHeader } from '@/components/auth/AuthFormHeader';
import { AuthFormFooter } from '@/components/auth/AuthFormFooter';
import { SignUpForm } from '@/components/auth/SignUpForm';

export function SignUpPage() {
    return (
        <div>
            <AuthFormHeader title="Create account" subtitle="Join Read & Swap and start sharing books" />
            <SignUpForm />
            <AuthFormFooter message="Already have an account?" linkLabel="Sign in" linkTo="/sign-in" />
        </div>
    );
}
