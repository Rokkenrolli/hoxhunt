import React from "react";
import { Attributes, textdefaults } from "./index";
import styled from "styled-components";

interface Props {
    heroattributes: Attributes
}

const AttributeList:React.FC<Props> = ({heroattributes}) => {

    const List = styled.div`
    width: 50%;
    margin: auto;

    `
    const Item = styled.p`
    ${textdefaults}
    align-text: center;
    margin: auto;
    `

    return <List>
        {Object.keys(heroattributes).map(e => {
           if (!e.startsWith("_")) return <Item key={e}>{e}: {heroattributes[`${e}`]}</Item>
        })}
    </List>
}

export default AttributeList