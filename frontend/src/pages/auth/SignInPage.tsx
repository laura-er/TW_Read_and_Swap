import { AuthFormHeader } from '@/components/auth/AuthFormHeader';
import { AuthFormFooter } from '@/components/auth/AuthFormFooter';
import { SignInForm } from '@/components/auth/SignInForm';

export function SignInPage() {
    return (
        <div>
            <AuthFormHeader title="Welcome back" subtitle="Sign in to your Read & Swap account" />
            <SignInForm />
            <AuthFormFooter message="Don't have an account?" linkLabel="Sign up" linkTo="/sign-up" />
        </div>
    );
}
