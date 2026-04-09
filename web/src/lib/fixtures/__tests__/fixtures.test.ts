import { describe, it, expect } from 'vitest'
import { communities } from '../communities'
import { phProducts } from '../products'
import { founders } from '../founders'
import { workflowLog } from '../workflowLog'

describe('fixtures', () => {
  it('communities has 8 entries', () => {
    expect(communities).toHaveLength(8)
  })
  it('every community has required fields', () => {
    communities.forEach(c => {
      expect(c.name).toBeTruthy()
      expect(c.href).toBeTruthy()
      expect(c.avatar).toBeTruthy()
      expect(['creator', 'community']).toContain(c.type)
    })
  })
  it('phProducts has 10 entries', () => {
    expect(phProducts).toHaveLength(10)
  })
  it('founders has 6 entries', () => {
    expect(founders).toHaveLength(6)
  })
  it('workflowLog has 5 entries', () => {
    expect(workflowLog).toHaveLength(5)
  })
  it('one workflowLog item is pending', () => {
    const pending = workflowLog.filter(w => w.status === 'pending')
    expect(pending).toHaveLength(1)
  })
})
