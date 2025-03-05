import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Profile } from "./profile";
import { SidebarDropdownProps } from "./sidebar-dropdown";
import {
  Circle,
  BarChart2,
  Package,
  ShoppingCart,
  Users,
  Briefcase,
  FileText,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarDropdown } from "./sidebar-dropdown";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [url, setUrl] = useState("");

  interface dataProps {
    navMain: SidebarDropdownProps[];
  }

  const data: dataProps = {
    navMain: [
      {
        title: "Dashboard",
        HeaderIcon: BarChart2,
        items: [
          {
            title: "Visão geral",
            url: "/",
            isActive: url === "/",
            Icon: Circle,
          },
        ],
      },
      {
        title: "Produtos",
        HeaderIcon: Package,
        items: [
          {
            title: "Cadastro de Produtos",
            url: "/product-register",
            isActive: url === "/product-register",
            Icon: Circle,
          },
          {
            title: "Edição de Produtos",
            url: "/product-edit",
            isActive: url === "/product-edit",
            Icon: Circle,
          },
          {
            title: "Controle de Estoque",
            url: "/stock-control",
            isActive: url === "/stock-control",
            Icon: Circle,
          },
        ],
      },
      {
        title: "Vendas",
        HeaderIcon: ShoppingCart,
        items: [
          {
            title: "Gestão de Pedidos",
            url: "/order-management",
            isActive: url === "/order-management",
            Icon: Circle,
          },
          {
            title: "Controle de Vendas",
            url: "/sales-control",
            isActive: url === "/sales-control",
            Icon: Circle,
          },
          {
            title: "Relatórios de Vendas",
            url: "/sales-reports",
            isActive: url === "/sales-reports",
            Icon: Circle,
          },
        ],
      },
      {
        title: "Clientes",
        HeaderIcon: Users,
        items: [
          {
            title: "Cadastro de Clientes",
            url: "/customer-register",
            isActive: url === "/customer-register",
            Icon: Circle,
          },
          {
            title: "Consulta e Edição",
            url: "/customer-edit",
            isActive: url === "/customer-edit",
            Icon: Circle,
          },
        ],
      },
      {
        title: "Funcionários",
        HeaderIcon: Briefcase,
        items: [
          {
            title: "Cadastro de Funcionários",
            url: "/employee-register",
            isActive: url === "/employee-register",
            Icon: Circle,
          },
          {
            title: "Acessos e Permissões",
            url: "/access-control",
            isActive: url === "/access-control",
            Icon: Circle,
          },
        ],
      },
      {
        title: "Relatórios",
        HeaderIcon: FileText,
        items: [
          {
            title: "Relatórios de Vendas",
            url: "/sales-reports",
            isActive: url === "/sales-reports",
            Icon: Circle,
          },
          {
            title: "Relatórios de Estoque",
            url: "/stock-reports",
            isActive: url === "/stock-reports",
            Icon: Circle,
          },
          {
            title: "Relatórios de Funcionários",
            url: "/employee-reports",
            isActive: url === "/employee-reports",
            Icon: Circle,
          },
        ],
      },
      {
        title: "Configurações",
        HeaderIcon: Settings,
        items: [
          {
            title: "Configurações Gerais",
            url: "/settings",
            isActive: url === "/settings",
            Icon: Circle,
          },
          {
            title: "Sistema",
            url: "/customization",
            isActive: url === "/customization",
            Icon: Circle,
          },
          {
            title: "Usuários",
            url: "/user-management",
            isActive: url === "/user-management",
            Icon: Circle,
          },
        ],
      },
    ],
  };
  const location = useLocation();

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="p-2">
          <h1 className="font-black">SaaS</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="custom-scrollbar overflow-auto">
        {data.navMain.map((item) => (
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
