import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { Card } from "../../Modules/List/Event/Event.styles";

interface StyledProps {
  hoverdirection?: string;
  visible?: boolean;
  clicked?: string;
  hovercolor?: string;
}

export const MyIcon = styled(Icon)`
  &&&& {
    color: #666;
    &:hover {
      color: ${(props: StyledProps) =>
        props.hovercolor ? props.hovercolor : "#2c3e50"};
      transform: scale3d(1.25, 1.25, 1);
      transition: transform 0.2s;
      cursor: pointer;
    }
  }
`;

export const MyFlowedIcon = styled(MyIcon)`
  && {
    color: #666;
    opacity: 0;
    transition: opacity 0.5s ease 0s, transform 0.5s ease 0s;
    transform: ${(props: StyledProps) =>
      props.hoverdirection === "up"
        ? "translate(0px, 10px)"
        : "translate(0px, -10px)"};
    ${Card}:hover & {
      opacity: 1;
      transform: translate(0px, 0px);
    }
    &&.expanded {
      color: #2c3e50;
      transform: scale3d(1.25, 1.25, 1);
    }
  }
`;

export const MyHiddenFlowedIcon = styled(MyIcon)`
  && {
    display: ${(props: StyledProps) => (props.visible ? "block" : "none")};
    color: #666;
    opacity: 0;
    transition: opacity 0.5s ease 0s, transform 0.5s ease 0s;
    transform: ${(props: StyledProps) =>
      props.hoverdirection === "up"
        ? "translate(0px, 10px)"
        : "translate(0px, -10px)"};
    &.visible {
      opacity: 1;
      transform: translate(0px, 0px);
      margin: 0px 3px;
    }
    &.test:hover {
      opacity: 1;
      transform: translate(0px, 0px) scale3d(1.25, 1.25, 1);
    }
  }
`;

export const MyRotatedIcon = styled(MyFlowedIcon)`
  &&& {
    color: #666;
    &:hover {
      color: #2c3e50;
      transform: scale3d(1.25, 1.25, 1);
      transition: transform 0.2s;
      cursor: pointer;
    }
    &.clicked {
      -moz-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
      &:hover {
        -moz-transform: rotate(180deg) scale3d(1.25, 1.25, 1);
        -webkit-transform: rotate(180deg) scale3d(1.25, 1.25, 1);
        transform: rotate(180deg) scale3d(1.25, 1.25, 1);
      }
    }
  }
`;

export const TestIcon = styled(MyIcon)`
  &&& {
    color: #666;
    &:hover {
      color: #2c3e50;
      transform: scale3d(1.25, 1.25, 1);
      transition: transform 0.2s;
      cursor: pointer;
    }
    &.clicked {
      -moz-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
      &:hover {
        -moz-transform: rotate(180deg) scale3d(1.25, 1.25, 1);
        -webkit-transform: rotate(180deg) scale3d(1.25, 1.25, 1);
        transform: rotate(180deg) scale3d(1.25, 1.25, 1);
      }
    }
  }
`;
