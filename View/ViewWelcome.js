import React from 'react';
import { Alert, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import anh from '../imgApp/anh';
import icons from '../imgApp/icons';
import UIbotton from '../compo/UIbotton';

function Welcome(props) {
  return <View style={{
    backgroundColor: 'pink', flex: 100
  }}>
    <ImageBackground
      source=
      { 
        anh.anhNen
      }
      resizeMode='cover'
      style={{
        flex: 1
      }}
    >

      <View style={{
        flexDirection: 'row',
        flex: 20,
        backgroundColor: 'green',
        padding: 10
      }}>
        <Image style={{
          width: 25,
          height: 25
        }}
          source={
            icons.watch
          }>

        </Image>
        <Text style={{
          color: 'blue'
        }}>This is welcome</Text>
        <View style={{ flex: 1 }}></View>
        <Image style={{
          width: 25,
          height: 25,
        }}
          source={
            icons.more
          }>
        </Image>


      </View>
      <View style={{
        flex: 20,
        alignItems:'center'
      }}>
       
        <Text style={{
          fontSize:15,
        }}>
          Tôi yêu Việt Nam
        </Text>
        <Text style={{
          fontSize:20,
          fontWeight:'bold'
        }}>
         PH31250-LucdtPH31250
        </Text>
        <Text style={{
          fontSize:15,
        }}>
          Tôi yêu Việt Nam
        </Text>
      </View>
      <View style={{
        flex: 38,
        backgroundColor: 'purple'
      }}>
<UIbotton onPress={()=>
Alert.alert('hahaha')
}
title='Tôi yêu viêt nam'
isSelect={true}
/>
<TouchableOpacity
  style={{
    borderColor: 'white',
    borderWidth: 1,
    height: 45,
    borderRadius: 5,
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Căn giữa theo chiều ngang
    paddingHorizontal: 10,
  }}
></TouchableOpacity>
<TouchableOpacity
  style={{
    borderColor: 'white',
    borderWidth: 1,
    height: 45,
    borderRadius: 5,
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Căn giữa theo chiều ngang
    paddingHorizontal: 10,
  }}
></TouchableOpacity>
      </View>

      <View style={{
        flex: 30,
        backgroundColor: 'blue'
      }}>
      </View>

      <View style={{
        flex: 30,
        backgroundColor: 'pink'
      }}>
      </View>
    </ImageBackground>

  </View>
}

export default Welcome;