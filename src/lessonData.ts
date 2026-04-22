/**
 * Interactive English Lesson Data
 * Based on the specialized en-GB-Studio-C voice profile.
 */

export interface LessonStep {
  id: string;
  type: 'narrative' | 'info' | 'example' | 'quiz' | 'pause';
  section: string; // The section name for the header
  text: string;
  secondaryText?: string; // e.g. structural formulas
  image?: string; // Hero image URL
  highlight?: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  autoPlayNext?: boolean;
  educatorNote?: string;
  cta?: {
    text: string;
    url: string;
  };
  imageClassName?: string;
}

export const lessonSteps: LessonStep[] = [
  {
    id: 'intro',
    type: 'narrative',
    section: 'Introduction',
    text: "Hello, I am your AI teacher, programmed to help you with your homework. Today I want to help you feel more confident with a very common question in English: when do we use the present perfect simple, and when do we use the present perfect continuous?",
    image: "/teacher.jpg",
    imageClassName: "object-cover", 
    autoPlayNext: true,
    educatorNote: "Present perfect simple and continuous is Upper-intermediate grammar point. Mastering this grammar will take you towards Advanced level."
  },
  {
    id: 'encouragement',
    type: 'narrative',
    section: 'Introduction',
    text: "First of all, this is a difficult area for many learners, so if you sometimes hesitate, that is completely normal. At Upper-intermediate level, you are already communicating well, but mastering these details is what will take your English to the next level. This kind of distinction becomes more natural with time, with exposure, and with practice.",
    autoPlayNext: true,
    educatorNote: "Mistakes are part of the process. They show you are pushing your boundaries."
  },
  {
    id: 'simplification',
    type: 'narrative',
    section: 'Introduction',
    text: "So, let’s make this simple.",
    autoPlayNext: true,
    educatorNote: "In English linguistics, we focus on 'meaningful choice' rather than just 'right vs wrong'."
  },
  {
    id: 'simple-formula',
    type: 'info',
    section: 'Basic Formulas',
    text: "The present perfect simple is formed with: have or has plus past participle.",
    secondaryText: "Form: have/has + past participle (V3)",
    autoPlayNext: true,
    educatorNote: "Consistent review of structural forms provides a solid foundation for high-level fluency."
  },
  {
    id: 'simple-examples',
    type: 'example',
    section: 'Basic Formulas',
    text: "For example: I have studied. She has finished. We have lived here for years.",
    autoPlayNext: true
  },
  {
    id: 'continuous-formula',
    type: 'info',
    section: 'Basic Formulas',
    text: "The present perfect continuous is formed with: have or has been plus verb plus ing.",
    secondaryText: "Form: have/has + been + verb-ing",
    autoPlayNext: true,
    educatorNote: "The '-ing' form across all tenses almost always signifies an ongoing process or activity."
  },
  {
    id: 'continuous-examples',
    type: 'example',
    section: 'Basic Formulas',
    text: "For example: I have been studying. She has been working. We have been living here for years.",
    autoPlayNext: true
  },
  {
    id: 'connection-past-present',
    type: 'narrative',
    section: 'Grammar Contrast',
    text: "Now, grammatically, both tenses connect the past to the present. In other words, they are both about something that started before now and still matters now.",
    autoPlayNext: true,
    educatorNote: "Remember: 'Present Perfect' always bridge the past and the present moment."
  },
  {
    id: 'focus-distinction',
    type: 'narrative',
    section: 'Grammar Contrast',
    text: "But the difference is not only about time. It is also about focus. It is about what you want to show the listener. That is why this matters. English speakers often choose one tense or the other because of the feeling, perspective, or message behind the sentence.",
    autoPlayNext: true,
    educatorNote: "Native speakers use these tenses to signal their perspective on an action, not just the time it happened."
  },
  {
    id: 'simple-focus-start',
    type: 'narrative',
    section: 'Grammar Contrast',
    text: "Let’s start with the present perfect simple.",
    autoPlayNext: true
  },
  {
    id: 'simple-focus-desc',
    type: 'info',
    section: 'Grammar Contrast',
    text: "We often use the simple form when we focus on the result, the fact, or the completed achievement.",
    secondaryText: "Focus: Result / Fact / Achievement",
    autoPlayNext: true,
    educatorNote: "Focusing on 'completion' is the hallmark of the Present Perfect Simple."
  },
  {
    id: 'simple-examples-result',
    type: 'example',
    section: 'Grammar Contrast',
    text: "I have written three emails. (The result: 3 emails are finished). She has cleaned the kitchen. (The finished fact). I have read that book. (The experience is now part of my life).",
    autoPlayNext: true
  },
  {
    id: 'simple-summary',
    type: 'narrative',
    section: 'Grammar Contrast',
    text: "So the present perfect simple often sounds a little more factual. It presents something as a completed piece of information, or it emphasises what has been achieved up to now.",
    autoPlayNext: true
  },
  {
    id: 'continuous-focus-start',
    type: 'narrative',
    section: 'Grammar Contrast',
    text: "Now let’s look at the present perfect continuous.",
    autoPlayNext: true
  },
  {
    id: 'continuous-focus-desc',
    type: 'info',
    section: 'Grammar Contrast',
    text: "We often use the continuous form when we focus on the activity itself, the duration, the effort, or the process.",
    secondaryText: "Focus: Activity / Duration / Effort / Process",
    autoPlayNext: true,
    educatorNote: "The continuous tense is often 'warmer' and more 'narrative' than the simple tense."
  },
  {
    id: 'continuous-examples-activity',
    type: 'example',
    section: 'Grammar Contrast',
    text: "I have been writing emails all morning. (Focus on activity/time). She has been cleaning the kitchen. (Suggests process). I have been reading that book. (Focus on ongoing action).",
    autoPlayNext: true
  },
  {
    id: 'continuous-summary',
    type: 'narrative',
    section: 'Grammar Contrast',
    text: "So the continuous form often feels more alive. It brings the listener closer to the action. It can suggest repetition, effort, irritation, intensity, or simply that something has been happening over a period of time.",
    autoPlayNext: true,
    educatorNote: "The choice of tense reveals the speaker's emotional state or priority."
  },
  {
    id: 'meaningful-choice',
    type: 'narrative',
    section: 'Grammar Contrast',
    text: "This is why tense choice is meaningful.",
    autoPlayNext: true
  },
  {
    id: 'comparison-painting',
    type: 'example',
    section: 'Grammar Contrast',
    text: "Listen to these two sentences: 'I have painted the living room' sounds like the job is done. 'I have been painting the living room' sounds like the process—maybe I'm tired, maybe there's paint on my clothes.",
    autoPlayNext: true,
    educatorNote: "Visualizing the 'after-effects' of an action helps you choose the right tense."
  },
  {
    id: 'comparison-working',
    type: 'example',
    section: 'Grammar Contrast',
    text: "Now these two: 'She has worked here for ten years' sounds like a neutral fact. 'She has been working here for ten years' focuses more on the long human experience.",
    autoPlayNext: true
  },
  {
    id: 'counting-vs-time',
    type: 'info',
    section: 'Grammar Contrast',
    text: "We often prefer simple for counting (done five calls), and continuous for emphasizing duration (doing homework for two hours).",
    autoPlayNext: true,
    educatorNote: "Simple = Counting ('how many'). Continuous = Time ('how long')."
  },
  {
    id: 'state-verbs',
    type: 'info',
    section: 'Important Rules',
    text: "Another important point: some verbs don't use continuous forms. Verbs of state like know, like, believe, want.",
    secondaryText: "State Verbs: No '-ing' form usually.",
    autoPlayNext: true,
    educatorNote: "Stative verbs are a critical exception that Upper-intermediate students must memorize."
  },
  {
    id: 'state-examples',
    type: 'example',
    section: 'Important Rules',
    text: "We say: 'I have known her for years.' Not: 'I have been knowing her.'",
    autoPlayNext: true,
    educatorNote: "State verbs are about long-term feelings or facts, not temporary activities."
  },
  {
    id: 'emotional-side',
    type: 'narrative',
    section: 'Important Rules',
    text: "Let’s look at the emotional side too. 'I have cleaned the flat' is efficient. 'I have been cleaning the flat' sounds more personal—maybe I want sympathy or I'm exhausted!",
    autoPlayNext: true
  },
  {
    id: 'practice-intro',
    type: 'narrative',
    section: 'Practical Exercise',
    text: "Now let’s do a little practice. I am going to ask you some questions. After each one, pause and answer aloud.",
    autoPlayNext: false,
    educatorNote: "Active retrieval through practice is the most effective way to internalize grammar rules."
  },
  {
    id: 'q1',
    type: 'quiz',
    section: 'Practical Exercise',
    text: "1. Which sounds better? 'I have written my report' or 'I have been writing my report'?",
    options: ["I have written my report", "I have been writing my report", "Both (different meanings)"],
    correctAnswer: "Both (different meanings)",
    explanation: "Both are possible. 'I have written' means it's finished. 'I have been writing' focuses on the activity/time.",
    autoPlayNext: false,
    educatorNote: "At Upper-intermediate level, you learn that there is not always 'one right answer'."
  },
  {
    id: 'q2',
    type: 'quiz',
    section: 'Practical Exercise',
    text: "2. Which sentence is better if your hands are dirty and there is paint everywhere?",
    options: ["I have painted the bedroom", "I have been painting the bedroom"],
    correctAnswer: "I have been painting the bedroom",
    explanation: "The situation makes the activity feel present and visible. We imagine the process and effort.",
    autoPlayNext: false
  },
  {
    id: 'q3',
    type: 'quiz',
    section: 'Practical Exercise',
    text: "3. Which is better? 'She has visited Paris three times' or 'She has been visiting Paris three times'?",
    options: ["She has visited Paris three times", "She has been visiting Paris three times"],
    correctAnswer: "She has visited Paris three times",
    explanation: "This is about counting completed visits. Fact/Achievement = Simple.",
    autoPlayNext: false
  },
  {
    id: 'q4',
    type: 'quiz',
    section: 'Practical Exercise',
    text: "4. Which is better? 'I have known him since school' or 'I have been knowing him since school'?",
    options: ["I have known him since school", "I have been knowing him since school"],
    correctAnswer: "I have known him since school",
    explanation: "'Know' is a state verb, and we do not usually use it in the continuous form.",
    autoPlayNext: false
  },
  {
    id: 'q5',
    type: 'quiz',
    section: 'Practical Exercise',
    text: "5. Someone looks tired, you want to comment on effort. Which is better?",
    options: ["You have worked hard", "You have been working hard"],
    correctAnswer: "You have been working hard",
    explanation: "The continuous form highlights the effort and energy. It sounds more human and immediate.",
    autoPlayNext: false
  },
  {
    id: 'q6',
    type: 'quiz',
    section: 'Practical Exercise',
    text: "6. Which sentence suggests a finished achievement?",
    options: ["I have read five chapters", "I have been reading five chapters"],
    correctAnswer: "I have read five chapters",
    explanation: "Five chapters is a completed, countable result.",
    autoPlayNext: false
  },
  {
    id: 'q7',
    type: 'quiz',
    section: 'Practical Exercise',
    text: "7. Which is better to show a current result? 'I have broken my phone' or 'I have been breaking my phone'?",
    options: ["I have broken my phone", "I have been breaking my phone"],
    correctAnswer: "I have broken my phone",
    explanation: "Breaking a phone is usually a single, completed moment with a clear result. 'Been breaking' sounds like a strange, repetitive process!",
    autoPlayNext: false
  },
  {
    id: 'q8',
    type: 'quiz',
    section: 'Practical Exercise',
    text: "8. You enter a room and smell smoke. Which is better? 'Someone has smoked here' or 'Someone has been smoking here'?",
    options: ["Someone has smoked here", "Someone has been smoking here"],
    correctAnswer: "Someone has been smoking here",
    explanation: "The continuous form is used for recent activities that have left a result (like a smell) in the present.",
    autoPlayNext: false
  },
  {
    id: 'q9',
    type: 'quiz',
    section: 'Practical Exercise',
    text: "9. Which is better for counting actions? 'She has already called twice today' or 'She has already been calling twice today'?",
    options: ["She has already called twice today", "She has already been calling twice today"],
    correctAnswer: "She has already called twice today",
    explanation: "We use the Present Perfect Simple to say 'how many' times something has happened.",
    autoPlayNext: false
  },
  {
    id: 'q10',
    type: 'quiz',
    section: 'Practical Exercise',
    text: "10. Which emphasises the duration of waiting? 'I have waited for an hour' or 'I have been waiting for an hour'?",
    options: ["I have waited for an hour", "I have been waiting for an hour"],
    correctAnswer: "I have been waiting for an hour",
    explanation: "While both are possible, 'been waiting' emphasizes the length of time and the ongoing nature of the wait.",
    autoPlayNext: false
  },
  {
    id: 'results-screen',
    type: 'narrative',
    section: 'Practical Exercise',
    text: "You have reached the end of the practice session. Let's see how you did!",
    autoPlayNext: false
  },
  {
    id: 'outro',
    type: 'narrative',
    section: 'Summary Review',
    text: "Keep practicing and remember, when choosing between simple and continuous, ask: Result or Activity? Finished or Happening? Fact or Process? These choices help you express who you are and how you see the world. Well done!",
    image: "/success.jpg",
    autoPlayNext: false,
    educatorNote: "Language is about expressing your perspective. Great job today!",
    cta: {
      text: "Visit our website for more resources",
      url: "https://www.brookslanguage.com/2014/09/present-perfect-simple-or-continuous.html"
    }
  }
];
