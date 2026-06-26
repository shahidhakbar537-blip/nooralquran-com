import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/yaseen")({
  beforeLoad: () => { throw redirect({ to: "/surah/$number", params: { number: "36" } }); },
});
