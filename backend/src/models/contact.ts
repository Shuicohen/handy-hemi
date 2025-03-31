import db from '../config/database'

export interface Contact {
  id: number
  name: string
  email: string
  phone?: string
  message: string
  created_at: Date
}

export const createContact = async (data: Omit<Contact, 'id' | 'created_at'>): Promise<Contact> => {
  const [contact] = await db('contacts').insert(data).returning('*')
  return contact
}

export const getContacts = async (): Promise<Contact[]> => {
  return db('contacts').select('*').orderBy('created_at', 'desc')
}

export const deleteContactFromDB = async (id: number): Promise<void> => {
  await db('contacts').where({ id }).del()
} 