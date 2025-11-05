import React, { useState } from 'react';
import { Formula } from './Formula';

const SignDiagram: React.FC = () => {
    return (
        <svg viewBox="-20 -120 120 140" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <style>{`.text-label { font-family: 'Roboto Mono', monospace; font-size: 8px; } .text-force { font-family: 'Inter', sans-serif; font-size: 7px; font-weight: bold; }`}</style>
            <defs><marker id="arrow-sign" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker></defs>
            
            {/* Wall */}
            <rect x="-10" y="-110" width="10" height="130" fill="#64748b" />
            
            {/* Beam */}
            <rect x="0" y="20" width="100" height="8" fill="#a16207" />
            
            {/* Sign */}
            <rect x="80" y="28" width="20" height="30" fill="#e2e8f0" stroke="#94a3b8" />
            <line x1="90" y1="28" x2="90" y2="20" stroke="black" strokeWidth="0.5"/>

            {/* Cable */}
            <line x1="100" y1="24" x2="0" y2="-76" stroke="#94a3b8" strokeWidth="2" />
            
            {/* Hinge */}
            <circle cx="0" cy="24" r="4" fill="#475569" />

            {/* Forces */}
            {/* WB (Weight Beam) */}
            <line x1="50" y1="28" x2="50" y2="50" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-sign)" />
            {/* WS (Weight Sign) */}
            <line x1="90" y1="58" x2="90" y2="80" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-sign)" />
            {/* Hinge Forces */}
            <line x1="0" y1="24" x2="20" y2="24" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-sign)" />
            <line x1="0" y1="24" x2="0" y2="4" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-sign)" />

        </svg>
    );
};

export const HangingSignProblem: React.FC = () => {
    const [inputs, setInputs] = useState({ T: '', Hx: '', Hy: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const correctAnswers = { T: 519.8, Hx: 367.5, Hy: 73.5 };

    const handleCheckAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputs.T || !inputs.Hx || !inputs.Hy) return;
        const correctT = Math.abs(parseFloat(inputs.T) - correctAnswers.T) < 2;
        const correctHx = Math.abs(parseFloat(inputs.Hx) - correctAnswers.Hx) < 2;
        const correctHy = Math.abs(parseFloat(inputs.Hy) - correctAnswers.Hy) < 2;
        setIsSubmitted(true);
        setIsCorrect(correctT && correctHx && correctHy);
    };

    const getInputColorClasses = (val: string, correctVal: number) => {
        if (!isSubmitted) return "border-slate-600 focus:border-cyan-500 focus:ring-cyan-500";
        return Math.abs(parseFloat(val) - correctVal) < 2 ? "border-green-500 ring-green-500" : "border-red-500 ring-red-500";
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700"><SignDiagram /></div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">Problem</h3>
                    <p className="text-slate-300">A 2m, 15kg uniform beam is hinged to a wall. A 30kg sign hangs from its end. A cable runs from the beam's end to a point 2m above the hinge. Find: (a) Tension <Formula inline>T</Formula> in the cable, and (b) horizontal <Formula inline>H_x</Formula> and vertical <Formula inline>H_y</Formula> hinge forces.</p>
                </div>

                <form onSubmit={handleCheckAnswer} className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Tension T (N):</label>
                            <input type="number" step="0.1" value={inputs.T} onChange={e => setInputs({...inputs, T: e.target.value})} placeholder="519.8" className={`w-full bg-slate-800 border ${getInputColorClasses(inputs.T, correctAnswers.T)} rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 sm:text-sm font-roboto-mono`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Hinge H_x (N):</label>
                            <input type="number" step="0.1" value={inputs.Hx} onChange={e => setInputs({...inputs, Hx: e.target.value})} placeholder="367.5" className={`w-full bg-slate-800 border ${getInputColorClasses(inputs.Hx, correctAnswers.Hx)} rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 sm:text-sm font-roboto-mono`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Hinge H_y (N):</label>
                            <input type="number" step="0.1" value={inputs.Hy} onChange={e => setInputs({...inputs, Hy: e.target.value})} placeholder="73.5" className={`w-full bg-slate-800 border ${getInputColorClasses(inputs.Hy, correctAnswers.Hy)} rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 sm:text-sm font-roboto-mono`} />
                        </div>
                    </div>
                     <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors disabled:opacity-50" disabled={!inputs.T || !inputs.Hx || !inputs.Hy}>Check</button>
                    {isSubmitted && <div className={`text-sm font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>{isCorrect ? 'Correct! The sign is stable.' : 'Not quite. Check the forces and moments again.'}</div>}
                </form>

                {isSubmitted && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Solution Breakdown</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300">
                             <p><strong>Principle:</strong> The sign is in equilibrium, so <Formula inline>ΣF_x=0</Formula>, <Formula inline>ΣF_y=0</Formula>, and <Formula inline>ΣM=0</Formula>.</p>
                             <ol className="list-decimal pl-5 space-y-2">
                                 <li><strong>(a) Find Tension T with Moments:</strong> Sum moments about the hinge to eliminate <Formula inline>H_x</Formula> and <Formula inline>H_y</Formula>. The cable is at 45°. <br/>
                                 Weights: <Formula inline>W_B = 147 N</Formula>, <Formula inline>W_S = 294 N</Formula>.<br/>
                                 Moment from Beam (CW): <Formula inline>M_B = -147 N \times 1m = -147 Nm</Formula><br/>
                                 Moment from Sign (CW): <Formula inline>M_S = -294 N \times 2m = -588 Nm</Formula><br/>
                                 Moment from Tension (CCW): <Formula inline>M_T = (T \sin 45°) \times 2m</Formula><br/>
                                 <Formula inline>ΣM_H = (T \sin 45°) \times 2 - 147 - 588 = 0</Formula><br/>
                                 <Formula inline>1.414T = 735 \Rightarrow T = 519.8 N</Formula></li>
                                 <li><strong>(b) Find Hinge Forces:</strong> Use force equilibrium equations.<br/>
                                 <Formula inline>ΣF_x = H_x - T \cos 45° = 0</Formula><br/>
                                 <Formula inline>H_x = 519.8 \times \cos 45° = 367.5 N</Formula><br/>
                                 <Formula inline>ΣF_y = H_y + T \sin 45° - W_B - W_S = 0</Formula><br/>
                                 <Formula inline>H_y + 367.5 - 147 - 294 = 0 \Rightarrow H_y = 73.5 N</Formula></li>
                             </ol>
                             <p className="font-bold text-lg text-green-400">Answers: T ≈ 519.8 N, Hx ≈ 367.5 N, Hy ≈ 73.5 N.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};