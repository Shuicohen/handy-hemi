import axios from 'axios'

const testServer = async () => {
  try {
    const response = await axios.get('http://localhost:5000')
    console.log('Server response:', response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error:', error.response?.data || error.message)
    } else {
      console.error('Error:', error)
    }
  }
}

testServer() 