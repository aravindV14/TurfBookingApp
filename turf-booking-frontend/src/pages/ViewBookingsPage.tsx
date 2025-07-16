import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface Booking {
  id: number
  slotStart: string
  slotEnd: string
}

const ViewBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/')
        return
      }

      try {
        const response = await axios.get('http://localhost:5046/api/Booking/my', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setBookings(response.data)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch bookings. Please try again.')
      }
    }

    fetchBookings()
  }, [navigate])

  return (
    <div style={styles.container}>
      <h2>Your Bookings</h2>
      {error && <p style={styles.error}>{error}</p>}
      <ul style={styles.list}>
        {bookings.map((b) => (
          <li key={b.id} style={styles.item}>
            <strong>Start:</strong> {new Date(b.slotStart).toLocaleString()} <br />
            <strong>End:</strong> {new Date(b.slotEnd).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  error: {
    color: 'red',
    textAlign: 'center' as const,
    marginBottom: '1rem'
  },
  list: {
    listStyle: 'none' as const,
    padding: 0
  },
  item: {
    padding: '1rem',
    borderBottom: '1px solid #eee'
  }
}

export default ViewBookingsPage
