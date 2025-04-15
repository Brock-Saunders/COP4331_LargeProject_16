import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";


const EditorFooter = () => {
  return (
    <Navbar className="sticky top-0 w-full z-[9999]">
        <NavbarContent className="" justify="center">
        </NavbarContent>
        <NavbarContent justify="end">
            <NavbarItem>
            <label className="p-4">
                Word Count: 4
            </label>
            <label className="p-4">
                Character Count: 16
            </label>
            </NavbarItem>
        </NavbarContent>  
    </Navbar>
  );
}
export default EditorFooter;