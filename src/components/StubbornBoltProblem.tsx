import React, { useState } from 'react';
import { Formula } from './Formula';

const BoltDiagram: React.FC = () => {
    return (
         <svg viewBox="-50 -60 250 120" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <style>{`
                .text-label { font-family: 'Roboto Mono', monospace; font-size: 8px; }
                .text-force { font-family: 'Inter', sans-serif; font-size: 7px; font-weight: bold; }
            `}</style>
            <defs>
                <marker id="arrow-bolt" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
                <marker id="tick-bolt" viewBox="0 0 2 10" refX="1" refY="5" markerWidth="2" markerHeight="10">
                    <path d="M 1 0 V 10" stroke="currentColor" strokeWidth="1"/>
                </marker>
            </defs>

            {/* Wrench */}
            <rect x="15" y="-5" width="150" height="10" rx="3" fill="#94a3b8" />
            
            {/* Bolt (Pivot) */}
            <g>
                <path d="M -15 0 L -8 -13 L 8 -13 L 15 0 L 8 13 L -8 13 Z" fill="#64748b" />
                <circle cx="0" cy="0" r="6" fill="#475569" />
                <text x="0" y="-20" textAnchor="middle" className="text-label" fill="#a3a3a3">Pivot</text>
            </g>

            {/* Force */}
            <g>
                <line x1="165" y1="0" x2="165" y2="40" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-bolt)" />
                <text x="165" y="52" textAnchor="middle" fill="#f59e0b" className="text-force">F = ?</text>
            </g>

            {/* Distance */}
            <g>
                <line x1="0" y1="15" x2="165" y2="15" stroke="#06b6d4" strokeWidth="1.5" markerStart="url(#tick-bolt)" markerEnd="url(#tick-bolt)" />
                <text x="82.5" y="25" textAnchor="middle" fill="#06b6d4" className="text-label">d = 0.3 m</text>
            </g>

             {/* Moment */}
            <path d="M 20 5 A 15 15 0 0 1 20 -5" stroke="#f43f5e" strokeWidth="2" fill="none" markerEnd="url(#arrow-bolt)"/>
            <text x="45" y="-10" textAnchor="middle" fill="#f43f5e" className="text-label">M = 120 Nm</text>

        </svg>
    );
};

export const StubbornBoltProblem: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const correctAnswer = 400;

    const handleCheckAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput) return;
        const userAnswer = parseFloat(userInput);
        const correct = Math.abs(userAnswer - correctAnswer) < 0.01;
        setIsSubmitted(true);
        setIsCorrect(correct);
    };

    const getInputColorClasses = () => {
        if (!isSubmitted) return "border-slate-600 focus:border-cyan-500 focus:ring-cyan-500";
        return isCorrect ? "border-green-500 ring-green-500" : "border-red-500 ring-red-500";
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <BoltDiagram />
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">Problem</h3>
                    <p className="text-slate-300">A bolt on a car tire requires <strong>120 Nm</strong> of torque to loosen. A wrench is <strong>0.3 m</strong> long. How much perpendicular force must be applied at the end of the wrench to loosen the bolt?</p>
                </div>

                <form onSubmit={handleCheckAnswer} className="space-y-4">
                    <div>
                        <label htmlFor="answer-input-bolt" className="block text-sm font-medium text-slate-300 mb-1">
                            Your Answer (in Newtons):
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                id="answer-input-bolt"
                                type="number"
                                step="0.1"
                                value={userInput}
                                onChange={e => {
                                    setUserInput(e.target.value);
                                    setIsSubmitted(false);
                                }}
                                placeholder="e.g., 400"
                                className={`flex-grow bg-slate-800 border ${getInputColorClasses()} rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-1 sm:text-sm font-roboto-mono transition-colors`}
                                aria-describedby="answer-feedback-bolt"
                            />
                            <button
                                type="submit"
                                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!userInput}
                            >
                                Check
                            </button>
                        </div>
                    </div>
                    {isSubmitted && (
                        <div id="answer-feedback-bolt" className={`text-sm font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                            {isCorrect ? 'Correct! That bolt is coming loose.' : 'Not quite. Check your calculation below.'}
                        </div>
                    )}
                </form>

                {isSubmitted && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Solution Breakdown</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300 prose-strong:text-slate-100">
                            <p><strong>Principle:</strong> This is a direct application of the moment formula <Formula inline>M = F × d</Formula>.</p>
                            
                            <div>
                                <strong>Formula Terms:</strong>
                                <ul className="list-disc pl-5 text-xs">
                                    <li><Formula inline>M</Formula>: Moment (or Torque), the required rotational force. Given as <strong>120 Nm</strong>.</li>
                                    <li><Formula inline>F</Formula>: The perpendicular force you must apply. <strong>This is what we need to find</strong>.</li>
                                    <li><Formula inline>d</Formula>: The moment arm (wrench length). Given as <strong>0.3 m</strong>.</li>
                                </ul>
                            </div>
                            
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>
                                    <strong>State the Formula:</strong>
                                    <br/>
                                    <Formula inline>M = F × d</Formula>
                                </li>
                                <li>
                                    <strong>Substitute Known Values:</strong>
                                    <br/>
                                    <Formula inline>120 Nm = F × 0.3 m</Formula>
                                </li>
                                <li>
                                    <strong>Solve for the Force (F):</strong>
                                    <br/>
                                    Rearrange the formula to isolate F.
                                    <br/>
                                    <Formula inline>F = 120 Nm / 0.3 m = 400 N</Formula>
                                </li>
                            </ol>
                            <p className="font-bold text-lg text-green-400">Answer: A force of 400 N must be applied.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
