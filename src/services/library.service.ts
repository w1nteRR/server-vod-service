import { watchLater } from './library/watchLater'
import { liked } from './library/liked'
import { watchContinue } from './library/watchContinue'

export function LibraryService () {
    return {
        watchLater,
        liked,
        watchContinue
    }
}