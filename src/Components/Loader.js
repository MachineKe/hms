import React, { useState } from 'react'
import { ClipLoader, PacmanLoader } from 'react-spinners'
const Loader = () => {
  let [loading,setLoading] = useState(true)
  
  return (
    <div style={{margin:'150px'}}>
      <div className='sweet-loading text-center'>

        <PacmanLoader color='#000' loading={loading} css='' size={50} />
        </div>
    </div>
  )
}

export default Loader