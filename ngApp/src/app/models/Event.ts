export class Event{
    public name: string
    public description: string
    public startDate: Date = new Date()
    public endDate: Date = new Date()
    public createdAt: Date = new Date()
    public updatedAt: Date =  new Date()
    public localisation: string
    public tarif: string
    public infoPratique: string 
    constructor(){}
}
