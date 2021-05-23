import {useContext, useEffect} from "react";
import {PageContext, PageStateType} from "./PageContext";

export const usePage = (props: { link?: string, click?: () => void, title?: string } = {}) => {
  const [pageState, setPageState] = useContext(PageContext);
  const {link, click, title} = props;

  const changeReturnLink = (newLink: string) => {
    setPageState(((prevState: PageStateType) => {
      return {...prevState, returnLink: newLink, defaultReturnLink: newLink, returnClickAction: undefined};
    }));
  }
  useEffect(() => {
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
  useEffect(() => {
    if (!!click) {
      changeReturnClick(click)
    }
  }, [click])

  const changeTitle = (headlineTitle: string,) => {
      setPageState(((prevState: PageStateType) => {
        return {...prevState, headlineTitle: headlineTitle};
      }));
  }
  useEffect(() => {
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
