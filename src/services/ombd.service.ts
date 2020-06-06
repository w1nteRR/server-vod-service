import fetch from 'node-fetch'

import { omdbKey } from '../config/config'

export function OmdbService () {
    return {
        getFilmById: async (_id: string) => {
            try {
                
                const res = await fetch(`http://www.omdbapi.com/?i=${_id}&apikey=${omdbKey}`)
                const film = await res.json()
                
                return film
        
            } catch (err) {
                throw new Error(err)
            }
        }
    }
}

