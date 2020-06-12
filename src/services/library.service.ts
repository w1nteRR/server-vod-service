import { watchLater } from './library/watchLater'
import { liked } from './library/liked'

export function LibraryService () {
    return {
        watchLater,
        liked
    }
}