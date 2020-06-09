import Film from '../models/Film'
import Actor from '../models/Actor'

import { ISearchFilter } from '../interfaces/ISearch'

export function SearchService () {
    return {
        findFilm,
        findCast
    }
}

function findFilm () {
    return {
        byName: async (value: string) => {
            try {
                let pattern = `${value}`;
                let regex = new RegExp(`${pattern}`, 'i')

                if(value.length < 3) return new Error('Enter 3+ chars')

                const films = await Film.find({ name: regex }, { name: 1, img: 1 })
                
                if(!films.length) return new Error('No films')

                return films

            } catch (err) {
                return new Error(err)
            }
        },
        byFilter: async (filter: ISearchFilter) => {
            const query = () => {
                if(filter.genr) {
                    let g = {
                        genr: {
                            $in: filter.genr
                        }
                    }
                    return Object.assign({}, filter, g)  

                } else {
                    return filter
                }
            }
        
            try {       
                const films = await Film.find(query(), {
                    img: 1,
                    name: 1
                })

                if(!films.length) return new Error('Wrong params')
                
                return films

            } catch (err) {
                return new Error(err)
            }
        }
    }
}

function findCast () {
    return {
        byName: async (value: string) => {
            try {
                let pattern = `${value}`;
                let regex = new RegExp(`${pattern}`, 'i')
                
                if(value.length < 3) return new Error('Enter 3+ chars')

                const actors = await Actor.find({ actorName: regex })
                if(!actors.length) return new Error('No actors')

                return actors


            } catch (err) {
                return new Error(err)
            }
        }
    }
}