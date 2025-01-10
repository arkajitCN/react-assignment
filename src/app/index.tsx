import Navbar from "@/components/common/navbar";
import ResponsiveScreen from "@/components/layout/responsive-screen";
import FlowCreationForm from "@/features/flow-creation-form";
import Workflowspace from "@/features/workflow-space";
import { store } from "@/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <ResponsiveScreen>
        <Workflowspace />
      </ResponsiveScreen>
    </Provider>
  );
}
