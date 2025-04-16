import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";

interface EditorFooterProps {
  lastSaved: Date | null; 
  lastUpdated: string | null; 
}


const formatTime = (date: Date): string => {
  const now = new Date(); 
  const diffMs = now.getTime() - date.getTime(); 

  const minutes = Math.floor(diffMs / (1000 * 60)); 
  const hours = Math.floor(diffMs / (100 * 60 * 60)); 
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24)); 

  if (minutes < 1) {
    return "Saved just now";
  } else if (minutes < 60) {
    return `Saved ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `Saved ${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  return `Saved ${days} day${days > 1 ? "s" : ""} ago`;
};

// creates new date or gets date from db 
const EditorFooter: React.FC<EditorFooterProps> = ({ lastSaved, lastUpdated }) => {
  const displayTime = lastSaved ?? (lastUpdated ? new Date(lastUpdated) : null);

  return (
    <Navbar className="sticky top-0 w-full z-[9999]">
        <NavbarContent className="" justify="start">
          <span className="px-4">
          {displayTime && (
            <span className="italic text-zinc-400">{formatTime(displayTime)}</span>
          )}
          </span>
    
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