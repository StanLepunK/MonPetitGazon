import React from "react";
import { useState, useCallback } from "react";

export const useToggle = (state_is) => {
  const [is, set_is] = useState(state_is);
  const toggle = useCallback(() => set_is((state) => !state), [set_is]);
  return [is, toggle];
};
