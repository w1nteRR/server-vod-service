interface Array<T> {
    shuffle(): void
}

Array.prototype.shuffle = function() {
    for (let index = this.length - 1; index > 0; index--) {
        let randomize = Math.floor(Math.random() * (index + 1))
        let temp = this[index]
        this[index] = this[randomize]
        this[randomize] = temp
    }

    return this
}
