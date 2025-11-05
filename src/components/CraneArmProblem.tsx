import React, { useState } from 'react';
import { Formula } from './Formula';

const CraneDiagram: React.FC = () => {
    return (
        <svg viewBox="-20 -20 200 120" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <style>{`.text-label { font-family: 'Roboto Mono', monospace; font-size: 8px; } .text-force { font-family: 'Inter', sans-serif; font-size: 7px; font-weight: bold; }`}</style>
             <defs>
                <marker id="arrow-crane" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker>
                 <pattern id="diagonalHatch-crane" patternUnits="userSpaceOnUse" width="8" height="8">
                    <rect width="8" height="8" fill="#64748b"/>
                    <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" stroke="#475569" strokeWidth="1" />
                </pattern>
            </defs>

            {/* Wall */}
            <rect x="-10" y="-10" width="10" height="100" fill="url(#diagonalHatch-crane)" />

            {/* Beam ABC */}
            <rect x="0" y="0" width="180" height="10" fill="#a16207" />

            {/* Strut BD */}
            <line x1="72" y1="5" x2="0" y2="60" stroke="#94a3b8" strokeWidth="6" />

            {/* Joints and Labels */}
            <g fill="white" stroke="black" strokeWidth="1">
                <circle cx="0" cy="5" r="4" /><text x="-10" y="0" className="text-label">A</text>
                <circle cx="72" cy="5" r="4" /><text x="72" y="-5" className="text-label" textAnchor="middle">B</text>
                <circle cx="180" y="5" r="2" /><text x="180" y="-5" className="text-label" textAnchor="middle">C</text>
                <circle cx="0" y="60" r="4" /><text x="-10" y="65" className="text-label">D</text>
            </g>

            {/* Load */}
            <line x1="180" y1="10" x2="180" y2="50" className="text-red-400" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-crane)" />
            <text x="180" y="65" textAnchor="middle" className="text-force text-red-400">W = 5000 N</text>

            {/* Dimensions */}
            <g stroke="#a3a3a3" strokeWidth="1" className="text-label" fill="#a3a3a3">
                {/* Horizontal */}
                <line x1="0" y1="80" x2="72" y2="80" />
                <text x="36" y="90" textAnchor="middle">2.0 m</text>
                <line x1="72" y1="80" x2="180" y2="80" />
                <text x="126" y="90" textAnchor="middle">3.0 m</text>
                 {/* Vertical */}
                <line x1="-15" y1="5" x2="-15" y2="60" />
                <text x="-18" y="35" textAnchor="end">1.5 m</text>
            </g>
        </svg>
    );
};

export const CraneArmProblem: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const correctAnswer = 20833;

    const handleCheckAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput) return;
        const userAnswer = parseFloat(userInput);
        const correct = Math.abs(userAnswer - correctAnswer) < 100;
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
                <CraneDiagram />
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">Problem</h3>
                    <p className="text-slate-300">A Jib crane has a 5m horizontal member ABC pivoted at A. It's supported by a strut BD connecting at B (2m from A) and to the wall at D (1.5m below A). A <strong>5000 N</strong> load hangs from C. Find the compressive force in the strut BD.</p>
                </div>

                <form onSubmit={handleCheckAnswer} className="space-y-4">
                    <div>
                        <label htmlFor="answer-input-crane" className="block text-sm font-medium text-slate-300 mb-1">
                           Force in strut BD (in Newtons):
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                id="answer-input-crane" type="number" step="1" value={userInput}
                                onChange={e => { setUserInput(e.target.value); setIsSubmitted(false); }}
                                placeholder="e.g., 20833"
                                className={`flex-grow bg-slate-800 border ${getInputColorClasses()} rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-1 sm:text-sm font-roboto-mono transition-colors`}
                            />
                            <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors disabled:opacity-50" disabled={!userInput}>Check</button>
                        </div>
                    </div>
                    {isSubmitted && <div className={`text-sm font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>{isCorrect ? 'Correct! The strut holds the load.' : 'Not quite. Check your pivot and moment calculations.'}</div>}
                </form>

                {isSubmitted && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Solution Breakdown</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300">
                             <p><strong>Principle:</strong> Analyze the main beam ABC as a single rigid body. The strut BD is a two-force member, so the force it exerts (<Formula inline>F_BD</Formula>) acts along its own axis.</p>
                             <ol className="list-decimal pl-5 space-y-2">
                                 <li><strong>Find the Strut Angle (<Formula inline>θ</Formula>):</strong> The strut forms a right triangle with horizontal side 2.0m and vertical side 1.5m.<br/>
                                 <Formula inline>θ = arctan(1.5 / 2.0) = 36.87°</Formula></li>
                                 <li><strong>Choose a Strategic Pivot:</strong> Sum moments about the pivot A to eliminate the unknown hinge reactions <Formula inline>A_x</Formula> and <Formula inline>A_y</Formula>.</li>
                                 <li><strong>Sum Moments about A (<Formula inline>ΣM_A = 0</Formula>):</strong> The CW moment from the load must be balanced by the CCW moment from the vertical component of the strut's force.<br/>
                                 Moment from Load (CW): <Formula inline>M_W = -5000 N \times 5.0 m = -25,000 Nm</Formula><br/>
                                 Moment from Strut (CCW): The strut force <Formula inline>F_BD</Formula> has a vertical component <Formula inline>F_BDy = F_BD \sin(36.87°)</Formula>. This acts at a distance of 2.0 m from A.<br/>
                                 <Formula inline>M_BD = +(F_BD \sin 36.87°) \times 2.0 m = 1.2 F_BD</Formula></li>
                                 <li><strong>Solve for <Formula inline>F_BD</Formula>:</strong><br/>
                                 <Formula inline>ΣM_A = -25,000 + 1.2 F_BD = 0</Formula><br/>
                                 <Formula inline>F_BD = 25,000 / 1.2 = 20,833 N</Formula></li>
                             </ol>
                             <p className="font-bold text-lg text-green-400">Answer: The compressive force in strut BD is 20,833 N.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
