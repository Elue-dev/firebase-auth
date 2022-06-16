import { useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/login')
        } catch (err){
            if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
                setError('Email already in use')
            }
            if (err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                setError('Password should be at least 6 characters')
            }
            if (err.message === 'Firebase: Error (auth/invalid-email).') {
                setError('Invalid email')
            }
            if (err.message === 'Firebase: Error (auth/network-request-failed).') {
                setError('Please check your internet connection')
            }
        }

        setLoading(false)
    }

  return (
    <>
        <Card>
            <Card.Body style={{ minWidth: '25vw'}}>
                <h2 className='text-center mb-4'>Sign Up</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required></Form.Control>
                    </Form.Group>

                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required></Form.Control>
                    </Form.Group>

                    <Form.Group id='password-confirm'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef} required></Form.Control>
                    </Form.Group>
                    <Button disabled={loading} className='w-100 mt-4' type='submit'>Sign Up</Button>
                </Form>
            </Card.Body>
            <div className='w-100 text-center mt2'>
                Already have an account? <Link to='/login'>Login</Link>
            </div>
        </Card>
    </>
  )
}
