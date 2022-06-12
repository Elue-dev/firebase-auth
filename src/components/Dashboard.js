import { useState } from 'react'
import { Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [error, setError] = useState()
    const { user, logout, googleSignIn } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/login')
        }  catch(err) {
            setError(err.messsge)
        }
    }

  return (
    <>
        <Card>
            <Card.Body style={{ minWidth: '25vw'}}>
                <h2 className='text-center mb-4'>Dashboard</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                Welcome to your dashboard
                <strong>Email:</strong> {user.email} <br />
                {/* <Link to='/update-profile'  className='btn btn-primary w-100 mt-3'>Update Profile</Link> */}
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt2'>
            <Button variant='link' onClick={handleLogout}>Log Out</Button>
        </div>
    </>
  )
}
