export interface NavItem {
  label: string;
  href: string;
}

/** Order mirrors the brand's own menu requirements. */
export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Services", href: "/services" },
  { label: "Our Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const enquiryHref = "/contact";
