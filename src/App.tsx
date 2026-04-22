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
  GraduationCap,
  Menu,
  X
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
  const [userAnswers, setUserAnswers] = useState<Record<string, { selected: string, isCorrect: boolean }>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
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
    
    // Track answer
    setUserAnswers(prev => ({
      ...prev,
      [currentStep.id]: {
        selected: option,
        isCorrect: option === currentStep.correctAnswer
      }
    }));
  };

  const restartLesson = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
    setSelectedOption(null);
    setShowExplanation(false);
    setUserAnswers({});
    stopSpeech();
  };

  const restartQuiz = () => {
    const q1Index = lessonSteps.findIndex(s => s.id === 'q1');
    if (q1Index !== -1) {
      setCurrentIndex(q1Index);
    } else {
      setCurrentIndex(0);
    }
    setIsPlaying(false);
    setSelectedOption(null);
    setShowExplanation(false);
    setUserAnswers({});
    stopSpeech();
  };

  const getQuizResults = () => {
    const quizSteps = lessonSteps.filter(s => s.type === 'quiz');
    const total = quizSteps.length;
    const answeredCount = Object.keys(userAnswers).length;
    const correctCount = Object.values(userAnswers).filter(a => (a as { isCorrect: boolean }).isCorrect).length;
    const missed = quizSteps.filter(s => !userAnswers[s.id]).map(s => s.text.split('.')[0]); // Extract number

    return { total, answeredCount, correctCount, missed };
  };

  return (
    <div className="bg-slate-50 text-slate-900 h-screen flex flex-col font-sans border-t-4 border-blue-600 overflow-hidden shadow-2xl relative">
      {/* Header Navigation */}
      <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 flex-shrink-0 z-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 md:hidden hover:bg-slate-50 rounded-lg text-slate-600"
            aria-label="Toggle Menu"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <GraduationCap size={20} strokeWidth={2.5} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-logo font-black text-red-600 uppercase tracking-tighter text-[1.15rem] leading-none translate-y-[3px]">Brooks</span>
            <span className="font-bold text-blue-600 uppercase tracking-widest text-sm underline underline-offset-[5px] decoration-2 leading-none">Language</span>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden sm:block text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Student Portal</span>
          </div>
          <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
            BL
          </div>
        </div>
      </nav>

      <div className="flex-grow flex overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-40 md:hidden mt-16"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className={`
          fixed md:relative inset-y-0 left-0 w-64 bg-slate-50 border-r border-slate-200 p-6 flex flex-col gap-8 flex-shrink-0 z-40 transition-transform duration-300 md:translate-x-0 mt-16 md:mt-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div>
            <ul className="space-y-4">
              {[
                { name: 'Introduction', index: 0 },
                { name: 'Grammar Contrast', index: 9 },
                { name: 'Practical Exercise', index: 24 },
                { name: 'Summary Review', index: 36 }
              ].map((item, idx) => {
                const isActive = (currentIndex < 9 && item.name === 'Introduction') || 
                               (currentIndex >= 9 && currentIndex < 24 && item.name === 'Grammar Contrast') ||
                               (currentIndex >= 24 && currentIndex < 36 && item.name === 'Practical Exercise') ||
                               (currentIndex >= 36 && item.name === 'Summary Review');
                return (
                  <li key={idx}>
                    <button 
                      onClick={() => {
                        setCurrentIndex(item.index);
                        setSelectedOption(null);
                        setShowExplanation(false);
                        setIsSidebarOpen(false);
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

          <div className="mt-auto bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col">
            <h4 className="text-xs font-bold text-blue-800 uppercase mb-2">Educator Note</h4>
            <p className="text-[13px] text-blue-700 leading-relaxed italic">
              "{currentStep.educatorNote || "Consistency is the key to mastering English details. Keep practicing and you will get there!"}"
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-grow p-4 md:p-10 overflow-auto bg-white">
          <div className="max-w-4xl mx-auto py-4">
            {currentStep.id === 'results-screen' ? (
              <div className="space-y-8">
                <div className="mb-10 flex items-center justify-between">
                  <div>
                    <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em]">Lesson Completed</span>
                    <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-1 uppercase">Quiz Results</h1>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <CheckCircle2 size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest leading-none">Summary</span>
                  </div>
                </div>

                {(() => {
                  const { total, answeredCount, correctCount, missed } = getQuizResults();
                  const allFinished = answeredCount === total;
                  
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-900 p-6 sm:p-10 rounded-3xl text-white shadow-xl flex flex-col justify-between">
                        <div>
                          <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-4">Your Score</p>
                          <div className="text-7xl font-logo font-black mb-2">
                            {correctCount}<span className="text-white/30 truncate">/{total}</span>
                          </div>
                          <p className="text-white/60 text-sm">
                            You answered {answeredCount} out of {total} questions.
                          </p>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/10">
                          <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">Feedback</p>
                          <p className="text-lg font-medium leading-relaxed">
                            {answeredCount === 0 ? "Don't forget to try the questions! Practice is the best way to master these details." :
                             correctCount === total ? "Perfect! You have a strong command of Upper-intermediate tenses." :
                             correctCount >= total * 0.7 ? "Great job! You've mastered the main details of these tenses." :
                             correctCount >= total * 0.4 ? "Good effort, reviewing the process vs result slides may help you understand better." :
                             "Don't worry, these tenses are tricky. Practice makes perfect!"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {!allFinished && (
                          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl">
                            <h5 className="text-red-900 font-bold text-sm mb-2 flex items-center gap-2">
                              <Info size={16} /> Attention
                            </h5>
                            <p className="text-red-700 text-sm leading-relaxed">
                              You missed or skipped {total - answeredCount} question{total - answeredCount > 1 ? 's' : ''}.
                              {missed.length > 0 && ` Specifically questions: ${missed.join(', ')}.`}
                            </p>
                          </div>
                        )}
                        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
                          <h5 className="text-blue-900 font-bold text-sm mb-2 flex items-center gap-2">
                            <GraduationCap size={16} /> Progress
                          </h5>
                          <p className="text-blue-700 text-sm leading-relaxed">
                            Completing this lesson moves you closer to Advanced level. Take your time to review any tricky questions.
                          </p>
                        </div>
                        <button 
                          onClick={restartQuiz}
                          className="w-full bg-white border border-slate-200 p-4 rounded-xl font-bold text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
                        >
                          <RotateCcw size={18} /> Restart Practice
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <>
                <div className="mb-10 flex items-center justify-between">
                  <div>
                    <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em]">Lesson Focus</span>
                    <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-1">Present Perfect Distinctions</h1>
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
                <div className={`${currentStep.type === 'quiz' ? 'interactive-card' : 'lesson-card p-6 sm:p-10'}`}>
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
          </>
        )}
      </div>
    </main>
      </div>

      {/* Bottom Audio Bar */}
      <footer className="h-24 bg-white border-t border-slate-200 px-4 md:px-8 flex items-center justify-between flex-shrink-0 gap-4">
        <div className="flex items-center gap-4 w-1/4 md:w-1/3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mt-1 invisible sm:visible">
              <span className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-emerald-500 shadow-sm shadow-emerald-200' : 'bg-slate-300'}`} />
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold italic">Voice</span>
            </div>
          </div>
        </div>

        {/* Transport Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2 md:p-3 disabled:opacity-30 hover:bg-slate-50 rounded-full transition-colors text-slate-600 border border-slate-100"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-12 h-12 md:w-14 md:h-14 bg-slate-900 rounded-full text-white hover:bg-blue-600 transition-all flex items-center justify-center shadow-lg active:scale-95"
          >
            {isPlaying ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} className="ml-1" />}
          </button>

          <button 
            onClick={handleNext}
            disabled={currentIndex === lessonSteps.length - 1}
            className="p-2 md:p-3 disabled:opacity-30 hover:bg-slate-50 rounded-full transition-colors text-slate-600 border border-slate-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="w-1/4 md:w-1/3 flex justify-end items-center gap-2 md:gap-6">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-widest">Page</span>
            <span className="text-xs font-bold text-slate-600">{currentIndex + 1} / {lessonSteps.length}</span>
          </div>
          <div className="w-12 md:w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
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
