import SideNav from './SideNav'
import TopNav from './TopNav'

interface AppShellProps {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <>
      <SideNav />
      <TopNav />
      <main className="ml-20 pt-24 p-12">
        <div className="max-w-[1400px] mx-auto space-y-10">
          {children}
        </div>
      </main>
    </>
  )
}
