import { FC } from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import { ReactComponent } from "../../armillarysphere.svg";

interface Props {
  className?: string;
}

const ArmillarySphereIcon: FC<Props> = ({ className }) => {
  return (
    <SvgIcon
      className={className}
      viewBox="0 0 30 30"
      component={ReactComponent}
    />
  );
};

export default ArmillarySphereIcon;
