import React, { useState } from 'react';
import { Formula } from './Formula';

const WagonDiagram: React.FC = () => {
    const WagonBody: React.FC<{transform?: string}> = ({transform}) => (
        <g transform={transform}>
            <rect x="-30" y="-20" width="60" height="20" fill="#a16207" stroke="#6b460a" />
            <circle cx="-20" cy="0" r="8" fill="#64748b" stroke="black" strokeWidth="0.5" />
            <circle cx="20" cy="0" r="8" fill="#64748b" stroke="black" strokeWidth="0.5" />
        </g>
    );

    const Forces: React.FC<{isPull: boolean}> = ({isPull}) => {
        const angle = 30 * Math.PI / 180;
        const p_len = 50;
        const p_y_dir = isPull ? -1 : 1;
        return (
            <g className="text-force">
                {/* W */}
                <line x1="0" y1="-10" x2="0" y2="20" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow-wagon)" />
                <text x="5" y="10" fill="#ef4444">W</text>
                {/* N */}
                <line x1="0" y1="0" x2="0" y2={-30 - (isPull ? 5 : -5)} stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#arrow-wagon)" />
                <text x="5" y={-15} fill="#22c55e">N</text>
                {/* Ff */}
                <line x1="30" y1="0" x2="-30" y2="0" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-wagon)" />
                <text x="-15" y="-5" fill="#f59e0b">F_f</text>
                {/* P */}
                <line x1="30" y1="-15" x2={30 + p_len * Math.cos(angle)} y2={-15 + p_y_dir * p_len * Math.sin(angle)} stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-wagon)" />
                <text x={30 + p_len * Math.cos(angle) + 5} y={-15 + p_y_dir * p_len * Math.sin(angle)} fill="#38bdf8">P</text>
            </g>
        )
    };

    return (
        <svg viewBox="-50 -50 200 100" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <defs><marker id="arrow-wagon" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker></defs>
            {/* Push Diagram */}
            <g transform="translate(0, -25)">
                 <text x="0" y="-35" textAnchor="middle" className="font-bold">PUSHING</text>
                <WagonBody />
                <Forces isPull={false} />
            </g>
            {/* Pull Diagram */}
            <g transform="translate(100, -25)">
                <text x="0" y="-35" textAnchor="middle" className="font-bold">PULLING</text>
                <WagonBody />
                <Forces isPull={true} />
            </g>
        </svg>
    );
};

export const PushVsPullWagonProblem: React.FC = () => {
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <WagonDiagram />
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">Problem</h3>
                    <p className="text-slate-300">A person applies a force <Formula inline>P</Formula> to a wagon at an angle. First, they push it (angle below horizontal). Then, they pull it (angle above horizontal). Prove mathematically why the force of friction is less when pulling.</p>
                </div>

                {!isRevealed && (
                    <button onClick={() => setIsRevealed(true)} className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors">
                        Reveal the Proof
                    </button>
                )}

                {isRevealed && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Solution Breakdown</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300">
                            <p><strong>Principle:</strong> The force of friction is directly proportional to the normal force (<Formula inline>F_f = μN</Formula>). The normal force is not always equal to the weight; it is the force required to balance all other vertical forces.</p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li><strong>Case 1: PUSHING</strong><br/>
                                The vertical component of the push, <Formula inline>P_y = P \sin\theta</Formula>, acts **downward**, adding to the weight. To keep the wagon from falling through the floor, the normal force must increase.<br/>
                                <Formula inline>ΣF_y = N_push - W - P_y = 0</Formula><br/>
                                <Formula inline>N_push = W + P \sin\theta</Formula><br/>
                                Friction is: <Formula inline>F_f,push = μ(W + P \sin\theta)</Formula></li>
                                <li><strong>Case 2: PULLING</strong><br/>
                                The vertical component of the pull, <Formula inline>P_y = P \sin\theta</Formula>, acts **upward**, partially lifting the wagon. The ground doesn't need to push up as hard.<br/>
                                <Formula inline>ΣF_y = N_pull - W + P_y = 0</Formula><br/>
                                <Formula inline>N_pull = W - P \sin\theta</Formula><br/>
                                Friction is: <Formula inline>F_f,pull = μ(W - P \sin\theta)</Formula></li>
                            </ol>
                            <p className="font-bold text-lg text-green-400">Conclusion: Since <Formula inline>(W + P \sin\theta)</Formula> {'>'} <Formula inline>(W - P \sin\theta)</Formula>, it is proven that <Formula inline>F_f,push</Formula> {'>'} <Formula inline>F_f,pull</Formula>. Pushing increases the normal force, which increases friction. Pulling reduces it.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};