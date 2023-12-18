import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
export const MenuToggle = ({ toggle, isOpen }: any) => {
    return (
        // <Box display={{ base: "block", md: "none" }} onClick={toggle}>
        //     <MenuButton>
        //         {isOpen ? <CloseIcon /> : <MenuIcon />}
        //     </MenuButton>
        // </Box>
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Actions
            </MenuButton>
            <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
        </Menu>
    )
}