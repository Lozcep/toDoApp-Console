require('colors')

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquiererMenu, 
    pausa, 
    leerInput,
listadoTareasBorrar, 
confirmar,
mostrarListadoCheckList} = require('./helpers/inquierer');
const Tareas = require('./models/tareas');






const  main = async() =>{

    console.clear()

    let opt = ''
    const tareas = new Tareas()

    const tareasDB = leerDB()

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB)

    }
    

    do {
        opt = await inquiererMenu()

        switch (opt) {
            case '1':
                // crear tarea
                const desc = await leerInput('Descripción: ')
                tareas.crearTarea(desc)

                
            break;

            case '2':
                tareas.listadoCompleto()
            
            break;

            case '3':

                tareas.listarPendientesCompletadas(completadas = true)
            
            break;

            case '4':

                tareas.listarPendientesCompletadas(completadas = false)
            
            break;

            case '5':

            const ids = await mostrarListadoCheckList( tareas.listadoArr)
            tareas.toggleCompletadas(ids)

            console.log(ids)

            break

            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr )
                
                
                if(id !=='0') {
                    const ok = await confirmar('¿Está seguro de borrarlo?')
                if(ok){
                    tareas.borrarTarea(id)

                    console.log('Tarea Borrada')
                }
            }
            break;
        
        }
 
        guardarDB(tareas.listadoArr)
        
        await pausa()

    } while (opt !== '0');
    
    
}

main()