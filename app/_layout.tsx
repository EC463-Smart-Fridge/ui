import { Slot, Tabs } from "expo-router";
import { View } from "react-native";
import { GraphQLClientProvider } from "../contexts/GraphQLClientContext";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import HomeIcon from "../assets/icons/HomeIcon";
// import CakeIcon from "../assets/icons/CakeIcon";
import RecipeIcon from "../assets/icons/RecipeIcon";
import ScanIcon from "../assets/icons/ScanIcon";
import SettingsIcon from "../assets/icons/SettingsIcon";

export default function Layout() {
    return (
        <GraphQLClientProvider>
            {/* TEMP TOP BAR */}
            {/* <View style={{height: 16, width: "100%"}}></View> */}
            <StatusBar style="auto" />
            {/* <View style={{flex: 1, backgroundColor: 'blue'}}> */}
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        paddingTop: 4,
                        paddingBottom: 4,
                    },
                    headerShown: false,
                    tabBarLabelPosition: 'below-icon',
                    tabBarActiveTintColor: 'darkturquoise',
                    
                }}
            >
                <Tabs.Screen
                    name="index"    
                    options={{ href: null, headerShown: false}}
                ></Tabs.Screen>
                <Tabs.Screen
                    name="home"
                    options={{ tabBarLabel: "Home", tabBarIcon: ({focused}) => <HomeIcon fill={focused ? 'darkturquoise' : 'black'} />}}
                />
                <Tabs.Screen
                    name="scanner"
                    options={{ tabBarLabel: "Scan", tabBarIcon: ({focused}) => <ScanIcon fill={focused ? 'darkturquoise' : 'black'}/>}}
                />
                <Tabs.Screen
                    name="recipes"
                    options={{ tabBarLabel: "Recipes", tabBarIcon: ({focused}) => <RecipeIcon fill={focused ? 'darkturquoise' : 'black'}/>}}
                />
                <Tabs.Screen
                    name="settings"
                    options={{ tabBarLabel: "Settings", tabBarIcon: ({focused}) => <SettingsIcon fill={focused ? 'darkturquoise' : 'black'}/>}}
                />
            </Tabs>
            {/* </View> */}
        </GraphQLClientProvider>
    )
}