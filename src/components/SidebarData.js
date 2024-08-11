import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
// import { FcBullish } from "react-icons/fc";
import { FaUserPlus } from "react-icons/fa";
import { MdSupervisedUserCircle } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { TbWindow } from "react-icons/tb";
import { FaMosquitoNet } from "react-icons/fa6";
import { BiSolidDollarCircle } from "react-icons/bi";
import { LiaFileInvoiceSolid } from "react-icons/lia"; //Quotation
import { IoIosMail } from "react-icons/io";
import { FaSquarePhone } from "react-icons/fa6";

export const SidebarData = [
  {
    title: "Home",
    path: "/admin-dashbord",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    allowedRoles: ["admin"],
  },
  {
    title: "Dashboard",
    path: "/user-dashboard",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    allowedRoles: ["User"],
  },
  {
    title: "Customer",
    icon: <ImProfile />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    allowedRoles: ["User"],

    subNav: [
      {
        title: "My Customer",
        path: "/my-customer",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Add Customer",
        path: "/customer/add-customer",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "All Customer",
    path: "/all-customer",
    icon: (
      <>
        <MdSupervisedUserCircle />
      </>
    ),
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    allowedRoles: ["admin"],
  },
  {
    title: "User",
    icon: <FaUserPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    allowedRoles: ["admin"],
    subNav: [
      {
        title: "Create New User",
        path: "/add-new-user",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Profile",
    icon: <ImProfile />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    allowedRoles: ["admin"],

    subNav: [
      {
        title: "Profile Setup",
        path: "/profile",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Glass",
    icon: <TbWindow />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    allowedRoles: ["admin"],

    subNav: [
      {
        title: "Glass Setup",
        path: "/glass-setup",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Mosquito Net",
    icon: <FaMosquitoNet />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    allowedRoles: ["admin"],

    subNav: [
      {
        title: "Mosquito Netting",
        path: "/mosquito-net",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Quotation",
    icon: <LiaFileInvoiceSolid />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    allowedRoles: ["User"],

    subNav: [
      {
        title: "Quotation",
        path: "/quotation",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Quotation Report",
        path: "/quotaition-report",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Vat & Installation",
    icon: <BiSolidDollarCircle />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    allowedRoles: ["admin"],

    subNav: [
      {
        title: "Vat & Installation Setup",
        path: "/vat-and-installtion",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Mail Data",
    icon: <IoIosMail />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    allowedRoles: ["admin"],

    subNav: [
      {
        title: "Mail Data",
        path: "/mail-data",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Phone Data",
    icon: <FaSquarePhone />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    allowedRoles: ["admin"],

    subNav: [
      {
        title: "Phone Data",
        path: "/phone-data",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
];
