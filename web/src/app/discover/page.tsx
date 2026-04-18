'use client'

import { useState, useCallback } from 'react'
import FilterPills from '@/components/discover/FilterPills'
import TrendingPrograms from '@/components/discover/TrendingPrograms'
import SessionCarousel from '@/components/discover/SessionCarousel'
import FeaturedCommunities from '@/components/discover/FeaturedCommunities'
import PreviewPanel from '@/components/discover/PreviewPanel'
import { trendingPrograms } from '@/lib/fixtures/discover-programs'
import { trendingSessions, upcomingSessions } from '@/lib/fixtures/discover-sessions'
import { featuredCommunities } from '@/lib/fixtures/discover-communities'
import type { DiscoverSession, DiscoverProgram, DiscoverCommunity } from '@/lib/fixtures/discover-types'

type PreviewType = 'session' | 'program' | 'community' | null
type PreviewData = DiscoverSession | DiscoverProgram | DiscoverCommunity | null

export default function DiscoverPage() {
  const [panelOpen, setPanelOpen] = useState(false)
  const [previewType, setPreviewType] = useState<PreviewType>(null)
  const [previewData, setPreviewData] = useState<PreviewData>(null)

  const openPreview = useCallback((type: PreviewType, data: PreviewData) => {
    setPreviewType(type)
    setPreviewData(data)
    setPanelOpen(true)
  }, [])

  const closePreview = useCallback(() => {
    setPanelOpen(false)
  }, [])

  return (
    <div
      className="transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{ marginRight: panelOpen ? 380 : 0 }}
    >
      <FilterPills />
      <TrendingPrograms
        programs={trendingPrograms}
        onSelect={(p) => openPreview('program', p)}
      />
      <SessionCarousel
        title="Trending Today"
        sessions={trendingSessions}
        onSelect={(s) => openPreview('session', s)}
      />
      <SessionCarousel
        title="Upcoming This Week"
        sessions={upcomingSessions}
        onSelect={(s) => openPreview('session', s)}
      />
      <FeaturedCommunities
        communities={featuredCommunities}
        onSelect={(c) => openPreview('community', c)}
      />
      <PreviewPanel
        type={previewType}
        data={previewData}
        open={panelOpen}
        onClose={closePreview}
      />
    </div>
  )
}
