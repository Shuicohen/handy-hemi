import axios from 'axios'

const testContactAPI = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/contact', {
      name: 'Test User',
      email: 'test@example.com',
      phone: '123-456-7890',
      message: 'This is a test message from the contact form.'
    })

    console.log('Response:', response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error:', error.response?.data || error.message)
    } else {
      console.error('Error:', error)
    }
  }
}

testContactAPI() 