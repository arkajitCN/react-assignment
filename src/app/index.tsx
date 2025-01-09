import ResponsiveScreen from "@/components/layout/responsive-screen";
import FlowCreationForm from "@/features/flow-creation-form";

export default function App() {
  return (
    <ResponsiveScreen>
      <h3>React Flow</h3>
      <FlowCreationForm />
    </ResponsiveScreen>
  );
}
