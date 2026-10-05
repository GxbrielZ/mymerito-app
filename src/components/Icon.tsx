import React, { ReactNode } from "react";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { IconName } from "../types";

const paths: Record<IconName, ReactNode> = {
  home: (
    <>
      <Path d="m3 11 9-8 9 8" />
      <Path d="M5 10v10h14V10" />
      <Path d="M9 20v-6h6v6" />
    </>
  ),
  calendar: (
    <>
      <Rect x="3" y="5" width="18" height="16" rx="2" />
      <Path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  card: (
    <>
      <Rect x="3" y="5" width="18" height="14" rx="2" />
      <Path d="M3 10h18M7 15h3" />
    </>
  ),
  user: (
    <>
      <Circle cx="12" cy="8" r="4" />
      <Path d="M4 21c.7-4.2 3.4-6 8-6s7.3 1.8 8 6" />
    </>
  ),
  menu: <Path d="M4 7h16M4 12h16M4 17h16" />,
  chat: (
    <>
      <Path d="M4 5h16v12H8l-4 4V5Z" />
      <Path d="M8 9h8M8 13h5" />
    </>
  ),
  close: <Path d="m6 6 12 12M18 6 6 18" />,
  check: <Path d="m5 12 4 4L19 6" />,
  bell: (
    <>
      <Path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <Path d="M10 21h4" />
    </>
  ),
  book: (
    <>
      <Path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v18H7.5A3.5 3.5 0 0 0 4 23V5.5ZM20 5.5A3.5 3.5 0 0 0 16.5 2H13v18h3.5A3.5 3.5 0 0 1 20 23V5.5Z" />
    </>
  ),
  briefcase: (
    <>
      <Rect x="3" y="7" width="18" height="13" rx="2" />
      <Path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" />
    </>
  ),
  file: (
    <>
      <Path d="M6 2h8l4 4v16H6z" />
      <Path d="M14 2v5h5M9 13h6M9 17h6" />
    </>
  ),
  star: (
    <Path d="m12 2 3 6 6.5.9-4.7 4.6 1.1 6.5-5.9-3.1L6.1 20l1.1-6.5-4.7-4.6L9 8l3-6Z" />
  ),
  search: (
    <>
      <Circle cx="11" cy="11" r="7" />
      <Path d="m20 20-4-4" />
    </>
  ),
  mail: (
    <>
      <Rect x="3" y="5" width="18" height="14" rx="2" />
      <Path d="m4 7 8 6 8-6" />
    </>
  ),
  chevron: <Path d="m9 18 6-6-6-6" />,
  download: (
    <>
      <Path d="M12 3v12m-5-5 5 5 5-5" />
      <Path d="M4 19h16" />
    </>
  ),
  moon: <Path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />,
  logout: (
    <>
      <Path d="M10 4H5v16h5M14 8l4 4-4 4M8 12h10" />
    </>
  ),
  chart: (
    <>
      <Path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </>
  ),
  clock: (
    <>
      <Circle cx="12" cy="12" r="9" />
      <Path d="M12 7v5l3 2" />
    </>
  ),
  pin: (
    <>
      <Path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <Circle cx="12" cy="10" r="2.5" />
    </>
  ),
  eye: (
    <>
      <Path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <Circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (
    <>
      <Path d="m3 3 18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 5.2A11 11 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2 2.8M6.6 6.6C3.5 8.4 2 12 2 12s3.5 7 10 7a10 10 0 0 0 4.1-.9" />
    </>
  ),
};

type IconProps = {
  name: IconName;
  size?: number;
  fill?: string;
  color?: string;
};

export default function Icon({
  name,
  size = 21,
  fill = "none",
  color = "#172136",
}: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </Svg>
  );
}
