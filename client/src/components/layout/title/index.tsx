import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Button } from "@pankod/refine-mui";

import { logo, Billboard } from 'assets';

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src={logo} alt="Billboard" width="28px" />
        ) : (
          <img src={Billboard} alt="Refine" width="140px" />
        )}
      </Link>
    </Button>
  );
};
