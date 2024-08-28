export interface Item {
    id: string,
    item: string,
}

export default class ListItem implements Item {
    constructor(
        private _id: string = '',
        private _item: string = '',
    ) {}

    get id(): string {
        return this._id
    }
    set id(id: string){
        this._id = id
    }
    get item(): string {
        return this._item
    }
    set item(item: string){
        this._item = item
    }
}
