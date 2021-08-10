import { useContext } from "react";
import { FormContext, FormStateType } from "./FormContext";

export const useForm = (
  props: { link?: string; click?: () => void; title?: string } = {}
) => {
  const [pageState, setPageState] = useContext(FormContext);
  const { link, click, title } = props;

  const changeReturnLink = (newLink: string) => {
    setPageState((prevState: FormStateType) => {
      return {
        ...prevState,
        returnLink: newLink,
        defaultReturnLink: newLink,
        returnClickAction: undefined,
      };
    });
  };

  return {
    changeReturnLink,
    returnLink: pageState.returnLink,
  };
};
