import Header from './Header'

export default function Layout({ children, user }) {
  return (
    <div className="min-h-screen font-mont bg-edu-bg text-gray-800">
      <Header user={user} />
      <main className="p-4">{children}</main>
    </div>
  )
}
