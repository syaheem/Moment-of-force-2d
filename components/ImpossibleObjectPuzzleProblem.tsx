import React, { useState } from 'react';

const PuzzleDiagram: React.FC = () => {
    const v_shape = "M 50 80 L 100 0 L 150 80";
    return (
        <svg viewBox="0 0 200 100" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <style>{`.text-label { font-family: 'Roboto Mono', monospace; font-size: 8px; }`}</style>
             {/* Wide Window (Impossible) */}
            <g>
                <rect x="10" y="0" width="180" height="100" fill="#334155" />
                <rect x="20" y="10" width="160" height="80" fill="#1e293b" />
                <path d={v_shape} stroke="#f43f5e" strokeWidth="3" fill="none" />
                <text x="100" y="95" textAnchor="middle" className="text-label">1.6m wide: Can't fit</text>
            </g>
             {/* Narrow Window (Possible) */}
             <g transform="translate(110, 0)">
                <rect x="10" y="0" width="80" height="100" fill="#334155" />
                <rect x="10" y="10" width="40" height="80" fill="#1e293b" />
                <path d="M 50 80 L 75 40 L 100 80" stroke="#22c55e" strokeWidth="3" fill="none" transform="translate(-20, -30) rotate(15 50 80)" />
                 <text x="50" y="95" textAnchor="middle" className="text-label">0.8m wide: Can fit</text>
            </g>
        </svg>
    );
};

export const ImpossibleObjectPuzzleProblem: React.FC = () => {
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <PuzzleDiagram />
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-200">The Puzzle</h3>
                    <p className="text-slate-300">A rigid "V" shape is 1m long on each arm. It cannot pass through a 1.6m wide window. Yet, when one side of the window is closed, making the opening only 0.8m wide, it **can** pass through. How is this possible?</p>
                </div>

                {!isRevealed && (
                    <button onClick={() => setIsRevealed(true)} className="w-full bg-rose-500 hover:bg-rose-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors">
                        Reveal the Solution
                    </button>
                )}

                {isRevealed && (
                    <div className="pt-6 border-t border-slate-700/50 space-y-4 animate-fade-in">
                        <h3 className="font-bold text-lg text-slate-200">Explanation</h3>
                        <div className="space-y-3 prose prose-invert prose-sm max-w-none text-slate-300">
                            <p><strong>Principle:</strong> The "obstruction" (the closed part of the window) is not just a barrier; it's a tool. It provides a **new pivot point** that the object can use to rotate.</p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li><strong>Translation vs. Rotation:</strong> With the wide window, the object must pass by simple "translation" (sliding through). Its dimensions prevent this.</li>
                                <li><strong>Creating a New Pivot:</strong> With the narrow window, the object is inserted point-first. The inner corner of the "V" hooks onto the edge of the closed casement. This edge is now the pivot for the entire object.</li>
                                <li><strong>Changing Degrees of Freedom:</strong> By rotating around this new, external pivot point, the object can present a constantly changing, narrow profile to the 0.8m opening. It effectively "curves" its way through a space that is smaller than its largest dimension.</li>
                            </ol>
                            <p className="font-bold text-lg text-green-400">Answer: The object passes by rotating around the edge of the closed window, not by sliding straight through.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};