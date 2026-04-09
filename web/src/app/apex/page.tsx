'use client'

import HeroCard from '@/components/apex/HeroCard'
import PhTable from '@/components/apex/PhTable'
import FounderGrid from '@/components/apex/FounderGrid'
import LiveStatsPanel from '@/components/apex/LiveStatsPanel'
import AgentWorkflowLog from '@/components/apex/AgentWorkflowLog'
import { phProducts } from '@/lib/fixtures/products'
import { founders } from '@/lib/fixtures/founders'
import { workflowLog } from '@/lib/fixtures/workflowLog'

export default function ApexPage() {
  return (
    <>
      <HeroCard draftCount={10} />
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-10 fade-up fade-up-1">
          <PhTable products={phProducts} />
          <FounderGrid founders={founders} />
        </div>
        <div className="col-span-4 space-y-8 fade-up fade-up-2">
          <LiveStatsPanel />
          <AgentWorkflowLog items={workflowLog} />
        </div>
      </div>
    </>
  )
}
