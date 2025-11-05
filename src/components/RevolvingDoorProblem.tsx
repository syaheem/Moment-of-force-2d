import React, { useState } from 'react';
import { Formula } from './Formula';

const RevolvingDoorDiagram: React.FC = () => {
    return (
        <svg viewBox="-100 -100 200 200" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <style>{`.text-label { font-family: 'Roboto Mono', monospace; font-size: 8px; }`}</style>
            <defs>
                <marker id="arrow-door-rev" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker>
            </defs>

            {/* Door Wings */}
            <g stroke="#a16207" strokeWidth="6">
                <line x1="0" y1="0" x2="80" y2="0" />
                <line x1="0" y1="0" x2="-80" y2="0" />
                <line x1="0" y1="0" x2="0" y2="80" />
                <line x1="0" y1="0" x2="0" y2="-80" />
            </g>
            <circle cx="0" cy="0" r="85" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4" />

            {/* Pivot */}
            <circle cx="0" cy="0" r="5" fill="#475569" />
            <text y="-5" x="-10" textAnchor="end" className="text-label">Pivot</text>

            {/* Forces */}
            {/* Force 1 */}
            <line x1="80" y1="0" x2="80" y2="-40" className="text-cyan-400" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-door-rev)" />
            <text x="85" y="-20" className="text-label text-cyan-400">F₁=150N</text>

            {/* Force 2 */}
            <line x1="-80" y1="0" x2="-80" y2="40" className="text-cyan-400" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-door-rev)" />
             <text x="-85" y="20" textAnchor="end" className="text-label text-cyan-400">F₂=150N</text>

             {/* Dimensions */}
             <line x1="0" y1="0" x2="80" y2="0" stroke="#a3a3a3" strokeWidth="1" />
             <text x="40" y="10" textAnchor="middle" className="text-label">r = 1.2 m</text>
        </svg>
    );
};

export const RevolvingDoorProblem: React.FC = () => {
    const [inputs, setInputs] = useState({ MT: '', Fnet: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const correctAnswers = { MT: 360, Fnet: 0 };

    const handleCheckAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputs.MT || !inputs.Fnet) return;
        const correctMT = Math.abs(parseFloat(inputs.MT) - correctAnswers.MT) < 1;
        const correctFnet = Math.abs(parseFloat(inputs.Fnet) - correctAnswers.Fnet) < 1;
        setIsSubmitted(true);
        setIsCorrect(correctMT && correctFnet);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700"><RevolvingDoorDiagram /></div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">Problem</h3>
                    <p className="text-slate-300">A revolving door (radius 1.2m) is pushed by two people. Person 1 pushes with 150 N at the edge. Person 2 pulls the opposite wing with 150 N to help. Find (a) the total moment <Formula inline>M_T</Formula> and (b) the net force <Formula inline>F_net</Formula> on the pivot.</p>
                </div>
                <form onSubmit={handleCheckAnswer} className="space-y-4">
                     <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Total Moment (Nm):</label>
                            <input type="number" step="1" value={inputs.MT} onChange={e => setInputs({...inputs, MT: e.target.value})} placeholder="360" className="w-full bg-slate-800 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 sm:text-sm font-roboto-mono" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Net Force (N):</label>
                            <input type="number" step="1" value={inputs.Fnet} onChange={e => setInputs({...inputs, Fnet: e.target.value})} placeholder="0" className="w-full bg-slate-800 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 sm:text-sm font-roboto-mono" />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors disabled:opacity-50" disabled={!inputs.MT || !inputs.Fnet}>Check</button>
                    {isSubmitted && <div className={`text-sm font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>{isCorrect ? 'Correct! This is a perfect force couple.' : 'Not quite. Remember a couple creates pure rotation.'}</div>}
                </form>
                {isSubmitted && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Solution Breakdown</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300">
                            <p><strong>Principle:</strong> This is a **Force Couple**, a pair of equal and opposite forces that create a "pure" moment with zero net translational force.</p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li><strong>(a) Total Moment:</strong> Both forces create a moment in the same rotational direction (e.g., counter-clockwise).<br/>
                                <Formula inline>M_1 = F_1 × r = 150 N × 1.2 m = 180 Nm</Formula><br/>
                                <Formula inline>M_2 = F_2 × r = 150 N × 1.2 m = 180 Nm</Formula><br/>
                                <Formula inline>M_T = M_1 + M_2 = 180 + 180 = 360 Nm</Formula></li>
                                <li><strong>(b) Net Force:</strong> The two forces are equal in magnitude but act in opposite directions (e.g., one pushes "up", the other pulls "down").<br/>
                                <Formula inline>ΣF = F_1 - F_2 = 150 N - 150 N = 0 N</Formula></li>
                            </ol>
                            <p className="font-bold text-lg text-green-400">Answer: The total moment is 360 Nm, and the net force on the pivot is 0 N.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
