export default class Post {
    constructor(titile, img) {
        this.titile = titile
        this.date = new Date()
        this.img = img
    }

    toString() {
        return JSON.stringify({
            title: this.titile,
            date: this.date.toJSON(),
            img: this.img
        }, null,  2)
    }
}