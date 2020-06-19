import { IAnalyticaData } from '../../interfaces/IAnalytica'
import { objFilter } from '../../utils/utils'
import { getLikedFilms } from './data'


export function AnalyticaService (data: IAnalyticaData) {

    return {
        ...analysis(data)
    }    
}

function analysis (data: IAnalyticaData) {

    const { liked, cast } = data

    let genres: Array<any> = []
    let tags: Array<any> = []
    let companies: Array<any>  = []
    
    const mergedData = [genres, tags, companies]

    liked.forEach(item => {
        genres.push(item.genr)
        tags.push(item.tags)
        companies.push(item.company)
    })

    const quantify = mergedData.map(item => item.flat().reduce((acc, value) => {
            acc[value] = (acc[value] || 0) + 1
            return acc
        }, {})
    )

    return {
        getGenres: () => objFilter(quantify[0], ([, value]: any) => value > 1),

        getTags: () => quantify[1],

        getCompanies: () => quantify[2],

        getAnalisedFilms: () => liked.map(item => item.name),
        
        getAllAnalisedData: () => ({
            genr: objFilter(quantify[0], ([, value]: any) => value > 1),
            tags: quantify[1],
            companies: quantify[2],
            films: liked.map(item => item.name)
        })
    }   
}

export const defData = async () => {
    try {
        const likedData = await getLikedFilms('5edbcedcb094851194622823')
        return {
            likedData
        }
    } catch (err) {
        console.log(err)
    }
}