export interface Lesson {
  id: string;
  number: number;
  title: string;
  duration: string;
  durationSeconds: number;
}

export interface VocabWord {
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  timestamp?: string;
  timestampSeconds?: number;
  example?: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  artwork: string;
  accentColor: string;
  gradientStart: string;
  gradientEnd: string;
  lessonCount: number;
  totalDuration: string;
  author: string;
  lessons: Lesson[];
  vocabulary: VocabWord[];
}

export interface RecentItem {
  courseId: string;
  lessonId: string;
  lessonTitle: string;
  courseName: string;
  artwork: string;
  duration: string;
  isActive?: boolean;
}

export interface PlaybackState {
  isPlaying: boolean;
  currentCourse: Course | null;
  currentLesson: Lesson | null;
  currentTime: number;
  duration: number;
  speed: number;
}
