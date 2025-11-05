import React, { useState, useMemo } from 'react';

export const InteractiveDiagram: React.FC = () => {
    const [force, setForce] = useState(50); // Force in Newtons
    const [distance, setDistance] = useState(0.5); // Distance in meters

    const moment = useMemo(() => (force * distance).toFixed(1), [force, distance]);
    
    const maxDistance = 1;
    const wrenchLength = 200 * (distance / maxDistance) + 50;
    const forceArrowY = 125;
    const forceArrowX = 50 + wrenchLength;

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 md:p-6 shadow-2xl shadow-slate-900/50">
            <h3 className="text-xl font-bold text-center text-white mb-4">Moment Calculator</h3>
            
            <div className="w-full h-48 flex justify-center items-center mb-4 overflow-hidden">
                <svg viewBox="0 0 350 250" className="w-full h-full">
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                        </marker>
                         <marker id="arrow-dist" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                        </marker>
                    </defs>
                    
                    {/* Moment Arm (d) */}
                    <line x1="50" y1="160" x2={50 + wrenchLength} y2="160" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow-dist)" />
                    <text x={50 + wrenchLength / 2} y="180" fill="#06b6d4" textAnchor="middle" className="font-roboto-mono text-sm">d = {distance.toFixed(2)}m</text>
                    
                    {/* Wrench and Bolt */}
                    <g transform="translate(50, 125)">
                        {/* Bolt (Pivot) */}
                        <path d="M -15 0 L -8 -13 L 8 -13 L 15 0 L 8 13 L -8 13 Z" fill="#64748b" />
                        <circle cx="0" cy="0" r="6" fill="#475569" />
                        <text x="0" y="-20" fill="#a3a3a3" textAnchor="middle" fontSize="12">Pivot</text>
                        
                        {/* Wrench Handle */}
                        <rect x="15" y="-5" width={wrenchLength - 15} height="10" rx="5" fill="#94a3b8" />
                    </g>
                    
                    {/* Force Arrow (F) */}
                    <g transform={`translate(${forceArrowX}, ${forceArrowY})`}>
                        <line x1="0" y1="0" x2="0" y2={-force / 2} stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
                         <text x="10" y={-force / 4} fill="#f59e0b" className="font-roboto-mono text-sm">F = {force}N</text>
                    </g>
                </svg>
            </div>
            
            <div className="space-y-4">
                <div>
                    <label htmlFor="force-slider" className="flex justify-between font-medium text-sm text-slate-300 mb-1">
                        <span>Force (F)</span>
                        <span className="font-roboto-mono text-amber-400">{force} N</span>
                    </label>
                    <input 
                        id="force-slider"
                        type="range" 
                        min="10" 
                        max="100" 
                        step="1"
                        value={force} 
                        onChange={(e) => setForce(Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer range-thumb:bg-amber-500"
                    />
                </div>
                <div>
                    <label htmlFor="distance-slider" className="flex justify-between font-medium text-sm text-slate-300 mb-1">
                        <span>Distance (d)</span>
                        <span className="font-roboto-mono text-cyan-400">{distance.toFixed(2)} m</span>
                    </label>
                    <input 
                        id="distance-slider"
                        type="range" 
                        min="0.1" 
                        max={maxDistance}
                        step="0.05"
                        value={distance} 
                        onChange={(e) => setDistance(Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-700 text-center">
                <p className="text-sm text-slate-400">Calculated Moment (M = F × d)</p>
                <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-roboto-mono">
                    {moment} Nm
                </p>
            </div>
        </div>
    );
};
