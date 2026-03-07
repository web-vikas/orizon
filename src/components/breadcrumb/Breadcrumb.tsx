"use client";

import * as React from "react";
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/primitives/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/primitives/dropdown-menu";
import { cn } from "@/lib/utils";
import type { BreadcrumbProps, BreadcrumbItemType } from "./types";

const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-1"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (props, ref) => {
    const { items = [], separator, className } = props;

    return (
      <ShadcnBreadcrumb ref={ref} className={cn(className)}>
        <BreadcrumbList>
          {items.map((item: BreadcrumbItemType, index: number) => {
            const isLast = index === items.length - 1;

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem className={item.className}>
                  {item.menu ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="flex items-center gap-1 cursor-pointer transition-colors hover:text-foreground"
                      >
                        {item.href ? (
                          <BreadcrumbLink
                            href={item.href}
                            onClick={item.onClick}
                          >
                            {item.title}
                          </BreadcrumbLink>
                        ) : isLast ? (
                          <BreadcrumbPage>{item.title}</BreadcrumbPage>
                        ) : (
                          <span
                            className="cursor-pointer transition-colors hover:text-foreground"
                            onClick={item.onClick}
                          >
                            {item.title}
                          </span>
                        )}
                        <ChevronDown />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {item.menu.items.map((menuItem) => (
                          <DropdownMenuItem
                            key={menuItem.key}
                            onClick={menuItem.onClick}
                          >
                            {menuItem.href ? (
                              <a href={menuItem.href}>{menuItem.label}</a>
                            ) : (
                              menuItem.label
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : isLast ? (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  ) : item.href ? (
                    <BreadcrumbLink href={item.href} onClick={item.onClick}>
                      {item.title}
                    </BreadcrumbLink>
                  ) : (
                    <span
                      className={cn(
                        item.onClick && "cursor-pointer transition-colors hover:text-foreground"
                      )}
                      onClick={item.onClick}
                    >
                      {item.title}
                    </span>
                  )}
                </BreadcrumbItem>

                {!isLast && (
                  <BreadcrumbSeparator>
                    {separator}
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </ShadcnBreadcrumb>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
