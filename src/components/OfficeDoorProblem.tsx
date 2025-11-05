import React, { useState } from 'react';
import { Formula } from './Formula';

const DoorDiagram: React.FC = () => {
    return (
        <svg viewBox="-20 -80 150 160" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <style>{`.text-label { font-family: 'Roboto Mono', monospace; font-size: 8px; } .text-force { font-family: 'Inter', sans-serif; font-size: 7px; font-weight: bold; }`}</style>
            <defs>
                <marker id="arrow-door-1" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" /></marker>
                <marker id="arrow-door-2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" /></marker>
                <marker id="tick-door" viewBox="0 0 2 10" refX="1" refY="5" markerWidth="2" markerHeight="10"><path d="M 1 0 V 10" stroke="currentColor" strokeWidth="1"/></marker>
            </defs>
            {/* Hinge/Pivot */}
            <rect x="-5" y="-70" width="10" height="140" fill="#475569" />
            <circle cx="0" cy="-60" r="3" fill="#64748b" />
            <circle cx="0" cy="0" r="3" fill="#64748b" />
            <circle cx="0" cy="60" r="3" fill="#64748b" />
            <text x="-15" y="0" textAnchor="middle" transform="rotate(-90 -15 0)" className="text-label" fill="#a3a3a3">Pivot (Hinge)</text>
            
            {/* Door */}
            <rect x="0" y="-70" width="100" height="140" fill="#a16207" stroke="#6b460a" strokeWidth="1" />
            
            {/* Force 1 (Open) */}
            <g>
                <line x1="90" y1="0" x2="90" y2="-40" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-door-1)" />
                <text x="90" y="-50" textAnchor="middle" fill="#22c55e" className="text-force">F₁ = 5 N</text>
                <line x1="0" y1="15" x2="90" y2="15" stroke="#38bdf8" strokeWidth="1.5" markerStart="url(#tick-door)" markerEnd="url(#tick-door)" />
                <text x="45" y="25" textAnchor="middle" fill="#38bdf8" className="text-label">d₁ = 0.9 m</text>
            </g>

            {/* Force 2 (Close) */}
            <g>
                <line x1="20" y1="0" x2="20" y2="40" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-door-2)" />
                <text x="20" y="50" textAnchor="middle" fill="#ef4444" className="text-force">F₂ = ?</text>
                <line x1="0" y1="-15" x2="20" y2="-15" stroke="#f97316" strokeWidth="1.5" markerStart="url(#tick-door)" markerEnd="url(#tick-door)" />
                <text x="10" y="-25" textAnchor="middle" fill="#f97316" className="text-label">d₂ = 0.2 m</text>
            </g>
        </svg>
    );
};

export const OfficeDoorProblem: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const correctAnswer = 22.5;

    const handleCheckAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput) return;
        const userAnswer = parseFloat(userInput);
        const correct = Math.abs(userAnswer - correctAnswer) < 0.1;
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
                <DoorDiagram />
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">Problem</h3>
                    <p className="text-slate-300">A door handle is <strong>0.9 m</strong> from the hinges. You push with <strong>5 N</strong> of force. A colleague pushes the door closed, only <strong>0.2 m</strong> from the hinges. What force must they use to create an equal, balancing moment?</p>
                </div>

                <form onSubmit={handleCheckAnswer} className="space-y-4">
                    <div>
                        <label htmlFor="answer-input-door" className="block text-sm font-medium text-slate-300 mb-1">
                            Colleague's Force (in Newtons):
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                id="answer-input-door"
                                type="number" step="0.1" value={userInput}
                                onChange={e => { setUserInput(e.target.value); setIsSubmitted(false); }}
                                placeholder="e.g., 22.5"
                                className={`flex-grow bg-slate-800 border ${getInputColorClasses()} rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-1 sm:text-sm font-roboto-mono transition-colors`}
                                aria-describedby="answer-feedback-door"
                            />
                            <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!userInput}>
                                Check
                            </button>
                        </div>
                    </div>
                    {isSubmitted && (
                        <div id="answer-feedback-door" className={`text-sm font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                            {isCorrect ? 'Correct! The door remains stationary.' : 'Not quite. Remember to balance the moments.'}
                        </div>
                    )}
                </form>

                {isSubmitted && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Solution Breakdown</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300 prose-strong:text-slate-100">
                            <p><strong>Principle:</strong> For the door to be balanced, the moment trying to open it must equal the moment trying to close it. <Formula inline>M_open = M_close</Formula></p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>
                                    <strong>Calculate Your Opening Moment (M_open):</strong><br/>
                                    <Formula inline>M_open = F₁ × d₁ = 5 N × 0.9 m = 4.5 Nm</Formula>
                                </li>
                                <li>
                                    <strong>Set Up the Closing Moment (M_close):</strong><br/>
                                    This moment must equal 4.5 Nm to balance the door.<br/>
                                    <Formula inline>M_close = F₂ × d₂ = F₂ × 0.2 m</Formula>
                                </li>
                                <li>
                                    <strong>Equate and Solve for F₂:</strong><br/>
                                    <Formula inline>F₂ × 0.2 m = 4.5 Nm</Formula><br/>
                                    <Formula inline>F₂ = 4.5 Nm / 0.2 m = 22.5 N</Formula>
                                </li>
                            </ol>
                            <p className="font-bold text-lg text-green-400">Answer: Your colleague must push with 22.5 N of force.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
