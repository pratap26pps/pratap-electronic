"use client";
import React,{ useState } from "react";
import Link from "next/link";
import {  RiArrowDropRightFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
 

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components = [
  {
    title: "Stmicroelecronics",
    href: "/Stmicroelecronics",
  },
  {
    title: "Texas Instrument",
    href: "/TexasInstrument",
 
  },
  {
    title: "Yageo",
    href: "/Yageo",
  
  },
  {
    title: "Quectel",
    href: "/Quectel",
  
  },
  {
    title: "WaveShare",
    href: "/WaveShare",
  
  },
  {
    title: "spark fun",
    href: "/spark-fun ",
  },
  {
    title: "7semi",
    href: "/7semi",
  },
];
const categories = [
  { title: "Electronic Components", subItems: ["Resistors", "Capacitors", "ICs", "Transistors"] },
  { title: "Simplify", subItems: ["Product A", "Product B", "Product C"] },
  { title: "SmartElex", subItems: ["Sensors", "Controllers", "Modules"] },
  { title: "Drone Part", subItems: ["Motors", "Frames", "ESC", "Cameras"] },
  { title: "Electric Vehicle Part", subItems: ["Batteries", "Motors", "Chargers"] },
  { title: "Displays", subItems: ["LCD", "OLED", "Touchscreens"] },
  { title: "Cameras", subItems: ["CCTV", "Raspberry Pi Camera", "Thermal Cameras"] },
  { title: "IOT And Wireless", subItems: ["WiFi Modules", "Bluetooth Modules", "LoRa"] },
  { title: "Electronic Modules", subItems: ["Relay Modules", "Power Modules", "Sensor Modules"] }
];

export function NavigationMenuDemo() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  return (
    <NavigationMenu className='mt-6'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>All Categories</NavigationMenuTrigger>
           <NavigationMenuContent>
            <ul className="gap-2 h-72 relative  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200
             p-1 z-20 md:w-[200px] lg:w-[250px]  shadow-lg rounded-md">
              <ListItem href="/featured-brands" title="Shop by Brands" />
              <ListItem href="/latest-products" title="New Arrivals" />

              {categories.map((category, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center cursor-pointer hover:text-red-500 px-3 py-2 rounded-md"
                  onMouseEnter={() => setHoveredCategory(category.title)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <ListItem title={category.title} />
                  <RiArrowDropRightFill className="text-xl" />
                </div>
              ))}
            </ul>
          </NavigationMenuContent>

          {/* Submenu Modal */}
          {hoveredCategory && (
            <div
              className="absolute bg-gray-700 text-amber-50  h-[43vh] top-12 z-50 left-[260px] border shadow-lg rounded-md w-[200px] p-3 transition-all duration-300 opacity-100"
              onMouseEnter={() => setHoveredCategory(hoveredCategory)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <h3 className="text-lg font-semibold border-b pb-2">{hoveredCategory}</h3>
              <ul className="mt-2 space-y-2">
                {categories.find((cat) => cat.title === hoveredCategory)?.subItems.map((sub, i) => (
                  <li key={i} className="hover:text-blue-600 cursor-pointer">{sub}</li>
                ))}
              </ul>
            </div>
          )}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>TOP Manufacturers</NavigationMenuTrigger>
          
          <NavigationMenuContent>
            <ul className="w-[200px] gap-2 p-1">
              {components.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/rfq" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              RFQ
            </NavigationMenuLink>

          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/quick-order" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Quick Order
            </NavigationMenuLink>

          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/Contact-Us" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact Us
            </NavigationMenuLink>

          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";