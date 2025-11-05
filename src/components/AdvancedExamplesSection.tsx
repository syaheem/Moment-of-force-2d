import React, { useState } from 'react';
import { Formula } from './Formula';
import { KeyConcepts } from './KeyConcepts';
import { SimpleBridgeTrussProblem } from './SimpleBridgeTrussProblem';
import { CraneArmProblem } from './CraneArmProblem';
import { AFrameStructureProblem } from './AFrameStructureProblem';
import { TriangularDistributedLoadProblem } from './TriangularDistributedLoadProblem';
import { RevolvingDoorProblem } from './RevolvingDoorProblem';

type ExampleId = 'truss' | 'crane' | 'a-frame' | 'load' | 'door-revolving';

const TABS: { id: ExampleId; title: string }[] = [
    { id: 'truss', title: 'The Simple Bridge Truss' },
    { id: 'crane', title: 'The Crane Arm' },
    { id: 'a-frame', title: 'The A-Frame Structure' },
    { id: 'load', title: 'The Triangular Load' },
    { id: 'door-revolving', title: 'The Revolving Door' },
];

export const AdvancedExamplesSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ExampleId>('truss');

    const TabButton: React.FC<{ id: ExampleId; title: string }> = ({ id, title }) => {
        const isActive = activeTab === id;
        return (
            <button
                onClick={() => setActiveTab(id)}
                className={`px-3 py-2 text-xs sm:text-sm font-bold rounded-md transition-colors whitespace-nowrap ${
                    isActive
                        ? 'bg-cyan-500 text-slate-900'
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
                <h2 className="text-3xl font-bold text-slate-100">Advanced Problems: Structures & Methods</h2>
                <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
                    Apply equilibrium principles to more complex structures and analysis methods.
                </p>
            </header>

            <div className="flex justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2" role="tablist" aria-label="Advanced Example Problems">
                {TABS.map(tab => (
                    <TabButton key={tab.id} id={tab.id} title={tab.title} />
                ))}
            </div>

            <div className="bg-slate-800/20 p-6 sm:p-8 rounded-xl border border-slate-700/50">
                {activeTab === 'truss' && <SimpleBridgeTrussProblem />}
                {activeTab === 'crane' && <CraneArmProblem />}
                {activeTab === 'a-frame' && <AFrameStructureProblem />}
                {activeTab === 'load' && <TriangularDistributedLoadProblem />}
                {activeTab === 'door-revolving' && <RevolvingDoorProblem />}
            </div>
        </section>
    );
};
