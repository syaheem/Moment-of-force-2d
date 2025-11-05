import React, { useState } from 'react';
import { Formula } from './Formula';

const StabilityDiagram: React.FC = () => {
    return (
        <svg viewBox="0 0 200 120" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <style>{`.text-label { font-family: 'Roboto Mono', monospace; font-size: 8px; }`}</style>
            
            {/* Box 1 (Tall) */}
            <g transform="translate(50, 100) rotate(-20)">
                <rect x="-20" y="-80" width="40" height="80" fill="#334155" stroke="#64748b" />
                <circle cx="0" cy="-40" r="2" fill="white" />
                <text x="0" y="-45" className="text-label" fill="white" textAnchor="middle">CG_tall</text>
            </g>
            <text x="50" y="115" className="text-label" textAnchor="middle">Tall Box</text>

            {/* Box 2 (Short) */}
             <g transform="translate(150, 100) rotate(-20)">
                <rect x="-20" y="-40" width="40" height="40" fill="#334155" stroke="#64748b" />
                <circle cx="0" cy="-20" r="2" fill="white" />
                <text x="0" y="-25" className="text-label" fill="white" textAnchor="middle">CG_short</text>
            </g>
            <text x="150" y="115" className="text-label" textAnchor="middle">Short Box</text>
        </svg>
    );
};

export const StabilityProofProblem: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <StabilityDiagram />
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">The Puzzle</h3>
                    <p className="text-slate-300">We intuitively know that an object with a lower center of gravity (CG) is more "stable." Your task: **Prove this using the principles of moments.**</p>
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-300">
                        Which statement correctly proves this?
                    </label>
                    <button onClick={() => setIsSubmitted(true)} className="w-full text-left p-3 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors">
                       The object with the lower CG must be tilted to a **larger angle** before its weight vector creates a tipping moment.
                    </button>
                     <button onClick={() => setIsSubmitted(true)} className="w-full text-left p-3 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors">
                       The object with the lower CG has less mass, so the force required to tip it is smaller.
                    </button>
                </div>

                {isSubmitted && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Explanation</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300">
                            <p><strong>Principle:</strong> "Stability" isn't about the force to tip, but the **angle of tilt** an object can withstand. An object tips when its center of gravity (CG) passes vertically over its pivot point.</p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li><strong>Restoring Moment:</strong> As you tilt an object, its own weight creates a "restoring moment" that tries to pull it back to a stable position. This moment exists as long as the CG has not passed the pivot point.</li>
                                <li><strong>The Critical Angle (<Formula inline>\theta_crit</Formula>):</strong> Tipping happens at the critical angle where the CG is directly above the pivot. We can find this angle with trigonometry. Let the box have width <Formula inline>w</Formula> and the CG height be <Formula inline>y_CG</Formula>.</li>
                                <li><strong>The Proof:</strong> The geometry shows that <Formula inline>tan(\theta_crit) = (w/2) / y_CG</Formula>.
                                    <ul className="list-disc pl-5 mt-2">
                                        <li>For a tall box, <Formula inline>y_CG</Formula> is large, making <Formula inline>tan(\theta_crit)</Formula> small. A small tan value means a small angle.</li>
                                        <li>For a short box, <Formula inline>y_CG</Formula> is small, making <Formula inline>tan(\theta_crit)</Formula> large. A large tan value means a large angle.</li>
                                    </ul>
                                </li>
                            </ol>
                            <p className="font-bold text-lg text-green-400">Conclusion: An object with a lower CG is more stable because it must be tilted to a significantly larger angle before it becomes unstable.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
