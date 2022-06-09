import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { ISize } from '../../interfaces';

interface Props {
    selectedSize?: ISize;
    sizes: ISize[];
    onSelectedSize: (size: ISize) => void
}

export const ProductSizeSelector:React.FC<Props> = ({selectedSize, sizes, onSelectedSize}) => {
  
 

  return (
    <Box>
         {
            sizes.map( size => (
                <Button
                    key={ size }
                    size='small'
                    color={ selectedSize === size ? 'primary' : 'info' }
                    onClick={() => onSelectedSize(size)}
                >
                    { size }
                </Button>
            ))
        }
    </Box>
  )
}
