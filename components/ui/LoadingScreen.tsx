'use client';

export default function LoadingScreen({
    text = "Loading...",
    fullScreen = true,
}: {
    text?: string;
    fullScreen?: boolean;
}) {
    return (
        <div
            className={`flex flex-col items-center justify-center ${fullScreen ? "min-h-screen" : "py-10"
                }`}
        >
            {/* Spinner */}
            <div className="relative">
                <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>

            {/* Text */}
            {text && (
                <p className="mt-4 text-sm text-gray-500 animate-pulse">{text}</p>
            )}
        </div>
    );
}