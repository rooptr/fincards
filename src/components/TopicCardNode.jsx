import { Handle, Position } from '@xyflow/react';

// Central topic card — Apple style, minimal
export default function TopicCardNode({ data, isConnectable }) {
  return (
    <div className="w-[340px] bg-white dark:bg-[#1c1c1e] rounded-[24px] border border-black/5 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.10)] overflow-hidden font-sans select-none">
      <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} style={{ opacity: 0 }} />
      
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-black/5 dark:border-white/5">
        <p className="text-[11px] font-semibold tracking-widest text-[#0066cc] dark:text-[#2997ff] uppercase mb-1.5">
          {data.importance}
        </p>
        <h3 className="text-[20px] font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] leading-tight">
          {data.title}
        </h3>
      </div>

      {/* Body */}
      <div className="px-6 py-4">
        <p className="text-[13px] leading-relaxed text-[#3a3a3c] dark:text-[#ebebf5] font-[450]">
          {data.studyContext}
        </p>
        {data.keyTakeaway && (
          <div className="mt-4 bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-[12px] px-4 py-3">
            <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider mb-1">Key Takeaway</p>
            <p className="text-[12px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">{data.keyTakeaway}</p>
          </div>
        )}
      </div>

      {/* Line Interchange Ticks */}
      {data.lines && data.lines.length > 1 && (
        <div className="px-6 pb-3 flex items-center gap-2">
          <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider">Tracks:</span>
          <div className="flex gap-1.5">
            {data.lines.map(lineId => {
              const lineInfo = data.getLineInfo(lineId);
              if (!lineInfo) return null;
              const isActive = data.activeLineId === lineId;
              return (
                <button
                  key={lineId}
                  onClick={(e) => {
                    e.stopPropagation();
                    data.onSwapLine(lineId);
                  }}
                  style={{ backgroundColor: lineInfo.color }}
                  className={`w-3.5 h-3.5 rounded-full border border-black/10 transition-all ${
                    isActive ? 'ring-2 ring-offset-2 ring-[#0066cc] dark:ring-[#2997ff] scale-110' : 'opacity-40 hover:opacity-90'
                  }`}
                  title={lineInfo.name}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 pb-5">
        <button
          onClick={() => data.onStudyNow(data)}
          className="w-full py-2.5 rounded-[12px] bg-[#0066cc] dark:bg-[#2997ff] text-white text-[13px] font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
        >
          Study Flashcards
        </button>
      </div>
    </div>
  );
}
