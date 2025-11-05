import React, { useState } from 'react';
import { Formula } from './Formula';

const BookshelfDiagram: React.FC = () => {
    return (
        <svg viewBox="-20 -50 150 100" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <style>{`.text-label { font-family: 'Roboto Mono', monospace; font-size: 8px; } .text-force { font-family: 'Inter', sans-serif; font-size: 7px; font-weight: bold; }`}</style>
            <defs>
                {/* FIX: Defined a diagonal hatch pattern to be used for the wall fill. */}
                <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="8" height="8">
                    <rect width="8" height="8" fill="#64748b"/>
                    <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" stroke="#475569" strokeWidth="1" />
                </pattern>
                <marker id="arrow-bookshelf" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" /></marker>
                <marker id="tick-bookshelf" viewBox="0 0 2 10" refX="1" refY="5" markerWidth="2" markerHeight="10"><path d="M 1 0 V 10" stroke="currentColor" strokeWidth="1"/></marker>
            </defs>

            {/* Wall */}
            {/* FIX: Replaced the invalid 'pattern' attribute with a 'fill' attribute pointing to the defined pattern. */}
            <rect x="-10" y="-40" width="10" height="80" fill="url(#diagonalHatch)" />
            <line x1="-10" y1="-40" x2="0" y2="-40" stroke="#475569" /><line x1="-10" y1="40" x2="0" y2="40" stroke="#475569" />
            <text x="-15" y="0" textAnchor="middle" transform="rotate(-90 -15 0)" className="text-label" fill="#a3a3a3">Wall</text>

            {/* Bracket/Shelf */}
            <rect x="0" y="-5" width="120" height="10" rx="2" fill="#94a3b8" />
            <polygon points="0,5 0,15 15,5" fill="#94a3b8" />
            <circle cx="0" cy="0" r="4" fill="#475569" />
            <text x="0" y="25" textAnchor="middle" className="text-label" fill="#a3a3a3">Pivot</text>

            {/* Force (Book) */}
            <g>
                <line x1="100" y1="5" x2="100" y2="40" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-bookshelf)" />
                <text x="100" y="50" textAnchor="middle" fill="#ef4444" className="text-force">F = 40 N</text>
            </g>

            {/* Distance */}
            <g>
                <line x1="0" y1="-15" x2="100" y2="-15" stroke="#06b6d4" strokeWidth="1.5" markerStart="url(#tick-bookshelf)" markerEnd="url(#tick-bookshelf)" />
                <text x="50" y="-22" textAnchor="middle" fill="#06b6d4" className="text-label">d = 0.25 m</text>
            </g>
        </svg>
    );
};


export const BookshelfBracketProblem: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const correctAnswer = 10;

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
                <BookshelfDiagram />
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">Problem</h3>
                    <p className="text-slate-300">A 4 kg book (weight ≈ <strong>40 N</strong>) is placed on a shelf. Its center of gravity is <strong>0.25 m</strong> from the wall. What is the moment (torque) that the wall screws must resist to keep the shelf from rotating?</p>
                </div>
                <form onSubmit={handleCheckAnswer} className="space-y-4">
                    <div>
                        <label htmlFor="answer-input-bookshelf" className="block text-sm font-medium text-slate-300 mb-1">
                            Resisting Moment (in Nm):
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                id="answer-input-bookshelf"
                                type="number" step="0.1" value={userInput}
                                onChange={e => { setUserInput(e.target.value); setIsSubmitted(false); }}
                                placeholder="e.g., 10"
                                className={`flex-grow bg-slate-800 border ${getInputColorClasses()} rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-1 sm:text-sm font-roboto-mono transition-colors`}
                                aria-describedby="answer-feedback-bookshelf"
                            />
                            <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!userInput}>
                                Check
                            </button>
                        </div>
                    </div>
                    {isSubmitted && (
                        <div id="answer-feedback-bookshelf" className={`text-sm font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                            {isCorrect ? 'Correct! The shelf holds.' : 'Not quite. Check the formula below.'}
                        </div>
                    )}
                </form>

                {isSubmitted && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Solution Breakdown</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300 prose-strong:text-slate-100">
                             <p><strong>Principle:</strong> This is a direct application of the moment formula, where the wall must provide an equal and opposite "reaction moment" to the moment created by the book's weight.</p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>
                                    <strong>Identify the Terms:</strong><br/>
                                    Force (<Formula inline>F</Formula>) = Book's weight = 40 N<br/>
                                    Distance (<Formula inline>d</Formula>) = Moment arm = 0.25 m
                                </li>
                                <li>
                                    <strong>Apply the Moment Formula:</strong><br/>
                                    <Formula inline>M = F × d</Formula>
                                </li>
                                <li>
                                    <strong>Calculate the Moment:</strong><br/>
                                    <Formula inline>M = 40 N × 0.25 m = 10 Nm</Formula>
                                </li>
                            </ol>
                            <p className="font-bold text-lg text-green-400">Answer: The screws must resist a moment of 10 Nm.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
