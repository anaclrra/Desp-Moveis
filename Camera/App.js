import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from './src/components/Button';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if(cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const saveImage = async () => {
    if(image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert('Imagem Salva!')
        setImage(null);
      
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (hasPermission === false) {
    return <Text>Acesso a Camera Negado</Text>;
  }

  

  return (
    <View style={styles.container}>
      {!image ?
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
      >
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30
      }}>
        <Button icon={'retweet'} onPress={() =>{
          setType(type === CameraType.back ? CameraType.front : CameraType.back)
        }}/>
      </View>
      </Camera>
      :
      <Image source={{uri: image}} style={styles.camera}/>
    }
      <View>
        {image ?
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 50
        }}>
          <Button title={'Re-take'} icon={'retweet'} onPress={() => setImage(null)}/>
          <Button title={'Save'} icon={'check'} onPress={saveImage} />
        </View>
        :
        <Button title={'Tirar uma foto'} icon='camera' onPress={takePicture}/>
        }
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingBottom: 20
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  }
});



/* import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  //const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted');
    })();
  }, [])


  const takePicture = async () => {
    if (cameraRef) {
      try{
        const photo = await cameraRef.current.takePictureAsync();
        setImage(photo.uri); 

      } catch(e){
        console.log(e);
      }
      
    }
  };

  if(hasPermission === false) {
    return <Text>Acesso a camera negado</Text>
  }


  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={takePicture}
          >
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
 */