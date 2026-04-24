import { AuthFormHeader } from '@/components/auth/AuthFormHeader';
import { AuthFormFooter } from '@/components/auth/AuthFormFooter';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { useLanguage } from '@/context/LanguageContext';

export function ForgotPasswordPage() {
    const { t } = useLanguage();
    return (
        <div>
            <AuthFormHeader title={t.auth.forgotPasswordTitle} subtitle={t.auth.forgotPasswordSubtitle} />
            <ForgotPasswordForm />
            <AuthFormFooter message="Remembered it?" linkLabel={t.auth.signIn} linkTo="/sign-in" />
        </div>
    );
}
