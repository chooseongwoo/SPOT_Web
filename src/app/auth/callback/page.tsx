import Callback from "./Callback";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <Callback />
    </Suspense>
  );
}
