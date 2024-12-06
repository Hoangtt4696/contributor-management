export type ContributorRole =
  | 'MainArtist'
  | 'FeaturedArtist'
  | 'Composer'
  | 'Lyricist'
  | 'MusicPublisher'
  | 'Producer'
  | 'Mixer'
  | 'Remixer';

export type Contributor = {
  contributorId: number;
  contributorName: string;
  contributorAlias: string;
  contributorAvatarUrl: string;
  contributorRole: ContributorRole;
};

export const mockContributors: Contributor[] = [
  {
    contributorId: 1,
    contributorName: 'John Doe',
    contributorAlias: 'JD',
    contributorAvatarUrl: 'https://via.placeholder.com/150',
    contributorRole: 'MainArtist',
  },
  {
    contributorId: 2,
    contributorName: 'Jane Smith',
    contributorAlias: 'JS',
    contributorAvatarUrl: 'https://via.placeholder.com/150',
    contributorRole: 'MainArtist',
  },
  {
    contributorId: 3,
    contributorName: 'Mike Johnson',
    contributorAlias: 'MJ',
    contributorAvatarUrl: 'https://via.placeholder.com/150',
    contributorRole: 'FeaturedArtist',
  },
  {
    contributorId: 4,
    contributorName: 'Emily Davis',
    contributorAlias: 'ED',
    contributorAvatarUrl: 'https://via.placeholder.com/150',
    contributorRole: 'FeaturedArtist',
  },
  {
    contributorId: 5,
    contributorName: 'Chris Wilson',
    contributorAlias: 'CW',
    contributorAvatarUrl: 'https://via.placeholder.com/150',
    contributorRole: 'Composer',
  },
  {
    contributorId: 6,
    contributorName: 'Sarah Brown',
    contributorAlias: 'SB',
    contributorAvatarUrl: 'https://via.placeholder.com/150',
    contributorRole: 'Composer',
  },
  {
    contributorId: 7,
    contributorName: 'Robert Taylor',
    contributorAlias: 'RT',
    contributorAvatarUrl: 'https://via.placeholder.com/150',
    contributorRole: 'Lyricist',
  },
  {
    contributorId: 8,
    contributorName: 'Laura Martin',
    contributorAlias: 'LM',
    contributorAvatarUrl: 'https://via.placeholder.com/150',
    contributorRole: 'Lyricist',
  },
  {
    contributorId: 9,
    contributorName: 'William Anderson',
    contributorAlias: 'WA',
    contributorAvatarUrl: 'https://via.placeholder.com/150',
    contributorRole: 'MusicPublisher',
  },
  {
    contributorId: 10,
    contributorName: 'Natalie Clark',
    contributorAlias: 'NC',
    contributorAvatarUrl: 'https://via.placeholder.com/150',
    contributorRole: 'MusicPublisher',
  },
  {
    contributorId: 11,
    contributorName: 'Daniel Thomas',
    contributorAlias: 'DT',
    contributorAvatarUrl: 'https://via.placeholder.com/150',
    contributorRole: 'Producer',
  },
  {
    contributorId: 12,
    contributorName: 'Sophia Moore',
    contributorAlias: 'SM',
    contributorAvatarUrl: 'https://via.placeholder.com/150',
    contributorRole: 'Producer',
  },
  {
    contributorId: 13,
    contributorName: 'Anthony Harris',
    contributorAlias: 'AH',
    contributorAvatarUrl: 'https://via.placeholder.com/150',
    contributorRole: 'Mixer',
  },
  {
    contributorId: 14,
    contributorName: 'Olivia Martin',
    contributorAlias: 'OM',
    contributorAvatarUrl: 'https://via.placeholder.com/150',
    contributorRole: 'Mixer',
  },
  {
    contributorId: 15,
    contributorName: 'Henry White',
    contributorAlias: 'HW',
    contributorAvatarUrl: 'https://via.placeholder.com/150',
    contributorRole: 'Remixer',
  },
  {
    contributorId: 16,
    contributorName: 'Amelia Hall',
    contributorAlias: 'AH',
    contributorAvatarUrl: 'https://via.placeholder.com/150',
    contributorRole: 'Remixer',
  },
];
