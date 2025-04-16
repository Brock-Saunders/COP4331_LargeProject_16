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
} from "@heroui/react";
import { Download, Trash2, SaveIcon, User2Icon } from "lucide-react";

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

interface EditorNavbarProps {
  onSave: () => void; 
  disabled?: boolean; 
}

const EditorNavbar: React.FC<EditorNavbarProps> = ({ onSave, disabled }) => {
  return (
    <Navbar className="rounded-md border-gray-500 bg-zinc-900">
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">Notes App</p>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <div className="flex gap-4">
            <button className="cursor-pointer items-center space-x-2" onClick={onSave} disabled={disabled}>
              <div className="flex items-center justify-center gap-x-1.5">
                <SaveIcon />
                Save
              </div>
            </button>
            <Button className="cursor-pointer items-center space-x-2">
              <div className="flex items-center justify-center gap-x-1.5">
                <Download />
                Download
              </div>
            </Button>
            <Button className="cursor-pointer items-center space-x-2">
              <div className="flex items-center justify-center gap-x-1.5">
                <Trash2 />
                Delete
              </div>
            </Button>
          </div>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button className="cursor-pointer items-center space-x-2">
                <div className="flex items-center justify-center gap-x-1.5">
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
                Help &amp; Feedback
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
