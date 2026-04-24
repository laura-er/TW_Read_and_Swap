import { AuthFormHeader } from '@/components/auth/AuthFormHeader';
import { AuthFormFooter } from '@/components/auth/AuthFormFooter';
import { SignInForm } from '@/components/auth/SignInForm';
import { useLanguage } from '@/context/LanguageContext';

export function SignInPage() {
    const { t } = useLanguage();
    return (
        <div>
            <AuthFormHeader title={t.auth.signInTitle} subtitle="Sign in to your Read & Swap account" />
            <SignInForm />
            <AuthFormFooter message={t.auth.noAccount} linkLabel={t.auth.signUp} linkTo="/sign-up" />
        </div>
    );
}
