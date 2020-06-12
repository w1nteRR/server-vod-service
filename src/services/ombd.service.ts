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
        },
        getOmdbRating: async (filmName: string) => {
            try {

                const res = await fetch(`http://www.omdbapi.com/?t=${filmName}&apikey=${omdbKey}`)
                const film = await res.json()
                
                return {
                    imdb: film.imdbRating,
                    metascore: film.Metascore,
                    imdbVotes: film.imdbVotes 
                }

            } catch (err) {
                return new Error(err)
            }
        }
    }
}

