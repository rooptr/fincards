import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import type { VocabWord } from './podcast-types';

const SF = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif';

interface VocabularySheetProps {
  visible: boolean;
  words: VocabWord[];
  onClose: () => void;
  onSeek?: (seconds: number) => void;
}

function VocabCard({ word, onSeek }: { word: VocabWord; onSeek?: (seconds: number) => void }) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: '16px 16px',
        marginBottom: 12,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {/* Word + timestamp row */}
      <div className="flex items-start justify-between" style={{ marginBottom: 4 }}>
        <div className="flex-1">
          <span
            style={{
              fontFamily: SF,
              fontSize: 18,
              fontWeight: 700,
              color: '#000000',
              letterSpacing: -0.2,
            }}
          >
            {word.word}
          </span>
          {word.pronunciation && (
            <span
              style={{
                fontFamily: SF,
                fontSize: 14,
                fontWeight: 400,
                color: '#8E8E93',
                marginLeft: 8,
              }}
            >
              /{word.pronunciation}/
            </span>
          )}
        </div>
        {word.timestamp && (
          <button
            onClick={() => word.timestampSeconds != null && onSeek?.(word.timestampSeconds)}
            style={{
              backgroundColor: '#F2F2F7',
              borderRadius: 8,
              padding: '3px 8px',
              flexShrink: 0,
              marginLeft: 8,
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <span
              style={{
                fontFamily: SF,
                fontSize: 12,
                fontWeight: 500,
                color: '#FF2D55',
              }}
            >
              {word.timestamp}
            </span>
          </button>
        )}
      </div>

      {/* Part of speech */}
      <div style={{ marginBottom: 6 }}>
        <span
          style={{
            fontFamily: SF,
            fontSize: 12,
            fontWeight: 500,
            color: '#8E8E93',
            fontStyle: 'italic',
          }}
        >
          {word.partOfSpeech}
        </span>
      </div>

      {/* Definition */}
      <p
        style={{
          fontFamily: SF,
          fontSize: 15,
          fontWeight: 400,
          color: '#1C1C1E',
          lineHeight: '22px',
          margin: 0,
        }}
      >
        {word.definition}
      </p>

      {/* Example */}
      {word.example && (
        <p
          style={{
            fontFamily: SF,
            fontSize: 14,
            fontWeight: 400,
            color: '#8E8E93',
            lineHeight: '20px',
            marginTop: 8,
            fontStyle: 'italic',
            margin: '8px 0 0',
          }}
        >
          "{word.example}"
        </p>
      )}
    </div>
  );
}

export function VocabularySheet({ visible, words, onClose, onSeek }: VocabularySheetProps) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 110,
            }}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              maxHeight: '85%',
              backgroundColor: '#F2F2F7',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              zIndex: 120,
              display: 'flex',
              flexDirection: 'column',
              fontFamily: SF,
            }}
          >
            {/* Handle */}
            <div className="flex justify-center" style={{ paddingTop: 10, paddingBottom: 4 }}>
              <div
                style={{
                  width: 36,
                  height: 5,
                  borderRadius: 3,
                  backgroundColor: '#D1D1D6',
                }}
              />
            </div>

            {/* Header */}
            <div
              className="flex items-center justify-between"
              style={{ padding: '8px 20px 12px' }}
            >
              <span
                style={{
                  fontFamily: SF,
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#000000',
                }}
              >
                Vocabulary
              </span>
              <button
                onClick={onClose}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: '#E5E5EA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <X size={16} color="#3C3C43" />
              </button>
            </div>

            {/* Word list */}
            <div
              style={{
                overflowY: 'auto',
                padding: '0 16px 40px',
                flex: 1,
                overscrollBehavior: 'contain',
              }}
            >
              {words.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center"
                  style={{ paddingTop: 60 }}
                >
                  <span
                    style={{
                      fontFamily: SF,
                      fontSize: 16,
                      color: '#8E8E93',
                      textAlign: 'center',
                    }}
                  >
                    No vocabulary for this lesson yet.
                  </span>
                </div>
              ) : (
                words.map((word, i) => (
                  <VocabCard key={`${word.word}-${i}`} word={word} onSeek={onSeek} />
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
