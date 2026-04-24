import { AuthFormHeader } from '@/components/auth/AuthFormHeader';
import { AuthFormFooter } from '@/components/auth/AuthFormFooter';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { useLanguage } from '@/context/LanguageContext';

export function SignUpPage() {
    const { t } = useLanguage();
    return (
        <div>
            <AuthFormHeader title={t.auth.signUpTitle} subtitle="Join Read & Swap and start sharing books" />
            <SignUpForm />
            <AuthFormFooter message={t.auth.haveAccount} linkLabel={t.auth.signIn} linkTo="/sign-in" />
        </div>
    );
}
