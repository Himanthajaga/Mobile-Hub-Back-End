import Contact from '../model/contact.model'
import {ContactDto} from "../dto/contact.dto";
//retrieve saved contact data
export const getAllContacts = async():Promise<ContactDto[]> => {
    return Contact.find();
}
//save contact data
export const saveContact = async (contact: ContactDto):Promise<ContactDto> => {
    return Contact.create(contact);
}
export const validateContact = (contact: Contact) => {

    return null;
}