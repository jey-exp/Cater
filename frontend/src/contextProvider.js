import {create} from "zustand";


const supa = (set, get) =>({
    supaObj: null,
    setSupaObj : (supaBase)=>{
        set(()=>({
            supaObj:supaBase
        }))
    }
})

const useSupaBase = create(supa);

export default useSupaBase;