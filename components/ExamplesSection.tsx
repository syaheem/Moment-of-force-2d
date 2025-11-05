import React, { useState } from 'react';
import { BalancedSeesawProblem } from './ExampleProblem';
import { StubbornBoltProblem } from './StubbornBoltProblem';
import { OfficeDoorProblem } from './OfficeDoorProblem';
import { BookshelfBracketProblem } from './BookshelfBracketProblem';
import { GardenWheelbarrowProblem } from './GardenWheelbarrowProblem';

type ExampleId = 'seesaw' | 'bolt' | 'door' | 'bookshelf' | 'wheelbarrow';

const TABS: { id: ExampleId; title: string }[] = [
    { id: 'seesaw', title: 'The Balanced Seesaw' },
    { id: 'bolt', title: 'The Stubborn Bolt' },
    { id: 'door', title: 'The Office Door' },
    { id: 'bookshelf', title: 'The Bookshelf Bracket' },
    { id: 'wheelbarrow', title: 'The Garden Wheelbarrow' },
];

export const ExamplesSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ExampleId>('seesaw');

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
                <h2 className="text-3xl font-bold text-slate-100">Example Problems</h2>
                <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
                    Apply your knowledge to classic statics problems. Select an example to begin.
                </p>
            </header>

            <div className="flex justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2" role="tablist" aria-label="Example Problems">
                {TABS.map(tab => (
                    <TabButton key={tab.id} id={tab.id} title={tab.title} />
                ))}
            </div>

            <div className="bg-slate-800/20 p-6 sm:p-8 rounded-xl border border-slate-700/50">
                {activeTab === 'seesaw' && <BalancedSeesawProblem />}
                {activeTab === 'bolt' && <StubbornBoltProblem />}
                {activeTab === 'door' && <OfficeDoorProblem />}
                {activeTab === 'bookshelf' && <BookshelfBracketProblem />}
                {activeTab === 'wheelbarrow' && <GardenWheelbarrowProblem />}
            </div>
        </section>
    );
};
