/**
 * Community Features
 * Comments, collections, translations, moderation
 */

export interface Comment {
  id: string;
  proverbId: string;
  userId: string;
  username: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  parentId?: string; // For threaded comments
  replies?: Comment[];
  flagged: boolean;
}

export interface Collection {
  id: string;
  userId: string;
  username: string;
  title: string;
  description: string;
  proverbIds: string[];
  isPublic: boolean;
  followers: number;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  thumbnail?: string;
}

export interface Translation {
  id: string;
  proverbId: string;
  language: string;
  translatedText: string;
  translatedMeaning: string;
  userId: string;
  username: string;
  votes: number;
  verified: boolean;
  createdAt: Date;
}

export interface UserReputation {
  userId: string;
  username: string;
  points: number;
  level: number;
  badges: string[];
  contributionCount: number;
  helpfulVotes: number;
  verifiedTranslations: number;
}

/**
 * Add comment to proverb
 */
export function createComment(
  proverbId: string,
  userId: string,
  username: string,
  text: string,
  parentId?: string
): Comment {
  // Content moderation
  const moderatedText = moderateContent(text);

  return {
    id: generateId(),
    proverbId,
    userId,
    username,
    text: moderatedText,
    createdAt: new Date(),
    updatedAt: new Date(),
    likes: 0,
    parentId,
    flagged: false
  };
}

/**
 * Create user collection
 */
export function createCollection(
  userId: string,
  username: string,
  title: string,
  description: string,
  isPublic: boolean = true
): Collection {
  return {
    id: generateId(),
    userId,
    username,
    title,
    description,
    proverbIds: [],
    isPublic,
    followers: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: extractTags(title + ' ' + description)
  };
}

/**
 * Add proverb to collection
 */
export function addToCollection(
  collection: Collection,
  proverbId: string
): Collection {
  if (!collection.proverbIds.includes(proverbId)) {
    collection.proverbIds.push(proverbId);
    collection.updatedAt = new Date();
  }
  return collection;
}

/**
 * Create translation
 */
export function createTranslation(
  proverbId: string,
  language: string,
  translatedText: string,
  translatedMeaning: string,
  userId: string,
  username: string
): Translation {
  return {
    id: generateId(),
    proverbId,
    language,
    translatedText,
    translatedMeaning,
    userId,
    username,
    votes: 0,
    verified: false,
    createdAt: new Date()
  };
}

/**
 * Moderate content using AI and rules
 */
export function moderateContent(text: string): string {
  // Remove offensive words
  const offensiveWords = ['spam', 'ad', 'link'];
  let moderated = text;

  offensiveWords.forEach(word => {
    const regex = new RegExp(word, 'gi');
    moderated = moderated.replace(regex, '***');
  });

  // Limit length
  if (moderated.length > 500) {
    moderated = moderated.substring(0, 497) + '...';
  }

  return moderated;
}

/**
 * Extract tags from text
 */
function extractTags(text: string): string[] {
  const words = text.toLowerCase().split(/\s+/);
  const commonWords = ['de', 'la', 'in', 'și', 'cu', 'un', 'o'];
  
  return words
    .filter(word => word.length > 3 && !commonWords.includes(word))
    .slice(0, 5);
}

/**
 * Generate unique ID
 */
function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Calculate user reputation
 */
export function calculateReputation(
  contributionCount: number,
  helpfulVotes: number,
  verifiedTranslations: number
): UserReputation {
  const points = (
    contributionCount * 10 +
    helpfulVotes * 5 +
    verifiedTranslations * 20
  );

  const level = Math.floor(points / 100) + 1;

  const badges: string[] = [];
  if (contributionCount >= 10) badges.push('Contributor');
  if (helpfulVotes >= 50) badges.push('Helper');
  if (verifiedTranslations >= 5) badges.push('Translator');
  if (level >= 10) badges.push('Expert');

  return {
    userId: '',
    username: '',
    points,
    level,
    badges,
    contributionCount,
    helpfulVotes,
    verifiedTranslations
  };
}

/**
 * Get popular collections
 */
export function getPopularCollections(collections: Collection[]): Collection[] {
  return collections
    .filter(c => c.isPublic)
    .sort((a, b) => b.followers - a.followers)
    .slice(0, 10);
}

/**
 * Search collections
 */
export function searchCollections(
  collections: Collection[],
  query: string
): Collection[] {
  const lowerQuery = query.toLowerCase();
  
  return collections.filter(collection =>
    collection.title.toLowerCase().includes(lowerQuery) ||
    collection.description.toLowerCase().includes(lowerQuery) ||
    collection.tags.some(tag => tag.includes(lowerQuery))
  );
}

/**
 * Vote on translation
 */
export function voteTranslation(
  translation: Translation,
  upvote: boolean
): Translation {
  translation.votes += upvote ? 1 : -1;
  
  // Auto-verify if enough positive votes
  if (translation.votes >= 5) {
    translation.verified = true;
  }

  return translation;
}

/**
 * Flag inappropriate comment
 */
export function flagComment(comment: Comment, reason: string): Comment {
  comment.flagged = true;
  console.log(`Comment ${comment.id} flagged: ${reason}`);
  return comment;
}

/**
 * Get comment thread
 */
export function buildCommentThread(comments: Comment[]): Comment[] {
  const commentMap = new Map<string, Comment>();
  const rootComments: Comment[] = [];

  // First pass: create map
  comments.forEach(comment => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  // Second pass: build tree
  comments.forEach(comment => {
    const commentWithReplies = commentMap.get(comment.id)!;
    
    if (comment.parentId) {
      const parent = commentMap.get(comment.parentId);
      if (parent) {
        parent.replies!.push(commentWithReplies);
      }
    } else {
      rootComments.push(commentWithReplies);
    }
  });

  return rootComments;
}
