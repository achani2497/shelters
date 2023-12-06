import { supabase } from "@/lib/initSupabase";

export class ShelterService{

    async update(tableName: string, fieldToUpdate: string, newValue: any, entityId:number){        
        return await supabase.from(tableName).update({[fieldToUpdate]: newValue}).eq('id', entityId).select()
    }
}