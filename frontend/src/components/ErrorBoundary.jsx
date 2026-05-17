import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex h-screen bg-[#0f0f0f] items-center justify-center p-6 text-center">
                    <div className="p-10 max-w-md border border-red-500/30 bg-[#1a1a1a] rounded-2xl shadow-xl">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">Core System Fault</h2>
                        <p className="text-[#9CA3AF] text-sm mb-6">{this.state.error?.message || "An unexpected rendering error occurred in LexGuard X."}</p>
                        <button onClick={() => window.location.reload()} className="w-full bg-[#FF8F1C] hover:bg-[#FF7A00] text-black font-bold py-3 px-4 rounded-xl transition duration-300">
                            Reboot System
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
