class PonteDados {
    constructor(app, field) {
        this.app = app
        this.field = field
    }
}

/**
 * 
 * @param {PonteDados} input 
 * @param {PonteDados} output 
 */
const bridgeQlikElement = (input, output) => {
    input.app
        .field(input.field)
        .getData()
        .OnData
        .bind(() => {
            let valueList = input.app
                .field(input.field)
                .rows
                .filter(value => {
                    return value.qState == 'S'
                })
                .map(value => {
                    return value.qText
                })

            output.app
                .field(output.field)
                .selectValues(valueList)
        })
}