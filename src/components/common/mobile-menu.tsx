import { Home, Menu, ShoppingCart, User } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { useParams } from "next/navigation";

function MobileMenu() {
  const params = useParams();
  const { lang } = params;
  return (
    <div className="">
      <div className="flex items-center bg-primary justify-between gap-2">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="md:hidden text-white"
        >
          <Link href={`/${lang}`}>
            <Home className="h-7 w-7 text-white" />
            <span className="sr-only">Home</span>
          </Link>
        </Button>

        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="h-7 w-7 text-white" />
          <span className="sr-only">Menu</span>
        </Button>

        {/* Shopping Cart */}
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-7 w-7 text-white" />
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
            3
          </Badge>
          <span className="sr-only">Shopping cart</span>
        </Button>

        {/* User Account */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-7 w-7 text-white" />
              <span className="sr-only">User account</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Link href="/profile" className="w-full">
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/orders" className="w-full">
                My Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/wishlist" className="w-full">
                Wishlist
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/settings" className="w-full">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default MobileMenu;
