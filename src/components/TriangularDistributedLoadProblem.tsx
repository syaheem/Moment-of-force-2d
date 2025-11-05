import React, { useState } from 'react';
import { Formula } from './Formula';

const LoadDiagram: React.FC = () => {
    return (
        <svg viewBox="-20 -50 150 100" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <style>{`.text-label { font-family: 'Roboto Mono', monospace; font-size: 8px; } .text-force { font-family: 'Inter', sans-serif; font-size: 7px; font-weight: bold; }`}</style>
            <defs>
                <pattern id="diagonalHatch-load" patternUnits="userSpaceOnUse" width="8" height="8">
                    <rect width="8" height="8" fill="#64748b"/>
                    <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" stroke="#475569" strokeWidth="1" />
                </pattern>
                <marker id="arrow-load-prob" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker>
            </defs>

            {/* Wall */}
            <rect x="-10" y="-40" width="10" height="80" fill="url(#diagonalHatch-load)" />
            
            {/* Beam */}
            <rect x="0" y="0" width="120" height="8" fill="#94a3b8" />

            {/* Distributed Load */}
            <polygon points="0,-40 120,0 0,0" fill="rgba(239, 68, 68, 0.3)" />
            <line x1="0" y1="-40" x2="120" y2="0" stroke="#ef4444" strokeWidth="1" />
            <g>
                {/* Arrows for load */}
                <line x1="20" y1="0" x2="20" y2="-6.67" stroke="#ef4444" strokeWidth="0.5" markerEnd="url(#arrow-load-prob)"/>
                <line x1="40" y1="0" x2="40" y2="-13.33" stroke="#ef4444" strokeWidth="0.5" markerEnd="url(#arrow-load-prob)"/>
                <line x1="60" y1="0" x2="60" y2="-20" stroke="#ef4444" strokeWidth="0.5" markerEnd="url(#arrow-load-prob)"/>
                <line x1="80" y1="0" x2="80" y2="-26.67" stroke="#ef4444" strokeWidth="0.5" markerEnd="url(#arrow-load-prob)"/>
                <line x1="100" y1="0" x2="100" y2="-33.33" stroke="#ef4444" strokeWidth="0.5" markerEnd="url(#arrow-load-prob)"/>
            </g>
            <text x="-5" y="-35" className="text-force text-red-400" textAnchor="end">w_max</text>

            {/* Reactions */}
            <line x1="0" y1="0" x2="0" y2="-30" className="text-green-400" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-load-prob)" />
            <text x="5" y="-15" className="text-force text-green-400">R_y</text>

            <path d="M -5 10 A 8 8 0 1 1 -5 26" stroke="#22c55e" strokeWidth="2" fill="none" markerEnd="url(#arrow-load-prob)" className="text-green-400" />
            <text x="-15" y="25" className="text-force text-green-400">M_R</text>

            {/* Dimension */}
            <line x1="0" y1="20" x2="120" y2="20" stroke="#a3a3a3" strokeWidth="1" />
            <text x="60" y="30" textAnchor="middle" className="text-label">6.0 m</text>
        </svg>
    );
};

export const TriangularDistributedLoadProblem: React.FC = () => {
    const [inputs, setInputs] = useState({ Ry: '', MR: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const correctAnswers = { Ry: 3600, MR: 7200 };

    const handleCheckAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputs.Ry || !inputs.MR) return;
        const correctRy = Math.abs(parseFloat(inputs.Ry) - correctAnswers.Ry) < 10;
        const correctMR = Math.abs(parseFloat(inputs.MR) - correctAnswers.MR) < 10;
        setIsSubmitted(true);
        setIsCorrect(correctRy && correctMR);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700"><LoadDiagram /></div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">Problem</h3>
                    <p className="text-slate-300">A 6.0m cantilever beam supports a triangular load that increases from 0 N/m at the tip to <Formula inline>w_max = 1200 N/m</Formula> at the wall. Find the reaction force (<Formula inline>R_y</Formula>) and reaction moment (<Formula inline>M_R</Formula>) at the wall.</p>
                </div>
                <form onSubmit={handleCheckAnswer} className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">R_y (N):</label>
                            <input type="number" step="1" value={inputs.Ry} onChange={e => setInputs({...inputs, Ry: e.target.value})} placeholder="3600" className="w-full bg-slate-800 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 sm:text-sm font-roboto-mono" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">M_R (Nm):</label>
                            <input type="number" step="1" value={inputs.MR} onChange={e => setInputs({...inputs, MR: e.target.value})} placeholder="7200" className="w-full bg-slate-800 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 sm:text-sm font-roboto-mono" />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors disabled:opacity-50" disabled={!inputs.Ry || !inputs.MR}>Check</button>
                    {isSubmitted && <div className={`text-sm font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>{isCorrect ? 'Correct! The wall supports the beam.' : 'Not quite. Check the equivalent force and its location.'}</div>}
                </form>
                {isSubmitted && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Solution Breakdown</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300">
                            <p><strong>Principle:</strong> A triangular distributed load can be replaced by a single equivalent force (<Formula inline>F_eq</Formula>) acting at the centroid of the triangle.</p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li><strong>Equivalent Force (<Formula inline>F_eq</Formula>):</strong> The force is the "area" of the load triangle.<br/>
                                <Formula inline>F_eq = 1/2 × base × height = 0.5 × 6m × 1200 N/m = 3600 N</Formula></li>
                                <li><strong>Equivalent Location:</strong> The centroid of a triangle is 1/3 of the way from its tall end.<br/>
                                Location = <Formula inline>1/3 × L = (1/3) × 6m = 2.0 m</Formula> from the wall.</li>
                                <li><strong>Reaction Force (<Formula inline>R_y</Formula>):</strong> The wall's upward force must balance the downward load.<br/>
                                <Formula inline>ΣF_y = R_y - F_eq = 0 ⇒ R_y = 3600 N</Formula></li>
                                <li><strong>Reaction Moment (<Formula inline>M_R</Formula>):</strong> The wall's counter-clockwise moment must balance the clockwise moment from the load.<br/>
                                <Formula inline>ΣM_wall = M_R - (F_eq × location) = 0</Formula><br/>
                                <Formula inline>M_R = 3600 N × 2.0 m = 7200 Nm</Formula></li>
                            </ol>
                            <p className="font-bold text-lg text-green-400">Answers: R_y = 3600 N, M_R = 7200 Nm.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
