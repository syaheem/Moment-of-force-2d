import React, { useState } from 'react';
import { Formula } from './Formula';

const OverhangDiagram: React.FC = () => {
    const block_h = 15;
    const block_w = 100;
    const overhangs = [0.5, 0.25, 1/6, 1/8, 1/10];
    let cumulative_overhang = 0;
    
    return (
        <svg viewBox="-10 -10 180 120" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
             <style>{`.text-label { font-family: 'Roboto Mono', monospace; font-size: 8px; }`}</style>
             {/* Table */}
             <rect x="0" y="100" width="80" height="10" fill="#64748b" />
             <line x1="80" y1="95" x2="80" y2="110" stroke="#f43f5e" strokeWidth="1.5" />
             <text x="80" y="90" className="text-label" textAnchor="middle">Edge</text>

            {/* Blocks */}
            {overhangs.map((overhang, i) => {
                const y = 100 - (i + 1) * block_h;
                const x = 80 + cumulative_overhang;
                cumulative_overhang += overhang * block_w;
                return <rect key={i} x={x - block_w} y={y} width={block_w} height={block_h-1} fill="#a16207" stroke="#6b460a" />
            })}
        </svg>
    );
};

export const CounterIntuitiveOverhangProblem: React.FC = () => {
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <OverhangDiagram />
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">The Puzzle</h3>
                    <p className="text-slate-300">You have an infinite supply of identical, uniform blocks. How far can you make the top block overhang the edge of the table without using any glue or external supports?</p>
                </div>

                {!isRevealed && (
                    <button onClick={() => setIsRevealed(true)} className="w-full bg-rose-500 hover:bg-rose-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors">
                        Reveal the Surprising Answer
                    </button>
                )}

                {isRevealed && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Explanation</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300">
                            <p><strong>Principle:</strong> Work from the top down. For any stack of blocks to be stable, their combined Center of Gravity (CG) must be positioned at or behind the edge of the block supporting them.</p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li><strong>Top Block (B1 on B2):</strong> To maximize overhang, the CG of B1 is placed exactly on the edge of B2. This gives an overhang of <Formula inline>L/2</Formula>.</li>
                                <li><strong>Blocks (B1+B2) on B3:</strong> We find the combined CG of the B1+B2 system. This CG must be placed on the edge of B3. Calculation shows this allows B2 to overhang B3 by <Formula inline>L/4</Formula>.</li>
                                <li><strong>The Pattern:</strong> Continuing this process, we find that the <em>n</em>-th block from the top can overhang the one below it by <Formula inline>L / (2n)</Formula>.</li>
                                <li><strong>Total Overhang:</strong> The total overhang is the sum of all these individual overhangs:<br/>
                                <Formula inline>D = L/2 + L/4 + L/6 + L/8 + ...</Formula><br/>
                                This can be written as:<br/>
                                <Formula inline>D = (L/2) × (1 + 1/2 + 1/3 + 1/4 + ...)</Formula></li>
                            </ol>
                             <p>The series in the parenthesis is the famous **Harmonic Series**, which is known to be **divergent**—meaning its sum grows to infinity as you add more terms.</p>
                            <p className="font-bold text-lg text-green-400">Answer: The total overhang can, theoretically, be infinite.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
