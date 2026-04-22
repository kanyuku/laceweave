import { MeshProvider } from "@meshsdk/react";
import { DeveloperGuide } from "./DeveloperGuide";

export default function App() {
  return (
    <MeshProvider>
      <DeveloperGuide />
    </MeshProvider>
  );
}

