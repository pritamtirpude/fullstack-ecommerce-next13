"use client";

import { ReactNode, useEffect, useState } from "react";
import { useThemeStore } from "@/store";

const Hydrate = ({ children }: { children: ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  const themeStore = useThemeStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? (
        <body
          className="w-full h-full font-roboto"
          data-theme={`${themeStore.mode}`}
        >
          <div className="w-11/12 md:max-w-6xl mx-auto">{children}</div>
        </body>
      ) : (
        <body></body>
      )}
    </>
  );
};

export default Hydrate;
