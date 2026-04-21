/**
 * Interactive English Lesson Data
 * Based on the specialized en-GB-Studio-C voice profile.
 */

export interface LessonStep {
  id: string;
  type: 'narrative' | 'info' | 'example' | 'quiz' | 'pause';
  text: string;
  secondaryText?: string; // e.g. structural formulas
  highlight?: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  autoPlayNext?: boolean;
}

export const lessonSteps: LessonStep[] = [
  {
    id: 'intro',
    type: 'narrative',
    text: "Hello Gislaine. Today I want to help you feel more confident with a very common question in English: when do we use the present perfect simple, and when do we use the present perfect continuous?",
    autoPlayNext: true
  },
  {
    id: 'encouragement',
    type: 'narrative',
    text: "First of all, this is a difficult area for many learners, so if you sometimes hesitate, that is completely normal. It does not mean you are doing badly. In fact, you are going really well. You speak very clearly, people can understand you easily, and you are continuing to improve. This kind of distinction becomes more natural with time, with exposure, and with practice.",
    autoPlayNext: true
  },
  {
    id: 'simplification',
    type: 'narrative',
    text: "So, let’s make this simple.",
    autoPlayNext: true
  },
  {
    id: 'simple-formula',
    type: 'info',
    text: "The present perfect simple is formed with: have or has plus past participle.",
    secondaryText: "Form: have/has + past participle (V3)",
    autoPlayNext: true
  },
  {
    id: 'simple-examples',
    type: 'example',
    text: "For example: I have studied. She has finished. We have lived here for years.",
    autoPlayNext: true
  },
  {
    id: 'continuous-formula',
    type: 'info',
    text: "The present perfect continuous is formed with: have or has been plus verb plus ing.",
    secondaryText: "Form: have/has + been + verb-ing",
    autoPlayNext: true
  },
  {
    id: 'continuous-examples',
    type: 'example',
    text: "For example: I have been studying. She has been working. We have been living here for years.",
    autoPlayNext: true
  },
  {
    id: 'connection-past-present',
    type: 'narrative',
    text: "Now, grammatically, both tenses connect the past to the present. In other words, they are both about something that started before now and still matters now.",
    autoPlayNext: true
  },
  {
    id: 'focus-distinction',
    type: 'narrative',
    text: "But the difference is not only about time. It is also about focus. It is about what you want to show the listener. That is why this matters. English speakers often choose one tense or the other because of the feeling, perspective, or message behind the sentence.",
    autoPlayNext: true
  },
  {
    id: 'simple-focus-start',
    type: 'narrative',
    text: "Let’s start with the present perfect simple.",
    autoPlayNext: true
  },
  {
    id: 'simple-focus-desc',
    type: 'info',
    text: "We often use the simple form when we focus on the result, the fact, or the completed achievement.",
    secondaryText: "Focus: Result / Fact / Achievement",
    autoPlayNext: true
  },
  {
    id: 'simple-examples-result',
    type: 'example',
    text: "I have written three emails. (The result: 3 emails are finished). She has cleaned the kitchen. (The finished fact). I have read that book. (The experience is now part of my life).",
    autoPlayNext: true
  },
  {
    id: 'simple-summary',
    type: 'narrative',
    text: "So the present perfect simple often sounds a little more factual. It presents something as a completed piece of information, or it emphasises what has been achieved up to now.",
    autoPlayNext: true
  },
  {
    id: 'continuous-focus-start',
    type: 'narrative',
    text: "Now let’s look at the present perfect continuous.",
    autoPlayNext: true
  },
  {
    id: 'continuous-focus-desc',
    type: 'info',
    text: "We often use the continuous form when we focus on the activity itself, the duration, the effort, or the process.",
    secondaryText: "Focus: Activity / Duration / Effort / Process",
    autoPlayNext: true
  },
  {
    id: 'continuous-examples-activity',
    type: 'example',
    text: "I have been writing emails all morning. (Focus on activity/time). She has been cleaning the kitchen. (Suggests process). I have been reading that book. (Focus on ongoing action).",
    autoPlayNext: true
  },
  {
    id: 'continuous-summary',
    type: 'narrative',
    text: "So the continuous form often feels more alive. It brings the listener closer to the action. It can suggest repetition, effort, irritation, intensity, or simply that something has been happening over a period of time.",
    autoPlayNext: true
  },
  {
    id: 'meaningful-choice',
    type: 'narrative',
    text: "This is why tense choice is meaningful.",
    autoPlayNext: true
  },
  {
    id: 'comparison-painting',
    type: 'example',
    text: "Listen to these two sentences: 'I have painted the living room' sounds like the job is done. 'I have been painting the living room' sounds like the process—maybe I'm tired, maybe there's paint on my clothes.",
    autoPlayNext: true
  },
  {
    id: 'comparison-working',
    type: 'example',
    text: "Now these two: 'She has worked here for ten years' sounds like a neutral fact. 'She has been working here for ten years' focuses more on the long human experience.",
    autoPlayNext: true
  },
  {
    id: 'counting-vs-time',
    type: 'info',
    text: "We often prefer simple for counting (done five calls), and continuous for emphasizing duration (doing homework for two hours).",
    autoPlayNext: true
  },
  {
    id: 'state-verbs',
    type: 'info',
    text: "Another important point: some verbs don't use continuous forms. Verbs of state like know, like, believe, want.",
    secondaryText: "State Verbs: No '-ing' form usually.",
    autoPlayNext: true
  },
  {
    id: 'state-examples',
    type: 'example',
    text: "We say: 'I have known her for years.' Not: 'I have been knowing her.'",
    autoPlayNext: true
  },
  {
    id: 'emotional-side',
    type: 'narrative',
    text: "Let’s look at the emotional side too. 'I have cleaned the flat' is efficient. 'I have been cleaning the flat' sounds more personal—maybe I want sympathy!",
    autoPlayNext: true
  },
  {
    id: 'practice-intro',
    type: 'narrative',
    text: "Now let’s do a little practice. I am going to ask you some questions. After each one, pause and answer aloud.",
    autoPlayNext: false
  },
  {
    id: 'q1',
    type: 'quiz',
    text: "Question one: Which sounds better? 'I have written my report' or 'I have been writing my report'?",
    options: ["I have written my report", "I have been writing my report", "Both (different meanings)"],
    correctAnswer: "Both (different meanings)",
    explanation: "Both are possible. 'I have written' means it's finished. 'I have been writing' focuses on the activity/time.",
    autoPlayNext: false
  },
  {
    id: 'q2',
    type: 'quiz',
    text: "Question two: Which sentence is better if your hands are dirty and there is paint everywhere?",
    options: ["I have painted the bedroom", "I have been painting the bedroom"],
    correctAnswer: "I have been painting the bedroom",
    explanation: "The situation makes the activity feel present and visible. We imagine the process and effort.",
    autoPlayNext: false
  },
  {
    id: 'q3',
    type: 'quiz',
    text: "Question three: Which is better? 'She has visited Paris three times' or 'She has been visiting Paris three times'?",
    options: ["She has visited Paris three times", "She has been visiting Paris three times"],
    correctAnswer: "She has visited Paris three times",
    explanation: "This is about counting completed visits. Fact/Achievement = Simple.",
    autoPlayNext: false
  },
  {
    id: 'q4',
    type: 'quiz',
    text: "Question four: Which is better? 'I have known him since school' or 'I have been knowing him since school'?",
    options: ["I have known him since school", "I have been knowing him since school"],
    correctAnswer: "I have known him since school",
    explanation: "'Know' is a state verb, and we do not usually use it in the continuous form.",
    autoPlayNext: false
  },
  {
    id: 'q5',
    type: 'quiz',
    text: "Question five: Someone looks tired, you want to comment on effort. Which is better?",
    options: ["You have worked hard", "You have been working hard"],
    correctAnswer: "You have been working hard",
    explanation: "The continuous form highlights the effort and energy. It sounds more human and immediate.",
    autoPlayNext: false
  },
  {
    id: 'q6',
    type: 'quiz',
    text: "Question six: Which sentence suggests a finished achievement?",
    options: ["I have read five chapters", "I have been reading five chapters"],
    correctAnswer: "I have read five chapters",
    explanation: "Five chapters is a completed, countable result.",
    autoPlayNext: false
  },
  {
    id: 'final-thought',
    type: 'narrative',
    text: "One final thought. When choosing, ask: Am I showing the result, or the activity? Finished, or happening? Factual, or process/effort?",
    autoPlayNext: true
  },
  {
    id: 'outro',
    type: 'narrative',
    text: "And remember, Gislaine, you do not need to force this too much. Your instinct will get stronger. You are already doing well. Keep going!",
    autoPlayNext: false
  }
];
