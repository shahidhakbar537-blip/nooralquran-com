import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/juz")({
  component: () => <Outlet />,
});
