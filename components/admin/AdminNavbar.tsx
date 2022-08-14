import NextLink from "next/link"
import { AppBar, Box, Link, Button, IconButton, Toolbar,Input, Typography, InputAdornment } from "@mui/material"
import { useContext } from "react"
import { UIContext } from "../../context"

export const AdminNavbar = () => {
    const {toggleSideMenu} = useContext(UIContext)

    return (
    <AppBar>
        <Toolbar sx={{boxShadow: 'rgba(0, 0, 0, 0.1)'}}>
            <NextLink passHref href="/">
                <Link display="flex" alignItems="center">
                    <Typography variant="h6">Teslo</Typography>
                    <Typography sx={{ml: 0.5}}>Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={1}/>


            <Button onClick={() => toggleSideMenu()}>
                Menu
            </Button>

        </Toolbar>
    </AppBar>
    )
}

