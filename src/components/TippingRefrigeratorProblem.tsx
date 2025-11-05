import React, { useState } from 'react';
import { Formula } from './Formula';

const RefrigeratorDiagram: React.FC = () => {
    return (
        <svg viewBox="-20 -100 120 120" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <style>{`.text-label { font-family: 'Roboto Mono', monospace; font-size: 8px; } .text-force { font-family: 'Inter', sans-serif; font-size: 7px; font-weight: bold; }`}</style>
            <defs><marker id="arrow-fridge" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker></defs>
            
            {/* Refrigerator Body */}
            <rect x="0" y="-90" width="80" height="100" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
           
            {/* Forces */}
            {/* P (Push) */}
            <line x1="-15" y1="-70" x2="0" y2="-70" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-fridge)" />
            {/* W (Weight) */}
            <line x1="40" y1="-40" x2="40" y2="-10" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-fridge)" />
            {/* N (Normal) */}
            <line x1="40" y1="10" x2="40" y2="0" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-fridge)" />
            {/* Ff (Friction) */}
            <line x1="80" y1="10" x2="50" y2="10" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-fridge)" />
            
            {/* Dimensions and Labels */}
            <line x1="-5" y1="10" x2="-5" y2="-70" stroke="#a3a3a3" strokeWidth="0.5" />
            <circle cx="80" cy="10" r="2" fill="red" />
            <circle cx="40" cy="-40" r="2" fill="#475569" />
        </svg>
    );
};

export const TippingRefrigeratorProblem: React.FC = () => {
    const [userChoice, setUserChoice] = useState<'slide' | 'tip' | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const correctAnswer = 'slide';

    const handleChoice = (choice: 'slide' | 'tip') => {
        setUserChoice(choice);
        setIsSubmitted(true);
    };
    
    const isCorrect = userChoice === correctAnswer;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <RefrigeratorDiagram />
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">Problem</h3>
                    <p className="text-slate-300">A 1.5m tall, 0.8m wide refrigerator (W=500N) has its center of gravity at its geometric center. It rests on a floor with <Formula inline>μ_s = 0.3</Formula>. You push horizontally with force <Formula inline>P</Formula> at a height <Formula inline>h = 1.2m</Formula>. Which happens first: does it slide or does it tip?</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                           Your Prediction:
                        </label>
                        <div className="flex items-center gap-3">
                            <button onClick={() => handleChoice('slide')} className={`w-full font-bold py-2 px-5 rounded-md transition-colors ${userChoice === 'slide' ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : 'bg-slate-700 hover:bg-slate-600'} text-white`}>It will slide first</button>
                            <button onClick={() => handleChoice('tip')} className={`w-full font-bold py-2 px-5 rounded-md transition-colors ${userChoice === 'tip' ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : 'bg-slate-700 hover:bg-slate-600'} text-white`}>It will tip first</button>
                        </div>
                    </div>
                    {isSubmitted && <div className={`text-sm font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>{isCorrect ? `Correct! It slides.` : `Incorrect. It doesn't tip.`}</div>}
                </div>

                {isSubmitted && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Solution Breakdown</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300">
                            <p><strong>Principle:</strong> We calculate the force <Formula inline>P</Formula> needed to cause sliding (<Formula inline>P_slide</Formula>) and the force needed to cause tipping (<Formula inline>P_tip</Formula>). The action that requires less force will happen first.</p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li><strong>Case 1: Sliding Force (<Formula inline>P_slide</Formula>)</strong><br/>
                                To slide, the push force <Formula inline>P</Formula> must overcome the maximum static friction <Formula inline>F_f</Formula>.<br/>
                                Vertical forces: <Formula inline>N = W = 500 N</Formula><br/>
                                Max friction: <Formula inline>F_f = μ_s \times N = 0.3 \times 500 N = 150 N</Formula><br/>
                                <Formula inline>P_slide = F_f = 150 N</Formula></li>
                                <li><strong>Case 2: Tipping Force (<Formula inline>P_tip</Formula>)</strong><br/>
                                To tip, the moment from the push must overcome the stabilizing moment from the weight, pivoting around the front corner 'O'.<br/>
                                {/* FIX: Corrected 'P' to 'P_tip' for consistency. */}
                                Tipping moment (CCW): <Formula inline>M_P = P_tip \times h = P_tip \times 1.2 m</Formula><br/>
                                Stabilizing moment (CW): <Formula inline>M_W = -W \times (width/2) = -500 N \times 0.4 m = -200 Nm</Formula><br/>
                                {/* FIX: Corrected 'P' to 'P_tip' to maintain consistency within the tipping force calculation, which is the likely source of the confusing error message on this line. */}
                                At the tipping point, <Formula inline>ΣM_O = 0</Formula> so <Formula inline>P_tip \times 1.2 m - 200 Nm = 0</Formula><br/>
                                <Formula inline>P_tip = 200 / 1.2 = 166.7 N</Formula></li>
                                <li><strong>Conclusion</strong><br/>
                                Comparing the forces: <Formula inline>P_slide (150 N) &lt; P_tip (166.7 N)</Formula>.</li>
                            </ol>
                            <p className="font-bold text-lg text-green-400">Answer: Since less force is required to make it slide, the refrigerator will slide first.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
