import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
  } from "@heroui/react";
  import { Download, SaveIcon, User, User2Icon } from "lucide-react";
  
  export const AcmeLogo = () => {
    return (
      <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
        <path
          clipRule="evenodd"
          d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    );
  };
  
  // TODO: change button styling to match other stylings
  const EditorNavbar = () => {
    return (
      <Navbar className="roudned-md  border-gray-500 bg-zinc-900">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">Notes App</p>
        </NavbarBrand>
        <NavbarContent className="">
          <NavbarItem>
            <Button className="cursor-pointer items-center space-x-2">
              <div className="flex w-full items-center justify-center gap-x-1.5">
                <SaveIcon />
                Save
              </div>
            </Button>
            <Button className="border-amber-50 cursor-pointer items-center space-x-2">
              <div className="flex w-full items-center justify-center gap-x-1.5">
                <Download />
                Download
              </div>
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button className="cursor-pointer items-center space-x-2">
                  <div className="flex w-full items-center justify-center gap-x-1.5">
                    <User2Icon />
                    User Name
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  };
  export default EditorNavbar;