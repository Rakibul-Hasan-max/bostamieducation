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
    id: "univ-physics-masterclass",
    titleKey: "c2Title",
    defaultTitle: "Revision Course for SSC 2027 Batch",
    category: "Physics",
    price: "৳1500",
    numericPrice: 1500,
    originalPrice: "৳5000",
    duration: "60h 15m",
    lectures: 75,
    rating: 4.9,
    reviewCount: 320,
    studentCount: 2150,
    img: "/course1.png",
    level: "Advanced",
    levelBg: "bg-orange-50",
    levelColor: "text-orange-500",
    lastUpdated: "August 2026",
    language: "Bangla",
    shortDescriptionKey: "c2ShortDesc",
    defaultShortDesc: "Intensive problem-solving and revision course for SSC 2027 Batch",
    description: [
      "This course is designed to help SSC 2027 batch students prepare for the SSC exam. It covers Physics, Chemistry, Genaral Math & Higher Math subjects with conceptual clarity, problem solving, and exam-focused selected topics. It also includes short hand tricks to save time in exam hall and intensive revision classes for last minute preparation."
    ],
    learningOutcomes: [
      "Deep dive into Physics, Chemistry, Genaral Math & Higher Math subject",
      "Problem solving with conceptual clarity include CQ, SQ & MCQ",
      "Interactive learning with exam focused selected topics",
      "Intensive revision classes for last minute preparation with Short hand tricks"
    ],
    requirements: [
      "SSC exam candidate for 2027 batch"
    ],
    features: [
      "75 High-Intensity Admission Video Lectures",
      "20 Years BUET & DU Solved Question Bank",
      "10 Live Model Tests with All-Bangladesh Rank",
      "Direct Doubt Solve Sessions with Mentors",
      "Lifetime Access"
    ],
    instructor: {
      name: "Bayzid Bostami",
      title: "Physics",
      avatar: "/avatar1.png",
      rating: 4.9,
      studentsCount: 100,
      coursesCount: 12,
      bio: "Bayzid Bostami has guided over 100+ SSC students in 4 years."
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
        comment: "This course got me into GPA-5 in my SSC exam"
      }
    ],
    faqs: [
      {
        question: "Is this course suitable for SSC 2028 students?",
        answer: "Yes, both SSC 2027 & 2028 candidates will benefit immensely from the advanced concept building."
      }
    ]
  },
  {
    id: "class-9-10-physics-basic-to-advanced",
    titleKey: "c1Title",
    defaultTitle: "Class 9-10 Physics Basic to Advanced - Complete Course",
    category: "Physics",
    price: "৳1200",
    numericPrice: 1200,
    originalPrice: "৳4000",
    duration: "45h 30m",
    lectures: 60,
    rating: 4.9,
    reviewCount: 245,
    studentCount: 1890,
    img: "/course2.png",
    level: "Beginner",
    levelBg: "bg-blue-50",
    levelColor: "text-blue-600",
    lastUpdated: "September 2026",
    language: "Bangla",
    shortDescriptionKey: "c1ShortDesc",
    defaultShortDesc: "Complete Class 9-10 Physics foundation course covering basic principles to advanced board exam prep.",
    description: [
      "Master Class 9 & 10 Physics from basic concepts to board question solving with clear explanations, visual experiments, and real-life applications.",
      "Covers all chapters of NCTB Class 9-10 Physics syllabus with MCQ hacks and creative question (CQ) mastery."
    ],
    learningOutcomes: [
      "Clear fundamental concepts of Motion, Force, Work, Power & Energy",
      "Solve board exam creative questions (CQ) with full marks techniques",
      "Master mathematical formulas (F=ma, E=mc², V=u+at) with step-by-step problem solving",
      "Chapter-wise MCQ shortcuts and model test practice"
    ],
    requirements: [
      "Class 9 or 10 science student or SSC candidate"
    ],
    features: [
      "60 Foundation & Advanced Video Lectures",
      "Chapter-wise Lecture Sheet PDFs",
      "SSC Board Past 10 Years Solved Questions",
      "Interactive Doubt Solving Sessions",
      "Full Syllabus Model Tests"
    ],
    instructor: {
      name: "Bayzid Bostami",
      title: "Physics",
      avatar: "/avatar1.png",
      rating: 4.9,
      studentsCount: 15400,
      coursesCount: 12,
      bio: "Bayzid Bostami has guided over 100+ SSC students in 4 years."
    },
    curriculum: [
      {
        id: "mod-c1-1",
        title: "Module 1: Physical Quantities, Measurement & Motion",
        lessonsCount: 10,
        duration: "8h 30m",
        lessons: [
          { id: "les-c1-1", title: "Units, Dimensions & Measurement Hacks", duration: "45m", isPreview: true },
          { id: "les-c1-2", title: "Equations of Motion (V = u + at, s = ut + 1/2at²)", duration: "55m", isPreview: true }
        ]
      },
      {
        id: "mod-c1-2",
        title: "Module 2: Force, Work, Power & Energy",
        lessonsCount: 12,
        duration: "9h 45m",
        lessons: [
          { id: "les-c1-3", title: "Newton's Laws of Motion & Momentum", duration: "50m", isPreview: false },
          { id: "les-c1-4", title: "Kinetic & Potential Energy Problem Solving", duration: "60m", isPreview: false }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-c1-1",
        name: "Tanvir Ahmed",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        date: "1 week ago",
        comment: "The best Physics course for SSC! Every single concept is crystal clear now."
      }
    ],
    faqs: [
      {
        question: "Is this course suitable for both Class 9 and 10 students?",
        answer: "Yes! It starts from the absolute basics of Class 9 and progresses to complete SSC exam preparation."
      }
    ]
  }
];

export function getCourseById(id: string): CourseDetail | undefined {
  return COURSES_DATA.find((course) => course.id === id);
}
