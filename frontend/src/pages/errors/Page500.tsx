import { useApiContext } from '@/api/ApiProvider';

export function Page500() {
    const { checkHealth } = useApiContext();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <h1 className="text-9xl font-bold text-gray-200">500</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                Server unavailable
            </h2>
            <p className="text-gray-500 mt-2 text-center max-w-md">
                The server is currently down or unreachable. Please try again later.
            </p>
            <button
                onClick={checkHealth}
                className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Try again
            </button>
        </div>
    );
}

