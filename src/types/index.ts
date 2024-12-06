export type MusicType = 'Instrumental' | 'Ballad' | 'Rock';

export type ContributorRole =
  | 'MainArtist'
  | 'FeaturedArtist'
  | 'Composer'
  | 'Lyricist'
  | 'MusicPublisher'
  | 'Producer'
  | 'Mixer'
  | 'Remixer';

export interface Contributor {
  contributorId: number;
  contributorName: string;
  contributorAlias: string;
  contributorAvatarUrl: string;
  contributorRole: ContributorRole;
}

export interface ContributorAssignment {
  role: ContributorRole;
  contributors: Contributor[];
}
