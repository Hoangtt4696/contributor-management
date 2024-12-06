import { ContributorRole, MusicType } from '@/types';

export const requiredRoles: ContributorRole[] = [
  'MainArtist',
  'Composer',
  'MusicPublisher',
  'Producer',
  'Mixer',
];

export const getRoles = (
  musicType: MusicType
): { role: ContributorRole; label: string; required: boolean }[] => [
  { role: 'MainArtist', label: 'Main artist', required: true },
  { role: 'FeaturedArtist', label: 'Featured artist', required: false },
  { role: 'Composer', label: 'Composer', required: true },
  { role: 'Lyricist', label: 'Lyricist', required: musicType === 'Instrumental' ? false : true },
  { role: 'MusicPublisher', label: 'Music Publisher', required: true },
  { role: 'Producer', label: 'Producer', required: true },
  { role: 'Mixer', label: 'Mixer', required: true },
  { role: 'Remixer', label: 'Remixer', required: false },
];
