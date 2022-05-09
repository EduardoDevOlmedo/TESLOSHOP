
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"

interface Props {

}

export const ItemCounter:React.FC<Props> = () => {
  
  const [value, setValue] = useState(1)

    return (
    <Box display="flex" alignItems="center">
        <IconButton>
            <RemoveCircleOutline onClick={() => setValue(value - 1)}/>
        </IconButton> 
        <Typography sx={{width: 40, textAlign: "center"}}> {value} </Typography>
        <IconButton>
            <AddCircleOutline  onClick={() => setValue(value + 1)}/>
        </IconButton>
    </Box>
  )
}
