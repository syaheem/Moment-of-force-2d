import React, { useState } from 'react';
import { InteractiveDiagram } from './components/InteractiveDiagram';
import { Formula } from './components/Formula';
import { ChevronRightIcon } from './components/icons';
import { ExamplesSection } from './components/ExamplesSection';
import { AdvancedExamplesSection } from './components/AdvancedExamplesSection';
import { IQProblemsSection } from './components/IQProblemsSection';
import { IntermediateExamplesSection } from './components/IntermediateExamplesSection';

type ExampleLevel = 'none' | 'simple' | 'intermediate' | 'advanced' | 'iq';

const App: React.FC = () => {
  const [exampleLevel, setExampleLevel] = useState<ExampleLevel>('none');

  const SectionButton: React.FC<{
    level: ExampleLevel;
    currentLevel: ExampleLevel;
    onClick: (level: ExampleLevel) => void;
    children: React.ReactNode;
    className: string;
  }> = ({ level, currentLevel, onClick, children, className }) => {
    const isActive = level === currentLevel;
    return (
       <button 
          onClick={() => onClick(isActive ? 'none' : level)}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg transition-transform duration-200 hover:scale-105 ${className} ${isActive ? 'ring-2 ring-offset-2 ring-offset-slate-900' : ''}`}
        >
          {children}
          <ChevronRightIcon />
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 pb-2">
            Diving into the Dynamics of 2D Moments
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-400 mt-4">
            Unlock the principles of rotational force with this interactive guide.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
          <div className="lg:col-span-3 prose prose-invert prose-lg max-w-none text-slate-300 prose-headings:text-cyan-400 prose-strong:text-slate-100">
            <ContentSection title="What is a Moment?">
              <p>
                Imagine trying to loosen a stubborn bolt with a tiny wrench, or pushing open a massive, heavy door right next to the hinges. You're exerting force, but somehow, it just doesn't feel effective. Now, picture using a long wrench or pushing the door far from the hinges. Suddenly, that same amount of effort yields a much greater result! What changed? The concept that explains this difference is the <strong>Moment</strong>.
              </p>
              <p>
                In the simplest terms, a moment (often called <strong>torque</strong> in rotational contexts) is the measure of a force's tendency to cause an object to rotate about a specific point or axis. It's not just about how much force you apply, but also <strong>where</strong> you apply it.
              </p>
            </ContentSection>

            <ContentSection title="The Two Critical Ingredients: Force and Distance">
               <p>
                For a 2D system, the moment, <Formula inline>M</Formula>, is fundamentally determined by just two factors: The magnitude of the force (<Formula inline>F</Formula>) and the perpendicular distance (<Formula inline>d</Formula>) from the pivot point to the line of action of the force. This distance is often called the <strong>moment arm</strong>.
              </p>
              <Formula>M = F × d</Formula>
            </ContentSection>
            
            <ContentSection title="Why '2D'? And Why Does It Matter?">
                <p>When we talk about 2D moments, we simplify the problem by assuming all the forces and the object's movement are contained within a single flat plane (like a sheet of paper). This means the potential axis of rotation is always perpendicular to that plane.</p>
                <p>Understanding 2D moments is foundational because it:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Simplifies Complex Reality:</strong> Many real-world engineering problems—like analyzing a simple beam, a lever, or a hinge—can be accurately modeled using 2D mechanics.</li>
                    <li><strong>Is a Cornerstone of Statics:</strong> In statics, the principle that the sum of all moments must equal zero (<Formula inline>ΣM = 0</Formula>) is crucial for designing structures that won't twist or overturn.</li>
                </ul>
            </ContentSection>
          </div>

          <div className="lg:col-span-2">
             <div className="sticky top-8">
                <InteractiveDiagram />
             </div>
          </div>
        </div>
        
        <footer className="mt-16 md:mt-24 border-t border-slate-700 pt-8 text-center">
            <h3 className="text-2xl font-bold text-slate-100 mb-4">Ready to go deeper?</h3>
            <p className="text-slate-400 mb-6">Choose your next step in mastering 2D mechanics.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <SectionButton level="simple" currentLevel={exampleLevel} onClick={setExampleLevel} className="bg-slate-700 hover:bg-slate-600 text-slate-100 ring-slate-500">
                    Review Simple Examples
                </SectionButton>
                 <SectionButton level="intermediate" currentLevel={exampleLevel} onClick={setExampleLevel} className="bg-teal-600 hover:bg-teal-500 text-slate-100 ring-teal-400">
                    Solve Intermediate Problems
                </SectionButton>
                <SectionButton level="advanced" currentLevel={exampleLevel} onClick={setExampleLevel} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 ring-cyan-300">
                    Tackle Advanced Problems
                </SectionButton>
                 <SectionButton level="iq" currentLevel={exampleLevel} onClick={setExampleLevel} className="bg-rose-500 hover:bg-rose-400 text-slate-900 ring-rose-300">
                    Try "1000 IQ" Puzzles
                </SectionButton>
            </div>
        </footer>
        
        <div className="mt-8">
          {exampleLevel === 'simple' && <ExamplesSection />}
          {exampleLevel === 'intermediate' && <IntermediateExamplesSection />}
          {exampleLevel === 'advanced' && <AdvancedExamplesSection />}
          {exampleLevel === 'iq' && <IQProblemsSection />}
        </div>

      </main>
    </div>
  );
};

interface ContentSectionProps {
    title: string;
    children: React.ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, children }) => {
    return (
        <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <div className="space-y-4">{children}</div>
        </section>
    );
};


export default App;