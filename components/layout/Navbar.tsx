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
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Home className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tighter">
            MLN122 Project
          </span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/#thuc-trang" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Thực Trạng
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/#ly-luan" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Lý Luận
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/#giai-phap" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Giải Pháp
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

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
