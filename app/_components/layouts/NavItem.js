import Link from "next/link";
import { usePathname } from "next/navigation";

function NavItem({ item, isHover }) {
  const pathName = usePathname();
  const IconComponent = item.icon;
  return (
    <li className="nav-ul-li">
      <Link
        prefetch={true}
        href={item.path}
        className={`nav-ul-li-a ${
          pathName === `${item.path}` ? "active" : ""
        } ${isHover ? "isHoverHyper" : ""}`}
      >
        {isHover ? (
          <p
            className="font-medium text-left"
            style={{ animation: "navText .5s ease forwards" }}
          >
            {item.name}
          </p>
        ) : (
          <IconComponent className={`icons`} />
        )}
      </Link>
    </li>
  );
}

export default NavItem;
