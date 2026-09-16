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
  }
];

export function getCourseById(id: string): CourseDetail | undefined {
  return COURSES_DATA.find((course) => course.id === id);
}
