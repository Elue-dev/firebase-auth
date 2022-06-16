import { useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import GoogleButton from 'react-google-button'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, googleSignIn } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch (err){
            if (err.message === 'Firebase: Error (auth/user-not-found).') {
                setError('User not found')
            }
            if (err.message === 'Firebase: Error (auth/wrong-password).') {
                setError('Wrong password')
            }
            if (err.message === 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).') {
                setError('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later')
            }
        }

        setLoading(false)
    }

    async function handleGoogleSignIn(e) {
        e.preventDefault()

        try {
            await googleSignIn()
            navigate('/')
        } catch(err) {
            setError(err.messasge)
        }
    }

  return (
    <>
        <Card>
            <Card.Body style={{ minWidth: '25vw'}}>
                <h2 className='text-center mb-4'>Log In</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email' style={{ marginBottom: '.1rem'}}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required></Form.Control>
                    </Form.Group>

                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required></Form.Control>
                    </Form.Group>

                    <Button disabled={loading} className='w-100 mt-4' type='submit'>Log In</Button>
                </Form>
                <GoogleButton className='g-btn mt-4  w-100' type='dark' onClick={handleGoogleSignIn} />
                <div className='w-100 text-center mt-2'>
                    <Link to='/forgot-password'>Forgot Password?</Link>
                </div>
            </Card.Body>
            <div className='w-100 text-center mt2'>
                Need an account? <Link to='/signup'>Sign Up</Link>
            </div>
        </Card>
    </>
  )
}