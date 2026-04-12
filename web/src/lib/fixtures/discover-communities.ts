import type { DiscoverCommunity } from './discover-types'

export const featuredCommunities: DiscoverCommunity[] = [
  {
    id: 'fc-1',
    name: 'Voice Builders',
    owner: 'ElevenLabs',
    image: 'https://picsum.photos/seed/fc1/600/800',
    thumbnail: 'https://picsum.photos/seed/fc1t/144',
    members: '2.4k',
    programCount: 3,
    sessionsThisMonth: 12,
    description: 'The home for developers building with voice AI. Weekly office hours, launch events, and hands-on workshops with the ElevenLabs team.',
    programs: [
      { name: 'Launch Week', status: '5 sessions remaining', image: 'https://picsum.photos/seed/cp1/80' },
      { name: 'Weekly Office Hours', status: 'Every Thursday', image: 'https://picsum.photos/seed/cp2/80' },
      { name: 'Voice Hackathon', status: 'Starting May 1', image: 'https://picsum.photos/seed/cp3/80' },
    ],
  },
  {
    id: 'fc-2',
    name: 'AI Collective',
    owner: 'AI Collective',
    image: 'https://picsum.photos/seed/fc2/600/800',
    thumbnail: 'https://picsum.photos/seed/fc2t/144',
    members: '5.1k',
    programCount: 7,
    sessionsThisMonth: 18,
    description: 'The largest independent AI builder community. Founder meetups, demo nights, office hours, and hack sessions every week.',
    programs: [
      { name: 'Demo Night Series', status: 'Next: April 15', image: 'https://picsum.photos/seed/ac1/80' },
      { name: 'Founder Office Hours', status: 'Every Tuesday', image: 'https://picsum.photos/seed/ac2/80' },
    ],
  },
  {
    id: 'fc-3',
    name: 'Prompt Engineers',
    owner: 'Stanford AI Club',
    image: 'https://picsum.photos/seed/fc3/600/800',
    thumbnail: 'https://picsum.photos/seed/fc3t/144',
    members: '890',
    programCount: 2,
    sessionsThisMonth: 4,
    description: 'A student-run community focused on prompt engineering techniques, research papers, and hands-on workshops.',
    programs: [
      { name: 'Prompt Engineering Cohort', status: 'Week 3 of 8', image: 'https://picsum.photos/seed/pe1/80' },
      { name: 'Research Paper Club', status: 'Biweekly Fridays', image: 'https://picsum.photos/seed/pe2/80' },
    ],
  },
]
