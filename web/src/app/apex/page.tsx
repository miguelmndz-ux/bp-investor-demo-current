'use client'

import { useState, useCallback } from 'react'
import HeroCard from '@/components/apex/HeroCard'
import PhTable from '@/components/apex/PhTable'
import FounderGrid from '@/components/apex/FounderGrid'
import LiveStatsPanel from '@/components/apex/LiveStatsPanel'
import AgentWorkflowLog from '@/components/apex/AgentWorkflowLog'
import OutreachDraftModal from '@/components/apex/OutreachDraftModal'
import ApexScanOverlay from '@/components/apex/ApexScanOverlay'
import SuccessToast from '@/components/ui/SuccessToast'
import { phProducts } from '@/lib/fixtures/products'
import { founders } from '@/lib/fixtures/founders'
import { workflowLog } from '@/lib/fixtures/workflowLog'

export default function ApexPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)

  const handleSend = useCallback(() => {
    setToastVisible(true)
  }, [])

  return (
    <>
      <ApexScanOverlay />
      <HeroCard draftCount={10} />
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-10 fade-up fade-up-1">
          <PhTable products={phProducts} onVeloPreview={() => setModalOpen(true)} />
          <FounderGrid founders={founders} />
        </div>
        <div className="col-span-4 space-y-8 fade-up fade-up-2">
          <LiveStatsPanel />
          <AgentWorkflowLog items={workflowLog} />
        </div>
      </div>
      {modalOpen && <OutreachDraftModal onClose={() => setModalOpen(false)} onSend={handleSend} />}
      {toastVisible && (
        <SuccessToast
          title="Outreach sent to Ajay Kumar"
          subtitle="5 channels delivered"
          onDismiss={() => setToastVisible(false)}
        />
      )}
    </>
  )
}
