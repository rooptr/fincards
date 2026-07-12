import React from 'react';

/**
 * Renders structured diagram layouts based on the diagram_package type.
 * Ponytail style: minimal DOM flex/grid boxes instead of a massive Canvas/SVG library.
 */
export default function DiagramRenderer({ package: diagram, dynamicOutputs = {} }) {
  if (!diagram || Object.keys(diagram).length === 0) return null;

  const { type, elements, focus } = diagram;

  if (!type) return null;

  switch (type) {
    case 'timeline':
      return (
        <div className="flex justify-between items-center w-full px-4 py-8 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2" />
          {elements?.map((el, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-600 shadow ring-4 ring-white" />
              <span className="text-sm font-medium text-gray-700">{el.label || `Year ${i}`}</span>
            </div>
          ))}
        </div>
      );
      
    case 'capital_structure':
    case 'waterfall':
      return (
        <div className="flex flex-col items-center w-full max-w-sm mx-auto border border-gray-100 rounded-lg overflow-hidden shadow-sm">
          {elements?.map((el, i) => (
            <div 
              key={i} 
              className="w-full flex justify-between px-6 py-4 border-b border-gray-100 last:border-b-0"
              style={{ backgroundColor: el.color || (i === 0 ? '#f0fdf4' : i === 1 ? '#eff6ff' : '#fef2f2') }}
            >
              <span className="font-semibold text-gray-800">{el.label}</span>
              <span className="text-gray-600">{el.value}</span>
            </div>
          ))}
        </div>
      );

    case 'flow_chart':
      return (
        <div className="flex flex-col items-center w-full max-w-sm mx-auto p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">{diagram.title || 'Flow Chart'}</div>
          <div className="flex gap-4 mb-8">
            {diagram.nodes?.slice(0, 2).map((node, i) => (
              <div key={i} className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700">
                {node}
              </div>
            ))}
          </div>
          <div className="w-0.5 h-8 bg-blue-300 mb-2 relative">
            <div className="absolute -bottom-2 -left-1.5 w-3 h-3 border-b-2 border-r-2 border-blue-300 transform rotate-45" />
          </div>
          {diagram.nodes?.slice(2).map((node, i) => (
            <div key={i} className="px-6 py-3 bg-blue-50 border border-blue-100 rounded-xl shadow-sm text-base font-bold text-blue-800">
              {node}
            </div>
          ))}
        </div>
      );

    case 'equation_balance':
      return (
        <div className="flex w-full items-center justify-center gap-8 py-8 flex-wrap">
          {elements?.map((el, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 min-w-[140px]">
                <span className="text-2xl font-semibold text-gray-800">{el.value}</span>
                <span className="text-sm text-gray-500 mt-2">{el.label}</span>
              </div>
              {i < elements.length - 1 && <span className="text-2xl font-light text-gray-300">=</span>}
            </React.Fragment>
          ))}
        </div>
      );

    default:
      return (
        <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl text-center text-gray-500 text-sm">
          [Diagram: {type}]
        </div>
      );
  }
}
