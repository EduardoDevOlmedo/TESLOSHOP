import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ShopLayout } from "../components/layouts"

const Custom404 = () => {
  return (
    <ShopLayout title="Page not found" pageDescription="404 Error - Page not found">
        <Box display="flex" sx={{flexDirection: {xs: "column", sm: "row"}}} justifyContent="center" alignItems="center" height="calc(100vh - 200px)">
            <Typography variant="h1" component="h1" fontSize={100}>404 |</Typography>
            <Typography marginLeft={2}>Page wasn&apos;t found.</Typography>

        </Box>
    </ShopLayout>
  )
}

export default Custom404