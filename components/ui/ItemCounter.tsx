
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"

interface Props {
    currentValue: number;
    onUpdateQuantity: (newValue: number) => void;
    maxValue: number
}

export const ItemCounter:React.FC<Props> = ({currentValue, onUpdateQuantity, maxValue}) => {
  
   
    const addOrRemove = ( value: number ) => {
        if ( value === -1 ) {
          if ( currentValue === 1 ) return;
    
          return onUpdateQuantity( currentValue - 1);
        }
    
        if ( currentValue >= maxValue ) return;
    
        onUpdateQuantity( currentValue + 1 );
      }
      
    
      return (
        <Box display='flex' alignItems='center'>
            <IconButton onClick={ () => addOrRemove(-1) }>
                <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{ width: 40, textAlign:'center' }}> {currentValue} </Typography>
            <IconButton onClick={ () => addOrRemove(+1) }>
                <AddCircleOutline />
            </IconButton>
        </Box>
      )
}
