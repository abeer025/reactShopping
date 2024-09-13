import React from 'react'
import { Button } from '@mui/material';
export default function Button() {
  return (
<Button
  variant="contained"
  sx={{
    width: '50%', 
    backgroundColor: 'indigo', 
    color: 'white', 
    paddingY: 3, 
    paddingX: 4, 
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: 'indigo.600',
    },
    cursor: 'pointer',
  }}
>
  Shop Now
</Button> 
 )
}
