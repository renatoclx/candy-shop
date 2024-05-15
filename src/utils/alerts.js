
import Swal from 'sweetalert2'

export async function deleteAlert(tipo, name) {
   await Swal.fire({
        title: "Deseja excluir o " + tipo + " " + name +"?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não"
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
      })

      
}

export function updateAlert(id) {
    Swal.fire({
        title: 'Update!' + id,
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
}


