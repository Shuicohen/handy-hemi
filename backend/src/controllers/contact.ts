import { Request, Response } from 'express'
import { createContact, getContacts as getContactsFromDB, deleteContactFromDB } from '../models/contact'

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body

    // Save to database
    const contact = await createContact({ name, email, phone, message })

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
}

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await getContactsFromDB()
    res.json({
      success: true,
      data: contacts
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
}

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await deleteContactFromDB(Number(id))
    res.json({
      success: true,
      message: 'Contact deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting contact:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  }
} 