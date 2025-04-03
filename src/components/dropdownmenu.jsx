"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RiArrowDropRightFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { FaBars, FaTimes } from "react-icons/fa";  //add
import { FaSearch } from "react-icons/fa";



import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { HiDocumentDownload } from "react-icons/hi";

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

];
const categories = [
  {
    title: "Electronic Components",
    href: "/electronics-components",
    subItems: [
      { title: "Resistors", href: "/electronics-components/resistor" },
      { title: "ICs", href: "/electronics-components/ics" },
      { title: "Transistors", href: "/electronics-components/transistors" },
    ],
  },
  {
    title: "Simplify",
    href: "/simplify",
    subItems: [
      { title: "Product A", href: "/simplify/product-a" },
      { title: "Product B", href: "/simplify/product-b" },
      { title: "Product C", href: "/simplify/product-c" },
    ],
  },
  {
    title: "SmartElex",
    href: "/SmartElex",
    subItems: [
      { title: "Sensors", href: "/SmartElex/sensors" },
      { title: "Controllers", href: "/SmartElex/controllers" },
      { title: "Modules", href: "/SmartElex/modules" },
    ],
  },
  {
    title: "SmartElex",
    href: "/SmartElex",
    subItems: [
      { title: "Sensors", href: "/SmartElex/sensors" },
      { title: "Controllers", href: "/SmartElex/controllers" },
      { title: "Modules", href: "/SmartElex/modules" },
    ],
  },
  {
    title: "SmartElex",
    href: "/SmartElex",
    subItems: [
      { title: "Sensors", href: "/SmartElex/sensors" },
      { title: "Controllers", href: "/SmartElex/controllers" },
      { title: "Modules", href: "/SmartElex/modules" },
    ],
  },
  {
    title: "SmartElex",
    href: "/SmartElex",
    subItems: [
      { title: "Sensors", href: "/SmartElex/sensors" },
      { title: "Controllers", href: "/SmartElex/controllers" },
      { title: "Modules", href: "/SmartElex/modules" },
    ],
  },
  {
    title: "SmartElex",
    href: "/SmartElex",
    subItems: [
      { title: "Sensors", href: "/SmartElex/sensors" },
      { title: "Controllers", href: "/SmartElex/controllers" },
      { title: "Modules", href: "/SmartElex/modules" },
    ],
  },
  {
    title: "SmartElex",
    href: "/SmartElex",
    subItems: [
      { title: "Sensors", href: "/SmartElex/sensors" },
      { title: "Controllers", href: "/SmartElex/controllers" },
      { title: "Modules", href: "/SmartElex/modules" },
    ],
  },

  {
    title: "SmartElex",
    href: "/SmartElex",
    subItems: [
      { title: "Sensors", href: "/SmartElex/sensors" },
      { title: "Controllers", href: "/SmartElex/controllers" },
      { title: "Modules", href: "/SmartElex/modules" },
    ],
  },
];



export function NavigationMenuDemo() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);
  return (
    <NavigationMenu className='mt-6'>
      {/* Hamburger Menu Button */}
      <div className="flex justify-between items-center md:hidden">
        {/* <h1 className="text-lg font-bold">Menu</h1> */}
        <button
          className="text-xl p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
        <div className='md:hidden px-4 mt-2'>

          <div className='flex items-center gap-2 p-2 border rounded-full bg-gray-100 shadow-sm focus-within:shadow-md'>
            <FaSearch className='text-gray-500 ml-2' />
            <input
              type='search'
              placeholder='Search for product...'
              className='w-full bg-gray-100 outline-none text-gray-700 placeholder-gray-500 rounded-full px-2'
            />
          </div>
        </div>
      </div>
      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white dark:bg-gray-900 shadow-lg p-4 transition-all duration-300">
          {/* <NavigationMenuDemo /> */}

          <NavigationMenuList className="w-full">

            <div className="flex flex-col">
              <NavigationMenuItem>
                <NavigationMenuTrigger>All Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="h-72 relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-1 z-20 md:w-[200px] lg:w-[250px] shadow-lg rounded-md">
                    <ListItem href="/featured-brands" title="Shop by Brands" />
                    <ListItem href="/latest-products" title="New Arrivals" />

                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center cursor-pointer hover:text-red-500 px-3 py-2 rounded-md"
                        onMouseEnter={() => setHoveredCategory(category.title)}
                      >
                        <ListItem title={category.title} href={category.href} />
                        <RiArrowDropRightFill className="text-xl" />
                      </div>
                    ))}
                  </ul>
                </NavigationMenuContent>

                {/* Submenu Panel */}
                {hoveredCategory && (
                  <div
                    className="absolute bg-gray-700 text-amber-50 h-[43vh] top-12 left-[260px] border shadow-lg rounded-md w-[200px] p-3 transition-all duration-300 opacity-100 overflow-y-auto"
                    style={{
                      scrollbarGutter: "stable both-edges",
                      textAlign: "left",
                    }}
                    onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <h3 className="text-lg font-semibold border-b pb-2">{hoveredCategory}</h3>
                    <ul className="mt-2 space-y-2">
                      {categories
                        .find((cat) => cat.title === hoveredCategory)
                        ?.subItems.map((sub, i) => (
                          <ListItem key={i} href={sub.href} className="hover:text-blue-600 cursor-pointer">
                            {sub.title}
                          </ListItem>
                        ))}
                    </ul>
                  </div>
                )}
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>TOP Manufacturers</NavigationMenuTrigger>

                <NavigationMenuContent >
                  <ul className="w-[200px] gap-2 p-1">
                    {components.map((component) => (
                      <ListItem key={component.title} title={component.title} href={component.href}>
                        {/* {component.description} */}
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
            </div>
          </NavigationMenuList>
        </div>
      )}

      <NavigationMenuList className="lg:block hidden">

        <div className="flex">
          <NavigationMenuItem>
            <NavigationMenuTrigger>All Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="h-72 relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-1 z-20 md:w-[200px] lg:w-[250px] shadow-lg rounded-md">
                <ListItem href="/featured-brands" title="Shop by Brands" />
                <ListItem href="/latest-products" title="New Arrivals" />

                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center cursor-pointer hover:text-red-500 px-3 py-2 rounded-md"
                    onMouseEnter={() => setHoveredCategory(category.title)}
                  >
                    <ListItem title={category.title} href={category.href} />
                    <RiArrowDropRightFill className="text-xl" />
                  </div>
                ))}
              </ul>
            </NavigationMenuContent>

            {/* Submenu Panel */}
            {hoveredCategory && (
              <div
                className="absolute bg-gray-700 text-amber-50 h-[43vh] top-12 left-[260px] border shadow-lg rounded-md w-[200px] p-3 transition-all duration-300 opacity-100 overflow-y-auto"
                style={{
                  scrollbarGutter: "stable both-edges",
                  textAlign: "left",
                }}
                onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <h3 className="text-lg font-semibold border-b pb-2">{hoveredCategory}</h3>
                <ul className="mt-2 space-y-2">
                  {categories
                    .find((cat) => cat.title === hoveredCategory)
                    ?.subItems.map((sub, i) => (
                      <ListItem key={i} href={sub.href} className="hover:text-blue-600 cursor-pointer">
                        {sub.title}
                      </ListItem>
                    ))}
                </ul>
              </div>
            )}
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>TOP Manufacturers</NavigationMenuTrigger>

            <NavigationMenuContent >
              <ul className="w-[200px] gap-2 p-1">
                {components.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {/* {component.description} */}
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
        </div>
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













