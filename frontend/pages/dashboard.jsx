import { useEffect, useState } from 'react'
import Header from '../components/Header'

export default function Dashboard() {
  const [progress, setProgress] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { window.location.href = '/login'; return }
    fetch('http://localhost:5000/api/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (!res.ok) { throw new Error('') }
        return res.json()
      })
      .then(data => { setUser(data.user); setProgress(data.progress) })
      .catch(() => window.location.href = '/login')
  }, [])

  return (
    <div>
      <Header user={user} />
      <div className="p-4">
        <h2 className="text-xl mb-4">Ваш прогресс</h2>
        <ul className="list-disc pl-5">
          {progress.map(item => (
            <li key={item.lessonId}>{item.lessonTitle}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
