import * as React from "react";
import styled from "styled-components";
import {StyledCompProps} from "../../../helper/types";
import BorderContainer from "../../../content/BorderContainer";
import CalendarHeatmap, {DataType} from 'reactjs-calendar-heatmap'
import {Color} from "../../../config/color";

interface HeatMapProps extends StyledCompProps {
}

function HeatMap(props: HeatMapProps) {
  const data: DataType[] = [{
    date: "2017-04-03",
    total: 17164,
    details: [{
      name: "Zelda Breath of the Wild ",
      date: "2017-04-03 00:00:00",
      value: 86400
    }, {
      name: "Project 2 ",
      date: "2017-01-01 00:00:00",
      value: 86400
    },
      {
        name: "Project N ",
        date: "2017-01-01 00:00:00",
        value: 86400
      }],
    summary: []
  }]

  const handle = (a:any, b:any) => {
console.log(a,b)
  }
  return (
    <div className={props.className}>
      <CalendarHeatmap
        data={data}
        color={Color.ALPHA_COLOR}
        handler={handle as any}>
      </CalendarHeatmap>
      <BorderContainer>

      </BorderContainer>
    </div>
  );
}

export default styled(HeatMap)`
  display: flex;
  flex-wrap: wrap;
`;
