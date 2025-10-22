import { useMemo, useState } from 'react';
import { type LucideIcon, Send, BookOpen, Code, Cpu, PenTool, Users, FileText, Video, AlertCircle, CheckCircle, X, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import svgPaths from "../imports/svg-ktd1c8hcfk";
import imgAiTutorLogo from "figma:asset/831d76f506f1dc02aaa78fa1316452543accee12.png";
import { mockCourseMaterials, mockCourseContent, getCourseColor, mockCourses } from '../lib/mockData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  module: string;
}

type CourseId = 'crn4020' | 'cop4600' | 'cis4930' | 'cis4931';

interface AITutorViewProps {
  onBack?: () => void;
}

const COURSE_IDS: CourseId[] = ['crn4020', 'cop4600', 'cis4930', 'cis4931'];

const COURSE_DESCRIPTIONS: Record<CourseId, string> = {
  crn4020: 'Plan sprints, refine user stories, and get clarity on delivery practices.',
  cop4600: 'Understand kernels, scheduling, memory management, and systems programming.',
  cis4930: 'Strengthen your research, prototyping, and UX evaluation processes.',
  cis4931: 'Design better interactions, accessibility, and human-centered experiences.',
};

const COURSE_ICONS: Record<CourseId, LucideIcon> = {
  crn4020: Code,
  cop4600: Cpu,
  cis4930: PenTool,
  cis4931: Users,
};

const softwareEngineeringModules = mockCourseMaterials.modules.filter((module) => module.status !== 'locked');

const operatingSystemsModules = [
  {
    id: 'cop4600-m1',
    title: 'Module 1: Process Management',
    description: 'Scheduling fundamentals and concurrency primitives.',
    status: 'completed',
    items: [
      { title: 'Lecture: Process States and Transitions', type: 'video', completed: true, duration: '48 min', content: 'Explains lifecycle of processes, context switching, and scheduling queues.' },
      { title: 'Lab: Simulating Round-Robin Scheduler', type: 'file', completed: true, size: '1.1 MB', content: 'Implements a CPU scheduler using time slices and ready queues.' },
      { title: 'Quiz: Concurrency Vocabulary', type: 'quiz', completed: true, questions: '12', content: 'Terminology covering critical sections, race conditions, and starvation.' },
    ],
  },
  {
    id: 'cop4600-m2',
    title: 'Module 2: Memory & Storage',
    description: 'Virtual memory, paging, and file system basics.',
    status: 'in-progress',
    items: [
      { title: 'Lecture: Paging and Segmentation', type: 'video', completed: true, duration: '42 min', content: 'Covers translation lookaside buffers, page faults, and swapping.' },
      { title: 'Reading: File System Structures', type: 'reading', completed: false, pages: '28 pages', content: 'Explores inodes, journaling, and allocation strategies.' },
      { title: 'Lab: Virtual Memory Visualizer', type: 'file', completed: false, size: '870 KB', content: 'Interactive tool for exploring page replacement algorithms.' },
    ],
  },
];

const uxDesignModules = [
  {
    id: 'cis4930-m1',
    title: 'Module 1: Discovery Research',
    description: 'Planning and conducting user research studies.',
    status: 'completed',
    items: [
      { title: 'Lecture: Research Method Selection', type: 'video', completed: true, duration: '36 min', content: 'Compares interviews, surveys, diary studies, and contextual inquiry.' },
      { title: 'Field Guide: Conducting Interviews', type: 'file', completed: true, size: '620 KB', content: 'Templates and question banks for qualitative sessions.' },
      { title: 'Workshop: Affinity Mapping', type: 'file', completed: true, size: '940 KB', content: 'Exercises to cluster observations into themes.' },
    ],
  },
  {
    id: 'cis4930-m2',
    title: 'Module 2: Prototyping & Testing',
    description: 'Creating artifacts and validating design decisions.',
    status: 'in-progress',
    items: [
      { title: 'Lecture: Fidelity Spectrum of Prototypes', type: 'video', completed: true, duration: '41 min', content: 'When to use sketches, wireframes, and clickable prototypes.' },
      { title: 'Reading: Usability Study Planning', type: 'reading', completed: false, pages: '19 pages', content: 'Step-by-step guide for recruiting and running moderated sessions.' },
      { title: 'Template: Test Script Builder', type: 'file', completed: false, size: '520 KB', content: 'Worksheet to draft tasks, prompts, and success metrics.' },
    ],
  },
];

const hciModules = [
  {
    id: 'cis4931-m1',
    title: 'Module 1: Interaction Principles',
    description: 'Human perception, feedback, and interface patterns.',
    status: 'completed',
    items: [
      { title: 'Lecture: Cognitive Models in HCI', type: 'video', completed: true, duration: '39 min', content: 'Covers mental models, cognitive load, and discoverability.' },
      { title: 'Reading: Principles of Feedback', type: 'reading', completed: true, pages: '22 pages', content: 'Guidelines for timely, informative system responses.' },
      { title: 'Case Study: Mobile Navigation Patterns', type: 'file', completed: true, size: '780 KB', content: 'Evaluates common patterns with accessibility considerations.' },
    ],
  },
  {
    id: 'cis4931-m2',
    title: 'Module 2: Evaluation Methods',
    description: 'Measuring usability and accessibility of interfaces.',
    status: 'in-progress',
    items: [
      { title: 'Lecture: Heuristic and Cognitive Walkthroughs', type: 'video', completed: true, duration: '44 min', content: 'Contrasts expert reviews with task-based evaluation.' },
      { title: 'Checklist: Inclusive Design Heuristics', type: 'file', completed: false, size: '560 KB', content: 'Checklist used during accessibility audits.' },
      { title: 'Workshop: Remote Testing Logistics', type: 'file', completed: false, size: '690 KB', content: 'Best practices for moderated and unmoderated remote sessions.' },
    ],
  },
];

const COURSE_MATERIALS: Record<CourseId, typeof softwareEngineeringModules> = {
  crn4020: softwareEngineeringModules,
  cop4600: operatingSystemsModules,
  cis4930: uxDesignModules,
  cis4931: hciModules,
};

const PRACTICE_QUESTION_BANK: Record<CourseId, PracticeQuestion[]> = {
  crn4020: [
    {
      id: 'crn4020-q1',
      question: 'What is the primary purpose of a sprint retrospective?',
      options: [
        'Plan features for the next release',
        'Review code style guidelines',
        'Reflect on the last sprint to identify improvements',
        'Demo completed user stories',
      ],
      correctAnswer: 2,
      module: 'Module 1',
    },
    {
      id: 'crn4020-q2',
      question: 'Which artifact provides the team with prioritized work items?',
      options: ['Definition of Done', 'Product Backlog', 'Sprint Review Notes', 'Release Burndown'],
      correctAnswer: 1,
      module: 'Module 1',
    },
    {
      id: 'crn4020-q3',
      question: 'Continuous integration primarily helps teams by:',
      options: [
        'Gathering customer feedback',
        'Automating build and test validation on every merge',
        'Tracking business KPIs',
        'Generating deployment scripts manually',
      ],
      correctAnswer: 1,
      module: 'Module 2',
    },
    {
      id: 'crn4020-q4',
      question: 'A user story typically captures which elements?',
      options: [
        'Budget, risks, contingency',
        'Who, what, and why of the desired capability',
        'Detailed UML diagrams',
        'Database schema and API contracts',
      ],
      correctAnswer: 1,
      module: 'Module 1',
    },
    {
      id: 'crn4020-q5',
      question: 'Technical debt best describes:',
      options: [
        'All incomplete features in the backlog',
        'The cost of hardware upgrades',
        'Rework created by short-term tradeoffs in code quality or design',
        'Time spent on user research',
      ],
      correctAnswer: 2,
      module: 'Module 2',
    },
  ],
  cop4600: [
    {
      id: 'cop4600-q1',
      question: 'A context switch occurs when the OS:',
      options: [
        'Executes user space code',
        'Moves a process from ready to running',
        'Saves CPU state for one process and restores another',
        'Writes a file to disk',
      ],
      correctAnswer: 2,
      module: 'Module 1',
    },
    {
      id: 'cop4600-q2',
      question: 'Which structure tracks whether a virtual page is cached in memory?',
      options: ['Process control block', 'Translation lookaside buffer', 'Scheduler queue', 'File descriptor table'],
      correctAnswer: 1,
      module: 'Module 2',
    },
    {
      id: 'cop4600-q3',
      question: 'Semaphores are used to:',
      options: [
        'Allocate disk quotas',
        'Synchronize access to shared resources',
        'Convert virtual addresses to physical addresses',
        'Store file metadata',
      ],
      correctAnswer: 1,
      module: 'Module 1',
    },
    {
      id: 'cop4600-q4',
      question: 'Round-robin scheduling is characterized by:',
      options: [
        'Prioritizing shortest jobs first',
        'Giving each process a fixed time slice in cyclic order',
        'Blocking I/O bound tasks',
        'Always running the highest priority thread',
      ],
      correctAnswer: 1,
      module: 'Module 1',
    },
    {
      id: 'cop4600-q5',
      question: 'Which OS component handles system calls from user space?',
      options: ['Device driver', 'Command shell', 'Kernel', 'Boot loader'],
      correctAnswer: 2,
      module: 'Module 2',
    },
  ],
  cis4930: [
    {
      id: 'cis4930-q1',
      question: 'Personas are primarily used to:',
      options: [
        'Create marketing campaigns',
        'Represent key user segments and their goals',
        'Define system architecture',
        'Document project budgets',
      ],
      correctAnswer: 1,
      module: 'Module 1',
    },
    {
      id: 'cis4930-q2',
      question: 'Which research method best uncovers context-of-use insights?',
      options: ['A/B testing', 'Contextual inquiry', 'Analytics review', 'Card sorting'],
      correctAnswer: 1,
      module: 'Module 1',
    },
    {
      id: 'cis4930-q3',
      question: 'Low-fidelity prototypes are helpful because they:',
      options: [
        'Produce pixel-perfect UI mockups',
        'Allow rapid iteration on layout and flows before heavy investment',
        'Measure conversion metrics in production',
        'Guarantee accessibility compliance',
      ],
      correctAnswer: 1,
      module: 'Module 2',
    },
    {
      id: 'cis4930-q4',
      question: 'A key success metric in usability testing is often:',
      options: [
        'Server response time',
        'Task completion rate',
        'Number of commits per sprint',
        'Lines of code written',
      ],
      correctAnswer: 1,
      module: 'Module 2',
    },
    {
      id: 'cis4930-q5',
      question: 'Design systems help teams by:',
      options: [
        'Automating deployment pipelines',
        'Establishing consistent components, patterns, and guidelines',
        'Replacing the product backlog',
        'Collecting user feedback automatically',
      ],
      correctAnswer: 1,
      module: 'Module 2',
    },
  ],
  cis4931: [
    {
      id: 'cis4931-q1',
      question: "Fitts's law predicts:",
      options: [
        'Error frequency in code reviews',
        'Time to point at a target based on size and distance',
        'Database query performance',
        'User satisfaction scores',
      ],
      correctAnswer: 1,
      module: 'Module 1',
    },
    {
      id: 'cis4931-q2',
      question: 'Cognitive load increases when an interface:',
      options: [
        'Uses familiar metaphors',
        'Presents many decisions at once without guidance',
        'Provides clear feedback',
        'Reduces required steps',
      ],
      correctAnswer: 1,
      module: 'Module 1',
    },
    {
      id: 'cis4931-q3',
      question: 'Effective feedback should be:',
      options: [
        'Delayed until the user finishes all tasks',
        'Subtle enough to be unnoticed',
        'Timely, specific, and proportional to the action',
        'Only text-based to avoid distractions',
      ],
      correctAnswer: 2,
      module: 'Module 1',
    },
    {
      id: 'cis4931-q4',
      question: 'Participatory design means:',
      options: [
        'Users observe the design team from afar',
        'Designers work in isolation',
        'Users collaborate as co-designers throughout the process',
        'Only stakeholders review wireframes',
      ],
      correctAnswer: 2,
      module: 'Module 2',
    },
    {
      id: 'cis4931-q5',
      question: 'An accessibility audit is used to:',
      options: [
        'Prioritize backlog items',
        'Ensure interfaces meet inclusive design guidelines',
        'Estimate project budgets',
        'Measure server uptime',
      ],
      correctAnswer: 1,
      module: 'Module 2',
    },
  ],
};

const INITIAL_MESSAGES: Record<CourseId, Message[]> = {
  crn4020: [
    {
      id: 'crn4020-intro-1',
      role: 'assistant',
      content: "Hello! I'm your AI tutor for CRN4020. I stay within the sprint planning, architecture, and testing materials you've unlocked so everything I share matches your coursework. What software engineering topic should we tackle?",
    },
    {
      id: 'crn4020-intro-2',
      role: 'user',
      content: 'When should a team use story points instead of estimating in hours?',
    },
    {
      id: 'crn4020-intro-3',
      role: 'assistant',
      content: "Looking at Module 1 on agile planning:\n\nStory points let teams compare relative effort without debating exact hours. They capture complexity, uncertainty, and scope, then velocity converts them into forecasts. Hours are useful for personal planning, but story points make it easier to track team capacity sprint over sprint. Want examples of mapping stories between the two?",
    },
  ],
  cop4600: [
    {
      id: 'cop4600-intro-1',
      role: 'assistant',
      content: "Hi! I'm your AI tutor for COP4600. I'll reference only the OS lectures and labs you've completed so answers stay grounded in the material. Which operating systems concept do you want to review?",
    },
    {
      id: 'cop4600-intro-2',
      role: 'user',
      content: 'Can you remind me how mutexes differ from semaphores?',
    },
    {
      id: 'cop4600-intro-3',
      role: 'assistant',
      content: "From Module 1 on process management:\n\nA mutex is a locking mechanism that allows one owner at a time, perfect for protecting critical sections. A semaphore is a signaling mechanism with a counter; it can coordinate multiple resources or threads. Binary semaphores behave like mutexes, but counting semaphores manage pools. Need a code example from the lab?",
    },
  ],
  cis4930: [
    {
      id: 'cis4930-intro-1',
      role: 'assistant',
      content: "Welcome! I'm your AI tutor for CIS4930. I work strictly from the research, prototyping, and testing modules you've finished so guidance stays aligned with your design work. What part of the UX process can I help clarify?",
    },
    {
      id: 'cis4930-intro-2',
      role: 'user',
      content: 'How should I prioritize findings from our last usability test?',
    },
    {
      id: 'cis4930-intro-3',
      role: 'assistant',
      content: "Pulling from Module 2 on usability evaluation:\n\nStart by tagging issues with severity and frequency, then link them to the affected user goals. Turn insights into themed recommendations, and tie each to evidence from your observations. That makes it easier to tell the story during readouts. Want me to help draft the summary bullets?",
    },
  ],
  cis4931: [
    {
      id: 'cis4931-intro-1',
      role: 'assistant',
      content: "Hey there! I'm your AI tutor for CIS4931. I'll stick to the interaction design and evaluation materials you've already completed so the guidance reflects your HCI coursework. What concept should we dive into?",
    },
    {
      id: 'cis4931-intro-2',
      role: 'user',
      content: 'How do I explain cognitive load to stakeholders?',
    },
    {
      id: 'cis4931-intro-3',
      role: 'assistant',
      content: "Referencing Module 1 on interaction principles:\n\nCognitive load is the mental effort required to interpret and act within an interface. When layouts are noisy or steps are unclear, users burn more effort and make mistakes. Showing before-and-after flows or time-on-task data helps stakeholders see the impact. Want a quick talking point you can add to your slide?",
    },
  ],
};

export default function AITutorView({ onBack }: AITutorViewProps) {
  const [selectedCourse, setSelectedCourse] = useState<CourseId | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPracticeActive, setIsPracticeActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const courseInfo = useMemo(() => {
    return COURSE_IDS.reduce((acc, courseId) => {
      const course = mockCourses.find((item) => item.id === courseId);
      acc[courseId] = {
        code: course?.code ?? courseId.toUpperCase(),
        name: course?.name ?? 'Course',
        materials: COURSE_MATERIALS[courseId],
        vocabulary: mockCourseContent[courseId]?.vocabulary ?? [],
      };
      return acc;
    }, {} as Record<CourseId, { code: string; name: string; materials: typeof softwareEngineeringModules; vocabulary: { term: string; definition: string }[] }>);
  }, []);

  const practiceQuestions = selectedCourse ? PRACTICE_QUESTION_BANK[selectedCourse] : [];

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedCourse) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const courseTexts = mockCourseContent[selectedCourse]?.texts ?? [];
      const materials = courseInfo[selectedCourse].materials;
      const fallbackSummary = 'I\'ll focus on the modules you\'ve marked complete so the explanation stays aligned with your coursework.';
      const referenceSnippet =
        courseTexts.length > 0
          ? courseTexts[Math.floor(Math.random() * courseTexts.length)]
          : fallbackSummary;
      const referenceModule = materials[currentQuestionIndex % Math.max(materials.length, 1)]?.title ?? 'your recent module';

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Referencing ${referenceModule}:\n\n${referenceSnippet}\n\nWould you like to see a worked example or revisit another topic?`,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectCourse = (courseId: CourseId) => {
    setSelectedCourse(courseId);
    setMessages(INITIAL_MESSAGES[courseId]);
    setInputMessage('');
    setIsPracticeActive(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const handleBackToSelection = () => {
    setSelectedCourse(null);
    setInputMessage('');
    setMessages([]);
    setIsPracticeActive(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const handleStartPractice = () => {
    if (practiceQuestions.length === 0) return;
    setIsPracticeActive(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (practiceQuestions.length === 0) return;
    if (currentQuestionIndex < practiceQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (practiceQuestions.length === 0) return;
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleResetPractice = () => {
    setIsPracticeActive(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  // Show selection screen if no course is selected
  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[856px] mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-[rgba(3,2,19,0.1)] rounded-[10px] w-12 h-12 flex items-center justify-center shrink-0">
              <img
                src={imgAiTutorLogo}
                alt="AI Tutor"
                className="w-[33px] h-[33px] object-cover"
              />
            </div>
            <div>
              <h1 className="text-neutral-950 mb-0">AI Tutor</h1>
              <p className="text-[#717182] text-sm">
                Select a course to get started
              </p>
            </div>
          </div>

          {/* Course Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COURSE_IDS.map((courseId) => {
              const color = getCourseColor(courseId);
              const Icon = COURSE_ICONS[courseId];
              const { code, name } = courseInfo[courseId];

              return (
                <button
                  type="button"
                  key={courseId}
                  onClick={() => handleSelectCourse(courseId)}
                  className="group border-2 border-[rgba(0,0,0,0.1)] rounded-[14px] p-8 hover:shadow-lg text-left transition-all overflow-hidden relative"
                  style={{ borderColor: 'rgba(0,0,0,0.1)' }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.borderColor = color.primary;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: color.primary }}
                  />

                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="rounded-[10px] w-16 h-16 flex items-center justify-center shrink-0"
                      style={{ backgroundColor: color.primary }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: color.primary }}
                        />
                        <h2 className="text-neutral-950">{code}</h2>
                      </div>
                      <p className="text-[#717182] text-sm">{name}</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-950 opacity-70">
                    {COURSE_DESCRIPTIONS[courseId]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Show chat interface after course is selected
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={handleBackToSelection}
          className="flex items-center gap-2 mb-6 text-sm text-neutral-950 hover:opacity-70 transition-opacity"
        >
          <div className="w-4 h-4 relative">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 11">
              <path d={svgPaths.p12282fc0} stroke="#0A0A0A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33246" />
            </svg>
          </div>
          <span>Back to Selection</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-[rgba(3,2,19,0.1)] rounded-[10px] w-12 h-12 flex items-center justify-center shrink-0">
            <img
              src={imgAiTutorLogo}
              alt="AI Tutor"
              className="w-[33px] h-[33px] object-cover"
            />
          </div>
          <div>
            <h1 className="text-neutral-950 mb-0">AI Tutor</h1>
            <p className="text-[#717182] text-sm">
              {courseInfo[selectedCourse].code} - {courseInfo[selectedCourse].name}
            </p>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-[14px] p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-neutral-950 mb-1">Course Material Only</h4>
              <p className="text-sm text-[#78716C]">
                This AI tutor only answers questions based on your completed course lectures and materials. 
                This ensures all information is accurate and aligned with your coursework.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="w-full bg-[#ececf0] h-[35px] rounded-[14px] p-0.5 mb-6">
                <TabsTrigger
                  value="chat"
                  className="flex-1 h-[29px] rounded-[14px] data-[state=active]:bg-white data-[state=active]:text-neutral-950 text-neutral-950"
                >
                  Chat
                </TabsTrigger>
                <TabsTrigger
                  value="recall"
                  className="flex-1 h-[29px] rounded-[14px] data-[state=active]:bg-white data-[state=active]:text-neutral-950 text-neutral-950"
                >
                  Active Recall
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="mt-0 space-y-4">
                {/* Chat Messages Container */}
                <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] h-[500px] overflow-y-auto p-6">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[565px] p-3 rounded-[10px] ${
                            message.role === 'user'
                              ? 'bg-[#030213] text-white ml-auto'
                              : 'bg-[#ececf0] text-neutral-950'
                          }`}
                        >
                          <p className="text-sm leading-5 whitespace-pre-line">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] h-12 flex items-center px-2 gap-2">
                  <Input
                    placeholder="Ask a question..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 border-0 bg-transparent h-10 text-sm placeholder:text-[rgba(10,10,10,0.5)] focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-[#030213] text-white h-8 px-4 rounded-[8px] text-sm hover:bg-[#030213]/90"
                  >
                    Send
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="recall" className="mt-0">
                <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] h-[500px] p-6 overflow-y-auto">
                  {!isPracticeActive && !showResults ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <h3 className="text-neutral-950 mb-2">Active Recall Practice</h3>
                        <p className="text-[#717182] text-sm max-w-md mb-4">
                          Test your knowledge with AI-generated practice questions based on your course materials.
                        </p>
                        <Button 
                          onClick={handleStartPractice}
                          className="bg-[#030213] text-white"
                        >
                          Start Practice Session
                        </Button>
                      </div>
                    </div>
                  ) : showResults ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-neutral-950">Practice Results</h3>
                        <Button
                          onClick={handleResetPractice}
                          variant="outline"
                          className="h-8 px-4 rounded-[8px] text-sm"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Try Again
                        </Button>
                      </div>

                      {/* Score Summary */}
                      <div className="bg-[#ececf0] rounded-[10px] p-4 mb-6">
                        <div className="text-center">
                          <h2 className="text-neutral-950 mb-1">
                            {Object.entries(selectedAnswers).filter(([index, answer]) => 
                              answer === practiceQuestions[parseInt(index)].correctAnswer
                            ).length} / {practiceQuestions.length}
                          </h2>
                          <p className="text-sm text-[#717182]">Correct Answers</p>
                        </div>
                      </div>

                      {/* Question Review */}
                      <div className="space-y-4">
                        {practiceQuestions.map((question, index) => {
                          const userAnswer = selectedAnswers[index];
                          const isCorrect = userAnswer === question.correctAnswer;
                          const wasAnswered = userAnswer !== undefined;

                          return (
                            <div 
                              key={question.id} 
                              className={`border rounded-[10px] p-4 ${
                                !wasAnswered ? 'border-[rgba(0,0,0,0.1)]' :
                                isCorrect ? 'border-[#059669] bg-[#F0FDF4]' : 'border-[#DC2626] bg-[#FEF2F2]'
                              }`}
                            >
                              <div className="flex items-start gap-2 mb-2">
                                {wasAnswered && (
                                  isCorrect ? (
                                    <CheckCircle className="w-5 h-5 text-[#059669] shrink-0" />
                                  ) : (
                                    <X className="w-5 h-5 text-[#DC2626] shrink-0" />
                                  )
                                )}
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="text-xs">
                                      {question.module}
                                    </Badge>
                                    <span className="text-xs text-[#717182]">Question {index + 1}</span>
                                  </div>
                                  <p className="text-sm text-neutral-950 mb-3">{question.question}</p>
                                  
                                  <div className="space-y-2">
                                    {question.options.map((option, optIndex) => (
                                      <div 
                                        key={optIndex}
                                        className={`text-sm p-2 rounded-[8px] ${
                                          optIndex === question.correctAnswer
                                            ? 'bg-[#059669] text-white'
                                            : optIndex === userAnswer && !isCorrect
                                            ? 'bg-[#DC2626] text-white'
                                            : 'bg-white text-neutral-950'
                                        }`}
                                      >
                                        {option}
                                        {optIndex === question.correctAnswer && ' ✓'}
                                      </div>
                                    ))}
                                  </div>

                                  {!wasAnswered && (
                                    <p className="text-xs text-[#717182] mt-2">Not answered</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-neutral-950">Question {currentQuestionIndex + 1} of {practiceQuestions.length}</h3>
                          <p className="text-xs text-[#717182] mt-1">
                            {practiceQuestions[currentQuestionIndex].module}
                          </p>
                        </div>
                        <Button
                          onClick={handleResetPractice}
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 rounded-[8px] text-xs"
                        >
                          <X className="w-3 h-3 mr-1" />
                          Exit
                        </Button>
                      </div>

                      <div className="bg-[#ececf0] rounded-[10px] p-4">
                        <p className="text-sm text-neutral-950">
                          {practiceQuestions[currentQuestionIndex].question}
                        </p>
                      </div>

                      <RadioGroup
                        key={currentQuestionIndex}
                        value={selectedAnswers[currentQuestionIndex] !== undefined ? selectedAnswers[currentQuestionIndex].toString() : undefined}
                        onValueChange={(value) => handleAnswerSelect(currentQuestionIndex, parseInt(value))}
                        className="space-y-3"
                      >
                        {practiceQuestions[currentQuestionIndex].options.map((option, index) => (
                          <div 
                            key={index} 
                            className="flex items-center gap-3 p-3 border border-[rgba(0,0,0,0.1)] rounded-[8px] hover:bg-[#ececf0] transition-colors cursor-pointer"
                          >
                            <RadioGroupItem value={index.toString()} id={`option-${index}`} className="shrink-0" />
                            <Label 
                              htmlFor={`option-${index}`}
                              className="text-sm text-neutral-950 cursor-pointer flex-1"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>

                      <div className="flex items-center justify-between pt-4 border-t border-[rgba(0,0,0,0.1)]">
                        <Button
                          onClick={handlePreviousQuestion}
                          disabled={currentQuestionIndex === 0}
                          variant="outline"
                          className="h-9 px-4 rounded-[8px] text-sm"
                        >
                          Previous
                        </Button>
                        <p className="text-xs text-[#717182]">
                          {Object.keys(selectedAnswers).length} of {practiceQuestions.length} answered
                        </p>
                        <Button
                          onClick={handleNextQuestion}
                          className="bg-[#030213] text-white h-9 px-4 rounded-[8px] text-sm hover:bg-[#030213]/90"
                        >
                          {currentQuestionIndex === practiceQuestions.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Available Materials */}
          <div className="space-y-4">
            <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] p-4">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-[#030213]" />
                <h3 className="text-neutral-950">Available Materials</h3>
              </div>
              <p className="text-xs text-[#717182] mb-4">
                AI responses are based only on these completed materials:
              </p>
              <div className="space-y-3">
                {courseInfo[selectedCourse].materials.map((module) => (
                  <div key={module.id} className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-neutral-950">{module.title}</p>
                        <p className="text-xs text-[#717182]">{module.items.length} items</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Topics */}
            <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] p-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-[#030213]" />
                <h3 className="text-neutral-950">Key Topics</h3>
              </div>
              <div className="space-y-2">
                {courseInfo[selectedCourse].vocabulary.slice(0, 5).map((item, index) => (
                  <div key={index} className="p-2 bg-[#ececf0] rounded-[8px]">
                    <p className="text-xs text-neutral-950">{item.term}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[14px] p-4">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-4 h-4 text-[#030213]" />
                <h3 className="text-neutral-950">Tips</h3>
              </div>
              <div className="space-y-2 text-xs text-[#717182]">
                <p>• Ask specific questions about course topics</p>
                <p>• Reference module names for context</p>
                <p>• Request explanations or examples</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
