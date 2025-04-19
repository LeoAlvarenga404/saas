import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Profile } from "./profile";
import { SidebarDropdown } from "./sidebar-dropdown";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  BarChart2,
  Circle,
  Package,
  ShoppingCart,
  Users,
  Briefcase,
  FileText,
  Settings,
  LucideIcon,
} from "lucide-react";
import api from "@/services/api";
import { useUser } from "@/contexts/user-context";

const iconMap: Record<string, LucideIcon> = {
  BarChart2,
  Package,
  ShoppingCart,
  Users,
  Briefcase,
  FileText,
  Settings,
};

interface SidebarItem {
  menu: string;
  icon: string;
  menu_item: string;
  path: string;
}

interface ISidebarGrouped {
  title: string;
  HeaderIcon: LucideIcon;
  items: {
    title: string;
    url: string;
    isActive: boolean;
    Icon: LucideIcon;
  }[];
}

const groupSidebar = (
  items: SidebarItem[],
  currentUrl: string
): ISidebarGrouped[] => {
  const grouped: Record<string, ISidebarGrouped> = {};

  items.forEach((item) => {
    if (!grouped[item.menu]) {
      grouped[item.menu] = {
        title: item.menu,
        HeaderIcon: iconMap[item.icon] ?? Circle,
        items: [],
      };
    }

    grouped[item.menu].items.push({
      title: item.menu_item,
      url: item.path,
      isActive: currentUrl === item.path,
      Icon: Circle,
    });
  });

  return Object.values(grouped);
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [sidebar, setSidebar] = useState<SidebarItem[]>([]);
  const [url, setUrl] = useState("");
  const { user } = useUser();
  const location = useLocation();

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  useEffect(() => {
    if (!user?.userId) return;

    api
      .get(`/access/sidebar/${user.userId}`)
      .then((response) => {
        setSidebar(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os items do sidebar", error);
      });
  }, [user]);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="p-2">
          <h1 className="font-black">SaaS</h1>
        </div>
      </SidebarHeader>

      <SidebarContent className="custom-scrollbar overflow-auto">
        {groupSidebar(sidebar, url).map((item) => (
          <SidebarDropdown
            key={item.title}
            title={item.title}
            HeaderIcon={item.HeaderIcon}
            items={item.items}
          />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <Profile />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
