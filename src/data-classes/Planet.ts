
type PlanetSize = 'Small' | 'Medium' | 'Large'
type PlanetType = 'Arctic' | 'Terra' | 'Steppes'

class Planet {
    private _size: PlanetSize
    private _name: string
    private _type: PlanetType
    private _populationSlots: number

    constructor(size: PlanetSize, name: string, type: PlanetType) {
        this._size = size
        this._name = name
        this._type = type

        // TODO: create a private static function to do all this calculation

        this._populationSlots = Planet.calcPopulationSlots(size, type)
    }

    private static calcPopulationSlots (size: PlanetSize, type: PlanetType) {
        console.log('calcPopulationSlots()');
        
        let populationSlots = 0

        switch (size) {
            case 'Small':
                populationSlots = 3
                break
            case 'Medium':
                populationSlots = 5
                break
            case 'Large':
                populationSlots = 8
                break
        }
        console.log('planet size: ', size);
        console.log('population affected by size: ', populationSlots);

        // typically, extreme planet types (e.g. Arctic) affect population slots
        switch (type) {
            case 'Arctic':
                populationSlots -= 2
                break
        }

        console.log('planet type: ', type);
        console.log('population affected by type: ', populationSlots);

        return populationSlots
    }
}

export default Planet