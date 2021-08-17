export class LineService {

    getLines() {
        return( 
            fetch('data/lines.json').then(res => res.json()).then(d => d.data)
        )
    }
}