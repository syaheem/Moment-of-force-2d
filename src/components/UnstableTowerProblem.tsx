import React, { useState } from 'react';
import { Formula } from './Formula';

const TowerDiagram: React.FC = () => {
    const block_h = 20;
    const block_w = 80;
    return (
        <svg viewBox="0 0 150 120" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <style>{`.text-label { font-family: 'Roboto Mono', monospace; font-size: 8px; }`}</style>
            {/* Table */}
            <rect x="0" y="100" width="150" height="10" fill="#64748b" />
            
            {/* Block 3 (Bottom) */}
            <rect x="20" y={100 - block_h} width={block_w} height={block_h-1} fill="#a16207" stroke="#6b460a" />
            <line x1="100" y1="75" x2="100" y2="80" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="100" y="70" className="text-label" textAnchor="middle">Pivot</text>

            {/* Block 2 (Middle, Unstable) */}
            <rect x="80" y={100 - 2*block_h} width={block_w} height={block_h-1} fill="#a16207" stroke="#6b460a" />
            <circle cx="120" cy={100 - 1.5*block_h} r="2" fill="white" />
            <text x="120" y={100 - 1.5*block_h - 5} className="text-label" textAnchor="middle">CG₂</text>

            {/* Block 1 (Top, Stabilizer) */}
            <rect x="30" y={100 - 3*block_h} width={block_w} height={block_h-1} fill="#334155" stroke="#64748b" />
            <circle cx="70" cy={100 - 2.5*block_h} r="2" fill="white" />
            <text x="70" y={100 - 2.5*block_h - 5} className="text-label" textAnchor="middle">CG₁</text>

        </svg>
    );
};

export const UnstableTowerProblem: React.FC = () => {
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <TowerDiagram />
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">The Puzzle</h3>
                    <p className="text-slate-300">A math puzzle states: "It's possible to construct a stable tower of blocks with the property that removing the top block causes the tower below it to collapse." Design such a stack and explain with moments why it works.</p>
                </div>

                {!isRevealed && (
                    <button onClick={() => setIsRevealed(true)} className="w-full bg-rose-500 hover:bg-rose-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors">
                        Reveal the Design
                    </button>
                )}

                {isRevealed && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Explanation</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300">
                            <p><strong>Principle:</strong> The tower's stability is **conditional**. An inherently unstable section is held in equilibrium by a carefully placed counter-moment from the block above it.</p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li><strong>Create an Unstable Base:</strong> Place the middle block (B2) on the bottom block (B3) with a large overhang. Its Center of Gravity (CG) is past the edge of B3, creating a strong tipping moment (<Formula inline>M_tip</Formula>) that would make it fall.</li>
                                <li><strong>Add a Stabilizer:</strong> Place the top block (B1) on B2, but far back from the edge. This block's weight creates a stabilizing counter-moment (<Formula inline>M_stable</Formula>) in the opposite direction.</li>
                                <li><strong>The Design:</strong> The positions are chosen so that the moments perfectly cancel out: <Formula inline>M_stable - M_tip = 0</Formula>. The combined B1+B2 system is now balanced on B3, and the entire tower is stable.</li>
                                <li><strong>The Collapse:</strong> When you remove the top block (B1), you remove the stabilizing counter-moment. The equation becomes <Formula inline>ΣM = 0 - M_tip</Formula>. The net moment is no longer zero, and the unopposed tipping moment from B2 causes it to immediately fall.</li>
                            </ol>
                            <p className="font-bold text-lg text-green-400">Answer: The tower works because the top block is not just weight; it's a crucial component providing a counter-moment that keeps the unstable middle block in check.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
