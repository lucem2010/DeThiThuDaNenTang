import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'


const
    manHinhChao = () => {
        const navigation = useNavigation();
        useEffect(() => {
            const time = setTimeout(() => {
                navigation.navigate('manHinhHome')
            }, 3000)
            return () => clearTimeout(time);
        }, [])
        return (
            <View style={styles.khung}>
                <Image style={{ width: 90, height: 90 }} source={require('../img/logofpt.jpg')}></Image>
                <View style={styles.ThongTin}>
                    <Text>Đinh Tiến Lực</Text>
                    <Text style={{ color: 'red' }}>MSV:PH31250</Text>
                </View>
            </View>
        )
    }

export default manHinhChao

const styles = StyleSheet.create({
    khung: {
        flex: 1,
        backgroundColor: '#FFCF49',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ThongTin: {
        marginTop: 30
    }
})