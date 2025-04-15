import { ArrowLeftRight, Bookmark, Gamepad2, Home, User } from "lucide-react";

const routesTitles = {
  homepage: "home",
  translation: "translation",
  gamesArea: "games area",
  saved: "saved",
  profile: "profile",
  word: "translation",
};
const titlesRoutes = {
  home: "homepage",
  translation: "translation",
  "games area": "gamesArea",
  saved: "saved",
  profile: "profile",
};

const titlesIcons = {
  home: (size: number) => <Home size={size} strokeWidth="1.2px" />,
  translation: (size: number) => (
    <ArrowLeftRight size={size} strokeWidth="1.2px" />
  ),
  "games area": (size: number) => <Gamepad2 size={size} strokeWidth="1.2px" />,
  saved: (size: number) => <Bookmark size={size} strokeWidth="1.2px" />,
  profile: (size: number) => <User size={size} strokeWidth="1.2px" />,
};

type RouteKey = keyof typeof routesTitles;
function routeToTitle(route: string): string {
  if (route in routesTitles) {
    return routesTitles[route as RouteKey];
  }
  return "Home";
}
type TitleKey = keyof typeof titlesRoutes;
function titleToIcon(title: string, size: number): React.ReactNode {
  if (title in titlesIcons) {
    const icon = titlesIcons[title as TitleKey];
    return icon(size);
  }
  return <Home />;
}

function titleToRoute(title: string): string {
  if (title in titlesRoutes) {
    return titlesRoutes[title as TitleKey];
  }
  return "Home";
}

export { routeToTitle, titleToRoute, titleToIcon };
