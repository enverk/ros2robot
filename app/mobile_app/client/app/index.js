import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import { useState } from 'react'
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES } from '../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome, JoystickComponent } from '../components'

const Home = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.profile} dimension="60%" />
                    ),
                    headerTitle: "",
                }}
            />
            <View
                style={
                    {
                        flex: 1,
                        padding: SIZES.large
                    }
                }>
                <Welcome />
            </View>

        </SafeAreaView>
    )
}


export default Home;