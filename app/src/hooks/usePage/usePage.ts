import {useContext} from "react";
import {PageContext, PageStateType} from "./PageContext";
import {useRefEffect} from "../../components/helper/useRefHook";

export const usePage = (props: { link?: string, click?: () => void, title?: string } = {}) => {
  const [pageState, setPageState] = useContext(PageContext);
  const {link, click, title} = props;

  const changeReturnLink = (newLink: string) => {
    setPageState(((prevState: PageStateType) => {
      return {...prevState, returnLink: newLink, defaultReturnLink: newLink, returnClickAction: undefined};
    }));
  }
  useRefEffect(() => {
    if (!!link && !click) {
      changeReturnLink(link)
    }
  }, [link])

  const changeReturnClick = (newClick?: () => void) => {
    if (newClick === undefined) {
      setPageState(((prevState: PageStateType) => {
        return {...prevState, returnLink: prevState.defaultReturnLink, returnClickAction: undefined};
      }));
    } else {
      setPageState(((prevState: PageStateType) => {
        return {...prevState, returnLink: "", returnClickAction: newClick};
      }));
    }
  }
  useRefEffect(() => {
    if (!!click) {
      changeReturnClick(click)
    }
  }, [click])

  const changeTitle = (headlineTitle: string,) => {
    setPageState(((prevState: PageStateType) => {
      return {...prevState, headlineTitle: headlineTitle};
    }));
  }
  useRefEffect(() => {
    if (!!title) {
      changeTitle(title);
    }
  }, [title])

  return {
    changeReturnLink,
    returnLink: pageState.returnLink,
    changeReturnClick,
    returnClick: pageState.returnClickAction,
    changeTitle,
    headlineTitle: pageState.headlineTitle
  }
}
