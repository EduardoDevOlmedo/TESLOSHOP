import { Box, CircularProgress, Typography } from "@mui/material"

const FullScreenLoading = () => {
  return (
        <Box display="flex"  sx={{flexDirection: {xs: "column"}}} justifyContent="center" alignItems="center" height="calc(100vh - 200px)">
            <Typography sx={{mb: 3}}>Loading...</Typography>
            <CircularProgress thickness={4}/>
        </Box>
  )
}

export default FullScreenLoading