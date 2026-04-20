'use client'

import { useState } from 'react'
import HeroCard from '@/components/apex/HeroCard'
import PhTable from '@/components/apex/PhTable'
import FounderGrid from '@/components/apex/FounderGrid'
import LiveStatsPanel from '@/components/apex/LiveStatsPanel'
import AgentWorkflowLog from '@/components/apex/AgentWorkflowLog'
import OutreachDraftModal from '@/components/apex/OutreachDraftModal'
import ApexScanOverlay from '@/components/apex/ApexScanOverlay'
import { phProducts } from '@/lib/fixtures/products'
import { founders } from '@/lib/fixtures/founders'
import { workflowLog } from '@/lib/fixtures/workflowLog'

export default function ApexPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <ApexScanOverlay />
      <HeroCard draftCount={10} />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
        <div className="order-1 col-span-1 md:col-start-1 md:col-span-8 fade-up fade-up-1">
          <PhTable products={phProducts} onVeloPreview={() => setModalOpen(true)} />
        </div>
        <div className="order-2 col-span-1 md:col-start-9 md:col-span-4 md:row-span-2 space-y-8 fade-up fade-up-2">
          <LiveStatsPanel />
          <AgentWorkflowLog items={workflowLog} />
        </div>
        <div className="order-3 col-span-1 md:col-start-1 md:col-span-8 fade-up fade-up-3">
          <FounderGrid founders={founders} onOutreachDraft={() => setModalOpen(true)} />
        </div>
      </div>
      {modalOpen && <OutreachDraftModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
