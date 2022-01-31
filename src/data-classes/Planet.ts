
type PlanetSize = 'Small' | 'Medium' | 'Large'
type PlanetType = 'Arctic' | 'Terra' | 'Steppes'

class Planet {
    size: PlanetSize
    name: string
    type: PlanetType
    populationSlots: number

    constructor(size: PlanetSize, name: string, type: PlanetType) {
        this.size = size
        this.name = name
        this.type = type

        // TODO: create a private static function to do all this calculation
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

        this.populationSlots = populationSlots
    }
}

export default Planet