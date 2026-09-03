export interface CurriculumLesson {
  id: string;
  title: string;
  duration: string;
  isPreview?: boolean;
}

export interface CurriculumModule {
  id: string;
  title: string;
  lessonsCount: number;
  duration: string;
  lessons: CurriculumLesson[];
}

export interface CourseReview {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface CourseInstructor {
  name: string;
  title: string;
  avatar: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
  bio: string;
}

export interface CourseDetail {
  id: string;
  titleKey: string;
  defaultTitle: string;
  category: "Physics" | "Math" | "Chemistry" | "Biology" | "Technical & ICT";
  price: string;
  numericPrice: number;
  originalPrice?: string;
  duration: string;
  lectures: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  img: string;
  level: string;
  levelBg: string;
  levelColor: string;
  lastUpdated: string;
  language: string;
  shortDescriptionKey: string;
  defaultShortDesc: string;
  description: string[];
  learningOutcomes: string[];
  requirements: string[];
  features: string[];
  instructor: CourseInstructor;
  curriculum: CurriculumModule[];
  reviews: CourseReview[];
  faqs: CourseFAQ[];
}

export const COURSES_DATA: CourseDetail[] = [
  {
    id: "hsc-physics-1st",
    titleKey: "c1Title",
    defaultTitle: "SSC & HSC Physics 1st Paper Masterclass",
    category: "Physics",
    price: "৳2,500",
    numericPrice: 2500,
    originalPrice: "৳4,000",
    duration: "40h 30m",
    lectures: 50,
    rating: 4.8,
    reviewCount: 156,
    studentCount: 1280,
    img: "/course1.png",
    level: "All level",
    levelBg: "bg-purple-50",
    levelColor: "text-purple-600",
    lastUpdated: "August 2026",
    language: "Bangla",
    shortDescriptionKey: "c1ShortDesc",
    defaultShortDesc: "Master vector, kinematics, dynamics, work & energy with real-life application based concepts.",
    description: [
      "This comprehensive Physics 1st Paper course is specifically engineered to take students from fundamental physics concepts to advanced problem-solving techniques for HSC board examinations and university admission tests.",
      "With crystal-clear visualization, step-by-step mathematical derivations, and past 10-year board & admission question solutions, this course ensures 100% preparation with total confidence."
    ],
    learningOutcomes: [
      "Master all 10 chapters of HSC Physics 1st Paper with zero memorization",
      "Solve complex Vector calculus & Kinematics problems effortlessly",
      "Understand Newton's Laws, Work, Energy, and Gravitation in depth",
      "Solve board CQ, MCQ and University Admission (BUET, DU, Medical) questions",
      "Gain access to formula cheatsheets, lecture PDFs and chapter test quizzes"
    ],
    requirements: [
      "Basic understanding of SSC general mathematics and algebra",
      "Dedicated mindset to spend 4-5 hours per week watching lessons and practicing"
    ],
    features: [
      "50 HD Video Lectures (40+ Hours Content)",
      "Full Chapter Practice Sheet PDFs",
      "5 Board Model Tests & Solution Classes",
      "Dedicated Telegram / Forum Q&A Support",
      "Lifetime Unlimited Access",
      "Verified Certificate of Completion"
    ],
    instructor: {
      name: "Engr. Mahmudul Hasan Bostami",
      title: "Senior Physics Lecturer | Ex-BUET",
      avatar: "/avatar1.png",
      rating: 4.9,
      studentsCount: 15400,
      coursesCount: 12,
      bio: "Engr. Bostami has guided over 15,000+ HSC and admission candidates over the last 8 years. Famous for making physics intuitive and fun with real-world practical demonstrations."
    },
    curriculum: [
      {
        id: "mod-1",
        title: "Module 1: Physical World, Measurement & Vector",
        lessonsCount: 8,
        duration: "6h 15m",
        lessons: [
          { id: "les-1", title: "Introduction to Physical Quantities & Dimensions", duration: "45m", isPreview: true },
          { id: "les-2", title: "Vector Basics, Addition & Subtraction Rules", duration: "50m", isPreview: true },
          { id: "les-3", title: "Dot Product & Cross Product Applications", duration: "55m", isPreview: false },
          { id: "les-4", title: "River-Boat Problems & Relative Velocity Mastery", duration: "60m", isPreview: false },
          { id: "les-5", title: "Rain-Man Problem Solving Techniques", duration: "40m", isPreview: false }
        ]
      },
      {
        id: "mod-2",
        title: "Module 2: Newtonian Mechanics & Dynamics",
        lessonsCount: 10,
        duration: "8h 30m",
        lessons: [
          { id: "les-6", title: "Newton's Laws & Linear Momentum Conservation", duration: "50m", isPreview: false },
          { id: "les-7", title: "Banking of Roads & Circular Motion Dynamics", duration: "55m", isPreview: false },
          { id: "les-8", title: "Center of Mass, Torque & Moment of Inertia", duration: "65m", isPreview: false }
        ]
      },
      {
        id: "mod-3",
        title: "Module 3: Work, Energy, Power & Gravitation",
        lessonsCount: 9,
        duration: "7h 45m",
        lessons: [
          { id: "les-9", title: "Work done by Constant & Variable Forces", duration: "45m", isPreview: false },
          { id: "les-10", title: "Conservation of Energy & Spring Oscillations", duration: "55m", isPreview: false },
          { id: "les-11", title: "Kepler's Laws & Escape Velocity Calculations", duration: "50m", isPreview: false }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-1",
        name: "Tanvir Ahmed",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        date: "2 weeks ago",
        comment: "Bostami Sir's vector lectures cleared all my doubts! The river-boat problems used to terrify me, but now they are super easy."
      },
      {
        id: "rev-2",
        name: "Nusrat Jahan",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        date: "1 month ago",
        comment: "Best physics course online for HSC students. Highly recommended for BUET & University admission targeters!"
      }
    ],
    faqs: [
      {
        question: "How long will I have access to this course?",
        answer: "You will get lifetime access to all video lectures, notes, and future updates of this course once enrolled."
      },
      {
        question: "Can I ask questions if I don't understand a topic?",
        answer: "Yes! Every student gets access to our dedicated Q&A forum and discussion group where instructors answer daily."
      },
      {
        question: "Is there a certificate provided after completion?",
        answer: "Yes, upon completing 100% of the lessons and passing the module quizzes, you will receive a verifiable digital certificate."
      }
    ]
  },
  {
    id: "univ-physics-masterclass",
    titleKey: "c2Title",
    defaultTitle: "Revision Course for SSC 2027 Batch",
    category: "Physics",
    price: "৳3,000",
    numericPrice: 3000,
    originalPrice: "৳4,500",
    duration: "60h 15m",
    lectures: 75,
    rating: 4.9,
    reviewCount: 320,
    studentCount: 2150,
    img: "/course2.png",
    level: "Advanced",
    levelBg: "bg-orange-50",
    levelColor: "text-orange-500",
    lastUpdated: "August 2026",
    language: "Bangla",
    shortDescriptionKey: "c2ShortDesc",
    defaultShortDesc: "Intensive problem-solving course for BUET, DU, CKREU & Medical Admission candidates.",
    description: [
      "Prepare for Bangladesh's top engineering and varsity admission tests with high-yield physics short techniques, concept clearings, and rigorous problem-solving drills.",
      "Covers BUET, DU A-Unit, RUET, KUET, CUET, and GST past 20 years question patterns."
    ],
    learningOutcomes: [
      "Master short tricks & conceptual shortcuts for varsity MCQs",
      "Solve advanced multi-concept engineering written problems",
      "Speed optimization for 45-second MCQ answering technique",
      "Mock tests with ranking & detailed video solutions"
    ],
    requirements: [
      "HSC Physics syllabus completed or currently appearing in HSC"
    ],
    features: [
      "75 High-Intensity Admission Video Lectures",
      "20 Years BUET & DU Solved Question Bank",
      "10 Live Model Tests with All-Bangladesh Rank",
      "Direct Doubt Solve Sessions with Mentors",
      "Lifetime Access"
    ],
    instructor: {
      name: "Engr. Mahmudul Hasan Bostami",
      title: "Senior Physics Lecturer | Ex-BUET",
      avatar: "/avatar1.png",
      rating: 4.9,
      studentsCount: 15400,
      coursesCount: 12,
      bio: "Engr. Bostami has guided over 15,000+ HSC and admission candidates over the last 8 years."
    },
    curriculum: [
      {
        id: "mod-c2-1",
        title: "Module 1: Advanced Mechanics & Shortcut Tricks",
        lessonsCount: 12,
        duration: "10h 00m",
        lessons: [
          { id: "les-c2-1", title: "BUET Standard Kinematics Written Problems", duration: "50m", isPreview: true },
          { id: "les-c2-2", title: "Rotational Dynamics & Torque Hacks", duration: "60m", isPreview: true }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-c2-1",
        name: "Shakil Hossain",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        date: "3 weeks ago",
        comment: "This course got me into BUET EEE! The admission question hacks were unbelievable."
      }
    ],
    faqs: [
      {
        question: "Is this course suitable for HSC 2026 / 2027 students?",
        answer: "Yes, both HSC candidates and admission examinees will benefit immensely from the advanced concept building."
      }
    ]
  },
  {
    id: "hsc-math-admission",
    titleKey: "c3Title",
    defaultTitle: "HSC Higher Mathematics Admission Prep Special",
    category: "Math",
    price: "৳2,800",
    numericPrice: 2800,
    originalPrice: "৳4,200",
    duration: "55h 0m",
    lectures: 70,
    rating: 4.7,
    reviewCount: 184,
    studentCount: 1650,
    img: "/course1.png",
    level: "Intermediate",
    levelBg: "bg-blue-50",
    levelColor: "text-blue-500",
    lastUpdated: "July 2026",
    language: "Bangla",
    shortDescriptionKey: "c3ShortDesc",
    defaultShortDesc: "Complete Higher Math paper 1 & 2 preparation with admission focus.",
    description: [
      "Master Matrices, Trigonometry, Calculus, Coordinate Geometry, Complex Numbers, and Statics with step-by-step problem derivations."
    ],
    learningOutcomes: [
      "Master Calculus (Differentiation & Integration) from scratch",
      "Solve Conics, Polynomials, and Complex Numbers fast",
      "Excel in HSC Board CQ and Varsity admission tests"
    ],
    requirements: [
      "SSC General Math foundation"
    ],
    features: [
      "70 HD Video Classes",
      "Chapterwise Problem Sheets",
      "Formula Cheat Cards",
      "Lifetime Access"
    ],
    instructor: {
      name: "Dr. Rafiqul Islam",
      title: "Mathematics Professor & Mentor",
      avatar: "/avatar2.png",
      rating: 4.8,
      studentsCount: 11200,
      coursesCount: 8,
      bio: "12+ years of teaching Higher Math for board and university exams."
    },
    curriculum: [
      {
        id: "mod-c3-1",
        title: "Module 1: Calculus Foundations - Differentiation & Limits",
        lessonsCount: 15,
        duration: "12h 30m",
        lessons: [
          { id: "les-c3-1", title: "Limits & Continuity Core Concepts", duration: "50m", isPreview: true }
        ]
      }
    ],
    reviews: [],
    faqs: []
  },
  {
    id: "calculus-geometry",
    titleKey: "c4Title",
    defaultTitle: "Calculus & Geometry Foundation Masterclass",
    category: "Math",
    price: "৳1,500",
    numericPrice: 1500,
    originalPrice: "৳2,500",
    duration: "30h 45m",
    lectures: 40,
    rating: 4.6,
    reviewCount: 98,
    studentCount: 890,
    img: "/course1.png",
    level: "Beginner",
    levelBg: "bg-emerald-50",
    levelColor: "text-emerald-500",
    lastUpdated: "June 2026",
    language: "Bangla",
    shortDescriptionKey: "c4ShortDesc",
    defaultShortDesc: "Deep dive into visual calculus, straight lines, circles, and 3D geometry.",
    description: [
      "Build a rock-solid mathematical foundation in differential & integral calculus and coordinate geometry."
    ],
    learningOutcomes: [
      "Understand geometric intuition behind differentiation and integration",
      "Solve straight line, circle, and parabola equations with ease"
    ],
    requirements: [
      "Basic algebra knowledge"
    ],
    features: [
      "40 HD Video Lectures",
      "Interactive Visual Animations",
      "Practice Quiz Sets",
      "Lifetime Access"
    ],
    instructor: {
      name: "Dr. Rafiqul Islam",
      title: "Mathematics Professor & Mentor",
      avatar: "/avatar2.png",
      rating: 4.8,
      studentsCount: 11200,
      coursesCount: 8,
      bio: "12+ years of teaching Higher Math for board and university exams."
    },
    curriculum: [],
    reviews: [],
    faqs: []
  },
  {
    id: "chemistry-2nd-organic",
    titleKey: "c5Title",
    defaultTitle: "HSC Chemistry 2nd Paper Organic Chemistry",
    category: "Chemistry",
    price: "৳2,200",
    numericPrice: 2200,
    originalPrice: "৳3,500",
    duration: "45h 20m",
    lectures: 55,
    rating: 4.8,
    reviewCount: 215,
    studentCount: 1940,
    img: "/course1.png",
    level: "All level",
    levelBg: "bg-purple-50",
    levelColor: "text-purple-600",
    lastUpdated: "August 2026",
    language: "Bangla",
    shortDescriptionKey: "c5ShortDesc",
    defaultShortDesc: "Conquer organic reaction mechanisms, conversions, and synthesis with simple memory maps.",
    description: [
      "Organic chemistry is often considered the hardest part of HSC Chemistry. This course turns organic chemistry into your strongest subject using clear reaction maps and mechanisms."
    ],
    learningOutcomes: [
      "Master Aliphatic & Aromatic reaction mechanisms",
      "Learn 50+ essential organic conversions",
      "Ace HSC board CQs and admission test MCQs"
    ],
    requirements: [
      "General chemistry fundamentals"
    ],
    features: [
      "55 HD Video Lessons",
      "Reaction Mechanism Mindmaps PDF",
      "Chapterwise Board CQ Solutions",
      "Lifetime Access"
    ],
    instructor: {
      name: "Dr. S. K. Rahman",
      title: "Senior Chemistry Specialist | DU Alumnus",
      avatar: "/avatar3.png",
      rating: 4.9,
      studentsCount: 18900,
      coursesCount: 9,
      bio: "Renowned educator specializing in organic & physical chemistry for HSC and Admission."
    },
    curriculum: [],
    reviews: [],
    faqs: []
  },
  {
    id: "biology-crash",
    titleKey: "c6Title",
    defaultTitle: "HSC Biology Complete Syllabus Crash Course",
    category: "Biology",
    price: "৳2,000",
    numericPrice: 2000,
    originalPrice: "৳3,000",
    duration: "38h 10m",
    lectures: 48,
    rating: 4.7,
    reviewCount: 142,
    studentCount: 1100,
    img: "/course1.png",
    level: "Intermediate",
    levelBg: "bg-blue-50",
    levelColor: "text-blue-500",
    lastUpdated: "July 2026",
    language: "Bangla",
    shortDescriptionKey: "c6ShortDesc",
    defaultShortDesc: "Complete Zoology & Botany coverage with high quality diagrams and memory hacks.",
    description: [
      "Comprehensive crash course covering both Zoology and Botany papers with labeled diagram practice and high-yield topics."
    ],
    learningOutcomes: [
      "Master high-weightage topics in Botany & Zoology",
      "Learn diagram drawing techniques for maximum board exam marks",
      "Medical admission biology question bank analysis"
    ],
    requirements: [
      "HSC Biology student"
    ],
    features: [
      "48 Detailed Video Lessons",
      "Diagram & Flashcard Pack",
      "Medical Admission Mock Quizzes",
      "Lifetime Access"
    ],
    instructor: {
      name: "Dr. Anika Tabassum",
      title: "Medical Educator & Biology Specialist",
      avatar: "/avatar4.png",
      rating: 4.8,
      studentsCount: 9500,
      coursesCount: 6,
      bio: "DMC graduate passionate about making medical biology accessible to all students."
    },
    curriculum: [],
    reviews: [],
    faqs: []
  },
  {
    id: "hsc-ict-prep",
    titleKey: "c7Title",
    defaultTitle: "HSC ICT Board Prep & Practical Course",
    category: "Technical & ICT",
    price: "৳1,800",
    numericPrice: 1800,
    originalPrice: "৳2,800",
    duration: "35h 0m",
    lectures: 45,
    rating: 4.9,
    reviewCount: 260,
    studentCount: 2400,
    img: "/course1.png",
    level: "Beginner",
    levelBg: "bg-emerald-50",
    levelColor: "text-emerald-500",
    lastUpdated: "August 2026",
    language: "Bangla",
    shortDescriptionKey: "c7ShortDesc",
    defaultShortDesc: "Master C programming, HTML, database SQL, and number systems for HSC ICT.",
    description: [
      "Zero to hero course in HSC ICT covering Number Systems, Logic Gates, HTML Web Design, C Programming, and Database Management Systems."
    ],
    learningOutcomes: [
      "Write C programs with confidence for practical and board exams",
      "Build custom web pages using HTML",
      "Master Logic Gates and Number System conversions",
      "Solve past board questions and secure A+"
    ],
    requirements: [
      "No prior coding experience required"
    ],
    features: [
      "45 HD Lectures with live coding demos",
      "C Code Files & HTML Templates",
      "Board CQ & MCQ Bank",
      "Lifetime Access"
    ],
    instructor: {
      name: "Engr. Mahmudul Hasan Bostami",
      title: "Senior ICT & Software Mentor",
      avatar: "/avatar1.png",
      rating: 4.9,
      studentsCount: 15400,
      coursesCount: 12,
      bio: "Tech enthusiast and instructor helping thousands conquer HSC ICT easily."
    },
    curriculum: [],
    reviews: [],
    faqs: []
  }
];

export function getCourseById(id: string): CourseDetail | undefined {
  return COURSES_DATA.find((course) => course.id === id);
}
