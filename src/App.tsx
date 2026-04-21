/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  CheckCircle2, 
  Info,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { lessonSteps, LessonStep } from './lessonData';

// --- Types ---
interface VoiceState {
  isSpeaking: boolean;
  progress: number;
}

// --- App Component ---
export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const synth = window.speechSynthesis;

  const currentStep = lessonSteps[currentIndex];

  // --- Voice Setup ---
  const stopSpeech = useCallback(() => {
    synth.cancel();
    setIsSpeaking(false);
  }, [synth]);

  const speak = useCallback((text: string) => {
    stopSpeech();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    const setVoice = () => {
      const voices = synth.getVoices();
      const gbVoice = voices.find(v => v.lang.includes('en-GB') && v.name.toLowerCase().includes('female')) || 
                      voices.find(v => v.lang.includes('en-GB')) ||
                      voices.find(v => v.lang.includes('en')) ||
                      voices[0];
      
      if (gbVoice) {
        utterance.voice = gbVoice;
      }
    };

    setVoice();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = setVoice;
    }
    
    // Apply "Voice Profile" settings
    utterance.pitch = 1.05; // Bright and resonant
    utterance.rate = 0.9;   // Instructional pacing
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      // If autoPlayNext is true and not a quiz, move to next after a pause
      if (currentStep.autoPlayNext && isPlaying) {
        setTimeout(() => {
          if (currentIndex < lessonSteps.length - 1) {
            setCurrentIndex(prev => prev + 1);
          }
        }, 1500);
      }
    };

    speechRef.current = utterance;
    synth.speak(utterance);
  }, [currentIndex, currentStep.autoPlayNext, stopSpeech, synth, isPlaying]);

  // --- Effects ---
  useEffect(() => {
    if (isPlaying) {
      speak(currentStep.text);
    } else {
      stopSpeech();
    }
  }, [currentIndex, isPlaying, speak, stopSpeech]);

  // --- Handlers ---
  const handleNext = () => {
    if (currentIndex < lessonSteps.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowExplanation(true);
    if (option === currentStep.correctAnswer) {
      // Maybe play a success chime?
    }
  };

  const restartLesson = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
    setSelectedOption(null);
    setShowExplanation(false);
    stopSpeech();
  };

  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex flex-col font-sans border-t-4 border-blue-600 overflow-hidden shadow-2xl relative">
      {/* Header Navigation */}
      <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <GraduationCap size={20} strokeWidth={2.5} />
          </div>
          <span className="font-bold tracking-tight text-slate-800 italic uppercase tracking-widest">
            Brooks <span className="text-blue-600 underline underline-offset-4 not-italic">Language</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
            BL
          </div>
        </div>
      </nav>

      <div className="flex-grow flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-50 border-r border-slate-200 p-6 flex flex-col gap-8 flex-shrink-0">
          <div>
            <ul className="space-y-4">
              {[
                { name: 'Introduction', index: 0 },
                { name: 'Grammar Contrast', index: 10 },
                { name: 'Practical Exercise', index: 25 },
                { name: 'Summary Review', index: 32 }
              ].map((item, idx) => {
                const isActive = (currentIndex < 10 && item.name === 'Introduction') || 
                               (currentIndex >= 10 && currentIndex < 25 && item.name === 'Grammar Contrast') ||
                               (currentIndex >= 25 && currentIndex < 32 && item.name === 'Practical Exercise') ||
                               (currentIndex >= 32 && item.name === 'Summary Review');
                return (
                  <li key={idx}>
                    <button 
                      onClick={() => {
                        setCurrentIndex(item.index);
                        setSelectedOption(null);
                        setShowExplanation(false);
                      }}
                      className={`sidebar-item w-full text-left ${isActive ? 'active' : 'inactive'}`}
                    >
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? 'bg-blue-600 shadow-sm shadow-blue-300' : 'bg-slate-300'}`} />
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-auto bg-blue-50 p-4 rounded-xl border border-blue-100">
            <h4 className="text-xs font-bold text-blue-800 uppercase mb-2">Educator Note</h4>
            <p className="text-[13px] text-blue-700 leading-relaxed italic">
              "You speak very clearly, and you are continuing to improve."
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-grow p-10 overflow-auto bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em]">Lesson Focus</span>
                <h1 className="text-4xl font-bold text-slate-900 mt-1">Present Perfect Distinctions</h1>
              </div>
              <button 
                onClick={restartLesson}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                title="Restart"
              >
                <RotateCcw size={20} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Content Card */}
                <div className={`${currentStep.type === 'quiz' ? 'interactive-card' : 'lesson-card p-10'}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${currentStep.type === 'quiz' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {currentStep.type}
                    </span>
                    {isSpeaking && (
                      <div className="flex items-center gap-0.5 ml-2">
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 rounded-full bg-blue-500"
                            animate={{ height: [8, 16, 8] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <h2 className={`text-2xl md:text-3xl font-bold leading-tight mb-8 ${currentStep.type === 'quiz' ? 'text-white' : 'text-slate-900'}`}>
                    {currentStep.text}
                  </h2>

                  {currentStep.secondaryText && (
                    <div className={`p-4 rounded-xl border mb-6 font-mono text-sm ${currentStep.type === 'quiz' ? 'bg-white/10 border-white/10 text-blue-200' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
                      <div className="flex items-center gap-2 mb-2 text-[10px] font-bold uppercase tracking-widest opacity-60">
                        <Info size={14} /> Structure Note
                      </div>
                      {currentStep.secondaryText}
                    </div>
                  )}

                  {/* Quiz Options */}
                  {currentStep.type === 'quiz' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                      {currentStep.options?.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(option)}
                          disabled={showExplanation}
                          className={`
                            border p-5 rounded-xl text-left transition-all group
                            ${selectedOption === option 
                              ? (option === currentStep.correctAnswer ? 'bg-blue-600 border-blue-400' : 'bg-red-900 border-red-700')
                              : 'border-slate-700 hover:bg-slate-800'}
                          `}
                        >
                          <span className="text-[10px] text-blue-400 font-bold uppercase mb-1 block">Option {idx + 1}</span>
                          <p className="text-sm font-medium">{option}</p>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {showExplanation && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-6 p-4 rounded-xl text-sm leading-relaxed ${currentStep.type === 'quiz' ? 'bg-white/5 border border-white/10' : 'bg-blue-50 text-blue-800'}`}
                    >
                      <p className="font-bold mb-1 italic">Teacher's Insight:</p>
                      {currentStep.explanation}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Bottom Audio Bar */}
      <footer className="h-24 bg-white border-t border-slate-200 px-8 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4 w-1/3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-emerald-500 shadow-sm shadow-emerald-200' : 'bg-slate-300'}`} />
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold italic">Voice Monitor</span>
            </div>
          </div>
        </div>

        {/* Transport Controls */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-3 disabled:opacity-30 hover:bg-slate-50 rounded-full transition-colors text-slate-600 border border-slate-100"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-14 h-14 bg-slate-900 rounded-full text-white hover:bg-blue-600 transition-all flex items-center justify-center shadow-lg active:scale-95"
          >
            {isPlaying ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} className="ml-1" />}
          </button>

          <button 
            onClick={handleNext}
            disabled={currentIndex === lessonSteps.length - 1}
            className="p-3 disabled:opacity-30 hover:bg-slate-50 rounded-full transition-colors text-slate-600 border border-slate-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="w-1/3 flex justify-end items-center gap-6">
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-widest">Progress</span>
            <span className="text-xs font-bold text-slate-600">{currentIndex + 1} / {lessonSteps.length}</span>
          </div>
          <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / lessonSteps.length) * 100}%` }}
            />
          </div>
        </div>
      </footer>
      
      {/* Toast-like indicator for browser support */}
      {!('speechSynthesis' in window) && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm shadow-xl">
          Speech Synthesis not supported in this browser.
        </div>
      )}
    </div>
  );
}
