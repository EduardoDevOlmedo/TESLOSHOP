import NextLink from "next/link"
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar,Input, Typography, InputAdornment } from "@mui/material"
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { useRouter } from "next/router"
import { useContext, useEffect, useMemo, useState } from "react"
import { CartContext, UIContext } from "../../context"

export const Navbar = () => {
    const router = useRouter()
    const {asPath} = useRouter()
    const {toggleSideMenu} = useContext(UIContext)
    const {numberOfItems} = useContext(CartContext)

    const [isSearchVisible, setisSearchVisible] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')


    

    const onSearchTerm = () => {
        if(searchTerm.trim().length === 0) return;
        router.push(`/search/${searchTerm}`)
    }


    const category = useMemo(() => asPath.split("").splice(asPath.split("").lastIndexOf("/") + 1,  asPath.length).join(""), [asPath])

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

            <Box sx={{display: isSearchVisible ? 'none' : {xs: 'none', sm: 'block'}}}>
                <NextLink href={"/category/men"} passHref>
                    <Link>
                        <Button color={category === "men" ? 'primary' : 'info'}>
                            Men
                        </Button>
                    </Link>
                </NextLink>     
                <NextLink href={"/category/women"} passHref>
                    <Link>
                        <Button color={category === "women" ? 'primary' : 'info'}>
                            Women
                        </Button>
                    </Link>
                </NextLink>     
                <NextLink href={"/category/kid"} passHref>
                    <Link>
                        <Button  color={category === "kid" ? 'primary' : 'info'}>
                            Kids
                        </Button>
                    </Link>
                </NextLink>     
            </Box>   

            <Box flex={1}/>
            
            {
                isSearchVisible
                 ? (
                     <Input     
                                sx={{display: {xs: 'none', sm: 'flex'}}}
                                className="fadeIn"
                                 autoFocus
                                 value={searchTerm}
                                 onChange={(e) => setSearchTerm(e.target.value)}
                                 onKeyPress={(e) => e.key === 'Enter' && onSearchTerm()}
                                 type='text'
                                 placeholder="Buscar..."
                                 endAdornment={
                                     <InputAdornment position="end">
                                         <IconButton
                                              onClick={() => setisSearchVisible(false)}
                                         >
                                          <ClearOutlined />
                                         </IconButton>
                                     </InputAdornment>
                                 }
                             />

                 )
                 : (
                    <IconButton 
                    sx={{display: {xs: 'none', sm: 'flex'}}}
                    onClick={() => setisSearchVisible(true)} className="fadeIn">
                    <SearchOutlined />
                     </IconButton>
                 )
            }


            <IconButton
                sx={{display: {xs: 'flex', sm: 'none'}}}
                onClick={toggleSideMenu}
            >
                <SearchOutlined />
            </IconButton>

            <NextLink href="/cart" passHref>
                <Link>
                    <IconButton>
                        <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems.toString() } color="secondary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button onClick={() => toggleSideMenu()}>
                Menu
            </Button>

        </Toolbar>
    </AppBar>
    )
}

