import { View } from "./View"

export interface ModelAndView {
  empty: boolean;
  model: any;
  modelMap: any;
  reference: boolean;
  status: string;
  view: View;
  viewName: string;
}
