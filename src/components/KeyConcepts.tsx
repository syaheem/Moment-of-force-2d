import React from 'react';
import { Formula } from './Formula';

const concepts = [
    {
        term: 'Coefficient of Static Friction',
        symbol: 'μ_s',
        description: `Pronounced "mu sub s," this is a number that describes how "grippy" two surfaces are against each other when they are not moving. A high value means more grip (like rubber on pavement), while a low value means it's slippery (like socks on a wood floor). It's used to calculate the maximum possible friction force.`
    },
    {
        term: 'Static Equilibrium',
        symbol: 'ΣF=0, ΣM=0',
        description: `The state where an object is completely still—it is not moving and it is not rotating. This requires two conditions to be true: 1) The sum of all forces is zero, meaning all pushes and pulls cancel out. 2) The sum of all moments (torques) is zero, meaning all clockwise and counter-clockwise rotations are perfectly balanced.`
    },
    {
        term: 'Center of Gravity (CG)',
        symbol: null,
        description: `The single point on an object where its entire weight can be considered to act. For a uniform object like a ladder or refrigerator, this is usually its geometric center. This is crucial for calculating the moment created by the object's own weight.`
    },
    {
        term: 'Pivot Point',
        symbol: null,
        description: `The point around which an object is free to rotate. Examples include a door's hinge, a seesaw's fulcrum, or the wheel axle of a wheelbarrow. All moments are calculated relative to this point.`
    },
    {
        term: 'Tension (T)',
        symbol: null,
        description: `The pulling force transmitted through a cable, rope, or chain. This force always acts along the direction of the cable.`
    },
    {
        term: 'Frictionless Surface',
        symbol: null,
        description: `An idealization in physics where a surface is perfectly smooth and cannot provide any grip (friction). A frictionless wall can only push outwards, perpendicular to its surface (a "Normal Force").`
    }
];

export const KeyConcepts: React.FC = () => {
    return (
        <div className="mb-10 bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Key Concepts for These Problems</h3>
            <dl className="space-y-4">
                {concepts.map((concept, index) => (
                    <div key={index}>
                        <dt className="font-bold text-slate-100">
                            {concept.term}
                            {concept.symbol && <Formula inline>{concept.symbol}</Formula>}
                        </dt>
                        <dd className="text-slate-400 text-sm pl-4 border-l-2 border-slate-700 ml-2 mt-1">
                            {concept.description}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};
