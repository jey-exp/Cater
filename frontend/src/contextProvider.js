import {create} from "zustand";


const supa = (set, get) =>({
    supaObj: null,
    setSupaObj : (supaBase)=>{
        set(()=>({
            supaObj:supaBase
        }))
    }
})

const uuid = (set,get) =>({
    uuid : null,
    setUuid : (uuidProp) =>{
        set(()=>({
            uuid:uuidProp
        }))
    }
})

const useSupaBase = create(supa);
export const useCaterUuid = create(uuid);

export default useSupaBase;