"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Gamepad2, Home } from "lucide-react";

export function Navbar() {
  return (
    <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="flex h-16 items-center px-4 md:px-10 max-w-7xl mx-auto justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tighter">
            MLN122 Project
          </span>
        </div>

        {/* Menu Bar */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/#thuc-trang"
                  className={navigationMenuTriggerStyle()}
                >
                  Thực Trạng
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/#ly-luan" className={navigationMenuTriggerStyle()}>
                  Lý Luận
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/#giai-phap"
                  className={navigationMenuTriggerStyle()}
                >
                  Giải Pháp
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Board Game Button */}
        <div className="flex items-center gap-4">
          <Link href="/board-game">
            <Button
              variant="default"
              className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white font-bold shadow-lg animate-pulse"
            >
              <Gamepad2 className="mr-2 h-4 w-4" />
              Chơi Game
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
