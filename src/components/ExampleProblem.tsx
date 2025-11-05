import React, { useState } from 'react';
import { Formula } from './Formula';

const SeesawDiagram: React.FC = () => {
    return (
        <svg viewBox="-125 -40 250 100" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <style>{`
                .text-label { font-family: 'Roboto Mono', monospace; font-size: 8px; }
                .text-force { font-family: 'Inter', sans-serif; font-size: 7px; font-weight: bold; }
            `}</style>
            
            <line x1="-70" y1="25.5" x2="70" y2="25.5" stroke="#475569" strokeWidth="1" />
            
            <rect x="-100" y="-2.5" width="200" height="5" rx="2" fill="#a16207" />

            <polygon points="0,0 10,25 -10,25" fill="#64748b" />
            <circle cx="0" cy="0" r="3" fill="black" />
            <text x="0" y="-5" textAnchor="middle" className="text-label" fill="#a3a3a3">Pivot</text>
            
            <g>
                <defs>
                    <marker id="arrow-red-seesaw" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                     <marker id="arrow-green-seesaw" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
                    </marker>
                    <marker id="tick-seesaw" viewBox="0 0 2 10" refX="1" refY="5" markerWidth="2" markerHeight="10">
                        <path d="M 1 0 V 10" stroke="currentColor" strokeWidth="1"/>
                    </marker>
                </defs>
                <line x1="-80" y1="2.5" x2="-80" y2="30" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-seesaw)" />
                <text x="-80" y="40" textAnchor="middle" fill="#ef4444" className="text-force">F₁ = 100 N</text>

                <line x1="0" y1="10" x2="-80" y2="10" stroke="#38bdf8" strokeWidth="1.5" markerStart="url(#tick-seesaw)" markerEnd="url(#tick-seesaw)" />
                <text x="-40" y="18" textAnchor="middle" fill="#38bdf8" className="text-label">d₁ = 2 m</text>
            </g>
            
            <g>
                <line x1="100" y1="2.5" x2="100" y2="25" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-green-seesaw)" />
                <text x="100" y="35" textAnchor="middle" fill="#22c55e" className="text-force">F₂ = 80 N</text>
                
                <line x1="0" y1="20" x2="100" y2="20" stroke="#f97316" strokeWidth="1.5" markerStart="url(#tick-seesaw)" markerEnd="url(#tick-seesaw)" />
                <text x="50" y="28" textAnchor="middle" fill="#f97316" className="text-label">d₂ = ?</text>
            </g>
        </svg>
    );
}

export const BalancedSeesawProblem: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const correctAnswer = 2.5;
    
    const handleCheckAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput) return;

        const userAnswer = parseFloat(userInput);
        const correct = Math.abs(userAnswer - correctAnswer) < 0.01;
        
        setIsSubmitted(true);
        setIsCorrect(correct);
    };
    
    const getInputColorClasses = () => {
        if (!isSubmitted) return "border-slate-600 focus:border-cyan-500 focus:ring-cyan-500";
        return isCorrect ? "border-green-500 ring-green-500" : "border-red-500 ring-red-500";
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <SeesawDiagram />
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">Problem</h3>
                    <p className="text-slate-300">A <strong>100 N</strong> child sits <strong>2 m</strong> from the pivot (fulcrum) of a seesaw. Where must a <strong>80 N</strong> child sit on the other side to perfectly balance the seesaw?</p>
                </div>

                 <form onSubmit={handleCheckAnswer} className="space-y-4">
                    <div>
                        <label htmlFor="answer-input-seesaw" className="block text-sm font-medium text-slate-300 mb-1">
                            Your Answer (in meters):
                        </label>
                        <div className="flex items-center gap-3">
                           <input 
                               id="answer-input-seesaw"
                               type="number"
                               step="0.01"
                               value={userInput}
                               onChange={e => {
                                   setUserInput(e.target.value);
                                   setIsSubmitted(false);
                               }}
                               placeholder="e.g., 2.5"
                               className={`flex-grow bg-slate-800 border ${getInputColorClasses()} rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-1 sm:text-sm font-roboto-mono transition-colors`}
                               aria-describedby="answer-feedback-seesaw"
                            />
                            <button 
                                type="submit"
                                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!userInput}
                            >
                                Check
                            </button>
                        </div>
                    </div>
                    {isSubmitted && (
                         <div id="answer-feedback-seesaw" className={`text-sm font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                            {isCorrect ? 'Correct! The seesaw is balanced.' : 'Not quite right. Review the principle of moments below.'}
                        </div>
                    )}
                </form>

                {isSubmitted && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                       <h3 className="font-bold text-lg text-slate-200">Solution Breakdown</h3>
                       <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300 prose-strong:text-slate-100 prose-headings:text-cyan-400">
                           <p><strong>Principle:</strong> For the seesaw to be in rotational equilibrium, the sum of clockwise moments (CW) must equal the sum of counter-clockwise moments (CCW). <Formula inline>ΣM_CW = ΣM_CCW</Formula></p>
                           <ol className="list-decimal pl-5 space-y-2">
                               <li>
                                   <strong>Calculate the Counter-Clockwise Moment (M_CCW):</strong>
                                   <br />
                                   The 100 N child creates this moment.
                                   <br />
                                   <Formula inline>M_CCW = F₁ × d₁ = 100 N × 2 m = 200 Nm</Formula>
                               </li>
                               <li>
                                   <strong>Set Up the Clockwise Moment (M_CW):</strong>
                                   <br />
                                   The 80 N child must create an equal and opposite moment.
                                   <br />
                                   <Formula inline>M_CW = F₂ × d₂ = 80 N × d₂</Formula>
                               </li>
                               <li>
                                   <strong>Equate and Solve for d₂:</strong>
                                   <br />
                                   Set the moments equal to each other:
                                   <br />
                                   <Formula inline>80 N × d₂ = 200 Nm</Formula>
                                   <br />
                                   <Formula inline>d₂ = 200 Nm / 80 N = 2.5 m</Formula>
                               </li>
                           </ol>
                           <p className="font-bold text-lg text-green-400">Answer: The 80 N child must sit 2.5 meters from the pivot.</p>
                       </div>
                    </div>
                )}
            </div>
        </div>
    );
};
