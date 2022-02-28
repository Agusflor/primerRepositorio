/*
const agregarTarea = (tarea)=>{
    return 'Agregando tarea'
};

const actualizarTarea = (id) => {
    return 'Actualizando tarea'
}

const eliminarTarea =(id)=>{
    return 'Eliminando tarea'
}

module.exports = {
    agregarTarea,
    actualizarTarea,
    eliminarTarea
};*/
const fs = require('fs');
const { findSourceMap } = require('module');
const tareas =require('./tareas.json');//requerir y parsear

const guardarJSON=(tareas) =>{ fs.writeFileSync('./tareas.json', JSON.stringify(tareas,null, 3))
};

const mostrarInfoTareas = (tareas)=>{

    tareas.forEach((tarea, index) => {
            console.log(`${index + 1}- ${tarea.descripcion} - estado: ${tarea.estado} - ID: ${tarea.id}`);
        });
    return null
};//for each = ret


module.exports={

    listarTareas:()=>{
        mostrarInfoTareas(tareas)
        return null
    },//for each = retorna el objeto , para que la vista sea mas linda podemos parsearlo
    
    agregarTarea :(tarea)=> {

    tareas.push(tarea);
    guardarJSON(tareas)
    return console.log('Tarea agregada!');    

    },
    actualizarTarea : (id) => {

        let check = tareas.filter(tarea=>tarea.id===id);

        if(check.length ===0){
            return console.log("ID inexistente!!")
        }

       let tareasActualizadas = tareas.map(tarea=>{
           if ( tarea.id=== id){
                tarea.estado = 'completado';
               return tarea}
              else {
                  return tarea
              }}) 

       guardarJSON(tareasActualizadas)

        return console.log( 'Tareas Actualizadas');
    },
    eliminarTarea : (id) => {

        let tareasFiltradas = tareas.filter(tarea =>{
            return tarea.id != id 
        })

        guardarJSON(tareasFiltradas)

        return console.log('Tarea eliminada'); 
    },
    filtrarTareas : (estado) => {

        let estadosValidos = ['pendiente', 'en proceso', 'completado']

        if (!estadosValidos.includes(estado)){

            return console.log('Estado no válido', estadosValidos);
        }

        let tareasFiltradas = tareas.filter((tarea) => {
            return tarea.estado === estado;
        });
        mostrarInfoTareas(tareasFiltradas);
        return null;
    },
    buscarTarea : (keyword)=>{

        let resultado = tareas.filter((tarea)=>{
            return tarea.descripcion.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
        })//primer elemento y un objeto 

        //filter : devuelve en forma de array, la posicion del array

       mostrarInfoTareas(resultado)
       return null;
    }
}
limpiar = ()=>{
    
}
//información ju