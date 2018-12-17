import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import times from "lodash/times";
import Img from "react-image";
import {
  Loading,
  Text,
  Flex,
  StyleHoc,
  Icon,
  Button
} from "../../../components";
import * as actions from "./actions";
import { selector, getReducerName } from "./ducks";
import HeaderSearch from "./HeaderSearch";

type Props = {
  getRecommendList: Funtion,
  selector?: Object
};

const StarComponents = ({ starNumber }: { starNumber?: any }) => {
  const number = parseInt(starNumber, 10);
  if (!number) {
    return null;
  }
  if (number % 10 === 0) {
    return (
      <Flex>
        {times(number / 10, index => {
          return <Icon key={index} name="star" size="16px" color="#F9952C" />;
        })}
        {times((50 - number) / 10, index => {
          return (
            <Icon key={index} name="starEmpty" size="16px" color="#F9952C" />
          );
        })}
      </Flex>
    );
  }
  if (number % 5 === 0) {
    return (
      <Flex>
        {times(Math.floor(number / 10), index => {
          return <Icon name="star" size="16px" color="#F9952C" key={index} />;
        })}
        <Icon name="starHalf" size="16px" color="#F9952C" />
        {times((50 - number - 5) / 10, index => {
          return (
            <Icon key={index} name="starEmpty" size="16px" color="#F9952C" />
          );
        })}
      </Flex>
    );
  }
  return null;
};

@StyleHoc
class Recommend extends Component {
  props: Props;

  componentDidMount() {
    const { getRecommendList } = this.props;
    console.log('props', this.props)
    getRecommendList();
  }

  getScrollHeight = () => {
    const screenHeight = window.screen.height;
    const { headerHeight, footerHeight } = this.props;

    return `${screenHeight -
      parseInt(headerHeight, 10) -
      parseInt(footerHeight, 10)}px`;
  };

  render() {
    const { selector, headerHeight } = this.props;
    console.log('se',selector)
    if (get(selector, "isFetching")) {
      return <Loading overly />;
    }
    const data = get(selector, "payload.data");
    console.log('data', data)
    return (
      <div>
        <div style={{ height: "100vh", overflow: "auto" }}>
          
          {get(data, "result.length") > 0 &&
            get(data, "result").map(item => {
              return (
                <Flex key={get(item, "movieid")} className="padding-15 dividend">
                  <div className="margin-right-10">
                    <Img
                      src={`${get(item, "imgurl")}`}
                      height="auto"
                      width="80px"
                      alt={get(item, "alt")}
                    />
                  </div>
                  <Flex flex={4} flexDirection="column">
                    <Text weight="bolder" size="mlarger">
                      {get(item, "title")}
                    </Text>
                    <Flex>
                      <StarComponents starNumber={get(item, "rating.stars")} />
                      <Text
                        color="grayColor"
                        className={
                          get(item, "rating.average") && "margin-left-5"
                        }
                      >
                        {get(item, "rating.average") || "暂无评分"}
                      </Text>
                    </Flex>

                    <Text size="ssmall" color="grayColor">
                      简介：{get(item, "overview") &&
                        get(item, "overview").substr(0, 30)}
                      ...
                    </Text>
                  </Flex>
                  <Flex alignItems="center" className="margin-left-10" flex={1}>
                    <Button
                      hasBorder
                      style={{
                        borderRadius: "10%",
                        height: "30px",
                        width: "100%"
                      }}
                    >
                      购票
                    </Button>
                  </Flex>
                </Flex>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToprops = (state, ownProps) => {
  return { 
    selector: selector(state, getReducerName),
    needUserRate: ownProps.needUserRate,
    uuid: ownProps.uuid
  };
};

const mapDispatchToProps = {
  getRecommendList: actions.getRecommendList
};

export default connect(mapStateToprops, mapDispatchToProps)(Recommend);
