import React, { useState } from 'react';
import { Formula } from './Formula';

const ParadoxDiagram: React.FC = () => {
    return (
        <svg viewBox="-20 -100 120 120" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <style>{`.text-label { font-family: 'Roboto Mono', monospace; font-size: 8px; } .text-force { font-family: 'Inter', sans-serif; font-size: 7px; font-weight: bold; }`}</style>
            <defs><marker id="arrow-paradox" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker></defs>
            <rect x="0" y="-90" width="80" height="100" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
            <line x1="-15" y1="-70" x2="0" y2="-70" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-paradox)" /><text x="-18" y="-70" textAnchor="end" className="text-force text-cyan-400">P</text>
            <line x1="40" y1="-40" x2="40" y2="-10" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-paradox)" /><text x="45" y="-25" className="text-force text-red-400">W</text>
            <line x1="40" y1="10" x2="40" y2="0" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-paradox)" /><text x="45" y="0" className="text-force text-green-400">N</text>
            <line x1="80" y1="10" x2="50" y2="10" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-paradox)" /><text x="65" y="5" textAnchor="middle" className="text-force text-amber-400">F_f</text>
            <line x1="-5" y1="10" x2="-5" y2="-70" stroke="#a3a3a3" strokeWidth="0.5" /><text x="-8" y="-30" textAnchor="end" className="text-label">h</text>
            <line x1="0" y1="15" x2="80" y2="15" stroke="#a3a3a3" strokeWidth="0.5" /><text x="40" y="22" textAnchor="middle" className="text-label">w</text>
            <circle cx="80" cy="10" r="2" fill="red" /><text x="80" y="5" textAnchor="middle" className="text-label">Pivot O</text>
        </svg>
    );
};

export const TippingBlockParadoxProblem: React.FC = () => {
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <ParadoxDiagram />
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">The Paradox</h3>
                    <p className="text-slate-300">Prof. A claims: "The height <Formula inline>h</Formula> at which you push a block is irrelevant for making it slide."</p>
                    <p className="text-slate-300 mt-2">Prof. B claims: "The height <Formula inline>h</Formula> is the most critical factor in determining if a block tips."</p>
                    <p className="text-slate-300 mt-2">They are both correct. Explain how.</p>
                </div>

                {!isRevealed && (
                    <button onClick={() => setIsRevealed(true)} className="w-full bg-rose-500 hover:bg-rose-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors">
                        Reconcile the Experts
                    </button>
                )}

                {isRevealed && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Explanation</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300">
                            <p><strong>Principle:</strong> Sliding and tipping are two different failure modes governed by two different physics equations. One is about balancing **forces**, the other is about balancing **moments**.</p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li><strong>The Sliding Equation (Prof. A is right):</strong> Sliding is a **force** problem. It happens when the push force <Formula inline>P</Formula> overcomes the maximum friction force <Formula inline>F_f</Formula>.
                                <br/>
                                The equation is <Formula inline>P_slide = μ_s × W</Formula>.
                                <br/>
                                As you can see, the height <Formula inline>h</Formula> does not appear in this equation at all. The force needed to slide depends only on the block's weight and the friction coefficient.
                                </li>
                                <li><strong>The Tipping Equation (Prof. B is right):</strong> Tipping is a **moment** problem. It happens when the tipping moment from the push overcomes the stabilizing moment from the weight.
                                <br/>
                                The equation is <Formula inline>P_tip = (W × w/2) / h</Formula>.
                                <br/>
                                Here, the height <Formula inline>h</Formula> is a critical variable. A higher push (larger <Formula inline>h</Formula>) creates more leverage, reducing the force needed to cause a tip.
                                </li>
                            </ol>
                            <p className="font-bold text-lg text-green-400">Conclusion: There is no paradox. The professors are describing different physical phenomena. The height <Formula inline>h</Formula> is irrelevant for the force required to slide but is paramount for the force required to tip.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};