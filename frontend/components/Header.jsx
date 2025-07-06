export default function Header({ user }) {
  return (
    <header className="bg-edu-accent text-gray-900 p-4 flex justify-between rounded-b-lg shadow">
      <h1 className="font-bold text-lg">EduVerse</h1>
      {user && <span>Привет, {user.name}</span>}
    </header>
  )
}
