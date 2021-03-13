require('colors')

const Tarea = require("./tarea");


class Tareas {

    _listado = {};

    get listadoArr(){

        const listado = [];

        Object.keys(this._listado).forEach((key) => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })

        return listado
    }

    constructor(){
        this._listado = {}
    }

    borrarTarea( id = ''){

        if (this._listado[id]){
            delete this._listado[id]
        }
    } 

    cargarTareasFromArray( tareas = []){

        tareas.forEach( (tarea) => {
            this._listado[tarea.id] = tarea        
        })
    
    }

    crearTarea(desc = ''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea

    }

    listadoCompleto(){

        this.listadoArr.forEach( (tarea, i) => {

            console.log(`${i+1}. ${tarea.desc} :: ${  tarea.completadoEn != null ? 'completada'.green : 'pendiente'.red }`)
        })    

    }

    listarPendientesCompletadas( completadas = true){

        this.listadoArr.forEach( (tarea, i) =>{

            const idx  = i+1
            const {desc, completadoEn} = tarea
            if(completadas == true && completadoEn != null ){ console.log(`${idx}. ${desc} :: ${'completada'.green}`)}
            if(completadas == false && completadoEn == null ) {console.log(`${idx}. ${desc} :: ${'pendiente'.red}`)}

        })

    }

    toggleCompletadas(ids = []){

        ids.forEach((id) => {
            
            const tarea = this._listado[id]
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }

        })

        this.listadoArr.forEach( (tarea) => {

            if (!ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null
                
            }
            
        })

    }

}

module.exports = Tareas; 