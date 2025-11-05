import React, { useState } from 'react';
import { Formula } from './Formula';
import { StabilityProofProblem } from './StabilityProofProblem';
import { CounterIntuitiveOverhangProblem } from './CounterIntuitiveOverhangProblem';
import { ImpossibleObjectPuzzleProblem } from './ImpossibleObjectPuzzleProblem';
import { UnstableTowerProblem } from './UnstableTowerProblem';
import { TippingBlockParadoxProblem } from './TippingBlockParadoxProblem';

type ExampleId = 'stability' | 'overhang' | 'puzzle' | 'tower' | 'paradox';

const TABS: { id: ExampleId; title: string }[] = [
    { id: 'stability', title: 'The Stability Proof' },
    { id: 'overhang', title: 'The Overhang Puzzle' },
    { id: 'puzzle', title: 'The Impossible "V"' },
    { id: 'tower', title: 'The Unstable Tower' },
    { id: 'paradox', title: 'The Tipping Paradox' },
];

export const IQProblemsSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ExampleId>('stability');

    const TabButton: React.FC<{ id: ExampleId; title: string }> = ({ id, title }) => {
        const isActive = activeTab === id;
        return (
            <button
                onClick={() => setActiveTab(id)}
                className={`px-3 py-2 text-xs sm:text-sm font-bold rounded-md transition-colors whitespace-nowrap ${
                    isActive
                        ? 'bg-rose-500 text-slate-900'
                        : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
                }`}
                aria-current={isActive}
                role="tab"
            >
                {title}
            </button>
        );
    };

    return (
        <section className="mt-16 md:mt-24 border-t border-slate-700 pt-12">
            <header className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-100">"1000 IQ" Conceptual Puzzles</h2>
                <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
                   These problems test your deep conceptual understanding of stability and moments. No calculators needed!
                </p>
            </header>

            <div className="flex justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2" role="tablist" aria-label="IQ Puzzle Problems">
                {TABS.map(tab => (
                    <TabButton key={tab.id} id={tab.id} title={tab.title} />
                ))}
            </div>

            <div className="bg-slate-800/20 p-6 sm:p-8 rounded-xl border border-slate-700/50">
                {activeTab === 'stability' && <StabilityProofProblem />}
                {activeTab === 'overhang' && <CounterIntuitiveOverhangProblem />}
                {activeTab === 'puzzle' && <ImpossibleObjectPuzzleProblem />}
                {activeTab === 'tower' && <UnstableTowerProblem />}
                {activeTab === 'paradox' && <TippingBlockParadoxProblem />}
            </div>
        </section>
    );
};