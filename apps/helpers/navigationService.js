import { createRef } from "react";

const NavigationRef = createRef();

export const navigate = (screen, params = "") => {
  NavigationRef.current?.navigate(screen, params);
};

export const goBack = () => {
  NavigationRef.current?.goBack();
};
