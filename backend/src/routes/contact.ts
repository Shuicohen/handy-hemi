import { Router } from 'express'
import { submitContact, getContacts, deleteContact } from '../controllers/contact'
import { validateContact } from '../middleware/contactValidation'

const router = Router()

router.post('/', validateContact, submitContact)
router.get('/', getContacts)
router.delete('/:id', deleteContact)

export default router 