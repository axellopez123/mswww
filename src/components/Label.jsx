"use client";
import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../lib/utils";

const Label = React.forwardRef((props, ref) => {
  const { className, ...restProps } = props;

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        "text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...restProps}
    />
  );
});

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
