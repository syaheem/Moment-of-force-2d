import React, { useState } from 'react';
import { Formula } from './Formula';

const AFrameDiagram: React.FC = () => {
    // Geometry based on 3-4-5 triangle
    const ground_y = 220;
    const top_y = 20;
    const center_x = 150;
    const base_half_width = 150; // 3m
    const height = 200; // 4m
    const leg_length = 250; // 5m

    const cable_y = ground_y - 50; // 1m from ground
    const cable_x_offset = base_half_width * ( (height - 50) / height );

    return (
        <svg viewBox="0 0 300 250" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <style>{`.text-label { font-family: 'Roboto Mono', monospace; font-size: 10px; } .text-force { font-family: 'Inter', sans-serif; font-size: 9px; font-weight: bold; }`}</style>
            <defs>
                <marker id="arrow-aframe" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker>
            </defs>

            {/* Left leg highlight for FBD */}
            <path d={`M ${center_x - base_half_width} ${ground_y} L ${center_x} ${top_y} L ${center_x - cable_x_offset} ${cable_y} Z`} fill="#334155" />

            {/* A-Frame Structure */}
            <g stroke="#a16207" strokeWidth="6">
                <line x1={center_x - base_half_width} y1={ground_y} x2={center_x} y2={top_y} />
                <line x1={center_x + base_half_width} y1={ground_y} x2={center_x} y2={top_y} />
            </g>

            {/* Cable */}
            <line x1={center_x - cable_x_offset} y1={cable_y} x2={center_x + cable_x_offset} y2={cable_y} stroke="#94a3b8" strokeWidth="3" />

            {/* Hinge and Supports */}
            <g fill="white" stroke="black" strokeWidth="1">
                <circle cx={center_x} cy={top_y} r="5" />
                <circle cx={center_x - base_half_width} cy={ground_y} r="4" />
                <circle cx={center_x + base_half_width} cy={ground_y} r="4" />
            </g>

            {/* Forces */}
            {/* Load */}
            <line x1={center_x} y1={top_y} x2={center_x} y2={top_y + 50} className="text-red-400" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-aframe)" />
            <text x={center_x + 5} y={top_y + 30} className="text-force text-red-400">1000 N</text>

            {/* Reactions */}
            <line x1={center_x - base_half_width} y1={ground_y} x2={center_x - base_half_width} y2={ground_y - 40} className="text-green-400" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-aframe)" />
            <text x={center_x - base_half_width - 5} y={ground_y - 20} className="text-force text-green-400" textAnchor="end">A_y</text>
            
            <line x1={center_x + base_half_width} y1={ground_y} x2={center_x + base_half_width} y2={ground_y - 40} className="text-green-400" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-aframe)" />
            <text x={center_x + base_half_width + 5} y={ground_y - 20} className="text-force text-green-400">B_y</text>

            {/* Tension */}
            <line x1={center_x - cable_x_offset} y1={cable_y} x2={center_x - cable_x_offset + 40} y2={cable_y} className="text-cyan-400" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow-aframe)" />
            <text x={center_x - cable_x_offset + 20} y={cable_y - 5} className="text-force text-cyan-400" textAnchor="middle">T</text>
        </svg>
    );
};


export const AFrameStructureProblem: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const correctAnswer = 500;

    const handleCheckAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput) return;
        const userAnswer = parseFloat(userInput);
        const correct = Math.abs(userAnswer - correctAnswer) < 1;
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
                <AFrameDiagram />
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">Problem</h3>
                    <p className="text-slate-300">A 4m tall A-frame is made of two 5m beams, hinged at the top. The base is 6m wide. A horizontal cable 1m from the ground ties the legs together. A <strong>1000 N</strong> load hangs from the top hinge. Find the tension <Formula inline>T</Formula> in the cable.</p>
                </div>

                <form onSubmit={handleCheckAnswer} className="space-y-4">
                    <div>
                        <label htmlFor="answer-input-aframe" className="block text-sm font-medium text-slate-300 mb-1">
                           Tension T (in Newtons):
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                id="answer-input-aframe" type="number" step="1" value={userInput}
                                onChange={e => { setUserInput(e.target.value); setIsSubmitted(false); }}
                                placeholder="e.g., 500"
                                className={`flex-grow bg-slate-800 border ${getInputColorClasses()} rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-1 sm:text-sm font-roboto-mono transition-colors`}
                            />
                            <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors disabled:opacity-50" disabled={!userInput}>Check</button>
                        </div>
                    </div>
                    {isSubmitted && <div className={`text-sm font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>{isCorrect ? 'Correct! The cable prevents the frame from splaying.' : 'Not quite. Try analyzing one leg by itself.'}</div>}
                </form>

                {isSubmitted && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Solution Breakdown</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300">
                            <p><strong>Principle:</strong> First, find the external ground reactions for the whole frame. Then, "explode" the frame and analyze the forces and moments on a single leg.</p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li><strong>Find Ground Reactions:</strong> The 1000 N load is centered, so by symmetry, the two vertical ground supports (<Formula inline>A_y, B_y</Formula>) each take half the load.<br/>
                                <Formula inline>A_y = B_y = 1000 N / 2 = 500 N</Formula></li>
                                <li><strong>Isolate One Leg:</strong> We'll create a Free Body Diagram (FBD) of the left leg. The forces acting on it are: the ground reaction <Formula inline>A_y</Formula> at the bottom, the cable tension <Formula inline>T</Formula> pulling to the right, and the forces from the other leg at the top hinge. The 1000N load is shared, so a 500N downward force acts at the hinge.</li>
                                <li><strong>Choose a Strategic Pivot:</strong> To find the unknown tension <Formula inline>T</Formula>, we can sum the moments about the top hinge. This eliminates the unknown forces acting at the hinge itself.</li>
                                <li><strong>Sum Moments about the Top Hinge (<Formula inline>ΣM_top = 0</Formula>):</strong><br/>
                                The ground reaction <Formula inline>A_y</Formula> is 3m horizontally from the hinge and creates a counter-clockwise (CCW, positive) moment.<br/>
                                {/* FIX: Removed curly braces from variable names in the comment to prevent potential parsing errors. */}
                                {/* FIX: Corrected `M_{Ay}` and `+Ay` to `M_A_y` and `+A_y` for consistency. */}
                                {/* FIX: Removed curly braces from the formula `M_{A_y}` which were causing it to be parsed as a JSX expression instead of a string. */}
                                <Formula inline>M_A_y = +A_y \times 3 m = +500 N \times 3 m = +1500 Nm</Formula><br/>
                                The tension <Formula inline>T</Formula> is 1m from the ground, meaning its vertical distance from the 4m high hinge is 3m. It creates a clockwise (CW, negative) moment.<br/>
                                <Formula inline>M_T = -T \times (4m - 1m) = -T \times 3 m</Formula></li>
                                <li><strong>Solve for <Formula inline>T</Formula>:</strong><br/>
                                <Formula inline>ΣM_top = 1500 Nm - 3T = 0</Formula><br/>
                                <Formula inline>3T = 1500 \Rightarrow T = 500 N</Formula></li>
                            </ol>
                            <p className="font-bold text-lg text-green-400">Answer: The tension in the cable is 500 N.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
