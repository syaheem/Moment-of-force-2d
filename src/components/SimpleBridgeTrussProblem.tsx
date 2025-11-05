import React, { useState } from 'react';
import { Formula } from './Formula';

const TrussDiagram: React.FC = () => {
    return (
        <svg viewBox="0 0 400 200" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <style>{`.text-label { font-family: 'Roboto Mono', monospace; font-size: 10px; } .text-force { font-family: 'Inter', sans-serif; font-size: 9px; font-weight: bold; }`}</style>
            <defs>
                <marker id="arrow-truss" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker>
            </defs>

            {/* Left section highlight */}
            <path d="M 50 150 L 150 150 L 100 63.4 Z" fill="#334155" />

            {/* Truss Structure */}
            <g stroke="#94a3b8" strokeWidth="3">
                {/* Bottom Chord */}
                <line x1="50" y1="150" x2="350" y2="150" />
                {/* Top Chord */}
                <line x1="150" y1="63.4" x2="250" y2="63.4" />
                {/* Diagonals */}
                <line x1="50" y1="150" x2="150" y2="63.4" />
                <line x1="150" y1="150" x2="150" y2="63.4" />
                <line x1="150" y1="150" x2="250" y2="63.4" />
                <line x1="250" y1="150" x2="250" y2="63.4" />
                <line x1="250" y1="150" x2="350" y2="150" />
                <line x1="350" y1="150" x2="250" y2="63.4" />
            </g>

            {/* Joints */}
            <g fill="white" stroke="black" strokeWidth="1">
                <circle cx="50" cy="150" r="4" />
                <circle cx="150" cy="150" r="4" />
                <circle cx="250" cy="150" r="4" />
                <circle cx="350" cy="150" r="4" />
                <circle cx="150" cy="63.4" r="4" />
                <circle cx="250" cy="63.4" r="4" />
            </g>
            <g className="text-label" fill="#a3a3a3">
                <text x="45" y="165" textAnchor="middle">A</text>
                <text x="150" y="50" textAnchor="middle">B</text>
                <text x="200" y="165" textAnchor="middle">C</text>
                <text x="250" y="50" textAnchor="middle">D</text>
                <text x="355" y="165" textAnchor="middle">E</text>
            </g>

            {/* Supports */}
            {/* Pin at A */}
            <path d="M 50 150 L 40 165 L 60 165 Z" fill="#64748b" />
            {/* Roller at E */}
            <circle cx="350" cy="158" r="8" fill="none" stroke="#64748b" strokeWidth="2" />
            <line x1="340" y1="166" x2="360" y2="166" stroke="#64748b" strokeWidth="2" />

            {/* Forces */}
            {/* Load at C */}
            <line x1="200" y1="150" x2="200" y2="180" className="text-red-400" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-truss)" />
            <text x="210" y="170" className="text-force" fill="currentColor">10,000 N</text>
            {/* Reaction at A */}
            <line x1="50" y1="150" x2="50" y2="120" className="text-green-400" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-truss)" />
            <text x="40" y="135" className="text-force" fill="currentColor" textAnchor="end">A_y</text>
            {/* Reaction at E */}
            <line x1="350" y1="150" x2="350" y2="120" className="text-green-400" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-truss)" />
            <text x="360" y="135" className="text-force" fill="currentColor">E_y</text>

            {/* Section Cut */}
            <line x1="175" y1="40" x2="175" y2="170" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 3" />
            <text x="180" y="50" className="text-label" fill="#f43f5e">Cut</text>
        </svg>
    );
};


export const SimpleBridgeTrussProblem: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const correctAnswer = 5773.5;

    const handleCheckAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput) return;
        const userAnswer = parseFloat(userInput);
        const correct = Math.abs(userAnswer - correctAnswer) < 100; // Generous tolerance
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
                <TrussDiagram />
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">Problem</h3>
                    <p className="text-slate-300">A simple Warren truss spans 8m, made of 4m equilateral triangles. It has a pin support at A and a roller at E. A <strong>10,000 N</strong> load is applied at joint C. Using the Method of Sections, find the force in the top-center member, BD.</p>
                </div>

                <form onSubmit={handleCheckAnswer} className="space-y-4">
                    <div>
                        <label htmlFor="answer-input-truss" className="block text-sm font-medium text-slate-300 mb-1">
                           Force in member BD (in Newtons):
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                id="answer-input-truss" type="number" step="0.1" value={userInput}
                                onChange={e => { setUserInput(e.target.value); setIsSubmitted(false); }}
                                placeholder="e.g., 5773.5"
                                className={`flex-grow bg-slate-800 border ${getInputColorClasses()} rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-1 sm:text-sm font-roboto-mono transition-colors`}
                            />
                            <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors disabled:opacity-50" disabled={!userInput}>Check</button>
                        </div>
                    </div>
                    {isSubmitted && <div className={`text-sm font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>{isCorrect ? 'Correct! The member is in compression.' : 'Not quite. Check your moment calculation.'}</div>}
                </form>

                {isSubmitted && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Solution Breakdown</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300">
                            <p><strong>Principle:</strong> Use the Method of Sections. After finding external reactions, "cut" the truss and treat the remaining section as a rigid body in equilibrium (<Formula inline>ΣM=0</Formula>).</p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li><strong>Find Support Reactions:</strong> The 10,000 N load is centered, so the vertical supports at A and E each take half the load by symmetry.<br/>
                                <Formula inline>A_y = E_y = 10,000 N / 2 = 5,000 N</Formula></li>
                                <li><strong>Make a Section Cut:</strong> Make a vertical cut through members BD, BC, and AC. We analyze the FBD of the left section (the triangle at A).</li>
                                <li><strong>Choose a Strategic Pivot:</strong> To find the force in member BD, we sum moments about a point that eliminates the other two unknown forces (<Formula inline>F_BC</Formula> and <Formula inline>F_AC</Formula>). Both of their lines of action pass through joint C. So, we sum moments about C (<Formula inline>ΣM_C = 0</Formula>).</li>
                                <li><strong>Sum Moments about C:</strong> The height of the truss is <Formula inline>h = 4 \sin(60°) = 3.464 m</Formula>.<br/>
                                Moment from <Formula inline>A_y</Formula> (CW): <Formula inline>M_A = -5000 N \times 4 m = -20,000 Nm</Formula><br/>
                                Moment from <Formula inline>F_BD</Formula> (CCW): <Formula inline>M_BD = +F_BD \times h = F_BD \times 3.464 m</Formula></li>
                                <li><strong>Solve for <Formula inline>F_BD</Formula>:</strong><br/>
                                <Formula inline>ΣM_C = -20,000 + 3.464 \times F_BD = 0</Formula><br/>
                                <Formula inline>F_BD = 20,000 / 3.464 = 5773.5 N</Formula></li>
                            </ol>
                            <p className="font-bold text-lg text-green-400">Answer: The force in member BD is 5773.5 N (Compression).</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
