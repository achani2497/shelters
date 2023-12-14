import { supabase } from "@/lib/initSupabase";

const SHELTER_RELATIONS = {
    dog: 'dog (name,weight,age,photo_url,description,shelter_enter_date)',
    staff: 'staff (name,mail,phone,photo_url)',
    comment: 'comment (person_name, comment, comment_date)'
}
export class ShelterService {

    static async fetchShelters(includes: string[] = []) {
        const shelters = supabase.from("shelter")
        if (includes.length) {
            const tables = includes.map(field => SHELTER_RELATIONS[field]).join(', ')

            return await shelters.select(`id, name, debt, description, ${tables}`).order('id', { ascending: true })
        }
        return await shelters.select().order('id', { ascending: true });
    }

    static async fetchShelterData(shelterId: number, fields: string[]) {
        const joinString = fields.map(field => SHELTER_RELATIONS[field]).join(', ')
        let query = supabase.from('shelter').select(`
        id,
        name,
        debt,
        ${joinString}
        `).eq('id', shelterId)

        if (fields.includes('dog')) {
            query = query.is('dog.adoption_date', null)
        }
        return await query.single()
    }

    static async fetchAdoptedDogs() {
        return await supabase.from('adopted').select('id, person_name, dog (name, photo_url)')
    }

    async update(tableName: string, fieldToUpdate: string, newValue: any, entityId: number) {
        return await supabase.from(tableName).update({ [fieldToUpdate]: newValue }).eq('id', entityId).select()
    }

    async createComment(nombre: string, comment: string, shelterId: number) {
        return await supabase.from('comment').insert([{ person_name: nombre, comment, shelter_id: shelterId }]).select()
    }

    static async createStaff(name: string, mail: string, phone: string, shelter_id: number) {
        return await supabase.from('staff').insert([{
            name,
            mail,
            phone,
            shelter_id
        }])
    }
}