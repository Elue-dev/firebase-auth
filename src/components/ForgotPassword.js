import { useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions (Ensure to check spam folder)')
            window.setTimeout(() => {
                navigate('/login')
            }, 4000)
        } catch (err){
               setError(err.message)
        }

        setLoading(false)
    }

  return (
    <>
        <Card>
            <Card.Body style={{ minWidth: '25vw'}}>
                <h2 className='text-center mb-4'>Password Reset</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                {message && <Alert variant='success'>{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required></Form.Control>
                    </Form.Group>

                    <Button disabled={loading} className='w-100 mt-2' type='submit'>Reset Password</Button>
                </Form>
            </Card.Body>
            <div className='w-100 text-center mb-4'> <Link to='/signup'>Login</Link>
            </div>
            <div className='w-100 text-center mt2'>
                Need an account? <Link to='/signup'>Sign Up</Link>
            </div>
        </Card>
    </>
  )
}