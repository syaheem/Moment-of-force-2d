import React, { useState } from 'react';
import { Formula } from './Formula';

const WheelbarrowDiagram: React.FC = () => {
    return (
        <svg viewBox="-30 -80 230 140" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <style>{`.text-label { font-family: 'Roboto Mono', monospace; font-size: 8px; } .text-force { font-family: 'Inter', sans-serif; font-size: 7px; font-weight: bold; }`}</style>
            <defs>
                <marker id="arrow-load" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" /></marker>
                <marker id="arrow-lift" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" /></marker>
                <marker id="tick-wheelbarrow" viewBox="0 0 2 10" refX="1" refY="5" markerWidth="2" markerHeight="10"><path d="M 1 0 V 10" stroke="currentColor" strokeWidth="1"/></marker>
            </defs>
            
            {/* Distances (drawn first to be in the background) */}
            <g>
                {/* d_load */}
                <line x1="0" y1="-45" x2="53.3" y2="-45" stroke="#f97316" strokeWidth="1.5" markerStart="url(#tick-wheelbarrow)" markerEnd="url(#tick-wheelbarrow)" />
                <text x="26.65" y="-52" textAnchor="middle" fill="#f97316" className="text-label">d_load = 0.4 m</text>
                <line x1="0" y1="-45" x2="0" y2="10" stroke="#f97316" strokeWidth="0.5" strokeDasharray="2" />
                <line x1="53.3" y1="-45" x2="53.3" y2={-5} stroke="#f97316" strokeWidth="0.5" strokeDasharray="2" />

                {/* d_lift */}
                <line x1="0" y1="-65" x2="160" y2="-65" stroke="#38bdf8" strokeWidth="1.5" markerStart="url(#tick-wheelbarrow)" markerEnd="url(#tick-wheelbarrow)" />
                <text x="80" y="-72" textAnchor="middle" fill="#38bdf8" className="text-label">d_lift = 1.2 m</text>
                <line x1="160" y1="-65" x2="160" y2={-15} stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="2" />
            </g>

            {/* Ground */}
            <line x1="-30" y1="25" x2="200" y2="25" stroke="#475569" strokeWidth="1" />

            {/* Wheel & Pivot */}
            <circle cx="0" cy="10" r="15" fill="#64748b" stroke="#475569" strokeWidth="2" />
            <circle cx="0" cy="10" r="3" fill="black" />
            <text x="0" y="35" textAnchor="middle" className="text-label" fill="#a3a3a3">Pivot (Axle)</text>
            
            {/* Wheelbarrow Body */}
            <g>
                 {/* Frame, stand and handles */}
                <path d="M 0 10 L 80 5 L 160 -15 M 80 5 L 80 25" stroke="#a16207" strokeWidth="4" fill="none" strokeLinecap="round" />
                {/* Basin */}
                <polygon points="10,9.4 80,5 80,-12 10,-18" fill="#ca8a04" stroke="#6b460a" strokeWidth="1" />
                {/* Handle Grip */}
                <rect x="155" y="-25" width="10" height="18" rx="3" fill="#64748b" transform="rotate(-10 160 -15)" />
            </g>
            
            {/* Descriptive Labels */}
            <g>
                <text x="45" y="-25" textAnchor="middle" className="text-label" fill="#a3a3a3">Load</text>
                <text x="160" y="0" textAnchor="middle" className="text-label" fill="#a3a3a3">Handles</text>
            </g>

            {/* Load Force: Positioned at x=53.3 */}
            <g>
                <line x1="53.3" y1={-5} x2="53.3" y2="20" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-load)" />
                <text x="45" y="10" textAnchor="end" fill="#ef4444" className="text-force">F_load</text>
                <text x="45" y="18" textAnchor="end" fill="#ef4444" className="text-force">= 500 N</text>
            </g>

            {/* Lift Force: Positioned at x=160 */}
            <g>
                <line x1="160" y1={-15} x2="160" y2="-45" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-lift)" />
                <text x="170" y="-30" textAnchor="start" fill="#22c55e" className="text-force">F_lift = ?</text>
            </g>
        </svg>
    );
};

export const GardenWheelbarrowProblem: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const correctAnswer = 166.7;

    const handleCheckAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput) return;
        const userAnswer = parseFloat(userInput);
        const correct = Math.abs(userAnswer - correctAnswer) < 1; // Allow some tolerance
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
                <WheelbarrowDiagram />
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">Problem</h3>
                    <p className="text-slate-300">A 50 kg bag of mulch (weight ≈ <strong>500 N</strong>) is <strong>0.4 m</strong> from the wheelbarrow's axle. The handles are <strong>1.2 m</strong> from the axle. What is the minimum upward force you must apply to the handles to lift the load?</p>
                </div>

                <form onSubmit={handleCheckAnswer} className="space-y-4">
                    <div>
                        <label htmlFor="answer-input-wheelbarrow" className="block text-sm font-medium text-slate-300 mb-1">
                            Lifting Force (in Newtons, rounded to one decimal):
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                id="answer-input-wheelbarrow"
                                type="number" step="0.1" value={userInput}
                                onChange={e => { setUserInput(e.target.value); setIsSubmitted(false); }}
                                placeholder="e.g., 166.7"
                                className={`flex-grow bg-slate-800 border ${getInputColorClasses()} rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-1 sm:text-sm font-roboto-mono transition-colors`}
                                aria-describedby="answer-feedback-wheelbarrow"
                            />
                            <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!userInput}>
                                Check
                            </button>
                        </div>
                    </div>
                    {isSubmitted && (
                        <div id="answer-feedback-wheelbarrow" className={`text-sm font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                            {isCorrect ? 'Correct! Much easier than lifting the bag directly!' : 'Not quite. Balance the load moment with your lifting moment.'}
                        </div>
                    )}
                </form>

                {isSubmitted && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Solution Breakdown</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300 prose-strong:text-slate-100">
                             <p><strong>Principle:</strong> To lift the load, the upward moment you create (lifting moment) must be equal to or greater than the downward moment created by the load (load moment). <Formula inline>M_lift = M_load</Formula></p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>
                                    <strong>Calculate the Load Moment (M_load):</strong><br/>
                                    This is the moment trying to keep the wheelbarrow on the ground.<br/>
                                    <Formula inline>M_load = F_load × d_load = 500 N × 0.4 m = 200 Nm</Formula>
                                </li>
                                <li>
                                    <strong>Set Up the Lifting Moment (M_lift):</strong><br/>
                                    This is the moment you generate. It must equal 200 Nm.<br/>
                                    <Formula inline>M_lift = F_lift × d_lift = F_lift × 1.2 m</Formula>
                                </li>
                                <li>
                                    <strong>Equate and Solve for F_lift:</strong><br/>
                                    <Formula inline>F_lift × 1.2 m = 200 Nm</Formula><br/>
                                    <Formula inline>F_lift = 200 Nm / 1.2 m ≈ 166.7 N</Formula>
                                </li>
                            </ol>
                            <p className="font-bold text-lg text-green-400">Answer: You only need to apply about 166.7 N of force.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};