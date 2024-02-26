import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";


    // btncancelar : true,
    // colorbtnaceptar : '#3085d6',
    // colorbtncancelar : "#d33",
    // txtbtnaceptar : "Eliminar"

export function show_alert  (mensaje, icono, texto) {
    const MySwal = withReactContent(Swal);

    MySwal.fire({ 
        title: mensaje,
        icon: icono,
        text: texto
        
    })
}

export async function  confirmed_alert (mensaje, icono,api) {
    const MySwal = withReactContent(Swal);
    
    await MySwal.fire({ 
        title: mensaje,
        icon: icono,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        
    }).then(async(res)=>{
        if (res.isConfirmed) {
        //  setDeleteID(true);
        await axios.delete(api);
        show_alert("Eliminado Correctamente", "success");
        return 1
     }
    }).catch((error) => {
        show_alert('No se pudo eliminar la ficha', 'error')
    })
}

