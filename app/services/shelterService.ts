import { supabase } from "@/lib/initSupabase";

const SHELTER_RELATIONS = {
    dog: 'dog (name,weight,age,photo_url,description,shelter_enter_date)',
    staff: 'staff (name,mail,phone,photo_url)',
    comment: 'comment (person_name, comment, comment_date)'
}
export class ShelterService {

    static async fetchShelters() {
        return await supabase.from("shelter").select();
    }

    static async fetchShelterData(shelterId: number, fields: string[]) {
        const joinString = fields.map(field => SHELTER_RELATIONS[field]).join(', ')

        return await supabase.from('shelter').select(`
                id,
                name,
                debt,
                ${joinString}
                `).eq('id', shelterId).single()
    }

    async update(tableName: string, fieldToUpdate: string, newValue: any, entityId: number) {
        return await supabase.from(tableName).update({ [fieldToUpdate]: newValue }).eq('id', entityId).select()
    }

    async createComment(nombre: string, comment: string, shelterId: number) {
        return await supabase.from('comment').insert([{ person_name: nombre, comment, shelter_id: shelterId }]).select()
    }
}