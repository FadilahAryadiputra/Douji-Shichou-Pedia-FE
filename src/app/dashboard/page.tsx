"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes"

const page = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  
  return (
    <main className='bg-sky-600'>
      <div className='mx-auto'>
        <div className='flex justify-center items-center'>Main Page</div>
        <div className='flex justify-center items-center'>
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default page;
