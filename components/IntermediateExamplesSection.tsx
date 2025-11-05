import React, { useState } from 'react';
import { Formula } from './Formula';
import { LeaningLadderProblem } from './LeaningLadderProblem';
import { TippingRefrigeratorProblem } from './TippingRefrigeratorProblem';
import { HangingSignProblem } from './HangingSignProblem';
import { KeyConcepts } from './KeyConcepts';
import { CantileveredBalconyProblem } from './CantileveredBalconyProblem';
import { PushVsPullWagonProblem } from './PushVsPullWagonProblem';

type ExampleId = 'ladder' | 'refrigerator' | 'sign' | 'balcony' | 'wagon';

const TABS: { id: ExampleId; title: string }[] = [
    { id: 'ladder', title: 'The Leaning Ladder' },
    { id: 'refrigerator', title: 'The Tipping Refrigerator' },
    { id: 'sign', title: 'The Hanging Sign' },
    { id: 'balcony', title: 'The Cantilevered Balcony' },
    { id: 'wagon', title: 'The Push vs. Pull Wagon' },
];

export const IntermediateExamplesSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ExampleId>('ladder');

    const TabButton: React.FC<{ id: ExampleId; title: string }> = ({ id, title }) => {
        const isActive = activeTab === id;
        return (
            <button
                onClick={() => setActiveTab(id)}
                className={`px-3 py-2 text-xs sm:text-sm font-bold rounded-md transition-colors whitespace-nowrap ${
                    isActive
                        ? 'bg-teal-500 text-slate-900'
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
                <h2 className="text-3xl font-bold text-slate-100">Intermediate Problems: Static Equilibrium</h2>
                <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
                    These problems require balancing both forces (<Formula inline>ΣF=0</Formula>) and moments (<Formula inline>ΣM=0</Formula>).
                </p>
            </header>

            <KeyConcepts />

            <div className="flex justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2" role="tablist" aria-label="Intermediate Example Problems">
                {TABS.map(tab => (
                    <TabButton key={tab.id} id={tab.id} title={tab.title} />
                ))}
            </div>

            <div className="bg-slate-800/20 p-6 sm:p-8 rounded-xl border border-slate-700/50">
                {activeTab === 'ladder' && <LeaningLadderProblem />}
                {activeTab === 'refrigerator' && <TippingRefrigeratorProblem />}
                {activeTab === 'sign' && <HangingSignProblem />}
                {activeTab === 'balcony' && <CantileveredBalconyProblem />}
                {activeTab === 'wagon' && <PushVsPullWagonProblem />}
            </div>
        </section>
    );
};