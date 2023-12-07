import { supabase } from "@/lib/initSupabase";

export class ShelterService {

    async update(tableName: string, fieldToUpdate: string, newValue: any, entityId: number) {
        return await supabase.from(tableName).update({ [fieldToUpdate]: newValue }).eq('id', entityId).select()
    }

    async createComment(nombre: string, comment: string, shelterId: number) {
        return await supabase.from('comment').insert([{ person_name: nombre, comment, shelter_id: shelterId }]).select()
    }
}