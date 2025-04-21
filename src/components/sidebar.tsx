import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Profile } from "./profile";
import { SidebarDropdown } from "./sidebar-dropdown";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuSkeleton,
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
  RefreshCcw,
} from "lucide-react";
import api from "@/services/api";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/auth-context";

// Mapeamento de ícones com tipagem segura
const ICON_MAP: Record<string, LucideIcon> = {
  BarChart2,
  Package,
  ShoppingCart,
  Users,
  Briefcase,
  FileText,
  Settings,
} as const;

const DEFAULT_ICON = Circle;

interface SidebarItem {
  menu: string;
  icon: keyof typeof ICON_MAP;
  menu_item: string;
  path: string;
}

interface SidebarGroup {
  title: string;
  HeaderIcon: LucideIcon;
  items: SidebarItemGroup[];
}

interface SidebarItemGroup {
  title: string;
  url: string;
  isActive: boolean;
  Icon: LucideIcon;
}

// Função utilitária para agrupar itens do sidebar
const groupSidebarItems = (
  items: SidebarItem[],
  currentPath: string
): SidebarGroup[] => {
  const grouped = items.reduce<Record<string, SidebarGroup>>((acc, item) => {
    if (!acc[item.menu]) {
      acc[item.menu] = {
        title: item.menu,
        HeaderIcon: ICON_MAP[item.icon] || DEFAULT_ICON,
        items: [],
      };
    }

    acc[item.menu].items.push({
      title: item.menu_item,
      url: item.path,
      isActive: currentPath === item.path,
      Icon: DEFAULT_ICON,
    });

    return acc;
  }, {});

  return Object.values(grouped);
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { pathname } = useLocation();

  const fetchSidebarData = useCallback(async () => {
    if (!user?.userId) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await api.get<SidebarItem[]>(
        `/access/sidebar/${user.userId}`
      );

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from API");
      }

      setSidebarItems(data);
    } catch (err) {
      console.error("Failed to load sidebar items:", err);
      setError(err instanceof Error ? err.message : "Failed to load menu");
    } finally {
      setLoading(false);
    }
  }, [user?.userId]);

  useEffect(() => {
    fetchSidebarData();
  }, [fetchSidebarData]);

  const handleRetry = () => {
    fetchSidebarData();
  };

  const renderSidebarContent = () => {
    if (loading) {
      return [...Array(5)].map((_, index) => (
        <SidebarMenuSkeleton
          key={`skeleton-${index}`}
          showIcon
          className="mb-2"
        />
      ));
    }

    if (error) {
      return (
        <div className="px-4 py-6 text-sm text-center">
          <p className="text-muted-foreground mb-3">{error}</p>
          <Button
            onClick={handleRetry}
            variant="outline"
            size="sm"
            className="mx-auto"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      );
    }

    if (sidebarItems.length === 0) {
      return (
        <div className="px-2 py-3 text-sm text-muted-foreground text-center">
          No menu items available
        </div>
      );
    }

    return groupSidebarItems(sidebarItems, pathname).map((group) => (
      <SidebarDropdown
        key={`group-${group.title}`}
        title={group.title}
        HeaderIcon={group.HeaderIcon}
        items={group.items}
      />
    ));
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="p-2">
          <h1 className="font-black">SaaS</h1>
        </div>
      </SidebarHeader>

      <SidebarContent className="custom-scrollbar overflow-auto">
        {renderSidebarContent()}
      </SidebarContent>

      <SidebarFooter>
        <Profile />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
