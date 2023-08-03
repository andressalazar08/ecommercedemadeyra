
import React from 'react'
import { Helmet } from 'react-helmet'; //Sirve para asignar propiedades a las páginas como los title



const MetaData = ( { title } ) => {
  return (
        <Helmet>
                <title>
                    {`${title} - ShopIT`}
                </title>


        </Helmet>
  )
}

export default MetaData;
