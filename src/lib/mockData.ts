// Mock data for the Canvas LMS Extension prototype

import { getCourseColor as getCustomCourseColor } from './courseColorStore';

// Course color scheme - now uses custom colors from store
export const courseColors = {
  crn4020: {
    primary: '#3B82F6', // Blue
    light: '#DBEAFE',
    dark: '#1E40AF',
    bg: '#EFF6FF',
    foreground: '#FFFFFF',
  },
  cop4600: {
    primary: '#10B981', // Green
    light: '#D1FAE5',
    dark: '#047857',
    bg: '#ECFDF5',
    foreground: '#FFFFFF',
  },
  cis4930: {
    primary: '#F59E0B', // Orange
    light: '#FEF3C7',
    dark: '#D97706',
    bg: '#FFFBEB',
    foreground: '#0F172A',
  },
  cis4931: {
    primary: '#8B5CF6', // Purple
    light: '#EDE9FE',
    dark: '#6D28D9',
    bg: '#F5F3FF',
    foreground: '#FFFFFF',
  },
};

// Updated getCourseColor to use custom colors from store
export const getCourseColor = (courseId: string) => {
  return getCustomCourseColor(courseId);
};

export const mockCourses = [
  {
    id: 'crn4020',
    code: 'CRN4020',
    name: 'Software Engineering',
    instructor: 'Dr. Maya Patel',
    term: 'Fall 2025',
    progress: 71,
    color: courseColors.crn4020.primary,
  },
  {
    id: 'cop4600',
    code: 'COP4600',
    name: 'Operating Systems',
    instructor: 'Prof. Alan Richards',
    term: 'Fall 2025',
    progress: 58,
    color: courseColors.cop4600.primary,
  },
  {
    id: 'cis4930',
    code: 'CIS4930',
    name: 'User Experience Design',
    instructor: 'Dr. Elena Morales',
    term: 'Fall 2025',
    progress: 77,
    color: courseColors.cis4930.primary,
  },
  {
    id: 'cis4931',
    code: 'CIS4931',
    name: 'Human-Computer Interaction',
    instructor: 'Prof. James Liu',
    term: 'Fall 2025',
    progress: 64,
    color: courseColors.cis4931.primary,
  },
];

export const mockAssignments = [
  {
    id: 'a1',
    title: 'Sprint Planning Deliverable',
    course: 'CRN4020',
    courseId: 'crn4020',
    dueDate: 'Oct 8, 2025',
    type: 'Project',
    priority: 'high',
  },
  {
    id: 'a2',
    title: 'Process Synchronization Lab',
    course: 'COP4600',
    courseId: 'cop4600',
    dueDate: 'Oct 10, 2025',
    type: 'Lab',
    priority: 'medium',
  },
  {
    id: 'a3',
    title: 'Persona Research Presentation',
    course: 'CIS4930',
    courseId: 'cis4930',
    dueDate: 'Oct 12, 2025',
    type: 'Presentation',
    priority: 'high',
  },
  {
    id: 'a4',
    title: 'Heuristic Evaluation Report',
    course: 'CIS4931',
    courseId: 'cis4931',
    dueDate: 'Oct 15, 2025',
    type: 'Report',
    priority: 'medium',
  },
];

export const mockStudySuggestions = [
  {
    text: 'Sprint review for CRN4020 is in 3 days. Revisit your user stories and acceptance criteria.',
    action: 'flashcards',
    actionLabel: 'Generate Flashcards',
  },
  {
    text: 'Complete the COP4600 process scheduling worksheet before tomorrow\'s lab.',
    action: null,
    actionLabel: null,
  },
  {
    text: 'Your CIS4930 usability test plan is due soon. Review your interview notes.',
    action: null,
    actionLabel: null,
  },
];

export const mockUpcomingEvents = [
  {
    id: 'e1',
    title: 'Iteration 2 Demo',
    course: 'CRN4020',
    date: '2025-10-15',
    day: '15',
    month: 'Oct',
    time: '2:00 PM - 3:30 PM',
    type: 'presentation',
  },
  {
    id: 'e2',
    title: 'Quiz: Kernel Synchronization',
    course: 'COP4600',
    date: '2025-10-12',
    day: '12',
    month: 'Oct',
    time: '10:00 AM - 10:30 AM',
    type: 'quiz',
  },
  {
    id: 'e3',
    title: 'Prototype Critique Session',
    course: 'CIS4930',
    date: '2025-10-20',
    day: '20',
    month: 'Oct',
    time: '1:00 PM - 3:00 PM',
    type: 'presentation',
  },
  {
    id: 'e4',
    title: 'Field Observation Workshop',
    course: 'CIS4931',
    date: '2025-10-10',
    day: '10',
    month: 'Oct',
    time: '4:00 PM - 6:00 PM',
    type: 'study',
  },
  {
    id: 'e5',
    title: 'Capstone Release Demo',
    course: 'CRN4020',
    date: '2025-12-10',
    day: '10',
    month: 'Dec',
    time: '9:00 AM - 12:00 PM',
    type: 'exam',
  },
];

export const mockCourseMaterials = {
  modules: [
    {
      id: 'm1',
      title: 'Module 1: Introduction to Programming',
      description: 'Basic concepts and syntax',
      status: 'completed',
      items: [
        { title: 'Lecture: Programming Basics', type: 'video', completed: true, duration: '45 min', content: 'Introduction to programming fundamentals, variables, data types, and basic syntax.' },
        { title: 'Reading: Chapter 1-2', type: 'reading', completed: true, pages: '45 pages', content: 'Comprehensive introduction to computer science principles and programming logic.' },
        { title: 'Code Examples.pdf', type: 'file', completed: true, size: '2.3 MB', content: 'Sample code demonstrating basic programming concepts including loops, conditionals, and functions.' },
        { title: 'Quiz: Programming Fundamentals', type: 'quiz', completed: true, questions: '10', content: 'Assessment covering variables, data types, operators, and control structures.' },
      ],
    },
    {
      id: 'm2',
      title: 'Module 2: Data Structures',
      description: 'Arrays, Lists, and Trees',
      status: 'in-progress',
      items: [
        { title: 'Lecture: Arrays and Lists', type: 'video', completed: true, duration: '52 min', content: 'Deep dive into arrays, dynamic arrays, linked lists, and their time complexities. Covers implementation details and use cases.' },
        { title: 'Lecture: Trees and Graphs', type: 'video', completed: false, duration: '58 min', content: 'Exploration of tree data structures including binary trees, BSTs, and graph representations.' },
        { title: 'Reading: Chapter 3-4', type: 'reading', completed: true, pages: '68 pages', content: 'Detailed explanations of data structure implementations, memory management, and algorithm analysis.' },
        { title: 'Practice Problems', type: 'file', completed: false, size: '1.8 MB', content: 'Coding exercises for implementing stacks, queues, trees, and performing tree traversals.' },
        { title: 'Supplementary: Big O Notation', type: 'reading', completed: true, pages: '12 pages', content: 'Understanding time and space complexity, asymptotic analysis, and performance optimization.' },
        { title: 'Lab: Implementing a Binary Tree', type: 'file', completed: false, size: '856 KB', content: 'Step-by-step lab for creating and manipulating binary search trees with insert, delete, and search operations.' },
      ],
    },
    {
      id: 'm3',
      title: 'Module 3: Algorithms',
      description: 'Sorting and Searching',
      status: 'in-progress',
      items: [
        { title: 'Lecture: Sorting Algorithms', type: 'video', completed: true, duration: '61 min', content: 'Comprehensive overview of bubble sort, insertion sort, merge sort, quick sort, and heap sort with complexity analysis.' },
        { title: 'Reading: Chapter 5', type: 'reading', completed: false, pages: '54 pages', content: 'Algorithm design techniques, divide and conquer, and sorting algorithm implementations.' },
        { title: 'Lecture: Search Algorithms', type: 'video', completed: false, duration: '48 min', content: 'Linear search, binary search, and hash-based searching methods.' },
        { title: 'Algorithm Visualization Tool', type: 'file', completed: true, size: '3.2 MB', content: 'Interactive tool for visualizing how different sorting algorithms work step-by-step.' },
      ],
    },
    {
      id: 'm4',
      title: 'Module 4: Recursion and Dynamic Programming',
      description: 'Advanced problem-solving techniques',
      status: 'locked',
      items: [
        { title: 'Lecture: Recursion Basics', type: 'video', completed: false, duration: '55 min', content: 'Introduction to recursive thinking, base cases, and recursive case analysis.' },
        { title: 'Lecture: Dynamic Programming', type: 'video', completed: false, duration: '72 min', content: 'Memoization, tabulation, and solving optimization problems with DP.' },
        { title: 'Reading: Chapter 6-7', type: 'reading', completed: false, pages: '82 pages', content: 'Advanced recursion patterns and dynamic programming strategies.' },
      ],
    },
  ],
  assignments: [
    {
      id: 'ca1',
      title: 'Assignment 1: Hello World Program',
      description: 'Create your first program',
      dueDate: 'Sep 15, 2025',
      points: '10',
      type: 'Programming',
      status: 'submitted',
      score: '10/10',
    },
    {
      id: 'ca2',
      title: 'Assignment 2: Array Implementation',
      description: 'Implement basic array operations',
      dueDate: 'Oct 8, 2025',
      points: '25',
      type: 'Programming',
      status: 'pending',
      score: null,
    },
    {
      id: 'ca3',
      title: 'Midterm Project',
      description: 'Build a data structure library',
      dueDate: 'Nov 1, 2025',
      points: '100',
      type: 'Project',
      status: 'pending',
      score: null,
    },
  ],
};

export const mockFlashcards = [
  {
    id: 'fc1',
    question: 'What is the software development life cycle (SDLC)?',
    answer: 'The SDLC is the process for planning, creating, testing, and deploying software, typically covering discovery, requirements, design, implementation, validation, and maintenance.',
  },
  {
    id: 'fc2',
    question: 'What responsibilities does an operating system kernel manage?',
    answer: 'The kernel handles core responsibilities such as process scheduling, memory management, I/O coordination, and system call handling.',
  },
  {
    id: 'fc3',
    question: 'What is heuristic evaluation in UX?',
    answer: 'Heuristic evaluation is a usability inspection method where experts review a design against established usability principles to uncover issues quickly.',
  },
  {
    id: 'fc4',
    question: 'When should you use a low-fidelity prototype?',
    answer: 'Use low-fidelity prototypes early to explore layout and task flows quickly, gather feedback, and iterate before investing in detailed visuals or code.',
  },
  {
    id: 'fc5',
    question: 'What is an experience metric?',
    answer: 'Experience metrics, such as task success rate or time on task, quantify how effectively users achieve their goals and reveal where to improve the product.',
  },
];

// Organized flashcards by course and lesson
export const mockFlashcardsByCourse = {
  crn4020: {
    courseId: 'crn4020',
    courseName: 'CRN4020 - Software Engineering',
    lessons: [
      {
        id: 'lesson1',
        title: 'Agile Planning',
        flashcards: [
          {
            id: 'crn4020-l1-fc1',
            question: 'What is a user story?',
            answer: 'A user story is a short, simple description of a feature told from the perspective of the person who needs it, capturing who, what, and why.',
          },
          {
            id: 'crn4020-l1-fc2',
            question: 'What is the purpose of a sprint retrospective?',
            answer: 'A sprint retrospective is a meeting for the team to reflect on the past sprint, discuss what went well, what can improve, and agree on actionable changes.',
          },
        ],
      },
    ],
  },
  cop4600: {
    courseId: 'cop4600',
    courseName: 'COP4600 - Operating Systems',
    lessons: [
      {
        id: 'lesson1',
        title: 'Process Scheduling',
        flashcards: [
          {
            id: 'cop4600-l1-fc1',
            question: 'What is context switching?',
            answer: 'Context switching is the process of storing and restoring a CPU state so execution can resume from the same point later, enabling multitasking.',
          },
          {
            id: 'cop4600-l1-fc2',
            question: 'What does a round-robin scheduler do?',
            answer: 'Round-robin scheduling assigns a fixed time slice to each process in a cyclic order, giving each task a fair share of CPU time.',
          },
        ],
      },
    ],
  },
  cis4930: {
    courseId: 'cis4930',
    courseName: 'CIS4930 - User Experience Design',
    lessons: [
      {
        id: 'lesson1',
        title: 'User Research',
        flashcards: [
          {
            id: 'cis4930-l1-fc1',
            question: 'What is a persona?',
            answer: 'A persona is a research-based archetype representing the goals, behaviors, and pain points of a user segment.',
          },
          {
            id: 'cis4930-l1-fc2',
            question: 'What is the goal of a usability test?',
            answer: 'A usability test evaluates how easily users can accomplish tasks with a product, revealing friction points and opportunities to improve the experience.',
          },
        ],
      },
    ],
  },
  cis4931: {
    courseId: 'cis4931',
    courseName: 'CIS4931 - Human-Computer Interaction',
    lessons: [
      {
        id: 'lesson1',
        title: 'Prototyping Methods',
        flashcards: [
          {
            id: 'cis4931-l1-fc1',
            question: 'What is low-fidelity prototyping?',
            answer: 'Low-fidelity prototyping uses quick, inexpensive representations (like sketches or paper mockups) to explore layout and flow ideas early in design.',
          },
          {
            id: 'cis4931-l1-fc2',
            question: 'When should you run an accessibility audit?',
            answer: 'Run an accessibility audit during prototyping to ensure interactive patterns meet WCAG guidelines before development hardens them.',
          },
        ],
      },
    ],
  },
};

export const mockQuizQuestions = [
  {
    id: 'q1',
    question: 'Which ceremony marks the end of a Scrum sprint?',
    options: ['Sprint Review', 'Daily Standup', 'Backlog Refinement', 'Product Kickoff'],
    correctAnswer: 0,
  },
];

// Course content for AI parsing
export const mockCourseContent = {
  crn4020: {
    texts: [
      'Agile methodologies emphasize iterative delivery and close collaboration with stakeholders to respond to change quickly.',
      'A well-groomed product backlog provides prioritized work with clear acceptance criteria for the team.',
      'Software requirements include both functional capabilities and quality attributes such as performance and security.',
      'Architectural diagrams communicate system structure, showing components, interfaces, and data flows.',
      'Version control workflows like Gitflow coordinate parallel feature work and stable release branches.',
      'Continuous integration automates building and testing code whenever changes are merged.',
      'Peer reviews catch defects early and share knowledge across the team.',
      'Test plans specify what needs to be verified, how it will be validated, and the expected results.',
      'Retrospectives turn team observations into actionable improvements for the next iteration.',
      'Stakeholder demos ensure the product remains aligned with user needs and project goals.',
    ],
    vocabulary: [
      { term: 'Backlog', definition: 'Prioritized list of work items that describes future product changes.' },
      { term: 'Sprint', definition: 'A fixed-length iteration that produces a potentially shippable increment.' },
      { term: 'Acceptance Criteria', definition: 'Conditions that a feature must satisfy to be accepted by the product owner.' },
      { term: 'Continuous Integration', definition: 'Practice of automatically building and testing code whenever changes are committed.' },
      { term: 'Retrospective', definition: 'Meeting where the team reflects on the last iteration and plans improvements.' },
      { term: 'Definition of Done', definition: 'Shared checklist that clarifies when work is considered complete.' },
      { term: 'Stakeholder', definition: 'Anyone who is affected by or invested in the product being delivered.' },
      { term: 'Technical Debt', definition: 'Extra work created by prioritizing rapid delivery over code quality or structure.' },
      { term: 'Release Plan', definition: 'Roadmap that sequences features across upcoming iterations or milestones.' },
      { term: 'User Story', definition: 'Short description of functionality told from the user perspective.' },
    ],
  },
  cop4600: {
    texts: [
      'Operating systems provide an abstraction layer between hardware and user applications.',
      'Processes are isolated units of execution with their own address space and system resources.',
      'Threads share a process address space and enable concurrency within a single application.',
      'The scheduler decides which process should run on the CPU at any moment.',
      'Synchronization primitives like mutexes and semaphores prevent data races.',
      'Virtual memory lets processes use more memory than physically available by paging to disk.',
      'Page replacement algorithms balance performance with memory constraints.',
      'File systems organize data into directories, inodes, and blocks for persistent storage.',
      'Device drivers mediate communication between hardware and the operating system.',
      'System calls expose kernel services to user applications in a controlled way.',
    ],
    vocabulary: [
      { term: 'Kernel', definition: 'Core of the operating system that has complete control over hardware.' },
      { term: 'Process', definition: 'Running program instance with its own resources.' },
      { term: 'Thread', definition: 'Lightweight unit of execution that shares resources within a process.' },
      { term: 'Context Switch', definition: 'Operation of saving and restoring CPU state to switch between processes.' },
      { term: 'Semaphore', definition: 'Synchronization primitive used to control access to shared resources.' },
      { term: 'Virtual Memory', definition: 'Technique that gives processes the illusion of a large, contiguous memory space.' },
      { term: 'Paging', definition: 'Memory management scheme that maps virtual pages to physical frames.' },
      { term: 'System Call', definition: 'Controlled interface through which user programs request kernel services.' },
      { term: 'Deadlock', definition: 'State where processes wait indefinitely for resources held by each other.' },
      { term: 'Throughput', definition: 'Amount of work completed by the system in a given time frame.' },
    ],
  },
  cis4930: {
    texts: [
      'User experience design begins with understanding the people, context, and goals behind a product.',
      'Research methods such as interviews and contextual inquiry uncover user motivations and pain points.',
      'Affinity diagramming helps synthesize qualitative data into themes.',
      'Personas and journey maps communicate key user behaviors and scenarios to the team.',
      'Information architecture organizes content so that users can find what they need quickly.',
      'Wireframes explore layout and hierarchy before visual styling is applied.',
      'Prototypes range from low fidelity sketches to clickable high fidelity experiences.',
      'Usability testing validates whether designs enable users to complete tasks successfully.',
      'Design systems keep typography, color, components, and interaction patterns consistent.',
      'Accessibility ensures the experience works for people with diverse abilities and contexts.',
    ],
    vocabulary: [
      { term: 'Persona', definition: 'Fictional yet research-based character that represents a user segment.' },
      { term: 'Journey Map', definition: 'Visualization of user steps, emotions, and touchpoints across a task.' },
      { term: 'Affinity Map', definition: 'Clustering technique that groups research observations into themes.' },
      { term: 'Information Architecture', definition: 'Practice of organizing and labeling content to support findability and usability.' },
      { term: 'Wireframe', definition: 'Basic schematic that outlines layout and functionality without visual design detail.' },
      { term: 'Usability Testing', definition: 'Evaluation method where observers watch users attempt tasks with a product.' },
      { term: 'Design System', definition: 'Reusable set of standards, components, and guidelines for building products.' },
      { term: 'Accessibility', definition: 'Inclusive design practice that makes products usable by people of all abilities.' },
      { term: 'Prototype', definition: 'Simulation of a product experience used to explore or validate ideas.' },
      { term: 'Heuristic Evaluation', definition: 'Expert review that checks a design against usability principles.' },
    ],
  },
  cis4931: {
    texts: [
      'Human-computer interaction examines how people perceive, learn, and perform tasks with technology.',
      'Mental models influence how users expect an interface to behave.',
      'Interaction design balances discoverability, feedback, and consistency.',
      'Fitts\'s law models how pointing time relates to target size and distance.',
      'Cognitive load should be minimized by reducing unnecessary choices and steps.',
      'Accessibility guidelines ensure interfaces work for people with sensory, motor, or cognitive differences.',
      'Participatory design involves users as co-creators of solutions.',
      'Prototyping and evaluation cycles help teams refine interactions before development.',
      'Contextual factors such as environment, device, and social setting affect usability.',
      'Ethical HCI considers privacy, bias, and the impact of technology on society.',
    ],
    vocabulary: [
      { term: 'HCI', definition: 'Discipline focused on the design and evaluation of interactive systems for human use.' },
      { term: 'Mental Model', definition: 'User understanding of how a system works based on prior experiences.' },
      { term: 'Interaction Cost', definition: 'Effort required for a user to accomplish a task within an interface.' },
      { term: 'Cognitive Load', definition: 'Amount of mental effort being used in working memory.' },
      { term: 'Fitts\'s Law', definition: 'Predictive model describing the time to reach a target based on size and distance.' },
      { term: 'Feedback', definition: 'System response that communicates the result of user actions.' },
      { term: 'Affordance', definition: 'Perceived property that indicates how an element should be interacted with.' },
      { term: 'Participatory Design', definition: 'Design approach that actively involves users in the process.' },
      { term: 'Context of Use', definition: 'Situational factors that influence how and where an interface is used.' },
      { term: 'Ethical Design', definition: 'Practice of ensuring technology benefits users without causing harm.' },
    ],
  },
};

// API Integrations
export interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'productivity' | 'development' | 'note-taking' | 'collaboration';
  icon: string;
  color: string;
  connected: boolean;
  features: string[];
  apiUrl?: string;
}

export const mockIntegrations: Integration[] = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Sync assignments with GitHub repositories and track your coding progress',
    category: 'development',
    icon: 'Github',
    color: '#24292e',
    connected: true,
    features: [
      'Link assignments to repositories',
      'Track commit history',
      'View project progress',
      'Sync deadlines with milestones'
    ],
    apiUrl: 'https://api.github.com'
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Convert assignments into Jira tasks for better project management',
    category: 'productivity',
    icon: 'Trello',
    color: '#0052CC',
    connected: false,
    features: [
      'Create issues from assignments',
      'Sync due dates',
      'Track task progress',
      'Team collaboration'
    ],
    apiUrl: 'https://your-domain.atlassian.net'
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Export study materials and notes to your Notion workspace',
    category: 'note-taking',
    icon: 'FileText',
    color: '#000000',
    connected: true,
    features: [
      'Export flashcards',
      'Sync course materials',
      'Create study databases',
      'Share notes with classmates'
    ],
    apiUrl: 'https://api.notion.com'
  },
  {
    id: 'trello',
    name: 'Trello',
    description: 'Manage assignments as Trello cards with visual boards',
    category: 'productivity',
    icon: 'LayoutGrid',
    color: '#0079BF',
    connected: false,
    features: [
      'Create cards from assignments',
      'Visual task boards',
      'Due date reminders',
      'Progress tracking'
    ],
    apiUrl: 'https://api.trello.com'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Receive assignment notifications and study reminders in Slack',
    category: 'collaboration',
    icon: 'MessageSquare',
    color: '#4A154B',
    connected: true,
    features: [
      'Assignment notifications',
      'Study reminders',
      'Grade updates',
      'Team communication'
    ],
    apiUrl: 'https://slack.com/api'
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sync your study schedule and deadlines with Google Calendar',
    category: 'productivity',
    icon: 'Calendar',
    color: '#4285F4',
    connected: false,
    features: [
      'Auto-sync deadlines',
      'Study session scheduling',
      'Event reminders',
      'Calendar sharing'
    ],
    apiUrl: 'https://www.googleapis.com/calendar/v3'
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    description: 'Connect GitLab projects with course assignments and track CI/CD',
    category: 'development',
    icon: 'GitBranch',
    color: '#FC6D26',
    connected: false,
    features: [
      'Project synchronization',
      'Pipeline tracking',
      'Issue management',
      'Merge request notifications'
    ],
    apiUrl: 'https://gitlab.com/api/v4'
  },
  {
    id: 'todoist',
    name: 'Todoist',
    description: 'Manage assignments and study tasks with Todoist',
    category: 'productivity',
    icon: 'CheckSquare',
    color: '#E44332',
    connected: false,
    features: [
      'Task synchronization',
      'Priority management',
      'Progress tracking',
      'Productivity insights'
    ],
    apiUrl: 'https://api.todoist.com'
  }
];

