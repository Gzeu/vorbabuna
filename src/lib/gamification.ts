/**
 * Gamification System
 * Achievements, challenges, streaks, leaderboards
 */

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  condition: (stats: UserStats) => boolean;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface UserStats {
  totalViews: number;
  totalShares: number;
  totalFavorites: number;
  streakDays: number;
  lastVisit: Date;
  categoriesExplored: Set<string>;
  regionsExplored: Set<string>;
  quizScore: number;
  quizAttempts: number;
  level: number;
  xp: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  target: number;
  current: number;
  reward: number; // XP points
  expiresAt: Date;
  completed: boolean;
}

export interface LearningPath {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  proverbs: string[]; // Proverb IDs
  completed: number;
  total: number;
  xpReward: number;
}

/**
 * All available achievements
 */
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_view',
    name: 'Prima Descoperire',
    description: 'Vezi primul proverb',
    icon: '👀',
    points: 10,
    tier: 'Bronze',
    condition: (stats) => stats.totalViews >= 1,
    unlocked: false
  },
  {
    id: 'explorer',
    name: 'Explorator',
    description: 'Vezi 50 de proverbe',
    icon: '🧭',
    points: 50,
    tier: 'Bronze',
    condition: (stats) => stats.totalViews >= 50,
    unlocked: false
  },
  {
    id: 'scholar',
    name: 'Înțelept',
    description: 'Vezi 200 de proverbe',
    icon: '📚',
    points: 100,
    tier: 'Silver',
    condition: (stats) => stats.totalViews >= 200,
    unlocked: false
  },
  {
    id: 'master',
    name: 'Maestru',
    description: 'Vezi 500 de proverbe',
    icon: '🏆',
    points: 250,
    tier: 'Gold',
    condition: (stats) => stats.totalViews >= 500,
    unlocked: false
  },
  {
    id: 'legend',
    name: 'Legendă',
    description: 'Vezi 1000 de proverbe',
    icon: '⭐',
    points: 500,
    tier: 'Platinum',
    condition: (stats) => stats.totalViews >= 1000,
    unlocked: false
  },
  {
    id: 'social_butterfly',
    name: 'Fluture Social',
    description: 'Distribuie 10 proverbe',
    icon: '🦋',
    points: 30,
    tier: 'Bronze',
    condition: (stats) => stats.totalShares >= 10,
    unlocked: false
  },
  {
    id: 'influencer',
    name: 'Influențator',
    description: 'Distribuie 50 de proverbe',
    icon: '📱',
    points: 100,
    tier: 'Gold',
    condition: (stats) => stats.totalShares >= 50,
    unlocked: false
  },
  {
    id: 'collector',
    name: 'Colecționar',
    description: 'Adaugă 20 de proverbe la favorite',
    icon: '❤️',
    points: 40,
    tier: 'Bronze',
    condition: (stats) => stats.totalFavorites >= 20,
    unlocked: false
  },
  {
    id: 'curator',
    name: 'Curator',
    description: 'Adaugă 50 de proverbe la favorite',
    icon: '💫',
    points: 100,
    tier: 'Silver',
    condition: (stats) => stats.totalFavorites >= 50,
    unlocked: false
  },
  {
    id: 'week_streak',
    name: 'Săptămâna Dedicată',
    description: 'Vizitează 7 zile la rând',
    icon: '🔥',
    points: 70,
    tier: 'Silver',
    condition: (stats) => stats.streakDays >= 7,
    unlocked: false
  },
  {
    id: 'month_streak',
    name: 'Luna Perfecției',
    description: 'Vizitează 30 de zile la rând',
    icon: '🌟',
    points: 300,
    tier: 'Gold',
    condition: (stats) => stats.streakDays >= 30,
    unlocked: false
  },
  {
    id: 'category_master',
    name: 'Maestru al Categoriilor',
    description: 'Explorează toate cele 12 categorii',
    icon: '🎯',
    points: 120,
    tier: 'Gold',
    condition: (stats) => stats.categoriesExplored.size >= 12,
    unlocked: false
  },
  {
    id: 'region_explorer',
    name: 'Călător Regional',
    description: 'Vizitează proverbe din toate cele 8 regiuni',
    icon: '🗺️',
    points: 150,
    tier: 'Gold',
    condition: (stats) => stats.regionsExplored.size >= 8,
    unlocked: false
  },
  {
    id: 'quiz_champion',
    name: 'Campion Quiz',
    description: 'Obține scor perfect la quiz',
    icon: '🧠',
    points: 100,
    tier: 'Silver',
    condition: (stats) => stats.quizScore >= 100,
    unlocked: false
  },
  {
    id: 'early_bird',
    name: 'Ciocară de Dimineață',
    description: 'Vizitează înainte de 7:00 AM',
    icon: '🌅',
    points: 25,
    tier: 'Bronze',
    condition: () => new Date().getHours() < 7,
    unlocked: false
  },
  {
    id: 'night_owl',
    name: 'Bufă de Noapte',
    description: 'Vizitează după 12:00 AM',
    icon: '🌙',
    points: 25,
    tier: 'Bronze',
    condition: () => new Date().getHours() >= 0 && new Date().getHours() < 5,
    unlocked: false
  }
];

/**
 * Calculate user level based on XP
 */
export function calculateLevel(xp: number): number {
  // Level formula: level = floor(sqrt(xp / 100))
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

/**
 * Calculate XP needed for next level
 */
export function xpForNextLevel(currentLevel: number): number {
  return (currentLevel * currentLevel) * 100;
}

/**
 * Check and unlock achievements
 */
export function checkAchievements(stats: UserStats): Achievement[] {
  const unlocked: Achievement[] = [];

  ACHIEVEMENTS.forEach(achievement => {
    if (!achievement.unlocked && achievement.condition(stats)) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date();
      unlocked.push(achievement);
    }
  });

  return unlocked;
}

/**
 * Generate daily challenges
 */
export function generateDailyChallenge(): Challenge {
  const challenges = [
    {
      title: 'Explorator Zilnic',
      description: 'Vezi 10 proverbe noi astăzi',
      target: 10,
      reward: 50
    },
    {
      title: 'Culegator de Înțelepciune',
      description: 'Adaugă 5 proverbe la favorite',
      target: 5,
      reward: 40
    },
    {
      title: 'Ambasador',
      description: 'Distribuie 3 proverbe',
      target: 3,
      reward: 35
    },
    {
      title: 'Maestru Quiz',
      description: 'Încearcă quiz-ul și obține peste 80%',
      target: 80,
      reward: 60
    },
    {
      title: 'Cercetător',
      description: 'Explorează 3 categorii diferite',
      target: 3,
      reward: 45
    }
  ];

  const random = challenges[Math.floor(Math.random() * challenges.length)];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return {
    id: `daily_${Date.now()}`,
    ...random,
    type: 'daily',
    current: 0,
    expiresAt: tomorrow,
    completed: false
  };
}

/**
 * Calculate streak days
 */
export function calculateStreak(lastVisit: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const last = new Date(lastVisit);
  last.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - last.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // If last visit was yesterday or today, continue streak
  return diffDays <= 1 ? 1 : 0;
}

/**
 * Get learning paths
 */
export function getLearningPaths(): LearningPath[] {
  return [
    {
      id: 'beginner',
      name: 'Începător - Proverbe Simple',
      level: 'Beginner',
      proverbs: [],
      completed: 0,
      total: 20,
      xpReward: 100
    },
    {
      id: 'intermediate',
      name: 'Intermediar - Înțelepciune Clasică',
      level: 'Intermediate',
      proverbs: [],
      completed: 0,
      total: 30,
      xpReward: 200
    },
    {
      id: 'advanced',
      name: 'Avansat - Filosofie Profundă',
      level: 'Advanced',
      proverbs: [],
      completed: 0,
      total: 50,
      xpReward: 500
    }
  ];
}
