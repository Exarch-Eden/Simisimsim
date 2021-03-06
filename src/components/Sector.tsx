import React, { FC } from 'react'

import '../css/Sector.css'

interface SectorProps {
    children?: React.ReactNode
}

const Sector: FC<SectorProps> = ({ children }) => {
    return (
        <div className="Sector">
            {React.Children.toArray(children)}
        </div>
    )
}

export default Sector
