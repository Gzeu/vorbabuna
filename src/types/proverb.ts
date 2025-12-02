export interface Proverb {
  id: string;
  text: string;
  meaning?: string;
  imageUrl?: string;
  category?: string;
  region?: string;
  popularity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProverbSearchResult {
  proverbs: Proverb[];
  total: number;
  page: number;
  limit: number;
}
