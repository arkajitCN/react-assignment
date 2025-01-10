import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";

import Navbar from "@/components/common/navbar";
import ResponsiveScreen from "@/components/layout/responsive-screen";
import FlowCreationForm from "@/features/flow-creation-form";
import Workflowspace from "@/features/workflow-space";

export default function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Provider store={store}>
      <Navbar setIsOpen={setIsOpen} />
      <ResponsiveScreen>
        <Workflowspace />
      </ResponsiveScreen>
      <FlowCreationForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </Provider>
  );
}
