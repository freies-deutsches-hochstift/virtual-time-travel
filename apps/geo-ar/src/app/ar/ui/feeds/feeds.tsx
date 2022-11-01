import { useSelector } from "react-redux";
import { PovsOverlayFeeds } from "@virtual-time-travel/geo";
import { selectArCurrentFeed } from "../../../store/geo.slice";

export function ArFeeds() {
  const feed = useSelector(selectArCurrentFeed);
  return <PovsOverlayFeeds {...{ feed }} />;
}

export default ArFeeds;
