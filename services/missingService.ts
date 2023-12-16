import { supabase } from "@/lib/initSupabase";
export class MissingService {
    static async getMissing() {
        return await supabase.from('missing').select()
    }

    static async reportMissing(owner_name: string, name: string, missing_date: string, photo_url: string, location: string, phone: string) {
        return await supabase.from('missing').insert([{
            owner_name,
            name,
            missing_date,
            photo_url,
            location,
            phone
        }]).select()
    }
}