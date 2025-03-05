import { ChevronRight, Circle, CircleDot } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Link } from "react-router-dom";
export interface SidebarDropdownProps {
  title: string;
  HeaderIcon: React.ElementType;
  items: {
    title: string;
    url: string;
    isActive: boolean;
    Icon: React.ElementType;
  }[];
}

export function SidebarDropdown({
  title,
  HeaderIcon,
  items,
}: SidebarDropdownProps) {
  const handleActive = (title: string, text: string) => {
    console.log(title, text);
  };

  return (
    <Collapsible
      key={title}
      title={title}
      defaultOpen
      className="group/collapsible"
    >
      <SidebarGroup>
        <SidebarGroupLabel
          asChild
          className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger>
            <div className="flex gap-2">
              <HeaderIcon width={"1.3rem"} className="text-text" />
              <h4 className="text-[14px] font-semibold tracking-tight text-text">
                {title}{" "}
              </h4>
            </div>
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenuSub>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`flex items-center gap-0`}
                  onClick={() => handleActive(title, item.title)}
                >
                  <SidebarMenuButton
                    asChild
                    className={`${
                      item.isActive ? "bg-sidebar-accent text-white" : ""
                    } group/button`}
                  >
                    <Link to={item.url} className="text-[0.8rem]">
                      <div>
                        {item.isActive ? (
                          <CircleDot className="text-white w-3" />
                        ) : (
                          <Circle className="text-muted-foreground w-2" />
                        )}
                      </div>
                      <p
                        className={`text-sm ${
                          item.isActive ? "text-white" : "text-muted-foreground"
                        }`}
                      >
                        {item.title}
                      </p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenuSub>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
