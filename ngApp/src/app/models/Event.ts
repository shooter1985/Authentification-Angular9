export class Event{
    public name: string
    public description: string
    public startDate: string | Date
    public endDate: string | Date
    public createdAt: Date = new Date()
    public updatedAt: Date =  new Date()
    public localisation: string
    public tarif: string
    public infoPratique: string 
    public special: boolean = false
    public user?: string
    public image
    constructor(){}
}
