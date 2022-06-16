import { useState } from 'react'
import { Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [error, setError] = useState()
    const [message, setMessage] = useState('')
    const { user, logout, deleteAccount, auth } = useAuth()
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

    // async function handleDelete() {
    //     try {
    //         await deleteAccount(user.uid)
    //         setMessage('Successfully deleted account')
    //         window.setTimeout(() => {
    //             navigate('/signup')
    //         }, 4000)
    //     } catch(err)  {
    //         setError(err.message)
    //     }
    // }

  return (
    <>
        <Card>
            <Card.Body style={{ minWidth: '25vw'}}>
                <h2 className='text-center mb-4'>Dashboard</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                {message && <Alert variant='success'>{message}</Alert>}
                Welcome to your dashboard <br />
                <strong>Email:</strong> {user.email} <br />
                <img src={user.photoURL} />
                {/* <Link to='/update-profile'  className='btn btn-primary w-100 mt-3'>Update Profile</Link> */}
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt2'>
            <Button variant='link' onClick={handleLogout}>Log Out</Button>
        </div>
        {/* <div className='w-100 text-center mt2'>
            <Button variant='danger' onClick={handleDelete}>Delete Account</Button>
        </div> */}
        
    </>
  )
}
