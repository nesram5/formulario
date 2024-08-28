import FullList  from "../model/FullList";
interface DOMList {
    div: HTMLDivElement,
    clear(): void,
    render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList{
    div: HTMLDivElement

    static instance: ListTemplate = new ListTemplate()

    private constructor(){
        this.div = document.getElementById("listItems") as  HTMLDivElement

    }
    clear(): void {
        this.div.innerHTML = ''
    }
    render(fullList: FullList): void {
        
        this.clear()

        fullList.list.forEach(item => {
            const div = document.createElement("div") as HTMLElement

            const button = document.createElement("button") as HTMLButtonElement
            button.className = 'button'
            button.textContent = 'X'
            div.append(button)

            const label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = item.id
            label.textContent = item.item
            div.append(label)

            

            button.addEventListener('click', () => {
                fullList.removeItem(item.id)
                this.render(fullList)
            })
            this.div.classList.add("itemCard")
            this.div.append(div)
        })
    }
}
