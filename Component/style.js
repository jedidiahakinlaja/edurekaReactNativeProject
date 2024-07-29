import styled from '';
import {View,} from 'react-native'
import Constants from 'expo-constants';

const StatusBarHeight =Constants.statusBarHeight;

export const  StyledContainer =styled.View`
flex:1,
padding-top:25px'
padding-top:${StatusBarHeight +10 }px
`;

export const  InnerContainer =styled.view`
flex:1;
width:100%,
align-item:center;
padding-top:${StatusBarHeight +10 }px
`;

export const subTitle =styled.Text`
font-size:18px;
margin-top:20px;
letter-spacing:1px;
font-size:bold;

`


