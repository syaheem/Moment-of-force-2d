import React, { useState } from 'react';
import { Formula } from './Formula';

const LadderDiagram: React.FC = () => {
    // Constants for the diagram
    const angle_deg = 60;
    const angle_rad = angle_deg * Math.PI / 180;
    const L_pixels = 200; // Increased size for clarity
    const wall_x = 50;
    const ground_y = 220;

    const base = { x: wall_x + L_pixels * Math.cos(angle_rad), y: ground_y };
    const top = { x: wall_x, y: ground_y - L_pixels * Math.sin(angle_rad) };
    
    // Ladder's center for W_L
    const mid = {
        x: wall_x + (L_pixels / 2) * Math.cos(angle_rad),
        y: ground_y - (L_pixels / 2) * Math.sin(angle_rad)
    };
    
    // Person's position (illustrative, not the solution value)
    const person_frac = 0.7;
    const person_dist_pixels = L_pixels * person_frac;
    const person = {
        x: wall_x + (L_pixels - person_dist_pixels) * Math.cos(angle_rad),
        y: ground_y - person_dist_pixels * Math.sin(angle_rad)
    };

    return (
        <svg viewBox="0 0 250 250" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <style>{`.text-label { font-family: 'Roboto Mono', monospace; font-size: 10px; } .text-force { font-family: 'Inter', sans-serif; font-size: 9px; font-weight: bold; } .text-dim { font-family: 'Roboto Mono', monospace; font-size: 9px; }`}</style>
            <defs>
                <marker id="arrow-ladder" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker>
            </defs>
            
            {/* Wall and Ground */}
            <rect x="0" y="0" width={wall_x} height="250" fill="#475569" />
            <rect x="0" y={ground_y} width="250" height="50" fill="#475569" />
           
            {/* Moment Arms */}
            <g className="text-cyan-400" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 2">
                {/* Moment arm for NW */}
                <line x1={base.x} y1={base.y} x2={base.x} y2={top.y} />
                
                {/* Moment arm for WL */}
                <line x1={base.x} y1={mid.y} x2={mid.x} y2={mid.y} />

                {/* Moment arm for WP */}
                <line x1={base.x} y1={person.y} x2={person.x} y2={person.y} />
            </g>
            
            {/* Ladder */}
            <line x1={base.x} y1={base.y} x2={top.x} y2={top.y} stroke="#a16207" strokeWidth="6" />

            {/* Forces */}
            {/* NG (Normal Ground) */}
            <line x1={base.x} y1={base.y} x2={base.x} y2={base.y - 40} className="text-green-400" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-ladder)" />
            {/* Ff (Friction) */}
            <line x1={base.x} y1={base.y} x2={base.x - 40} y2={base.y} className="text-amber-400" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-ladder)" />
            {/* NW (Normal Wall) */}
            <line x1={top.x} y1={top.y} x2={top.x + 40} y2={top.y} className="text-green-400" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-ladder)" />
            {/* WL (Weight Ladder) */}
            <line x1={mid.x} y1={mid.y} x2={mid.x} y2={mid.y + 40} className="text-red-400" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-ladder)" />
            {/* WP (Weight Person) */}
            <line x1={person.x} y1={person.y} x2={person.x} y2={person.y + 40} className="text-red-400" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-ladder)" />

            {/* Angle Indicator */}
            <path d={`M ${base.x-10} ${base.y} A 20 20 0 0 0 ${base.x - 20*Math.cos(angle_rad)} ${base.y - 20*Math.sin(angle_rad)}`} fill="none" stroke="#a3a3a3" strokeWidth="1" />
            <circle cx={base.x} cy={base.y} r="3" fill="white" />
            
            {/* x distance marker */}
            <line x1={base.x} y1={base.y} x2={person.x} y2={person.y} stroke="white" strokeWidth="1.5" />
        </svg>
    );
};

export const LeaningLadderProblem: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const correctAnswer = 3.74;

    const handleCheckAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput) return;
        const userAnswer = parseFloat(userInput);
        const correct = Math.abs(userAnswer - correctAnswer) < 0.02;
        setIsSubmitted(true);
        setIsCorrect(correct);
    };

    const getInputColorClasses = () => {
        if (!isSubmitted) return "border-slate-600 focus:border-cyan-500 focus:ring-cyan-500";
        return isCorrect ? "border-green-500 ring-green-500" : "border-red-500 ring-red-500";
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <LadderDiagram />
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">Problem</h3>
                    <p className="text-slate-300">A 5.0m, 20kg uniform ladder leans against a frictionless wall at a 60° angle. The coefficient of static friction with the ground is <Formula inline>μ_s = 0.4</Formula>. A 70kg person climbs the ladder. How far up the ladder (distance <Formula inline>x</Formula> from the base) can they climb before it slips?</p>
                </div>

                <form onSubmit={handleCheckAnswer} className="space-y-4">
                    <div>
                        <label htmlFor="answer-input-ladder" className="block text-sm font-medium text-slate-300 mb-1">
                           Distance <Formula inline>x</Formula> (in meters):
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                id="answer-input-ladder" type="number" step="0.01" value={userInput}
                                onChange={e => { setUserInput(e.target.value); setIsSubmitted(false); }}
                                placeholder="e.g., 3.74"
                                className={`flex-grow bg-slate-800 border ${getInputColorClasses()} rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-1 sm:text-sm font-roboto-mono transition-colors`}
                            />
                            <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!userInput}>Check</button>
                        </div>
                    </div>
                    {isSubmitted && <div className={`text-sm font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>{isCorrect ? 'Correct! They are safe, for now.' : 'Not quite. The ladder slips! Review the solution.'}</div>}
                </form>

                {isSubmitted && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Solution Breakdown</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300">
                            <p><strong>Principle:</strong> At the point of slipping, the system is in static equilibrium. The sums of vertical forces, horizontal forces, and moments are all zero.</p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li><strong>Vertical Forces (<Formula inline>ΣF_y = 0</Formula>):</strong> The normal force from the ground (<Formula inline>N_G</Formula>) must support the weight of the ladder (<Formula inline>W_L</Formula>) and the person (<Formula inline>W_P</Formula>).<br/>
                                <Formula inline>W_L = 20kg \times 9.8m/s^2 = 196 N</Formula><br/>
                                <Formula inline>W_P = 70kg \times 9.8m/s^2 = 686 N</Formula><br/>
                                <Formula inline>N_G = W_L + W_P = 196 + 686 = 882 N</Formula></li>
                                <li><strong>Horizontal Forces (<Formula inline>ΣF_x = 0</Formula>):</strong> The static friction force (<Formula inline>F_f</Formula>) from the ground must balance the normal force from the wall (<Formula inline>N_W</Formula>). At the slipping point, friction is at its maximum.<br/>
                                <Formula inline>F_f = μ_s \times N_G = 0.4 \times 882 N = 352.8 N</Formula><br/>
                                <Formula inline>N_W = F_f = 352.8 N</Formula></li>
                                <li><strong>Moments (<Formula inline>ΣM = 0</Formula>):</strong> Sum moments about the base of the ladder to eliminate <Formula inline>N_G</Formula> and <Formula inline>F_f</Formula>. Counter-clockwise (CCW) is positive.<br/>
                                CCW Moment (from wall): <Formula inline>M_W = N_W \times (5 \sin 60°) = 1527.8 Nm</Formula><br/>
                                CW Moment (from ladder): <Formula inline>M_L = -W_L \times (2.5 \cos 60°) = -245 Nm</Formula><br/>
                                CW Moment (from person): <Formula inline>M_P = -W_P \times (x \cos 60°) = -343x Nm</Formula></li>
                                <li><strong>Solve for <Formula inline>x</Formula>:</strong><br/>
                                <Formula inline>1527.8 - 245 - 343x = 0</Formula><br/>
                                <Formula inline>1282.8 = 343x</Formula><br/>
                                <Formula inline>x = 1282.8 / 343 = 3.74 m</Formula></li>
                            </ol>
                            <p className="font-bold text-lg text-green-400">Answer: The person can climb 3.74 meters up the ladder before it slips.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
