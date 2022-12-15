import React from 'react'
import Swal from 'sweetalert2'

export const SweetMixin = () => {

    const alertMixin = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
      
    

  return (
    <div>SweetMixin</div>
  )
}
