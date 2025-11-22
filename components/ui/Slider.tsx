import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value = 0, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      onValueChange?.(newValue);
    };

    const percentage = ((value - min) / (max - min)) * 100;

    return (
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className={cn(
          "w-full h-1",
          "bg-[#2A4B55]/30",
          "appearance-none",
          "cursor-pointer",
          "rounded-full",
          "[&::-webkit-slider-thumb]:appearance-none",
          "[&::-webkit-slider-thumb]:w-6",
          "[&::-webkit-slider-thumb]:h-6",
          "[&::-webkit-slider-thumb]:rounded-full",
          "[&::-webkit-slider-thumb]:bg-[#D4AF37]",
          "[&::-webkit-slider-thumb]:cursor-pointer",
          "[&::-webkit-slider-thumb]:shadow-2xl",
          "[&::-webkit-slider-thumb]:shadow-[#D4AF37]/50",
          "[&::-webkit-slider-thumb]:hover:scale-125",
          "[&::-webkit-slider-thumb]:transition-transform",
          "[&::-moz-range-thumb]:w-6",
          "[&::-moz-range-thumb]:h-6",
          "[&::-moz-range-thumb]:rounded-full",
          "[&::-moz-range-thumb]:bg-[#D4AF37]",
          "[&::-moz-range-thumb]:border-0",
          "[&::-moz-range-thumb]:cursor-pointer",
          "[&::-moz-range-thumb]:shadow-2xl",
          className
        )}
        style={{
          background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${percentage}%, #2A4B5530 ${percentage}%, #2A4B5530 100%)`,
        }}
        {...props}
      />
    );
  }
);

Slider.displayName = "Slider";

export { Slider };

