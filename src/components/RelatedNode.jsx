import { Handle, Position } from '@xyflow/react';

// Small pill node for prereqs/leads-to/questions — Apple style
export default function RelatedNode({ data, isConnectable }) {
  return (
    <div
      onClick={() => data.isConcept && data.onMakeCenter && data.onMakeCenter(data.nodeId)}
      className={`
        w-[220px] bg-white dark:bg-[#1c1c1e] rounded-[14px] border border-black/8 dark:border-white/10
        shadow-[0_2px_12px_rgba(0,0,0,0.07)] px-4 py-3 font-sans select-none
        ${data.isConcept ? 'cursor-pointer hover:border-[#0066cc]/40 dark:hover:border-[#2997ff]/40 hover:shadow-[0_4px_16px_rgba(0,102,204,0.12)] active:scale-[0.98]' : 'cursor-default'}
        transition-all duration-200
      `}
    >
      <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} style={{ opacity: 0 }} />

      {data.nodeType && (
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#86868b] mb-1">
          {data.nodeType === 'prerequisite' ? '← Prereq' : data.nodeType === 'leadsTo' ? 'Leads to →' : '?'}
        </p>
      )}
      <p className="text-[13px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] leading-snug">
        {data.label}
      </p>
      {data.isConcept && (
        <div className="flex items-center justify-between mt-2">
          <p className="text-[11px] text-[#0066cc] dark:text-[#2997ff] font-medium">Explore →</p>
          {data.lines && data.lines.length > 1 && (
            <div className="flex gap-1">
              {data.lines.map(lineId => {
                const lineInfo = data.getLineInfo && data.getLineInfo(lineId);
                if (!lineInfo) return null;
                const isActive = data.activeLineId === lineId;
                return (
                  <div
                    key={lineId}
                    style={{ backgroundColor: lineInfo.color }}
                    className={`w-2.5 h-2.5 rounded-full border border-black/10 ${
                      isActive ? 'ring-1 ring-offset-1 ring-[#0066cc] dark:ring-[#2997ff]' : 'opacity-50'
                    }`}
                    title={lineInfo.name}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
