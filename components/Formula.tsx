import React from 'react';

interface FormulaProps {
    children: React.ReactNode;
    inline?: boolean;
}

export const Formula: React.FC<FormulaProps> = ({ children, inline = false }) => {
    if (inline) {
        return (
            <span className="font-roboto-mono bg-slate-700/50 text-cyan-300 rounded px-1.5 py-0.5 text-base mx-1">
                {children}
            </span>
        );
    }

    return (
        <div className="my-6 p-4 bg-slate-800 border border-slate-700 rounded-lg text-center">
            <p className="font-roboto-mono text-2xl text-cyan-300 tracking-wider">
                {children}
            </p>
        </div>
    );
};
