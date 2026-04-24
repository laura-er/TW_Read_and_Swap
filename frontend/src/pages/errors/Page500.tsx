import { useApiContext } from '@/api/ApiProvider';
import { useLanguage } from '@/context/LanguageContext';

export function Page500() {
    const { checkHealth } = useApiContext();
    const { t } = useLanguage();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <h1 className="text-9xl font-bold text-gray-200">500</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">{t.errors.page500Title}</h2>
            <p className="text-gray-500 mt-2 text-center max-w-md">{t.errors.page500Subtitle}</p>
            <button onClick={checkHealth} className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">{t.errors.tryAgain}</button>
        </div>
    );
}
