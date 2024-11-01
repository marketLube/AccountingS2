"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { MdDateRange } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { SiBlockchaindotcom } from "react-icons/si";

function Navigation({ onSetHover, isHover }) {
  const pathName = usePathname();

  return (
    <nav
      className="nav"
      onMouseEnter={() => onSetHover(true)}
      onMouseLeave={() => onSetHover(false)}
    >
      <ul className="nav-ul">
        <li className="nav-ul-li">
          <Link
            href="/dashboard"
            className={`nav-ul-li-a ${
              pathName === "/dashboard" ? "active" : ""
            } ${isHover ? "isHoverHyper" : ""}`}
          >
            {isHover ? (
              <p
                className="font-medium text-left"
                style={{ animation: "navText .5s ease forwards" }}
              >
                Dashboard
              </p>
            ) : (
              <GoHomeFill className={`icons`} />
            )}
          </Link>
        </li>
        <li className="nav-ul-li">
          <Link
            href="/daybook"
            className={`nav-ul-li-a ${
              pathName === "/daybook" ? "active" : ""
            } ${isHover ? "isHoverHyper" : ""}`}
          >
            {isHover ? (
              <p
                className="font-medium text-left"
                style={{
                  animation: "navText .5s ease forwards",
                }}
              >
                Daybook
              </p>
            ) : (
              <MdDateRange className={`icons`} />
            )}
          </Link>
        </li>
        <li className="nav-ul-li">
          <Link
            href="/balance-sheet"
            className={`nav-ul-li-a ${
              pathName === "/balance-sheet" ? "active" : ""
            } ${isHover ? "isHoverHyper" : ""}`}
          >
            {isHover ? (
              <p
                className="font-medium text-left"
                style={{ animation: "navText .5s ease forwards" }}
              >
                Balance Sheet
              </p>
            ) : (
              <BsBarChartFill className={`icons`} />
            )}
          </Link>
        </li>
        <li className="nav-ul-li">
          <Link
            href="/outstanding"
            className={`nav-ul-li-a ${
              pathName === "/outstanding" ? "active" : ""
            } ${isHover ? "isHoverHyper" : ""}`}
          >
            {isHover ? (
              <p
                className="font-medium text-left"
                style={{ animation: "navText .5s ease forwards" }}
              >
                Outstanding
              </p>
            ) : (
              <FaPhoneAlt className={`icons`} />
            )}
          </Link>
        </li>
        <li className="nav-ul-li">
          <Link
            href="/liability"
            className={`nav-ul-li-a ${
              pathName === "/liability" ? "active" : ""
            } ${isHover ? "isHoverHyper" : ""}`}
          >
            {isHover ? (
              <p
                className="font-medium text-left"
                style={{ animation: "navText .5s ease forwards" }}
              >
                Liability
              </p>
            ) : (
              <SiBlockchaindotcom className={`icons`} />
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
