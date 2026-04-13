'use client'

import PillButton from '@/components/ui/PillButton'

const FILTERS = ['All', 'AI Tools', 'Creators', 'Schools', 'Bootcamps', 'Live Now']

export default function FilterPills() {
  return (
    <div className="flex items-center gap-2 flex-wrap mb-7">
      {FILTERS.map((label) => (
        <PillButton key={label} label={label} active={label === 'All'} />
      ))}
    </div>
  )
}
