import { AuthFormHeader } from '@/components/auth/AuthFormHeader';
import { AuthFormFooter } from '@/components/auth/AuthFormFooter';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export function ForgotPasswordPage() {
    return (
        <div>
            <AuthFormHeader
                title="Forgot password?"
                subtitle="Enter your email and we'll send you a reset link"
            />
            <ForgotPasswordForm />
            <AuthFormFooter message="Remembered it?" linkLabel="Sign in" linkTo="/sign-in" />
        </div>
    );
}
